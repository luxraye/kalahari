import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, MASTER_ADMIN_PASSCODE } from '../context/AuthContext';
import { Lock, ShieldAlert, KeyRound, ArrowRight } from 'lucide-react';

export function ProtectedClientRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
}

export function ProtectedAdminRoute({ children }) {
  const { isAdmin, verifyAdminAccess, loginAsDemo } = useAuth();
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (isAdmin) {
    return children;
  }

  const handleUnlock = (e) => {
    e.preventDefault();
    if (verifyAdminAccess(passcode)) {
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid administrator passcode. Please re-enter.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-slate-900/20">
        <Lock className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
          Restricted Operations Area
        </span>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-2">
          Administrator Authentication
        </h2>
        <p className="text-xs text-slate-500">
          Enter your Master Administrator security key to access platform telemetry, client billing, and support inboxes.
        </p>
      </div>

      <form onSubmit={handleUnlock} className="space-y-4">
        <div className="relative">
          <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="password"
            required
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter Admin Passcode..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 outline-none font-mono"
          />
        </div>

        {errorMsg && (
          <p className="text-xs text-red-600 font-bold">{errorMsg}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-md transition text-xs flex items-center justify-center gap-2"
        >
          <span>Unlock Admin Panel</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </form>

      <div className="pt-2 text-center">
        <p className="text-[11px] text-slate-400">
          Authorized personnel only. Access attempts are audited and logged.
        </p>
      </div>
    </div>
  );
}
