import React, { useState } from 'react';
import { 
  ShieldCheck, Users, MessageSquare, DollarSign, Activity, 
  CheckCircle2, Send, Mail, Plus, RefreshCw, 
  ChevronRight, Database, FileText
} from 'lucide-react';
import { updateSupportTicketStatus } from '../firebase/dbService';

export default function AdminPanelView({ 
  clients = [], 
  tickets = [], setTickets, 
  tenders = [], onAddTender 
}) {
  const [adminTab, setAdminTab] = useState('overview'); // 'overview' | 'support' | 'clients' | 'ingestion'
  const [ticketFilter, setTicketFilter] = useState('ALL');

  // Form state for publishing authentic tenders
  const [showTenderForm, setShowTenderForm] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccessMsg, setPublishSuccessMsg] = useState('');
  const [tenderForm, setTenderForm] = useState({
    tender_number: '',
    procuring_entity: '',
    tender_title: '',
    industry_category: 'Civil Engineering / Roads',
    ppra_code: 'Code 03',
    ppra_details: '',
    citizen_reservation: '100% Citizen Owned',
    closing_date: '',
    closing_display: '',
    tender_fee_bwp: 'Free',
    bid_security_bwp: 'None',
    submission_venue: 'Fairgrounds Office Park, Gaborone'
  });

  // KPI calculations strictly derived from live collections with zero hardcoded mock offsets
  const payingClients = (clients || []).filter(c => c.status === 'Active' && c.plan !== 'Master Operations' && (c.feeBwp || 0) > 0);
  const totalMRR = payingClients.reduce((acc, c) => acc + (c.feeBwp || 0), 0);
  const totalPenaltiesAvoided = (clients || []).reduce((acc, c) => acc + (c.penaltiesPreventedBwp || 0), 0);
  const totalInvoices = (clients || []).reduce((acc, c) => acc + (c.invoicesProcessed || 0), 0);
  const pendingTickets = (tickets || []).filter(t => t.status === 'Pending Review').length;

  const updateTicketStatus = (ticketId, newStatus) => {
    if (setTickets) {
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
    }
    updateSupportTicketStatus(ticketId, newStatus);
  };

  const filteredTickets = (tickets || []).filter(t => {
    if (ticketFilter === 'ALL') return true;
    return t.status === ticketFilter;
  });

  const handleTenderInputChange = (e) => {
    const { name, value } = e.target;
    setTenderForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePublishTender = async (e) => {
    e.preventDefault();
    if (!tenderForm.tender_number || !tenderForm.tender_title || !tenderForm.procuring_entity) {
      alert("Please enter Tender Number, Procuring Entity, and Tender Title.");
      return;
    }

    setIsPublishing(true);
    const newTenderObj = {
      id: "tend-" + Date.now(),
      tender_number: tenderForm.tender_number.trim(),
      procuring_entity: tenderForm.procuring_entity.trim(),
      tender_title: tenderForm.tender_title.trim(),
      industry_category: tenderForm.industry_category,
      ppra_code: tenderForm.ppra_code,
      ppra_details: tenderForm.ppra_details || `${tenderForm.ppra_code} Verified`,
      citizen_reservation: tenderForm.citizen_reservation,
      site_meeting: { held: false, compulsory: false, date_time: 'N/A', location: 'N/A' },
      closing_date: tenderForm.closing_date || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      closing_display: tenderForm.closing_display || 'Refer to Tender Document',
      tender_fee_bwp: tenderForm.tender_fee_bwp || 'Free',
      bid_security_bwp: tenderForm.bid_security_bwp || 'None',
      submission_venue: tenderForm.submission_venue || 'Gaborone, Botswana',
      starred: false
    };

    if (onAddTender) {
      await onAddTender(newTenderObj);
    }

    setIsPublishing(false);
    setPublishSuccessMsg(`Tender ${newTenderObj.tender_number} published successfully to public radar feed.`);
    setShowTenderForm(false);
    setTenderForm({
      tender_number: '',
      procuring_entity: '',
      tender_title: '',
      industry_category: 'Civil Engineering / Roads',
      ppra_code: 'Code 03',
      ppra_details: '',
      citizen_reservation: '100% Citizen Owned',
      closing_date: '',
      closing_display: '',
      tender_fee_bwp: 'Free',
      bid_security_bwp: 'None',
      submission_venue: 'Fairgrounds Office Park, Gaborone'
    });

    setTimeout(() => {
      setPublishSuccessMsg('');
    }, 6000);
  };

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
            Clients ({(clients || []).length})
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
          {/* Live Firebase Telemetry Banner */}
          <div className="p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-emerald-50 border-emerald-200 text-emerald-900">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-emerald-600 text-white">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold flex items-center gap-2">
                  <span>Cloud Database &amp; Auth:</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold bg-emerald-200 text-emerald-900">
                    kalahari-77856 &bull; Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Cloud Firestore and Firebase Auth are synchronizing customs filings, Friday tenders, and support tickets in real-time.
                </p>
              </div>
            </div>
            <span className="font-mono text-[11px] bg-white/80 px-2.5 py-1 rounded-lg border border-emerald-300 text-emerald-800 shrink-0 font-bold">
              Project: kalahari-77856
            </span>
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
                <span>{payingClients.length} Active Paying {payingClients.length === 1 ? 'Account' : 'Accounts'}</span>
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
                {totalPenaltiesAvoided > 0 ? "P10,000 saved per pre-lodged truck" : "Real-time BURS pre-lodgment defense"}
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
                {totalInvoices > 0 ? `${totalInvoices} compliant SAD 500 declarations generated` : "Awaiting client consignment uploads"}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Support Tickets</span>
                <MessageSquare className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-3xl font-extrabold text-slate-900 font-mono">
                {(tickets || []).length}
              </div>
              <div className={`text-xs font-semibold ${pendingTickets > 0 ? 'text-amber-700' : 'text-emerald-700'}`}>
                {pendingTickets > 0 ? `${pendingTickets} awaiting response` : "All client inquiries answered"}
              </div>
            </div>
          </div>

          {/* Operational Status & Telemetry Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">Cloud &amp; Regulatory Telemetry</h3>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  OPERATIONAL &bull; LIVE SYNC
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">Primary Cloud Platform</span>
                  <strong className="text-slate-800 text-sm font-mono">Firebase / Firestore</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">Authentication Engine</span>
                  <strong className="text-slate-800 text-sm font-mono">Firebase Auth</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">Customs Engine</span>
                  <strong className="text-emerald-700 text-sm font-bold">BURS SAD 500 Parser</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">BURS Exchange Rate</span>
                  <strong className="text-slate-800 text-sm font-mono">1 ZAR = 0.7420 BWP</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">Monitored SADC Borders</span>
                  <strong className="text-slate-800 text-sm">Tlokweng, Pioneer Gate</strong>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-medium">Botswana DPA Status</span>
                  <strong className="text-emerald-700 text-sm font-bold">Section 74 Compliant</strong>
                </div>
              </div>

              <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200/80 text-xs text-sky-950 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Sovereign Privacy Guarantee:</strong> Every customs invoice and tender document is processed under strict zero-leakage enterprise governance. No corporate trade secrets or Omang national IDs are exposed without explicit client authorization.
                </p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h3 className="text-base font-bold text-white">Administrator Quick Actions</h3>
                <p className="text-xs text-slate-400">Direct shortcuts to dispatch operations and review incoming user queries.</p>
                
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
                    onClick={() => {
                      setAdminTab('ingestion');
                      setShowTenderForm(true);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white flex items-center justify-between transition"
                  >
                    <span>Publish Government Gazette Tender</span>
                    <Plus className="w-4 h-4" />
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
              <p className="text-xs text-slate-500">Inbound consultation requests and support inquiries submitted from the web portal.</p>
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
              <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200 text-xs space-y-2">
                <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-semibold text-slate-600">
                  No support tickets found {ticketFilter !== 'ALL' ? `under "${ticketFilter}"` : 'in inbox'}
                </p>
                <p className="text-[11px] text-slate-400">
                  Inbound consultation inquiries and client assistance requests submitted from the portal contact form will appear here in real time.
                </p>
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
                          {t.priority || 'Normal'} Priority
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400">{t.id}</span>
                        <span className="text-xs text-slate-400">&bull; {t.date || t.createdAt || 'Recent'}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 leading-snug">{t.topic || t.subject || 'Platform Consultation'}</h4>
                      <p className="text-xs font-semibold text-sky-700">
                        {t.clientName || t.name || 'Anonymous User'} &bull; {t.company || 'Enterprise'} {t.service ? `(${t.service})` : ''}
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
                      {t.phone && <span>Phone: <strong className="text-slate-800">{t.phone}</strong></span>}
                      {t.email && <span>Email: <strong className="text-slate-800">{t.email}</strong></span>}
                    </div>

                    <div className="flex items-center gap-2">
                      {t.phone && (
                        <a
                          href={`https://wa.me/${t.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(t.clientName || 'there')}%2C%20Gift%20Nakedi%20here%20from%20Kalahari.ai%20regarding%20your%20inquiry%20on%20${encodeURIComponent(t.topic || 'Kalahari.ai services')}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Reply on WhatsApp</span>
                        </a>
                      )}

                      {t.email && (
                        <a
                          href={`mailto:${t.email}?subject=Kalahari.ai Support: ${encodeURIComponent(t.topic || 'Inquiry')}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition"
                        >
                          <Mail className="w-3.5 h-3.5 text-sky-400" />
                          <span>Send Email</span>
                        </a>
                      )}
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
              <p className="text-xs text-slate-500">Live directory of registered users and corporate accounts in Firestore.</p>
            </div>
            <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
              Total Contracted MRR: <strong className="text-slate-900 font-mono">BWP {totalMRR.toLocaleString()}</strong>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            {(clients || []).length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs space-y-2">
                <Users className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="font-semibold text-slate-600">No client accounts registered yet</p>
                <p className="text-[11px] text-slate-400">
                  New user accounts created via email signup or Google Auth will automatically appear here with their live usage statistics.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                      <th className="py-3.5 px-5">Company / User</th>
                      <th className="py-3.5 px-5">BURS TIN / Domain</th>
                      <th className="py-3.5 px-5">Representative</th>
                      <th className="py-3.5 px-5">Active Plan</th>
                      <th className="py-3.5 px-5">Monthly Fee</th>
                      <th className="py-3.5 px-5">Invoices / ROI</th>
                      <th className="py-3.5 px-5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(clients || []).map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-4 px-5">
                          <strong className="text-slate-900 block font-bold text-sm">{c.company}</strong>
                          <span className="text-[11px] text-slate-400">{c.domain}</span>
                        </td>
                        <td className="py-4 px-5 font-mono text-slate-600">{c.tin || 'N/A'}</td>
                        <td className="py-4 px-5">
                          <span className="font-semibold text-slate-800 block">{c.representative}</span>
                          <span className="text-slate-400 text-[11px]">{c.email} {c.phone ? `• ${c.phone}` : ''}</span>
                        </td>
                        <td className="py-4 px-5 font-semibold text-slate-700">{c.plan}</td>
                        <td className="py-4 px-5 font-mono font-bold text-slate-900">
                          {c.feeBwp > 0 ? `BWP ${c.feeBwp.toLocaleString()}` : 'Free Plan'}
                        </td>
                        <td className="py-4 px-5">
                          {c.invoicesProcessed > 0 ? (
                            <div>
                              <span className="font-bold text-slate-800">{c.invoicesProcessed} filings</span>
                              <span className="block text-[10px] text-emerald-700 font-bold">+P {(c.penaltiesPreventedBwp || 0).toLocaleString()} saved</span>
                            </div>
                          ) : (
                            <span className="text-slate-400">Portal User</span>
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
            )}
          </div>
        </div>
      )}

      {/* TAB 4: GAZETTE INGESTION & TENDER PUBLISHER */}
      {adminTab === 'ingestion' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Government Gazette Tender Publisher</h3>
                <p className="text-xs text-slate-500">Publish and distribute verified government notices directly into the live radar feed.</p>
              </div>
              <button
                onClick={() => setShowTenderForm(!showTenderForm)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-500 transition shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>{showTenderForm ? "Hide Publisher Form" : "Publish New Official Tender"}</span>
              </button>
            </div>

            {publishSuccessMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-950 border border-emerald-200 text-xs font-medium flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{publishSuccessMsg}</span>
              </div>
            )}

            {/* Ingestion & Feed Telemetry */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Official Release Schedule</span>
                <strong className="text-slate-800 text-sm">Every Friday @ 15:00 CAT</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Active Radar Feed Tenders</span>
                <strong className="text-slate-800 text-sm font-mono">{(tenders || []).length} in Public Feed</strong>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Broadcast Audience Reach</span>
                <strong className="text-emerald-700 text-sm">{(clients || []).length} Registered Accounts</strong>
              </div>
            </div>

            {/* Tender Creation Form */}
            {showTenderForm && (
              <form onSubmit={handlePublishTender} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-600" />
                    <span>Publish Tender Notice into Live Database</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">Live Firestore Write</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tender Number *</label>
                    <input
                      type="text"
                      name="tender_number"
                      value={tenderForm.tender_number}
                      onChange={handleTenderInputChange}
                      placeholder="e.g. MTPW/RRD/092/2026"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Procuring Entity *</label>
                    <input
                      type="text"
                      name="procuring_entity"
                      value={tenderForm.procuring_entity}
                      onChange={handleTenderInputChange}
                      placeholder="e.g. Ministry of Transport & Public Works"
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Industry / Category</label>
                    <select
                      name="industry_category"
                      value={tenderForm.industry_category}
                      onChange={handleTenderInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                    >
                      <option value="Civil Engineering / Roads">Civil Engineering / Roads</option>
                      <option value="ICT & Systems">ICT &amp; Systems</option>
                      <option value="Water & Drilling">Water &amp; Drilling</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Medical & Healthcare">Medical &amp; Healthcare</option>
                      <option value="Waste Management">Waste Management</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block font-semibold text-slate-700 mb-1">Tender Title &amp; Scope *</label>
                    <textarea
                      name="tender_title"
                      value={tenderForm.tender_title}
                      onChange={handleTenderInputChange}
                      placeholder="e.g. Proposed construction and rehabilitation of 42km feeder road including culvert upgrades..."
                      rows={2}
                      required
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">PPRA Code &amp; Details</label>
                    <input
                      type="text"
                      name="ppra_code"
                      value={tenderForm.ppra_code}
                      onChange={handleTenderInputChange}
                      placeholder="e.g. Code 03 (Sub-code 01, Grade E)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Citizen Reservation</label>
                    <input
                      type="text"
                      name="citizen_reservation"
                      value={tenderForm.citizen_reservation}
                      onChange={handleTenderInputChange}
                      placeholder="e.g. 100% Citizen Owned"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Closing Date</label>
                    <input
                      type="date"
                      name="closing_date"
                      value={tenderForm.closing_date}
                      onChange={handleTenderInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowTenderForm(false)}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isPublishing}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-500 transition shadow-sm flex items-center gap-2"
                  >
                    {isPublishing ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Publishing to Cloud...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Publish Tender</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* List of Published Tenders preview */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Recent Public Feed Tenders</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                {(tenders || []).slice(0, 5).map((t) => (
                  <div key={t.id} className="p-4 hover:bg-slate-50 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sky-700">{t.tender_number}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 font-semibold">{t.ppra_code}</span>
                      </div>
                      <h5 className="font-bold text-slate-900 mt-1 line-clamp-1">{t.tender_title}</h5>
                      <p className="text-[11px] text-slate-500">{t.procuring_entity}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] text-slate-400 block">Closing: {t.closing_date}</span>
                      <span className="text-[10px] font-bold text-emerald-700">{t.citizen_reservation}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
