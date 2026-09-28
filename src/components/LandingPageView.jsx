import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, FileSpreadsheet, Radar, ShieldCheck, AlertTriangle, 
  CheckCircle2, Lock, ChevronRight, Calculator, Clock, Sparkles, 
  TrendingUp, Download, Eye, ExternalLink, Building2, MapPin
} from 'lucide-react';

export default function LandingPageView() {
  const [activeShowcaseTab, setActiveShowcaseTab] = useState('customs'); // 'customs' | 'tenders'
  const [truckVolume, setTruckVolume] = useState(15);

  const finePrevented = truckVolume * 10000;
  const demurrageSaved = truckVolume * 3500;
  const hoursSaved = Math.round(truckVolume * 1.5);

  return (
    <div className="space-y-24 pb-24">
      
      {/* Hero Section */}
      <section className="relative pt-6 md:pt-14 text-center max-w-5xl mx-auto space-y-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-sky-50 text-sky-900 border border-sky-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Botswana Data Protection Act (DPA) 2018 Section 74 Certified</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>BURS SAD 500 Pre-Lodgment Engine</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12]">
            Automate BURS Customs Clearance &amp; Win Government Tenders.
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            The sovereign intelligence platform built for <strong>Botswana freight forwarders</strong> to prevent the BWP 10,000 BURS non-lodgment penalty, and <strong>PPRA contractors</strong> to track every Friday Gazette tender before deadline.
          </p>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/customs"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/15 flex items-center justify-center gap-2.5 transition duration-200 hover:-translate-y-0.5"
          >
            <FileSpreadsheet className="w-4 h-4 text-sky-400" />
            <span>Launch Customs Engine</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>

          <Link
            to="/tenders"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold bg-white text-slate-800 hover:bg-slate-50 border border-slate-300 shadow-sm flex items-center justify-center gap-2.5 transition duration-200 hover:-translate-y-0.5"
          >
            <Radar className="w-4 h-4 text-sky-600" />
            <span>View Friday Tender Radar</span>
          </Link>

          <Link
            to="/login?mode=register"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold bg-sky-50 text-sky-900 hover:bg-sky-100 border border-sky-300 shadow-xs flex items-center justify-center gap-2 transition duration-200"
          >
            <span>Register Firm</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Hero KPI Stat Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-10 text-left border-t border-slate-200/90">
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-2xl font-black text-slate-900 font-mono">30 Seconds</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Invoice &rarr; BURS SAD 500</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">&bull; Instant HS Code Extraction</div>
          </div>
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-2xl font-black text-emerald-600 font-mono">P10,000</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">BURS Fine Avoided</div>
            <div className="text-[10px] text-slate-500 font-semibold mt-0.5">&bull; Per Inbound Truck Consignment</div>
          </div>
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-2xl font-black text-sky-600 font-mono">Friday 15:00</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Gazette Tender Radar</div>
            <div className="text-[10px] text-slate-500 font-semibold mt-0.5">&bull; Tailored to PPRA Codes</div>
          </div>
          <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-2xl font-black text-slate-900 font-mono">100% Local</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1">Sovereign Data Security</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">&bull; Section 74 DPA Compliant</div>
          </div>
        </div>

      </section>

      {/* Interactive Platform Live Preview Showcase */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Interactive Product Showcase</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Explore the Twin Engine In Real Time</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Switch between our automated customs converter and government procurement radar.</p>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setActiveShowcaseTab('customs')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
                activeShowcaseTab === 'customs' 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'hover:text-slate-900'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-sky-400" />
              <span>BURS Customs Engine</span>
            </button>
            <button
              onClick={() => setActiveShowcaseTab('tenders')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
                activeShowcaseTab === 'tenders' 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'hover:text-slate-900'
              }`}
            >
              <Radar className="w-4 h-4 text-sky-400" />
              <span>Friday Tender Radar</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Customs Showcase */}
        {activeShowcaseTab === 'customs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Sample Commercial Invoice Details */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-900 uppercase">Input: Supplier Invoice</span>
                  <span className="font-mono text-sky-700 font-bold">GIA-EXP-2026-9041</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Exporter:</span>
                    <strong className="text-slate-800 text-right">Gauteng Industrial Supplies (ZA)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Importer:</span>
                    <strong className="text-slate-800 text-right">Kgalagadi Mining Ltd (BW)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Border Post:</span>
                    <strong className="text-slate-800 text-right">Tlokweng (BWTLK)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Invoice Amount:</span>
                    <strong className="text-slate-900 font-mono text-sm">ZAR 321,000.00</strong>
                  </div>
                </div>
                
                <div className="pt-2 border-t border-slate-200 text-slate-600 leading-relaxed text-[11px]">
                  Kalahari.ai extracts multi-item line descriptions, auto-assigns 8-digit HS Tariff Codes, checks SADC origin certificates, and calculates customs duties in Pula.
                </div>

                <Link
                  to="/customs"
                  className="w-full py-2.5 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 text-white text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <span>Test with Custom Invoice PDF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Right 2 Columns: Generated SAD 500 Output */}
              <div className="lg:col-span-2 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      PRE-LODGMENT VALIDATED
                    </span>
                    <span className="text-xs text-slate-400 font-mono">BURS CMS Ready Schedule</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Rate: 1 ZAR = 0.7420 BWP</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 text-[10px] block uppercase font-mono">Total VDP (BWP)</span>
                    <strong className="text-white text-sm font-mono">P 238,182.00</strong>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 text-[10px] block uppercase font-mono">Customs Duty</span>
                    <strong className="text-emerald-400 text-sm font-mono">P 1,141.70</strong>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 text-[10px] block uppercase font-mono">Import VAT (14%)</span>
                    <strong className="text-sky-400 text-sm font-mono">P 33,505.32</strong>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 text-[10px] block uppercase font-mono">Penalty Prevented</span>
                    <strong className="text-emerald-400 text-sm font-mono">+P 10,000</strong>
                  </div>
                </div>

                {/* Sample items table */}
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-slate-400 border-b border-slate-800 font-mono text-[10px]">
                        <th className="py-2 pr-2">HS Code</th>
                        <th className="py-2 px-2">Description</th>
                        <th className="py-2 px-2">Origin</th>
                        <th className="py-2 px-2">Duty</th>
                        <th className="py-2 pl-2 text-right">Tax (BWP)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-[11px]">
                      <tr>
                        <td className="py-2 font-mono text-sky-400">8412.21.00</td>
                        <td className="py-2 px-2 text-slate-300">Hydraulic Cylinder (Mining Excavator)</td>
                        <td className="py-2 px-2 font-mono">ZA (SADC)</td>
                        <td className="py-2 px-2 text-emerald-400">0%</td>
                        <td className="py-2 pl-2 text-right font-mono text-slate-200">P 10,802.83</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-mono text-sky-400">8482.20.00</td>
                        <td className="py-2 px-2 text-slate-300">Deep Groove Roller Bearings (Timken)</td>
                        <td className="py-2 px-2 font-mono">DE (MFN)</td>
                        <td className="py-2 px-2 text-amber-400">5%</td>
                        <td className="py-2 pl-2 text-right font-mono text-slate-200">P 4,498.30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-center pt-2 text-[11px] text-slate-400">
                  <span>Export format: Official BURS SAD 500 (.xlsx) + JSON EDI</span>
                  <Link to="/customs" className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1">
                    <span>Open full SAD 500 worksheet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: Tenders Showcase */}
        {activeShowcaseTab === 'tenders' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Tender 1 */}
              <div className="p-5 rounded-2xl border border-slate-200 hover:border-sky-500 transition shadow-xs space-y-3 bg-white">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800">
                    PPRA Code 03 &bull; Roads
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">MTPW/RRD/045</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                  Asphalting and Rehabilitation on A1 Highway (Mochudi Junction to Dibete - 54km)
                </h4>
                <div className="text-xs text-slate-500 space-y-1">
                  <div>Entity: <strong>Ministry of Transport &amp; Public Works</strong></div>
                  <div>Site Visit: <strong className="text-red-600">Compulsory &bull; 12th Oct</strong></div>
                  <div>Citizen: <strong className="text-emerald-700">100% Citizen Owned</strong></div>
                </div>
                <Link to="/tenders" className="text-xs text-sky-600 font-bold hover:text-sky-700 inline-flex items-center gap-1 pt-1">
                  <span>View Tender Scope</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Tender 2 */}
              <div className="p-5 rounded-2xl border border-slate-200 hover:border-sky-500 transition shadow-xs space-y-3 bg-white">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                    PPRA Code 120 &bull; ICT
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">MCKT/SB/012</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                  National Electronic Health Records (EHR) Interoperability Platform for Clinics
                </h4>
                <div className="text-xs text-slate-500 space-y-1">
                  <div>Entity: <strong>SmartBots &amp; Ministry of Comm.</strong></div>
                  <div>Site Visit: <strong className="text-slate-700">Online Teams Meeting</strong></div>
                  <div>Citizen: <strong className="text-emerald-700">Local IT Startup Preference</strong></div>
                </div>
                <Link to="/tenders" className="text-xs text-sky-600 font-bold hover:text-sky-700 inline-flex items-center gap-1 pt-1">
                  <span>View Tender Scope</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Tender 3 */}
              <div className="p-5 rounded-2xl border border-slate-200 hover:border-sky-500 transition shadow-xs space-y-3 bg-white">
                <div className="flex justify-between items-start">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    PPRA Code 10 &bull; Water
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">WUC/078/2026</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                  Emergency Deep Groundwater Exploration &amp; Borehole Siting in Kgalagadi North
                </h4>
                <div className="text-xs text-slate-500 space-y-1">
                  <div>Entity: <strong>Water Utilities Corporation (WUC)</strong></div>
                  <div>Site Visit: <strong className="text-slate-700">Optional &bull; Kang Office</strong></div>
                  <div>Citizen: <strong className="text-emerald-700">100% Citizen Contractors</strong></div>
                </div>
                <Link to="/tenders" className="text-xs text-sky-600 font-bold hover:text-sky-700 inline-flex items-center gap-1 pt-1">
                  <span>View Tender Scope</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>

            <div className="flex justify-center pt-2">
              <Link
                to="/tenders"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 text-xs transition shadow-sm"
              >
                <Radar className="w-4 h-4 text-sky-400" />
                <span>Search All Active Government Tenders in Radar</span>
              </Link>
            </div>
          </div>
        )}

      </section>

      {/* Interactive ROI & Fine Prevention Calculator */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
        
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive ROI Calculator</span>
          </div>
          <h2 className="text-3xl font-black tracking-tight">Calculate Your Monthly Risk &amp; Savings</h2>
          <p className="text-slate-300 text-sm">See how much capital your freight forwarding firm saves by avoiding the BURS BWP 10,000 late lodgment fine and border demurrage.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Slider input */}
          <div className="space-y-4 bg-slate-800/70 p-6 rounded-2xl border border-slate-700">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Monthly Inbound Truck Consignments
              </label>
              <span className="text-2xl font-black font-mono text-sky-400">{truckVolume}</span>
            </div>
            
            <input
              type="range"
              min="1"
              max="100"
              value={truckVolume}
              onChange={(e) => setTruckVolume(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-700 rounded-lg"
            />
            
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>1 Truck</span>
              <span>50 Trucks</span>
              <span>100 Trucks</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
              Based on standard BURS statutory penalty (BWP 10,000 / occurrence) and overnight carrier demurrage at Tlokweng and Pioneer Gate border posts.
            </p>
          </div>

          {/* Results strip */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            
            <div className="bg-slate-800/90 p-6 rounded-2xl border border-emerald-500/40 space-y-1">
              <span className="text-slate-400 text-xs font-semibold block uppercase">BURS Penalties Prevented</span>
              <div className="text-3xl font-black text-emerald-400 font-mono">
                BWP {finePrevented.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 block pt-1">Guaranteed pre-lodged audit</span>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-2xl border border-sky-500/40 space-y-1">
              <span className="text-slate-400 text-xs font-semibold block uppercase">Demurrage Saved</span>
              <div className="text-3xl font-black text-sky-400 font-mono">
                BWP {demurrageSaved.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 block pt-1">Zero border queue detention</span>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-2xl border border-slate-700 space-y-1">
              <span className="text-slate-400 text-xs font-semibold block uppercase">Clerical Hours Saved</span>
              <div className="text-3xl font-black text-white font-mono">
                {hoursSaved} hrs
              </div>
              <span className="text-[11px] text-slate-400 block pt-1">30s vs 2 hrs manual entry</span>
            </div>

          </div>

        </div>

      </section>

      {/* The Two Flagship Tracks */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Enterprise Solutions</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Two Tailored Operating Tracks</h2>
          <p className="text-slate-600 text-sm">Engineered specifically for the operational bottlenecks of Botswana's trade and public procurement sectors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card Track 1 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-sky-500 shadow-sm hover:shadow-xl transition flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center shadow-sm">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-red-600 uppercase">Track 1 &bull; Freight Forwarding &amp; Customs</span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                  BURS SAD 500 Customs Pre-Lodgment
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Eliminate the BWP 10,000 non-lodgment penalty and border demurrage at Tlokweng, Pioneer Gate, and Kazungula. Automatically convert complex multi-item South African and overseas invoices into compliant BURS SAD 500 schedules in 30 seconds.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Full 8-digit HS Tariff Code classification</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Automated CIF / VDP calculation in Botswana Pula (BWP)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> SADC Trade Protocol zero-duty vs. MFN tariff checking</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 1-Click Excel (.xlsx) &amp; JSON EDI download for BURS CMS</li>
              </ul>
            </div>

            <Link
              to="/customs"
              className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Test Live Customs Parser</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card Track 2 */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-sky-500 shadow-sm hover:shadow-xl transition flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shadow-sm">
                <Radar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-sky-600 uppercase">Track 2 &bull; PPRA Commercial Contractors</span>
                <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Botswana Friday Tender Radar
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Never miss a multi-million Pula government tender or disqualify over an overlooked compulsory site visit. We ingest the Friday Government Gazette every week and deliver filtered intelligence tailored to your exact PPRA code before close of business.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700 pt-2 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" /> Filtered strictly by PPRA Code (Civil 03, ICT 120, Water 10, Medical 211)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" /> High-priority alerts for compulsory site inspections &amp; bid bonds</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" /> Direct WhatsApp alerts and filtered Excel downloads</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" /> Star and track tenders in your private client workspace</li>
              </ul>
            </div>

            <Link
              to="/tenders"
              className="w-full py-3.5 rounded-xl font-bold bg-sky-600 text-white hover:bg-sky-700 transition text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Explore Friday Tender Radar</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Commercial Packages</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Transparent, High-ROI Plans</h2>
          <p className="text-slate-600 text-sm">Every plan includes dedicated onboarding and direct engineering support with Lead Architect Gift Jr Letso Nakedi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Customs Plan */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Track 1: Clearing Agents</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Customs Pre-Lodgment Retainer</h3>
              <div className="mt-4 mb-4">
                <span className="text-4xl font-black font-mono text-slate-900">BWP 4,500</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <p className="text-xs text-slate-600 mb-6">Up to 250 consignments per month. Prevents BWP 10,000 penalties per shipment.</p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant invoice-to-SAD 500 conversion</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Export official BURS Excel (.xlsx) &amp; XML</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free 14-day calibration trial</li>
              </ul>
            </div>
            <Link
              to="/customs"
              className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition text-xs text-center block shadow-sm"
            >
              Start 14-Day Free Pilot
            </Link>
          </div>

          {/* Tender Plan */}
          <div className="bg-sky-50/50 p-8 rounded-3xl border-2 border-sky-500 shadow-md flex flex-col justify-between space-y-6 relative">
            <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-sky-600 text-white shadow-sm">
              Popular for Contractors
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Track 2: Bidders</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Friday Tender Radar</h3>
              <div className="mt-4 mb-4">
                <span className="text-4xl font-black font-mono text-slate-900">BWP 1,250</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <p className="text-xs text-slate-600 mb-6">Filtered tender intelligence delivered every Friday at 3:00 PM CAT for your exact PPRA code.</p>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600" /> Tailored to your PPRA Code &amp; Grade</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600" /> Direct WhatsApp alerts on compulsory meetings</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-600" /> Download filtered Excel dossiers</li>
              </ul>
            </div>
            <Link
              to="/tenders"
              className="w-full py-3.5 rounded-xl font-bold bg-sky-600 text-white hover:bg-sky-700 transition text-xs shadow-md text-center block"
            >
              Subscribe to Tender Radar
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
