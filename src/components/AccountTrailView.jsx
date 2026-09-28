import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Building, FileCheck, Star, ShieldCheck, Download, Trash2, 
  Edit3, Save, CheckCircle2, History, AlertCircle, ArrowRight,
  FileSpreadsheet, Radar, Check
} from 'lucide-react';
import { exportCustomsDeclarationExcel, exportTendersExcel } from '../utils/excelExport';

export default function AccountTrailView({ 
  userProfile = {}, 
  setUserProfile, 
  history = [], 
  onRemoveHistory, 
  starredTenders = [], 
  onToggleStar 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState(userProfile);
  const [activeSubTab, setActiveSubTab] = useState('customs_history');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (setUserProfile) {
      setUserProfile(profileForm);
    }
    setIsEditing(false);
  };

  const totalPenaltiesSaved = (history || []).reduce((sum, h) => sum + (h.penaltySaved || 10000), 0);
  const totalTaxesAssessed = (history || []).reduce((sum, h) => sum + (h.assessedBwp || 0), 0);

  const handleDownloadSavedTenders = () => {
    exportTendersExcel(starredTenders, "My_Starred_Botswana_Tenders.xlsx");
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Workspace Masthead */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Private Client Workspace &bull; BURS Compliance Vault</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {userProfile.company || "Enterprise Client Workspace"}
          </h2>
          <p className="text-xs text-slate-400">
            Organized customs declarations, BURS tax assessment history, and starred Friday tenders.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-bold text-slate-200 transition shadow-sm"
        >
          {isEditing ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Edit3 className="w-3.5 h-3.5 text-sky-400" />}
          <span>{isEditing ? "Close Profile Editor" : "Edit Company Profile"}</span>
        </button>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Company TIN</div>
          <div className="text-xl font-extrabold text-slate-900 font-mono truncate">
            {userProfile.tin || "Pending Registration"}
          </div>
          <div className="text-xs text-slate-400 truncate">
            Rep: {userProfile.contactName || "Authorized Agent"}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">BURS Penalties Prevented</div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono">
            BWP {totalPenaltiesSaved.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            P10,000 per compliant pre-lodged entry
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Processed Invoices</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {(history || []).length}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Available for instant audit re-download
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Starred Tenders</div>
          <div className="text-2xl font-extrabold text-amber-500 font-mono">
            {(starredTenders || []).length}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Tracked in your Friday radar
          </div>
        </div>

      </div>

      {/* Profile Editor Card (collapsible) */}
      {isEditing && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 animate-in fade-in duration-150">
          <div className="pb-3 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-slate-900">Company &amp; BURS Profile Settings</h3>
              <p className="text-xs text-slate-500">Auto-populates onto generated BURS SAD 500 schedules.</p>
            </div>
            <span className="text-xs font-mono font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg">
              Active Client Profile
            </span>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-3xl pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Broker Name</label>
                <input
                  type="text"
                  value={profileForm.company || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">BURS TIN / Tax ID</label>
                <input
                  type="text"
                  value={profileForm.tin || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, tin: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none font-mono"
                  placeholder="e.g. C0981248101"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Authorized Contact Representative</label>
                <input
                  type="text"
                  value={profileForm.contactName || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, contactName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email Address</label>
                <input
                  type="email"
                  value={profileForm.email || ''}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary PPRA Domain</label>
              <select
                value={profileForm.ppraCode || 'Customs Clearing Agent'}
                onChange={(e) => setProfileForm({ ...profileForm, ppraCode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none bg-white font-medium"
              >
                <option value="Customs Clearing Agent">Customs Clearing Agent / Freight Forwarder</option>
                <option value="Code 03">Code 03: Civil Engineering &amp; Road Works</option>
                <option value="Code 120">Code 120: ICT Technical Support &amp; Systems</option>
                <option value="Code 10">Code 10: Borehole Drilling &amp; Water Engineering</option>
                <option value="Code 02">Code 02: Electrical Reticulation &amp; Substations</option>
                <option value="Code 211">Code 211: Medical Equipment &amp; General Supplies</option>
                <option value="Code 100">Code 100: Waste Management &amp; Sanitation</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
              >
                <Save className="w-4 h-4 text-sky-400" />
                <span>Save Profile Changes</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Activity Trail Sub-tabs Cockpit */}
      <div className="space-y-4">
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveSubTab('customs_history')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
              activeSubTab === 'customs_history'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'hover:text-slate-900'
            }`}
          >
            <History className="w-4 h-4 text-sky-600" />
            <span>Consignment Vault ({(history || []).length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('starred_tenders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
              activeSubTab === 'starred_tenders'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'hover:text-slate-900'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span>Tracked Tenders ({(starredTenders || []).length})</span>
          </button>
        </div>

        {/* Tab 1: Customs History */}
        {activeSubTab === 'customs_history' && (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            {(history || []).length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs space-y-3">
                <FileSpreadsheet className="w-10 h-10 text-slate-300 mx-auto" />
                <div>
                  <h4 className="text-sm font-bold text-slate-700">No customs declarations in your vault yet</h4>
                  <p className="text-slate-400 mt-0.5">Process your first commercial invoice to generate a compliant SAD 500 entry.</p>
                </div>
                <Link
                  to="/customs"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition"
                >
                  <span>Launch Customs Engine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                      <th className="py-3.5 px-5">Invoice #</th>
                      <th className="py-3.5 px-5">Date</th>
                      <th className="py-3.5 px-5">Importer / Consignee</th>
                      <th className="py-3.5 px-5">Border Port</th>
                      <th className="py-3.5 px-5">BURS Tax Payable</th>
                      <th className="py-3.5 px-5">Penalty Avoidance</th>
                      <th className="py-3.5 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(history || []).map((h) => (
                      <tr key={h.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-4 px-5 font-mono font-bold text-slate-900">{h.invoiceNumber}</td>
                        <td className="py-4 px-5 text-slate-500">{h.date}</td>
                        <td className="py-4 px-5 font-medium text-slate-800">{h.importer}</td>
                        <td className="py-4 px-5 text-slate-600">{h.borderPost}</td>
                        <td className="py-4 px-5 font-mono font-bold text-slate-900">
                          P {h.assessedBwp?.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-4 px-5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            +P {(h.penaltySaved || 10000).toLocaleString()} Saved
                          </span>
                        </td>
                        <td className="py-4 px-5 text-right space-x-2">
                          <button
                            onClick={() => exportCustomsDeclarationExcel(h.fullData, `BURS_SAD500_${h.invoiceNumber}.xlsx`)}
                            className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                            title="Re-download Official BURS Excel"
                          >
                            <Download className="w-4 h-4 text-emerald-600" />
                          </button>
                          <button
                            onClick={() => onRemoveHistory(h.id)}
                            className="p-2 rounded-xl border border-slate-200 hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Starred Tenders */}
        {activeSubTab === 'starred_tenders' && (
          <div className="space-y-4">
            {(starredTenders || []).length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={handleDownloadSavedTenders}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Starred Dossiers ({(starredTenders || []).length})</span>
                </button>
              </div>
            )}

            {(starredTenders || []).length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200 text-xs space-y-3">
                <Radar className="w-10 h-10 text-slate-300 mx-auto" />
                <div>
                  <h4 className="text-sm font-bold text-slate-700">No tenders starred yet</h4>
                  <p className="text-slate-400 mt-0.5">Explore the Friday Tender Radar to bookmark and track government notices.</p>
                </div>
                <Link
                  to="/tenders"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-500 transition"
                >
                  <span>Explore Friday Tender Radar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {(starredTenders || []).map((t) => (
                  <div key={t.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-100 text-sky-800">
                            {t.ppra_code}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-500">{t.tender_number}</span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mt-1">{t.tender_title}</h4>
                        <p className="text-xs text-slate-500">{t.procuring_entity}</p>
                      </div>

                      <button
                        onClick={() => onToggleStar(t.id)}
                        className="p-2.5 rounded-xl border border-amber-200 bg-amber-50 text-amber-500 hover:bg-amber-100 transition"
                        title="Remove from Workspace"
                      >
                        <Star className="w-5 h-5 fill-amber-500" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div><span className="text-slate-400 block font-medium">Deadline</span> <strong className="text-slate-900 font-mono">{t.closing_display}</strong></div>
                      <div><span className="text-slate-400 block font-medium">Site Meeting</span> <strong>{t.site_meeting?.held ? t.site_meeting?.date_time : "None"}</strong></div>
                      <div><span className="text-slate-400 block font-medium">Bid Security</span> <strong>{t.bid_security_bwp}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
