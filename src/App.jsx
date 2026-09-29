import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPageView from './components/LandingPageView';
import CustomsParserView from './components/CustomsParserView';
import TenderRadarView from './components/TenderRadarView';
import AccountTrailView from './components/AccountTrailView';
import AdminPanelView from './components/AdminPanelView';
import ContactSection from './components/ContactSection';
import LoginPage from './pages/LoginPage';
import { ProtectedClientRoute, ProtectedAdminRoute } from './components/ProtectedRoute';
import { 
  INITIAL_TENDERS, 
  SAMPLE_CUSTOMS_DECLARATION, 
  INITIAL_CLIENTS, 
  INITIAL_SUPPORT_TICKETS 
} from './data/initialData';
import {
  subscribeCustomsHistory,
  saveCustomsDeclarationToFirestore,
  deleteCustomsDeclarationFromFirestore,
  subscribeTenders,
  addTenderToFirestore,
  updateStarredTenderInFirestore,
  subscribeSupportTickets,
  subscribeClients
} from './firebase/dbService';

function AppContent() {
  const location = useLocation();
  const { currentUser, setCurrentUser, isAdmin } = useAuth();

  // 1. Live Tenders State (synced with Firestore / Initial)
  const [tenders, setTenders] = useState(INITIAL_TENDERS);

  useEffect(() => {
    const unsubscribe = subscribeTenders((data) => {
      if (data && data.length > 0) {
        setTenders(data);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleStarTender = (id) => {
    const targetTender = tenders.find(t => t.id === id);
    const nextStarred = !targetTender?.starred;
    setTenders(prev => prev.map(t => t.id === id ? { ...t, starred: nextStarred } : t));
    if (currentUser?.uid) {
      updateStarredTenderInFirestore(currentUser.uid, id, nextStarred);
    }
  };

  const handleAddTender = async (newTender) => {
    setTenders(prev => [newTender, ...prev]);
    try {
      await addTenderToFirestore(newTender);
    } catch (e) {
      console.warn("Firestore tender write warning:", e);
    }
  };

  // 2. Live Customs Audit History Trail (synced with Firestore for logged-in user)
  const [history, setHistory] = useState([
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

  useEffect(() => {
    if (!currentUser?.uid) return;
    const unsubscribe = subscribeCustomsHistory(currentUser.uid, (data) => {
      if (data && data.length > 0) {
        setHistory(data);
      }
    });
    return () => unsubscribe();
  }, [currentUser?.uid]);

  const handleSaveDeclaration = async (newRecord) => {
    setHistory(prev => [newRecord, ...prev]);
    if (currentUser?.uid) {
      try {
        await saveCustomsDeclarationToFirestore(newRecord, currentUser.uid);
      } catch (e) {
        console.warn("Firestore declaration save warning:", e);
      }
    }
  };

  const handleRemoveHistory = async (id) => {
    setHistory(prev => prev.filter(h => h.id !== id));
    if (currentUser?.uid) {
      try {
        await deleteCustomsDeclarationFromFirestore(id);
      } catch (e) {
        console.warn("Firestore declaration delete warning:", e);
      }
    }
  };

  // 3. Admin Clients Directory & Support Tickets (Strictly real data from Firestore)
  const [clients, setClients] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!isAdmin) return;
    const unsubscribeClients = subscribeClients((data) => {
      setClients(data || []);
    });
    const unsubscribeTickets = subscribeSupportTickets((data) => {
      setTickets(data || []);
    });
    return () => {
      unsubscribeClients();
      unsubscribeTickets();
    };
  }, [isAdmin]);

  const starredTenders = tenders.filter(t => t.starred);
  const pendingTicketsCount = tickets.filter(t => t.status === 'Pending Review').length;

  const isLoginPage = location.pathname === '/login';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {!isLoginPage && (
        <Navbar
          starredCount={starredTenders.length}
          historyCount={history.length}
          pendingTicketsCount={pendingTicketsCount}
        />
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Routes>
          <Route path="/" element={<LandingPageView />} />
          
          <Route path="/customs" element={
            <CustomsParserView onSaveDeclaration={handleSaveDeclaration} />
          } />
          
          <Route path="/tenders" element={
            <TenderRadarView tenders={tenders} onToggleStar={toggleStarTender} />
          } />
          
          <Route path="/workspace" element={
            <ProtectedClientRoute>
              <AccountTrailView
                userProfile={currentUser || { company: "Botswana Client", tin: "C0000000000", contactName: "Representative", email: "", phone: "", ppraCode: "Customs Clearing Agent" }}
                setUserProfile={setCurrentUser}
                history={history}
                onRemoveHistory={handleRemoveHistory}
                starredTenders={starredTenders}
                onToggleStar={toggleStarTender}
              />
            </ProtectedClientRoute>
          } />

          <Route path="/admin" element={
            <ProtectedAdminRoute>
              <AdminPanelView
                clients={clients}
                setClients={setClients}
                tickets={tickets}
                setTickets={setTickets}
                tenders={tenders}
                onAddTender={handleAddTender}
              />
            </ProtectedAdminRoute>
          } />

          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Contact Consultation Section (hidden on login and admin) */}
        {!isLoginPage && !isAdminPage && (
          <ContactSection userProfile={currentUser || {}} />
        )}
      </main>

      {/* Enterprise Footer */}
      {!isLoginPage && (
        <footer className="bg-slate-900 text-slate-400 py-14 border-t border-slate-800 text-xs mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
              <div className="space-y-3 md:col-span-2">
                <span className="text-white font-extrabold text-base tracking-wide flex items-center gap-2">
                  KALAHARI<span className="text-sky-400">.AI</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-950 text-sky-400 border border-sky-800">BW</span>
                </span>
                <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                  The sovereign AI platform engineered for Botswana freight forwarders to prevent the BWP 10,000 BURS pre-lodgment fine, and PPRA contractors to capture Friday Gazette tenders before deadline.
                </p>
                <div className="text-[11px] text-slate-500 font-mono">
                  Sovereign Architecture &bull; Section 74 DPA 2018 Certified
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Operating Tracks</h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <a href="/customs" className="hover:text-white transition">BURS SAD 500 Customs Engine</a>
                  </li>
                  <li>
                    <a href="/tenders" className="hover:text-white transition">Friday Government Gazette Radar</a>
                  </li>
                  <li>
                    <a href="/workspace" className="hover:text-white transition">Client Consignment Vault</a>
                  </li>
                  <li>
                    <a href="#contact-section" className="hover:text-white transition">Enterprise Pilot Consultation</a>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Lead Architect &amp; Desk</h4>
                <div className="space-y-1 text-xs text-slate-300">
                  <div className="font-bold text-white">Gift Jr Letso Nakedi</div>
                  <div>
                    <a href="tel:+26772161038" className="hover:text-sky-400 transition font-mono">+267 72161038</a>
                  </div>
                  <div>
                    <a href="mailto:gnakedi@bloodchain.life" className="hover:text-sky-400 transition">gnakedi@bloodchain.life</a>
                  </div>
                  <div>
                    <a href="mailto:taylith338@gmail.com" className="text-slate-400 hover:text-sky-400 transition text-[11px]">taylith338@gmail.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-500">
              <p>&copy; {new Date().getFullYear()} Kalahari.ai &bull; Republic of Botswana. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <span>Gaborone, Botswana</span>
                {isAdmin && (
                  <Link to="/admin" className="text-slate-600 hover:text-slate-300 transition border-l border-slate-800 pl-4">
                    Operations Desk
                  </Link>
                )}
              </div>
            </div>

          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
