import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Cpu, Phone, Mail, MessageSquare, User, FileSpreadsheet, 
  Radar, History, LogIn, LogOut, Home, ShieldAlert, Lock,
  ChevronDown, Menu, X, Sparkles, ShieldCheck
} from 'lucide-react';

export default function Navbar({ starredCount = 0, historyCount = 0, pendingTicketsCount = 0 }) {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all duration-200 ${
      isActive
        ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 font-bold'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
      isActive
        ? 'bg-sky-50 text-sky-900 font-bold border border-sky-200'
        : 'text-slate-700 hover:bg-slate-100'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      {/* Top Utility Announcement Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
              BURS PRE-LODGMENT READY
            </span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              Botswana Data Protection Act (DPA) Section 74 Certified &bull; Tlokweng &amp; Pioneer Gate
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <a 
              href="tel:+26772161038" 
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-sky-400" />
              <span>+267 72161038</span>
            </a>
            <span className="text-slate-600 hidden md:inline">&bull;</span>
            <a 
              href="mailto:gnakedi@bloodchain.life" 
              className="hover:text-white transition-colors flex items-center gap-1.5 hidden md:flex" 
              title="Primary Operations Desk"
            >
              <Mail className="w-3 h-3 text-sky-400" />
              <span>gnakedi@bloodchain.life</span>
            </a>
            <span className="text-slate-500 text-[10px] uppercase font-mono tracking-wider pl-1 hidden lg:inline">
              Gaborone, Botswana
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 flex items-center justify-center text-white shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform duration-200">
            <Cpu className="w-6 h-6 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                KALAHARI<span className="text-sky-600">.AI</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold tracking-wider bg-sky-100 text-sky-800 uppercase">
                BW
              </span>
            </div>
            <span className="text-[10px] tracking-wider font-semibold text-slate-400 uppercase block mt-0.5">
              Trade &amp; Regulatory Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Primary Nav Bar */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/90 shadow-inner">
          <NavLink to="/" className={navLinkClass} end>
            <Home className="w-4 h-4 text-slate-500" />
            <span>Overview</span>
          </NavLink>

          <NavLink to="/customs" className={navLinkClass}>
            <FileSpreadsheet className="w-4 h-4 text-sky-600" />
            <span>BURS Customs</span>
          </NavLink>

          <NavLink to="/tenders" className={navLinkClass}>
            <Radar className="w-4 h-4 text-sky-600" />
            <span>Friday Tenders</span>
          </NavLink>

          <NavLink to="/workspace" className={navLinkClass}>
            <History className="w-4 h-4 text-sky-600" />
            <span>Client Workspace</span>
            {isAuthenticated && (starredCount > 0 || historyCount > 0) && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            )}
            {!isAuthenticated && <Lock className="w-3 h-3 text-slate-400 ml-0.5 opacity-70" />}
          </NavLink>

          {/* Admin Operations Portal (Exclusively visible when authenticated as Administrator) */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all relative ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-300/80'
                }`
              }
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>Admin Desk</span>
              {pendingTicketsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-500 absolute -top-0.5 -right-0.5 animate-ping"></span>
              )}
            </NavLink>
          )}
        </nav>

        {/* Right Action / Auth Controls */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/26772161038"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition hover:shadow duration-200"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <Link
                to="/workspace"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-bold text-slate-800 transition"
              >
                <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
                  {currentUser?.company?.[0]?.toUpperCase() || 'C'}
                </div>
                <span className="truncate max-w-[120px] font-semibold">{currentUser?.company}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <Link
                to="/login"
                className="text-xs font-bold text-slate-700 hover:text-slate-900 px-3 py-2 rounded-xl hover:bg-slate-100 transition"
              >
                Sign In
              </Link>
              <Link
                to="/login?mode=register"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm shadow-slate-900/10 hover:shadow-md transition duration-200"
              >
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span>Register Firm</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          {isAuthenticated ? (
            <Link
              to="/workspace"
              className="p-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold"
            >
              <User className="w-4 h-4 text-sky-600" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <NavLink 
            to="/" 
            className={mobileNavLinkClass} 
            end 
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex items-center gap-2.5">
              <Home className="w-4 h-4 text-slate-500" />
              <span>Overview &amp; Solutions</span>
            </span>
          </NavLink>

          <NavLink 
            to="/customs" 
            className={mobileNavLinkClass} 
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-4 h-4 text-sky-600" />
              <span>BURS SAD 500 Customs</span>
            </span>
          </NavLink>

          <NavLink 
            to="/tenders" 
            className={mobileNavLinkClass} 
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex items-center gap-2.5">
              <Radar className="w-4 h-4 text-sky-600" />
              <span>Friday Tender Radar</span>
            </span>
          </NavLink>

          <NavLink 
            to="/workspace" 
            className={mobileNavLinkClass} 
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="flex items-center gap-2.5">
              <History className="w-4 h-4 text-sky-600" />
              <span>Client Vault &amp; Workspace</span>
            </span>
            {isAuthenticated ? (
              <span className="text-xs text-emerald-600 font-bold">Active</span>
            ) : (
              <Lock className="w-3.5 h-3.5 text-slate-400" />
            )}
          </NavLink>

          {isAdmin && (
            <NavLink 
              to="/admin" 
              className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${
                isActive ? 'bg-slate-900 text-white' : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Admin Operations Desk</span>
              </span>
              {pendingTicketsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-red-600 text-white font-extrabold">
                  {pendingTicketsCount}
                </span>
              )}
            </NavLink>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <a
              href="https://wa.me/26772161038"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp (+267 72161038)</span>
            </a>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="text-xs font-bold text-red-600 hover:text-red-700 px-3 py-2 rounded-xl"
              >
                Sign Out
              </button>
            ) : (
              <Link
                to="/login?mode=register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold text-slate-900 hover:text-sky-600 px-3 py-2 rounded-xl"
              >
                Register Firm
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
