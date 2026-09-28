import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileSpreadsheet, Radar, ShieldCheck, AlertTriangle, CheckCircle2, Lock, ChevronRight } from 'lucide-react';

export default function LandingPageView() {
  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative pt-10 md:pt-16 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          <span>Botswana Data Protection Act (DPA) Section 74 Certified On-Premise AI</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          Automate Customs Clearance &amp; Win Government Tenders.
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
          The sovereign AI platform engineered for <strong>Botswana freight forwarders</strong> to prevent the BWP 10,000 BURS pre-lodgment fine, and <strong>PPRA contractors</strong> to capture lucrative Gazette tenders before deadlines.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
          <Link
            to="/customs"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2.5 transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-sky-400" />
            <span>Launch Customs Engine</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/tenders"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl text-sm font-bold bg-white text-slate-800 hover:bg-slate-50 border border-slate-300 shadow-sm flex items-center justify-center gap-2.5 transition"
          >
            <Radar className="w-4 h-4 text-sky-600" />
            <span>View Friday Tender Radar</span>
          </Link>

          <Link
            to="/login?mode=register"
            className="w-full sm:w-auto px-6 py-4 rounded-2xl text-sm font-bold bg-sky-50 text-sky-900 hover:bg-sky-100 border border-sky-300 shadow-sm flex items-center justify-center gap-2 transition"
          >
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Register Botswana Company</span>
          </Link>
        </div>

        {/* Hero KPI Stat Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left border-t border-slate-200/80">
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <div className="text-2xl font-extrabold text-slate-900 font-mono">30 Seconds</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Invoice &rarr; BURS SAD 500</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <div className="text-2xl font-extrabold text-emerald-600 font-mono">P10,000</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Penalty Avoidance / Truck</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <div className="text-2xl font-extrabold text-sky-600 font-mono">Friday 5PM</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Gazette Radar Digest</div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
            <div className="text-2xl font-extrabold text-slate-900 font-mono">100% Offline</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase mt-0.5">Zero Cross-Border Cloud</div>
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
              className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition text-xs flex items-center justify-center gap-2"
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
              className="w-full py-3.5 rounded-xl font-bold bg-sky-600 text-white hover:bg-sky-700 transition text-xs flex items-center justify-center gap-2"
            >
              <span>Explore Friday Tender Radar</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Data Sovereignty & Botswana DPA Section 74 */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Lock className="w-3.5 h-3.5" />
            <span>Strict Cross-Border Compliance</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Why Multinational Cloud AI Violates Botswana Law
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Botswana's <strong>Data Protection Act (DPA)</strong> strictly prohibits transferring personal citizen data, commercial invoices, or tax filings to foreign cloud data centers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 space-y-2">
            <h4 className="font-bold text-white text-sm">Section 74 Prohibition</h4>
            <p>Fines reach up to BWP 50 million for unauthorized cross-border transfers to US/EU cloud AI endpoints (e.g. OpenAI, AWS).</p>
          </div>
          <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 space-y-2">
            <h4 className="font-bold text-white text-sm">100% On-Premise GPU Execution</h4>
            <p>Our pipeline operates completely on local hardware inside Botswana. Zero data packets ever cross international borders.</p>
          </div>
          <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 space-y-2">
            <h4 className="font-bold text-white text-sm">Internet Blackout Immunity</h4>
            <p>Customs entries and invoice parsing function without disruption even during subsea fiber cuts or local network outages.</p>
          </div>
        </div>
      </section>

      {/* Enterprise Account Architecture Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-8">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Client Infrastructure</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Centralized Organization For Every Consignment &amp; Tender Bid
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Kalahari.ai requires authenticated company accounts so your operations are permanently organized, compliant with the BURS statutory framework, and auditable under Botswana law.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">1</div>
            <h3 className="text-base font-bold text-white">Permanent Consignment Vault</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every processed commercial invoice and BURS SAD 500 declaration is stored under your company TIN, ready for instant BURS tax inspections and audit checks.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">2</div>
            <h3 className="text-base font-bold text-white">Custom PPRA Tender Radar</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bookmark and monitor Government Gazette notices tailored specifically to your PPRA registration codes (01, 02, 03, 10, 120, 211) with deadline alerts.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">3</div>
            <h3 className="text-base font-bold text-white">Section 74 DPA Sovereignty</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your account enforces strict data residency under Botswana Data Protection Act (DPA), ensuring proprietary tariffs and invoices never leak across foreign cloud servers.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/login?mode=register"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-sky-600 hover:bg-sky-500 text-white text-xs flex items-center justify-center gap-2 transition shadow-md"
          >
            <span>Create Company Account Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center justify-center gap-2 transition border border-slate-700"
          >
            <span>Already Registered? Sign In</span>
          </Link>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Commercial Packages</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Transparent, High-ROI Plans</h2>
          <p className="text-slate-600 text-sm">Every plan includes dedicated onboarding and direct WhatsApp support with Gift Jr Letso Nakedi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Customs Plan */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Track 1: Clearing Agents</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Customs Pre-Lodgment</h3>
              <div className="mt-4 mb-4">
                <span className="text-4xl font-extrabold font-mono text-slate-900">BWP 4,500</span>
                <span className="text-xs text-slate-500"> / month retainer</span>
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
              className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition text-xs text-center block"
            >
              Start 14-Day Free Pilot
            </Link>
          </div>

          {/* Tender Plan */}
          <div className="bg-sky-50/50 p-8 rounded-3xl border-2 border-sky-500 shadow-lg flex flex-col justify-between space-y-6 relative">
            <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-sky-600 text-white shadow-sm">
              Popular for Contractors
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Track 2: Bidders</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Friday Tender Radar</h3>
              <div className="mt-4 mb-4">
                <span className="text-4xl font-extrabold font-mono text-slate-900">BWP 1,250</span>
                <span className="text-xs text-slate-500"> / month</span>
              </div>
              <p className="text-xs text-slate-600 mb-6">Filtered tender intelligence delivered every Friday at 5:00 PM for your exact PPRA code.</p>
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
