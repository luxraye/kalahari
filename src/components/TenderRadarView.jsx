import React, { useState } from 'react';
import { Radar, Search, Star, Download, Calendar, MapPin, ShieldAlert, CheckCircle, Clock, FileSpreadsheet, MessageSquare, AlertCircle } from 'lucide-react';
import { exportTendersExcel } from '../utils/excelExport';

const PPRA_FILTERS = [
  { code: 'ALL', label: 'All Industries' },
  { code: 'Code 03', label: 'Civil & Roads (Code 03)' },
  { code: 'Code 120', label: 'ICT & Systems (Code 120)' },
  { code: 'Code 10', label: 'Water & Drilling (Code 10)' },
  { code: 'Code 02', label: 'Electrical (Code 02)' },
  { code: 'Code 211', label: 'Medical & Pharma (Code 211)' },
  { code: 'Code 100', label: 'Waste Management (Code 100)' },
];

export default function TenderRadarView({ tenders, onToggleStar }) {
  const [selectedCode, setSelectedCode] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyCompulsory, setOnlyCompulsory] = useState(false);

  // Filter logic
  const filteredTenders = tenders.filter(t => {
    const matchesCode = selectedCode === 'ALL' || t.ppra_code === selectedCode;
    const matchesSearch = searchQuery === '' || 
      t.tender_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.procuring_entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tender_number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompulsory = !onlyCompulsory || (t.site_meeting?.held && t.site_meeting?.compulsory);

    return matchesCode && matchesSearch && matchesCompulsory;
  });

  const handleDownloadFiltered = () => {
    const label = selectedCode === 'ALL' ? 'All_Codes' : selectedCode.replace(' ', '_');
    exportTendersExcel(filteredTenders, `Botswana_Tender_Radar_${label}.xlsx`);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Friday Automation Explainer Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-500/20 text-sky-400 border border-sky-500/30">
              <Radar className="w-3.5 h-3.5" />
              <span>Weekly Friday 5:00 PM Automation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Botswana Friday Government Gazette Radar
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Every Friday afternoon, our local AI pipeline ingests newly published Republic of Botswana Gazette Extraordinary Tender Supplements, extracts requirements, classifies by PPRA code, and dispatches structured dossiers before close of business.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <button
              onClick={handleDownloadFiltered}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-sky-500 text-white hover:bg-sky-600 shadow-md transition"
            >
              <Download className="w-4 h-4" />
              <span>Download Filtered Tenders (.xlsx)</span>
            </button>
            <a
              href="https://wa.me/26772161038?text=Hi%20G.%20Nakedi%2C%20I%20would%20like%20to%20subscribe%20to%20the%20Friday%20Tender%20Radar%20WhatsApp%20Alerts."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Alerts Sub</span>
            </a>
          </div>
        </div>

        {/* Stats ticker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800 text-xs text-slate-400">
          <div><strong class="text-white">Publication:</strong> Every Friday @ 15:00 CAT</div>
          <div><strong class="text-white">Verified Tenders:</strong> {tenders.length} Active in Database</div>
          <div><strong class="text-white">Coverage:</strong> Ministries, WUC, BPC, City Councils</div>
          <div><strong class="text-emerald-400">Data Guarantee:</strong> Zero Overlooked Site Visits</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tender title, entity, or tender no..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
            />
          </div>

          {/* Toggle Compulsory Only */}
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyCompulsory}
              onChange={(e) => setOnlyCompulsory(e.target.checked)}
              className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
            />
            <span>Show Compulsory Site Meetings Only</span>
          </label>
        </div>

        {/* PPRA Code Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
          {PPRA_FILTERS.map((f) => (
            <button
              key={f.code}
              onClick={() => setSelectedCode(f.code)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedCode === f.code
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tender Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
          <span>Showing {filteredTenders.length} Verified Tenders</span>
          <span>Click the star icon to save tenders to your Client Workspace</span>
        </div>

        {filteredTenders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200 space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">No tenders match your filter criteria</h4>
            <p className="text-xs">Try selecting 'All Industries' or clearing your search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredTenders.map((tender) => (
              <div
                key={tender.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-500 shadow-sm transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-sky-100 text-sky-800">
                        {tender.ppra_code}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {tender.tender_number}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase hidden sm:inline">
                        &bull; {tender.industry_category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {tender.tender_title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">
                      {tender.procuring_entity}
                    </p>
                  </div>

                  {/* Star Toggle */}
                  <button
                    onClick={() => onToggleStar(tender.id)}
                    className={`p-2.5 rounded-xl border transition shrink-0 ${
                      tender.starred
                        ? 'bg-amber-50 text-amber-600 border-amber-300'
                        : 'bg-slate-50 text-slate-400 hover:text-amber-500 border-slate-200'
                    }`}
                    title={tender.starred ? "Remove from Starred" : "Save to Workspace"}
                  >
                    <Star className={`w-5 h-5 ${tender.starred ? 'fill-amber-500' : ''}`} />
                  </button>
                </div>

                {/* Key Spec Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">PPRA Codes &amp; Grades</span>
                    <strong className="text-slate-800 font-mono">{tender.ppra_details}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Citizen Reservation</span>
                    <strong className="text-slate-800">{tender.citizen_reservation}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Pre-Bid / Site Meeting</span>
                    {tender.site_meeting?.held ? (
                      <span className={tender.site_meeting?.compulsory ? "text-red-700 font-bold flex items-center gap-1" : "text-slate-700 font-semibold"}>
                        {tender.site_meeting?.compulsory && <ShieldAlert className="w-3.5 h-3.5 text-red-600 shrink-0" />}
                        {tender.site_meeting?.compulsory ? "Compulsory" : "Optional"}: {tender.site_meeting?.date_time}
                      </span>
                    ) : (
                      <span className="text-slate-500">None scheduled</span>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Submission Deadline</span>
                    <strong className="text-slate-900 font-mono">{tender.closing_display}</strong>
                  </div>
                </div>

                {/* Footer details */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-500 pt-2 gap-2">
                  <div className="flex items-center gap-4">
                    <span>Document Fee: <strong className="text-slate-800">{tender.tender_fee_bwp}</strong></span>
                    <span>Bid Bond: <strong className="text-slate-800">{tender.bid_security_bwp}</strong></span>
                  </div>
                  <span className="text-slate-600 truncate max-w-md">Venue: <em>{tender.submission_venue}</em></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
