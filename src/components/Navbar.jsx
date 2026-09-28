import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Cpu, Phone, Mail, MessageSquare, User, FileSpreadsheet, 
  Radar, History, LogIn, LogOut, Home, ShieldAlert 
} from 'lucide-react';

export default function Navbar({ starredCount = 0, historyCount = 0, pendingTicketsCount = 0 }) {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition ${
      isActive
        ? 'bg-white text-slate-900 shadow-sm'
        : 'text-slate-600 hover:text-slate-900'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
      isActive ? 'bg-white text-slate-900 shadow-sm font-bold' : 'text-slate-600'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro-bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              BURS PRE-LODGMENT OPERATIONAL
            </span>
            <span className="hidden md:inline text-slate-400">Botswana DPA Section 74 Certified &bull; Offline Edge AI</span>
          </div>
          <div className="flex items-center gap-5 text-slate-300 text-[11px]">
            <a href="tel:+26772161038" className="hover:text-white transition flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-sky-400" />
              <span>+267 72161038</span>
            </a>
            <a href="mailto:gnakedi@bloodchain.life" className="hover:text-white transition flex items-center gap-1.5" title="Primary Corporate">
              <Mail className="w-3 h-3 text-sky-400" />
              <span>gnakedi@bloodchain.life</span>
            </a>
            <a href="mailto:taylith338@gmail.com" className="hover:text-white transition hidden lg:inline text-slate-400" title="Direct Engineering Desk">
              (alt: taylith338@gmail.com)
            </a>
            <span className="text-slate-500 hidden sm:inline">Gaborone, Botswana</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md shadow-slate-900/20">
            <Cpu className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-none">
              KALAHARI<span className="text-sky-600">.AI</span>
            </span>
            <span className="text-[10px] tracking-wider font-semibold text-slate-400 uppercase">
              Botswana Regulatory Portal
            </span>
          </div>
        </Link>

        {/* Desktop Route Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <NavLink to="/" className={navLinkClass} end>
            <Home className="w-4 h-4 text-slate-500" />
            <span>Overview</span>
          </NavLink>

          <NavLink to="/customs" className={navLinkClass}>
            <FileSpreadsheet className="w-4 h-4 text-sky-600" />
            <span>BURS Customs</span>
            {!isAuthenticated && <Lock className="w-3 h-3 text-slate-400 ml-0.5" />}
          </NavLink>

          <NavLink to="/tenders" className={navLinkClass}>
            <Radar className="w-4 h-4 text-sky-600" />
            <span>Friday Tenders</span>
            {!isAuthenticated && <Lock className="w-3 h-3 text-slate-400 ml-0.5" />}
          </NavLink>

          <NavLink to="/workspace" className={navLinkClass}>
            <History className="w-4 h-4 text-sky-600" />
            <span>Client Workspace</span>
            {!isAuthenticated ? (
              <Lock className="w-3 h-3 text-slate-400 ml-0.5" />
            ) : (
              (starredCount > 0 || historyCount > 0) && (
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              )
            )}
          </NavLink>

          {/* Admin Route Link (Only visible when authenticated as Administrator) */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition relative ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/60'
                }`
              }
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>Admin Desk</span>
              {pendingTicketsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 absolute -top-1 -right-1"></span>
              )}
            </NavLink>
          )}
        </nav>

        {/* Right CTA / Auth Status */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/26772161038"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Us</span>
          </a>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/workspace"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition"
              >
                <User className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden md:inline truncate max-w-[130px]">{currentUser?.company}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold text-slate-700 hover:text-slate-900 px-2.5 py-2 transition"
              >
                Sign In
              </Link>
              <Link
                to="/login?mode=register"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm transition"
              >
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span>Register Company</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sub-tabs */}
      <div className="flex md:hidden border-t border-slate-200 bg-slate-50 px-2 py-2 gap-1 justify-around text-xs font-semibold">
        <NavLink to="/" className={mobileNavLinkClass} end>Overview</NavLink>
        <NavLink to="/customs" className={mobileNavLinkClass}>Customs</NavLink>
        <NavLink to="/tenders" className={mobileNavLinkClass}>Tenders</NavLink>
        <NavLink to="/workspace" className={mobileNavLinkClass}>Workspace</NavLink>
        {isAdmin && (
          <NavLink to="/admin" className={({ isActive }) => `px-2.5 py-1.5 rounded-lg text-xs font-bold ${isActive ? 'bg-slate-900 text-white' : 'bg-amber-100 text-amber-900'}`}>Admin</NavLink>
        )}
      </div>
    </header>
  );
}
