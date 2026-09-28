import React, { useState } from 'react';
import { User, Building, FileCheck, Star, ShieldCheck, Download, Trash2, Edit3, Save, CheckCircle2, History } from 'lucide-react';
import { exportCustomsDeclarationExcel, exportTendersExcel } from '../utils/excelExport';

export default function AccountTrailView({ userProfile, setUserProfile, history, onRemoveHistory, starredTenders, onToggleStar }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState(userProfile);
  const [activeSubTab, setActiveSubTab] = useState('customs_history');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile(profileForm);
    setIsEditing(false);
  };

  const totalPenaltiesSaved = history.reduce((sum, h) => sum + (h.penaltySaved || 10000), 0);
  const totalTaxesAssessed = history.reduce((sum, h) => sum + (h.assessedBwp || 0), 0);

  const handleDownloadSavedTenders = () => {
    exportTendersExcel(starredTenders, "My_Starred_Botswana_Tenders.xlsx");
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Client Profile</div>
          <div className="text-lg font-extrabold text-slate-900 mt-1 truncate">{userProfile.company || "Guest Client"}</div>
          <div className="text-xs text-slate-500 font-mono mt-0.5">TIN: {userProfile.tin || "Not set"}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">BURS Penalties Prevented</div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
            BWP {totalPenaltiesSaved.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">P10,000 per compliant pre-lodgment</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Processed Invoices</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{history.length}</div>
          <div className="text-xs text-slate-500 mt-0.5">Available for instant re-download</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Starred Tenders</div>
          <div className="text-2xl font-extrabold text-amber-500 font-mono mt-1">{starredTenders.length}</div>
          <div className="text-xs text-slate-500 mt-0.5">Tenders tracked in your radar</div>
        </div>
      </div>

      {/* Profile Editor Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Company &amp; BURS Registration Profile</h3>
            <p className="text-xs text-slate-500">Your details auto-populate on generated BURS SAD 500 schedules and tender alerts.</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            {isEditing ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  value={profileForm.company}
                  onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">BURS TIN / Tax ID</label>
                <input
                  type="text"
                  value={profileForm.tin}
                  onChange={(e) => setProfileForm({ ...profileForm, tin: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                  placeholder="e.g. C0981248101"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Representative Name</label>
                <input
                  type="text"
                  value={profileForm.contactName}
                  onChange={(e) => setProfileForm({ ...profileForm, contactName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Email</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary PPRA Domain</label>
              <select
                value={profileForm.ppraCode}
                onChange={(e) => setProfileForm({ ...profileForm, ppraCode: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg border text-xs focus:ring-2 focus:ring-sky-500 outline-none bg-white"
              >
                <option value="Customs Clearing Agent">Customs Clearing Agent / Freight Broker</option>
                <option value="Code 03">Code 03: Civil Engineering &amp; Road Works</option>
                <option value="Code 120">Code 120: ICT Technical Support &amp; Systems</option>
                <option value="Code 10">Code 10: Borehole Drilling &amp; Water Engineering</option>
                <option value="Code 02">Code 02: Electrical Reticulation &amp; Substations</option>
                <option value="Code 211">Code 211: Medical Equipment &amp; General Supplies</option>
                <option value="Code 100">Code 100: Waste Management &amp; Sanitation</option>
              </select>
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition"
            >
              <Save className="w-4 h-4 text-sky-400" />
              <span>Save Changes</span>
            </button>
          </form>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Organization</span>
              <strong className="text-slate-800 text-sm">{userProfile.company || "Not configured"}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">BURS Tax Identification (TIN)</span>
              <strong className="text-slate-800 font-mono text-sm">{userProfile.tin || "Not configured"}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Representative &amp; Contact</span>
              <strong className="text-slate-800 text-sm">{userProfile.contactName} ({userProfile.email})</strong>
            </div>
          </div>
        )}
      </div>

      {/* Activity Trail Sub-tabs */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200 gap-4 text-sm font-bold">
          <button
            onClick={() => setActiveSubTab('customs_history')}
            className={`pb-3 border-b-2 transition flex items-center gap-2 ${
              activeSubTab === 'customs_history'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Customs Pre-Lodgment History ({history.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('starred_tenders')}
            className={`pb-3 border-b-2 transition flex items-center gap-2 ${
              activeSubTab === 'starred_tenders'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500" />
            <span>My Starred Tenders ({starredTenders.length})</span>
          </button>
        </div>

        {/* Tab 1: Customs History */}
        {activeSubTab === 'customs_history' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {history.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs">
                No customs declarations saved yet. Go to the Customs tab to process and save an invoice.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                      <th className="py-3 px-4">Invoice #</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Importer</th>
                      <th className="py-3 px-4">Port of Entry</th>
                      <th className="py-3 px-4">BURS Assessed</th>
                      <th className="py-3 px-4">Penalty Avoided</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {history.map((h) => (
                      <tr key={h.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">{h.invoiceNumber}</td>
                        <td className="py-3 px-4 text-slate-500">{h.date}</td>
                        <td className="py-3 px-4 font-medium text-slate-800">{h.importer}</td>
                        <td className="py-3 px-4 text-slate-600">{h.borderPost}</td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">P {h.assessedBwp?.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            +P {h.penaltySaved?.toLocaleString()} Saved
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => exportCustomsDeclarationExcel(h.fullData, `BURS_SAD500_${h.invoiceNumber}.xlsx`)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 transition"
                            title="Re-download Excel"
                          >
                            <Download className="w-4 h-4 text-emerald-600" />
                          </button>
                          <button
                            onClick={() => onRemoveHistory(h.id)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
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
            {starredTenders.length > 0 && (
              <div className="flex justify-end">
                <button
                  onClick={handleDownloadSavedTenders}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download Starred Tenders (.xlsx)</span>
                </button>
              </div>
            )}

            {starredTenders.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200 text-xs">
                You haven't starred any tenders yet. Visit the Friday Tender Radar tab to bookmark tenders you want to track.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {starredTenders.map((t) => (
                  <div key={t.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-100 text-sky-800 mr-2">
                          {t.ppra_code}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500">{t.tender_number}</span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1">{t.tender_title}</h4>
                        <p className="text-xs text-slate-500">{t.procuring_entity}</p>
                      </div>

                      <button
                        onClick={() => onToggleStar(t.id)}
                        className="p-2 rounded-lg text-amber-500 hover:bg-slate-100 transition"
                        title="Unstar"
                      >
                        <Star className="w-5 h-5 fill-amber-500" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl">
                      <div><strong>Deadline:</strong> {t.closing_display}</div>
                      <div><strong>Site Meeting:</strong> {t.site_meeting?.held ? t.site_meeting?.date_time : "None"}</div>
                      <div><strong>Bid Security:</strong> {t.bid_security_bwp}</div>
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
