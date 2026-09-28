import React, { useState } from 'react';
import { X, Lock, Mail, Building, User, Phone, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = {
      company: formData.company || (formData.email.includes('@') ? formData.email.split('@')[1].split('.')[0].toUpperCase() + " Logistics" : "Botswana Client"),
      tin: formData.tin || "C" + Math.floor(1000000000 + Math.random() * 9000000000),
      contactName: formData.contactName || "Client User",
      email: formData.email,
      phone: formData.phone || "+267 71234567",
      ppraCode: formData.ppraCode
    };

    onLoginSuccess(profile);
    onClose();
  };

  const handleDemoLogin = (role = "clearing") => {
    const demoProfile = role === "clearing" ? {
      company: "Kgalagadi Mining & Auto Equipment Ltd",
      tin: "C0981248101",
      contactName: "Lesego Moeti",
      email: "lmoeti@kgalagadi-auto.co.bw",
      phone: "+267 391 4400",
      ppraCode: "Customs Clearing Agent"
    } : {
      company: "Estate Construction (Pty) Ltd",
      tin: "C0847291033",
      contactName: "Kagiso Molosiwa",
      email: "reception@estateconstruction.co.bw",
      phone: "+267 318 1285",
      ppraCode: "Code 03"
    };

    onLoginSuccess(demoProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-sky-400 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {mode === 'login' ? 'Client Sign In' : 'Create Business Account'}
          </h3>
          <p className="text-xs text-slate-500">
            {mode === 'login'
              ? 'Access your BURS SAD 500 audit trail and starred tenders'
              : 'Register your Botswana company for automated customs and tenders'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6 text-xs font-bold text-slate-600">
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
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company / Organization Name</label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs focus:ring-2 focus:ring-sky-500 outline-none"
                    placeholder="e.g. Kalahari Logistics Ltd"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">BURS TIN / Tax ID</label>
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
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Primary Domain / PPRA Code</label>
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
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">Business Email Address</label>
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

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-md transition text-xs flex items-center justify-center gap-2 mt-2"
          >
            <span>{mode === 'login' ? 'Sign In to Portal' : 'Register & Enter Workspace'}</span>
          </button>
        </form>

        {/* Quick Demo Access Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-center space-y-2.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Instant Prospect Evaluation
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => handleDemoLogin("clearing")}
              className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:border-sky-500 text-[11px] font-bold text-slate-700 hover:text-sky-700 hover:bg-sky-50 transition flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-sky-500" />
              <span>Demo Freight Broker</span>
            </button>
            <button
              onClick={() => handleDemoLogin("contractor")}
              className="flex-1 py-2 px-3 rounded-lg border border-slate-200 hover:border-emerald-500 text-[11px] font-bold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-500" />
              <span>Demo Contractor</span>
            </button>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Secured on local device &bull; DPA Section 74 Compliant</span>
        </div>

      </div>
    </div>
  );
}
