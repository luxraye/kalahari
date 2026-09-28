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
  serverTimestamp
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
  return { ...docData, id: docRef.id };
}

export function subscribeCustomsHistory(userId, callback) {
  if (!isFirebaseConfigured || !db) {
    // Return sample declaration as initial data in offline mode
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

  // Subscribe to declarations for current user or all if admin
  const q = query(
    collection(db, "customs_history"),
    where("userId", "in", [userId || 'guest', 'guest'])
  );

  return onSnapshot(q, (snapshot) => {
    const records = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(records);
  }, (error) => {
    console.warn("Firestore customs_history subscription error:", error);
  });
}

export async function deleteCustomsDeclarationFromFirestore(id) {
  if (!isFirebaseConfigured || !db) return;
  try {
    await deleteDoc(doc(db, "customs_history", id));
  } catch (e) {
    console.error("Error deleting declaration from Firestore:", e);
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
      console.log("Seeding initial Friday Tenders into Firestore...");
      for (const tender of INITIAL_TENDERS) {
        await setDoc(doc(db, "tenders", tender.id), {
          ...tender,
          createdAt: serverTimestamp()
        });
      }
    }
  } catch (err) {
    console.warn("Could not seed tenders to Firestore:", err);
  }
}

export function subscribeTenders(callback) {
  if (!isFirebaseConfigured || !db) {
    callback(INITIAL_TENDERS);
    return () => {};
  }

  return onSnapshot(collection(db, "tenders"), (snapshot) => {
    if (snapshot.empty) {
      seedInitialTendersIfEmpty();
      callback(INITIAL_TENDERS);
    } else {
      const tenders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(tenders);
    }
  }, (err) => {
    console.warn("Firestore tenders listener error, falling back to local:", err);
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
    callback(INITIAL_SUPPORT_TICKETS);
    return () => {};
  }

  return onSnapshot(collection(db, "support_tickets"), (snapshot) => {
    if (snapshot.empty) {
      callback(INITIAL_SUPPORT_TICKETS);
    } else {
      const tickets = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(tickets);
    }
  }, (err) => {
    console.warn("Firestore support tickets listener error:", err);
    callback(INITIAL_SUPPORT_TICKETS);
  });
}

export async function updateSupportTicketStatus(ticketId, status) {
  if (!isFirebaseConfigured || !db) return;
  try {
    await updateDoc(doc(db, "support_tickets", ticketId), { status });
  } catch (err) {
    console.error("Error updating support ticket status:", err);
  }
}

// ==========================================
// 5. CLIENT DIRECTORY & TELEMETRY
// ==========================================

export function subscribeClients(callback) {
  if (!isFirebaseConfigured || !db) {
    callback(INITIAL_CLIENTS);
    return () => {};
  }

  return onSnapshot(collection(db, "users"), (snapshot) => {
    if (snapshot.empty) {
      callback(INITIAL_CLIENTS);
    } else {
      const clients = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.company || "Botswana Client",
          tin: data.tin || "C0000000000",
          plan: data.role === 'admin' ? "Master Admin" : "Enterprise Retainer",
          fee: data.role === 'admin' ? "BWP 0/mo" : "BWP 4,500/mo",
          status: "Active",
          email: data.email || "",
          phone: data.phone || "+267 71234567",
          borderPost: "Tlokweng / Pioneer Gate",
          contactPerson: data.contactName || "Representative"
        };
      });
      // Combine with initial demo clients if few
      callback(clients.length > 0 ? clients : INITIAL_CLIENTS);
    }
  }, (err) => {
    console.warn("Firestore clients listener error:", err);
    callback(INITIAL_CLIENTS);
  });
}
