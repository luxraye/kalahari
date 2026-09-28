import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';

export function ProtectedClientRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
}

export function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
            Restricted System Area
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight pt-2">
            Access Denied
          </h2>
          <p className="text-xs text-slate-500">
            This administration console is restricted exclusively to authorized Kalahari.ai platform architects.
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/workspace"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 text-xs transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Client Workspace</span>
          </Link>
        </div>
      </div>
    );
  }

  return children;
}
