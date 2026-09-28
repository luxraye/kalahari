import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, Building, Mail, User, ShieldCheck, ArrowLeft, 
  ArrowRight, CheckCircle2, Cpu, FileSpreadsheet, Radar,
  KeyRound, Sparkles
} from 'lucide-react';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, registerCompany } = useAuth();

  const redirectPath = searchParams.get('redirect') || '/customs';
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'

  const [formData, setFormData] = useState({
    company: '',
    tin: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
    ppraCode: 'Customs Clearing Agent'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError("");

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
      } else {
        await registerCompany(formData);
      }
      navigate(redirectPath);
    } catch (err) {
      console.error("Auth error:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setAuthError("Invalid corporate email or password. Please verify your credentials.");
      } else if (err.code === 'auth/email-already-in-use') {
        setAuthError("This email address is already registered. Please switch to 'Sign In'.");
      } else if (err.code === 'auth/weak-password') {
        setAuthError("Password must be at least 6 characters long.");
      } else {
        setAuthError(err.message || "Authentication failed. Please verify your connection.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRedirectNotice = () => {
    if (redirectPath.includes('customs')) {
      return {
        title: "BURS Customs Pre-Lodgment Engine",
        text: "Sign in or register your Botswana clearing firm to process invoices and organize your SAD 500 audit trail."
      };
    }
    if (redirectPath.includes('tenders')) {
      return {
        title: "Friday Tender Radar Access",
        text: "Sign in or register to track, filter, and bookmark tenders matching your company's PPRA codes."
      };
    }
    return null;
  };

  const redirectNotice = getRedirectNotice();

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 animate-in fade-in duration-200">
      
      <Link 
        to="/" 
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6 transition"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Public Overview</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Left Brand & Enterprise Info Column (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-8 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                KALAHARI<span className="text-sky-400">.AI</span>
              </span>
            </Link>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold tracking-tight leading-snug">
                Botswana Trade &amp; Regulatory Intelligence
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Single sign-on access to BURS SAD 500 customs pre-lodgment automation and Friday Government Gazette tenders.
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">BURS Audit Defense:</strong>
                  <span className="text-slate-400">Permanent tax schedule storage under your verified TIN.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">PPRA Tender Tracking:</strong>
                  <span className="text-slate-400">Personalized Friday Gazette dossiers for your PPRA codes.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">Section 74 DPA Sovereign:</strong>
                  <span className="text-slate-400">Zero foreign cloud transfer of Botswana corporate data.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Direct Desk: <strong>+267 72161038</strong></span>
            <span>Gaborone, BW</span>
          </div>
        </div>

        {/* Right Authentication Form Column (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 space-y-6">
          
          {/* Contextual Notice if redirected */}
          {redirectNotice && (
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs text-sky-950 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-sky-900">{redirectNotice.title}</strong>
                <span className="text-slate-600">{redirectNotice.text}</span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {mode === 'login' ? 'Client Portal Sign In' : 'Register Botswana Company'}
            </h2>
            <p className="text-xs text-slate-500">
              {mode === 'login' 
                ? 'Sign in to access your BURS SAD 500 audit vault and Friday radar.' 
                : 'Setup automated customs clearance and PPRA tender intelligence.'}
            </p>
          </div>

          {/* Tab switch */}
          <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold text-slate-600">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-xl transition ${
                mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 rounded-xl transition ${
                mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
              }`}
            >
              Register Company
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company / Broker Name *</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                      placeholder="e.g. Kalahari Express Logistics Ltd"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">BURS Tax Identification (TIN)</label>
                    <input
                      type="text"
                      value={formData.tin}
                      onChange={(e) => setFormData({ ...formData, tin: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none font-mono"
                      placeholder="e.g. C0981248101"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Representative Name *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                        placeholder="e.g. Lesego Moeti"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Operating Domain / PPRA Code</label>
                  <select
                    value={formData.ppraCode}
                    onChange={(e) => setFormData({ ...formData, ppraCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none bg-white font-medium"
                  >
                    <option value="Customs Clearing Agent">Customs Clearing Agent / Freight Broker</option>
                    <option value="Code 03">Code 03: Civil Engineering &amp; Road Works</option>
                    <option value="Code 120">Code 120: ICT Technical Support &amp; Systems</option>
                    <option value="Code 10">Code 10: Borehole Drilling &amp; Water Engineering</option>
                    <option value="Code 02">Code 02: Electrical Works &amp; Substations</option>
                    <option value="Code 211">Code 211: Medical Equipment &amp; Supplies</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Corporate Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                  placeholder="name@company.co.bw"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 shadow-md transition text-xs flex items-center justify-center gap-2 mt-3 cursor-pointer"
            >
              <span>
                {isSubmitting 
                  ? (mode === 'login' ? 'Authenticating with Firebase...' : 'Registering Organization...') 
                  : (mode === 'login' ? 'Sign In to Workspace' : 'Register & Launch Portal')}
              </span>
              <ArrowRight className="w-4 h-4 text-sky-400" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
