import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import { 
  INITIAL_TENDERS, 
  SAMPLE_CUSTOMS_DECLARATION, 
  INITIAL_CLIENTS, 
  INITIAL_SUPPORT_TICKETS 
} from '../data/initialData';

// ==========================================
// 1. CUSTOMS DECLARATIONS (BURS SAD 500)
// ==========================================

export async function saveCustomsDeclarationToFirestore(declaration, userId = 'guest') {
  if (!isFirebaseConfigured || !db) {
    return { ...declaration, id: "decl-" + Date.now() };
  }

  const docData = {
    ...declaration,
    userId: userId || 'guest',
    createdAt: serverTimestamp(),
    timestampMs: Date.now()
  };

  const docRef = await addDoc(collection(db, "customs_history"), docData);

  // Update client telemetry and activity metrics in Firestore
  if (userId && userId !== 'guest') {
    try {
      const userRef = doc(db, "users", userId);
      await setDoc(userRef, {
        invoicesProcessed: increment(1),
        penaltiesPreventedBwp: increment(10000),
        lastActive: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.warn("Could not update client telemetry in Firestore:", e);
    }
  }

  return { ...docData, id: docRef.id };
}

export function subscribeCustomsHistory(userId, callback) {
  if (!isFirebaseConfigured || !db || !userId || userId === 'guest') {
    // Return sample declaration as initial data in offline/guest mode
    callback([
      {
        id: "decl-init-1",
        invoiceNumber: "GIA-EXP-2026-9041",
        date: "25/09/2026",
        importer: "Kgalagadi Mining & Auto Equipment Ltd",
        borderPost: "Tlokweng Border (BWTLK)",
        assessedBwp: 34647.02,
        penaltySaved: 10000,
        fullData: SAMPLE_CUSTOMS_DECLARATION
      }
    ]);
    return () => {};
  }

  // Subscribe to declarations for current user
  const q = query(
    collection(db, "customs_history"),
    where("userId", "==", userId)
  );

  return onSnapshot(q, (snapshot) => {
    const records = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(records);
  }, (error) => {
    // Graceful fallback without noisy errors
    callback([
      {
        id: "decl-init-1",
        invoiceNumber: "GIA-EXP-2026-9041",
        date: "25/09/2026",
        importer: "Kgalagadi Mining & Auto Equipment Ltd",
        borderPost: "Tlokweng Border (BWTLK)",
        assessedBwp: 34647.02,
        penaltySaved: 10000,
        fullData: SAMPLE_CUSTOMS_DECLARATION
      }
    ]);
  });
}

export async function deleteCustomsDeclarationFromFirestore(id) {
  if (!isFirebaseConfigured || !db) return;
  try {
    await deleteDoc(doc(db, "customs_history", id));
  } catch (e) {
    console.warn("Declaration delete warning:", e);
  }
}

// ==========================================
// 2. FRIDAY TENDERS RADAR
// ==========================================

export async function seedInitialTendersIfEmpty() {
  if (!isFirebaseConfigured || !db) return;
  try {
    const snap = await getDocs(collection(db, "tenders"));
    if (snap.empty) {
      for (const tender of INITIAL_TENDERS) {
        await setDoc(doc(db, "tenders", tender.id), {
          ...tender,
          createdAt: serverTimestamp()
        });
      }
    }
  } catch (err) {
    // Silent fail if unauthenticated to avoid console spam
  }
}

export function subscribeTenders(callback) {
  if (!isFirebaseConfigured || !db) {
    callback(INITIAL_TENDERS);
    return () => {};
  }

  return onSnapshot(collection(db, "tenders"), (snapshot) => {
    if (!snapshot || snapshot.empty) {
      callback(INITIAL_TENDERS);
    } else {
      const tenders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(tenders.length > 0 ? tenders : INITIAL_TENDERS);
    }
  }, (err) => {
    // Graceful fallback to initial verified tenders if permission denied
    callback(INITIAL_TENDERS);
  });
}

export async function addTenderToFirestore(tender) {
  if (!isFirebaseConfigured || !db) {
    return tender;
  }
  const docRef = await addDoc(collection(db, "tenders"), {
    ...tender,
    createdAt: serverTimestamp()
  });
  return { ...tender, id: docRef.id };
}

// ==========================================
// 3. USER STARRED TENDERS
// ==========================================

export function subscribeStarredTenderIds(userId, callback) {
  if (!isFirebaseConfigured || !db || !userId) {
    callback([]);
    return () => {};
  }

  const userDocRef = doc(db, "users", userId);
  return onSnapshot(userDocRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback(data.starredTenderIds || []);
    } else {
      callback([]);
    }
  });
}

export async function updateStarredTenderInFirestore(userId, tenderId, isStarred) {
  if (!isFirebaseConfigured || !db || !userId) return;
  try {
    const userDocRef = doc(db, "users", userId);
    const snap = await getDoc(userDocRef);
    let currentStarred = snap.exists() ? (snap.data().starredTenderIds || []) : [];
    
    if (isStarred) {
      if (!currentStarred.includes(tenderId)) {
        currentStarred.push(tenderId);
      }
    } else {
      currentStarred = currentStarred.filter(id => id !== tenderId);
    }

    await setDoc(userDocRef, { starredTenderIds: currentStarred }, { merge: true });
  } catch (err) {
    console.error("Error updating starred tender:", err);
  }
}

// ==========================================
// 4. SUPPORT TICKETS (ADMIN DESK)
// ==========================================

export async function createSupportTicketInFirestore(ticketData) {
  if (!isFirebaseConfigured || !db) {
    return {
      id: "TICK-" + Date.now(),
      ...ticketData,
      status: "Pending Review",
      date: new Date().toISOString().split('T')[0]
    };
  }

  const docRef = await addDoc(collection(db, "support_tickets"), {
    ...ticketData,
    status: ticketData.status || "Pending Review",
    createdAt: serverTimestamp(),
    date: new Date().toISOString().split('T')[0]
  });

  return { ...ticketData, id: docRef.id };
}

export function subscribeSupportTickets(callback) {
  if (!isFirebaseConfigured || !db) {
    callback([]);
    return () => {};
  }

  return onSnapshot(collection(db, "support_tickets"), (snapshot) => {
    if (!snapshot || snapshot.empty) {
      callback([]);
    } else {
      const tickets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(tickets);
    }
  }, (err) => {
    callback([]);
  });
}

export async function updateSupportTicketStatus(ticketId, status) {
  if (!isFirebaseConfigured || !db) return;
  try {
    await updateDoc(doc(db, "support_tickets", ticketId), { status });
  } catch (err) {
    console.warn("Error updating support ticket status:", err);
  }
}

// ==========================================
// 5. CLIENT DIRECTORY & TELEMETRY
// ==========================================

export function subscribeClients(callback) {
  if (!isFirebaseConfigured || !db) {
    callback([]);
    return () => {};
  }

  return onSnapshot(collection(db, "users"), (snapshot) => {
    if (!snapshot || snapshot.empty) {
      callback([]);
    } else {
      const liveClients = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          company: data.company || "Botswana Enterprise",
          domain: data.ppraCode || "Customs Clearing Agent",
          tin: data.tin || "C0000000000",
          representative: data.contactName || "Authorized Representative",
          email: data.email || "",
          phone: data.phone || "",
          plan: data.role === 'admin' ? "Master Operations" : "Verified Account",
          feeBwp: data.role === 'admin' ? 0 : (data.feeBwp || 0),
          invoicesProcessed: data.invoicesProcessed || 0,
          penaltiesPreventedBwp: data.penaltiesPreventedBwp || (data.invoicesProcessed ? data.invoicesProcessed * 10000 : 0),
          status: data.status || "Active",
          createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toLocaleDateString() : (typeof data.createdAt === 'string' ? data.createdAt : "Recent"),
          lastActive: data.lastActive?.toDate?.() ? data.lastActive.toDate().toLocaleDateString() : (typeof data.lastActive === 'string' ? data.lastActive : "Today")
        };
      });
      callback(liveClients);
    }
  }, (err) => {
    callback([]);
  });
}
