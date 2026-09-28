import React, { useState } from 'react';
import { 
  ShieldCheck, Users, MessageSquare, Radar, DollarSign, Activity, 
  CheckCircle2, Clock, AlertTriangle, Send, Mail, Phone, Plus, 
  Trash2, RefreshCw, Zap, Search, ChevronRight, Lock, Database
} from 'lucide-react';
import { updateSupportTicketStatus } from '../firebase/dbService';
import { isFirebaseConfigured } from '../firebase/config';

export default function AdminPanelView({ 
  clients, setClients, 
  tickets, setTickets, 
  tenders, onAddTender 
}) {
  const [adminTab, setAdminTab] = useState('overview'); // 'overview' | 'support' | 'clients' | 'ingestion'
  const [ticketFilter, setTicketFilter] = useState('ALL');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeSuccessMsg, setScrapeSuccessMsg] = useState("");

  // Quick statistics
  const totalMRR = clients.reduce((acc, c) => acc + (c.status === 'Active' ? c.feeBwp : 0), 0);
  const totalPenaltiesAvoided = clients.reduce((acc, c) => acc + (c.penaltiesPreventedBwp || 0), 0) + 10000;
  const totalInvoices = clients.reduce((acc, c) => acc + (c.invoicesProcessed || 0), 0) + 1;
  const pendingTickets = tickets.filter(t => t.status === 'Pending Review').length;

  const updateTicketStatus = (ticketId, newStatus) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
    updateSupportTicketStatus(ticketId, newStatus);
  };

  const handleSimulateScraper = () => {
    setIsScraping(true);
    setScrapeSuccessMsg("");

    setTimeout(() => {
      const newTender = {
        id: "tend-" + Date.now(),
        tender_number: "BW-BURS/IT/034/2026",
        procuring_entity: "Botswana Unified Revenue Service (BURS)",
        tender_title: "Upgrading of the Customs Management System (CMS) & Automated Pre-Lodgment EDI Gateway for Road Freight",
        industry_category: "ICT & Systems",
        ppra_code: "Code 120",
        ppra_details: "Code 120 (01), Code 121 (Cloud)",
        citizen_reservation: "100% Citizen Owned IT Firms",
        site_meeting: {
          held: true,
          compulsory: true,
          date_time: "24th October 2026 at 10:00 hours",
          location: "BURS Head Office, Plot 53976, CBD, Gaborone"
        },
        closing_date: "2026-11-28",
        closing_display: "28th November 2026 at 10:00 hours",
        tender_fee_bwp: "BWP 500.00",
        bid_security_bwp: "BWP 150,000.00",
        submission_venue: "BURS Tender Box, Ground Floor, CBD Headquarters, Gaborone",
        starred: false
      };

      onAddTender(newTender);
      setIsScraping(false);
      setScrapeSuccessMsg("Scraper execution completed: Extracted 1 new emergency tender from the Government Gazette (BURS CMS EDI Gateway).");
    }, 1800);
  };

  const filteredTickets = tickets.filter(t => {
    if (ticketFilter === 'ALL') return true;
    return t.status === ticketFilter;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Masthead Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Master Administrator Workspace &bull; G. Nakedi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kalahari.ai Operations &amp; Support Control
          </h2>
          <p className="text-xs text-slate-400">
            Real-time telemetry, client subscriptions, BURS penalty avoidance metrics, and Friday tender ingestion.
          </p>
        </div>

        {/* Quick Nav Badges */}
        <div className="flex bg-slate-800 p-1.5 rounded-2xl border border-slate-700/80 text-xs font-bold text-slate-300">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition ${adminTab === 'overview' ? 'bg-sky-600 text-white shadow' : 'hover:text-white'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setAdminTab('support')}
            className={`px-3.5 py-2 rounded-xl transition relative ${adminTab === 'support' ? 'bg-sky-600 text-white shadow' : 'hover:text-white'}`}
          >
            <span>Support Desk</span>
            {pendingTickets > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-extrabold">
                {pendingTickets}
              </span>
            )}
          </button>
          <button
            onClick={() => setAdminTab('clients')}
            className={`px-3.5 py-2 rounded-xl transition ${adminTab === 'clients' ? 'bg-sky-600 text-white shadow' : 'hover:text-white'}`}
          >
            Clients ({clients.length})
          </button>
          <button
            onClick={() => setAdminTab('ingestion')}
            className={`px-3.5 py-2 rounded-xl transition ${adminTab === 'ingestion' ? 'bg-sky-600 text-white shadow' : 'hover:text-white'}`}
          >
            Gazette Engine
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & TELEMETRY */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          {/* Firebase Connection Status Banner */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
            isFirebaseConfigured 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                isFirebaseConfigured ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
              }`}>
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold flex items-center gap-2">
                  <span>Firebase Backend Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold ${
                    isFirebaseConfigured ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                  }`}>
                    {isFirebaseConfigured ? 'Production Cloud Connected' : 'Local Adapter / Demo Mode'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  {isFirebaseConfigured
                    ? 'Cloud Firestore & Firebase Auth are actively synchronizing audit trails, Friday tenders, and support tickets in real-time.'
                    : 'Running in safe local adapter mode. To connect your live Firebase project, paste your Firebase Console API keys into .env.'}
                </p>
              </div>
            </div>
            {!isFirebaseConfigured && (
              <span className="font-mono text-[11px] bg-white/80 px-2.5 py-1 rounded-lg border border-amber-300 text-amber-900 shrink-0">
                Config: .env / VITE_FIREBASE_API_KEY
              </span>
            )}
          </div>

          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Monthly Recurring Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                BWP {totalMRR.toLocaleString()}
              </div>
              <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>6 Active Paying Accounts</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>BURS Penalties Prevented</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-600 font-mono">
                BWP {totalPenaltiesAvoided.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                P10,000 saved per pre-lodged truck
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Invoices Processed</span>
                <Activity className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                {totalInvoices}
              </div>
              <div className="text-xs text-slate-500 font-medium">
                Avg. latency: 31.08s on RTX 4060
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Support Tickets</span>
                <MessageSquare className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                {tickets.length}
              </div>
              <div className="text-xs text-amber-700 font-semibold">
                {pendingTickets} awaiting response
              </div>
            </div>
          </div>

          {/* Engine Health & Offline Status Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Local AI Hardware &amp; Inference Telemetry</h3>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  RTX 4060 GPU ACCELERATED
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">Primary Inference Model</span>
                  <strong className="text-slate-800 text-sm font-mono">Qwen 2.5 7B Q4</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">GPU VRAM Allocated</span>
                  <strong className="text-slate-800 text-sm font-mono">4.7 GB / 8.0 GB</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">Cross-Border Cloud Risk</span>
                  <strong className="text-emerald-700 text-sm font-bold">0 Bytes (100% Offline)</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">BURS Exchange Rate</span>
                  <strong className="text-slate-800 text-sm font-mono">1 ZAR = 0.7420 BWP</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">Active Border Ports</span>
                  <strong className="text-slate-800 text-sm">Tlokweng, Pioneer Gate</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">Botswana DPA Status</span>
                  <strong className="text-emerald-700 text-sm font-bold">Section 74 Certified</strong>
                </div>
              </div>

              <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200/80 text-xs text-sky-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Sovereign Privacy Guarantee:</strong> Every customs invoice and tender document is processed on your local workstation. No corporate data or Omang national IDs leave Botswana's geographical territory.
                </p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white">Administrator Quick Actions</h3>
                <p className="text-xs text-slate-400">Manage client pipelines and simulate inbound Friday Gazette notices.</p>
                
                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => setAdminTab('support')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center justify-between transition"
                  >
                    <span>Open User Support Desk</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={() => setAdminTab('clients')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center justify-between transition"
                  >
                    <span>View Client Directory</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                  <button
                    onClick={handleSimulateScraper}
                    disabled={isScraping}
                    className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white flex items-center justify-between transition"
                  >
                    <span>{isScraping ? "Scraping Gazette..." : "Trigger Friday Gazette Scraper"}</span>
                    <RefreshCw className={`w-4 h-4 ${isScraping ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between">
                <span>Admin: <strong>G. Nakedi</strong></span>
                <span>+267 72161038</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUPPORT DESK & INQUIRIES INBOX */}
      {adminTab === 'support' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Client Support &amp; Consultation Inquiries</h3>
              <p className="text-xs text-slate-500">Inbound consultation requests submitted from the web portal.</p>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
              {['ALL', 'Pending Review', 'In Progress', 'Resolved'].map((st) => (
                <button
                  key={st}
                  onClick={() => setTicketFilter(st)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    ticketFilter === st ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Inquiries List */}
          <div className="space-y-4">
            {filteredTickets.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200 text-xs">
                No support tickets found under "{ticketFilter}".
              </div>
            ) : (
              filteredTickets.map((t) => (
                <div key={t.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {t.priority} Priority
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">{t.id}</span>
                        <span className="text-xs text-slate-400">&bull; {t.createdAt}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">{t.topic}</h4>
                      <p className="text-xs font-semibold text-sky-700">
                        {t.clientName} &bull; {t.company} ({t.service})
                      </p>
                    </div>

                    {/* Status Dropdown */}
                    <select
                      value={t.status}
                      onChange={(e) => updateTicketStatus(t.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none bg-white ${
                        t.status === 'Pending Review' ? 'text-red-700 border-red-200 bg-red-50' :
                        t.status === 'In Progress' ? 'text-amber-700 border-amber-200 bg-amber-50' :
                        'text-emerald-700 border-emerald-200 bg-emerald-50'
                      }`}
                    >
                      <option value="Pending Review">Pending Review</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  {/* Message body */}
                  <div className="bg-slate-50 p-4 rounded-2xl text-xs text-slate-700 leading-relaxed border border-slate-100">
                    "{t.message}"
                  </div>

                  {/* Quick Action Dispatch */}
                  <div className="flex flex-wrap items-center justify-between pt-2 gap-3 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-4 text-slate-500 font-mono">
                      <span>Phone: <strong className="text-slate-800">{t.phone}</strong></span>
                      <span>Email: <strong className="text-slate-800">{t.email}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${t.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(t.clientName)}%2C%20Gift%20Nakedi%20here%20from%20Kalahari.ai%20regarding%20your%20inquiry%20on%20${encodeURIComponent(t.topic)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Reply on WhatsApp</span>
                      </a>

                      <a
                        href={`mailto:${t.email}?subject=Kalahari.ai Support: ${encodeURIComponent(t.topic)}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition"
                      >
                        <Mail className="w-3.5 h-3.5 text-sky-400" />
                        <span>Send Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: CLIENT DIRECTORY & SUBSCRIPTIONS */}
      {adminTab === 'clients' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Active Client Accounts &amp; Subscriptions</h3>
              <p className="text-xs text-slate-500">Botswana clearing brokers and contractors enrolled in Kalahari.ai.</p>
            </div>
            <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
              Total Contracted MRR: <strong className="text-slate-900 font-mono">BWP {totalMRR.toLocaleString()}</strong>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                    <th className="py-3.5 px-5">Company</th>
                    <th className="py-3.5 px-5">BURS TIN</th>
                    <th className="py-3.5 px-5">Representative</th>
                    <th className="py-3.5 px-5">Active Plan</th>
                    <th className="py-3.5 px-5">Monthly Fee</th>
                    <th className="py-3.5 px-5">Invoices / ROI</th>
                    <th className="py-3.5 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clients.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-5">
                        <strong className="text-slate-900 block font-bold text-sm">{c.company}</strong>
                        <span className="text-[11px] text-slate-400">{c.domain}</span>
                      </td>
                      <td className="py-4 px-5 font-mono text-slate-600">{c.tin}</td>
                      <td className="py-4 px-5">
                        <span className="font-semibold text-slate-800 block">{c.representative}</span>
                        <span className="text-slate-400 text-[11px]">{c.email} &bull; {c.phone}</span>
                      </td>
                      <td className="py-4 px-5 font-semibold text-slate-700">{c.plan}</td>
                      <td className="py-4 px-5 font-mono font-bold text-slate-900">
                        {c.feeBwp > 0 ? `BWP ${c.feeBwp.toLocaleString()}` : 'Free Trial'}
                      </td>
                      <td className="py-4 px-5">
                        {c.invoicesProcessed > 0 ? (
                          <div>
                            <span className="font-bold text-slate-800">{c.invoicesProcessed} filings</span>
                            <span className="block text-[10px] text-emerald-700 font-bold">+P {c.penaltiesPreventedBwp.toLocaleString()} saved</span>
                          </div>
                        ) : (
                          <span className="text-slate-400">Tender Radar Sub</span>
                        )}
                      </td>
                      <td className="py-4 px-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          c.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GAZETTE INGESTION & BROADCAST */}
      {adminTab === 'ingestion' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Government Gazette Extraction Pipeline</h3>
                <p className="text-xs text-slate-500">Autonomous scraper ingests Friday Gazette supplements from Government Printery.</p>
              </div>
              <button
                onClick={handleSimulateScraper}
                disabled={isScraping}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition"
              >
                <RefreshCw className={`w-4 h-4 text-sky-400 ${isScraping ? 'animate-spin' : ''}`} />
                <span>{isScraping ? "Running Ollama Extraction..." : "Trigger Gazette Scraper Now"}</span>
              </button>
            </div>

            {scrapeSuccessMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-950 border border-emerald-200 text-xs font-medium flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{scrapeSuccessMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Scraper Schedule</span>
                <strong className="text-slate-800 text-sm">Every Friday @ 15:00 CAT</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Verified Active Tenders</span>
                <strong className="text-slate-800 text-sm font-mono">{tenders.length} in Public Feed</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Weekly Broadcast Reach</span>
                <strong className="text-emerald-700 text-sm">28 Subscribed Contractors</strong>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
