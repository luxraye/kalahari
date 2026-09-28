import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Building, Mail, User, ShieldCheck, Zap, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, registerCompany, loginAsDemo } = useAuth();

  const redirectPath = searchParams.get('redirect') || '/customs';
  const [mode, setMode] = useState('login'); // 'login' | 'register'

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
        setAuthError("Invalid corporate email or password. Please verify your credentials or use 1-click Demo below.");
      } else if (err.code === 'auth/email-already-in-use') {
        setAuthError("This email address is already registered. Please switch to 'Sign In' or use demo evaluation.");
      } else if (err.code === 'auth/weak-password') {
        setAuthError("Password must be at least 6 characters long.");
      } else {
        setAuthError(err.message || "Authentication failed. Please verify your connection.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemo = (role) => {
    loginAsDemo(role);
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'contractor') {
      navigate('/tenders');
    } else {
      navigate('/customs');
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4 animate-fade-in">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-6 transition">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Public Overview</span>
      </Link>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-sky-400 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {mode === 'login' ? 'Client Portal Sign In' : 'Register Botswana Company'}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'login' 
              ? 'Access your BURS SAD 500 filing trail and Friday tenders' 
              : 'Setup automated customs clearance and PPRA tender radar'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 rounded-lg transition ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 rounded-lg transition ${
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
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company / Broker Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                    placeholder="e.g. Kalahari Express Logistics"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">BURS Tax Identification (TIN)</label>
                <input
                  type="text"
                  value={formData.tin}
                  onChange={(e) => setFormData({ ...formData, tin: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-sky-500 outline-none font-mono"
                  placeholder="e.g. C0981248101"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Authorized Representative</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                    placeholder="e.g. Lesego Moeti"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Operating Domain / PPRA Code</label>
                <select
                  value={formData.ppraCode}
                  onChange={(e) => setFormData({ ...formData, ppraCode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-sky-500 outline-none bg-white"
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
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Corporate Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="name@company.co.bw"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {authError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 shadow-md transition text-xs flex items-center justify-center gap-2 mt-2"
          >
            <span>
              {isSubmitting 
                ? (mode === 'login' ? 'Authenticating with Firebase...' : 'Registering Organization...') 
                : (mode === 'login' ? 'Sign In to Workspace' : 'Register & Launch Portal')}
            </span>
            <ArrowRight className="w-4 h-4 text-sky-400" />
          </button>
        </form>

        {/* 1-Click Evaluation Bar */}
        <div className="pt-6 border-t border-slate-100 text-center space-y-3">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Instant 1-Click Demo Evaluation
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemo("clearing")}
              className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-sky-500 text-[11px] font-bold text-slate-700 hover:text-sky-700 hover:bg-sky-50 transition flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-sky-500" />
              <span>Demo Broker</span>
            </button>
            <button
              onClick={() => handleDemo("contractor")}
              className="py-2.5 px-3 rounded-xl border border-slate-200 hover:border-emerald-500 text-[11px] font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span>Demo Contractor</span>
            </button>
          </div>
          <button
            onClick={() => handleDemo("admin")}
            className="w-full py-2 px-3 rounded-xl border border-amber-200 hover:border-amber-400 text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 transition flex items-center justify-center gap-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-amber-600" />
            <span>Master Admin Login (Gift Jr Letso Nakedi)</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Botswana DPA Section 74 Compliant Architecture</span>
        </div>

      </div>
    </div>
  );
}
