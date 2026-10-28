import React from 'react';
import { useApp } from '../../context/AppContext';
import { CURRENCIES } from '../../data/initialData';
import { CurrencyCode, UserRole } from '../../types';
import {
  Shield,
  Smartphone,
  Monitor,
  AlertTriangle,
  PhoneCall,
  UserCheck,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onOpenEmergency: () => void;
  onOpenAIReport: () => void;
  onOpenAddProperty: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEmergency,
  onOpenAIReport,
}) => {
  const {
    role,
    setRole,
    deviceMode,
    setDeviceMode,
    currency,
    setCurrency,
    activeProperty,
    activeEmergency
  } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#0c1613]/90 backdrop-blur-xl border-b border-emerald-900/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-900 border border-emerald-400/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              {/* Kerala Roof Silhouette SVG Icon */}
              <svg className="w-6 h-6 text-emerald-200" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 11h3v10h16V11h3L12 2zm0 3.7l6 4.9V19h-3v-5H9v5H6v-8.4l6-4.9z" />
              </svg>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-[#0c1613] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-900" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white font-['Outfit']">
                  My<span className="gold-gradient-text">Veedu</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                  NRI Guardian
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
                Remote Property & Land Manager for Kerala Homes
              </p>
            </div>
          </div>

          {/* Center: Quick Switcher Bar (Role & Device Simulation) */}
          <div className="hidden md:flex items-center gap-2 bg-[#12211c]/90 p-1 rounded-2xl border border-emerald-900/40 shadow-inner">
            {/* Role Selectors */}
            <button
              onClick={() => setRole('customer')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                role === 'customer'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/40'
              }`}
            >
              <span>🏠</span>
              <span>NRI Client</span>
            </button>

            <button
              onClick={() => setRole('worker')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                role === 'worker'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/40'
              }`}
            >
              <span>👷</span>
              <span>Field Partner</span>
            </button>

            <button
              onClick={() => setRole('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                role === 'admin'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/40'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Ops Control</span>
            </button>
          </div>

          {/* Right Section: Currency, Device Toggle, Emergency & Manager */}
          <div className="flex items-center gap-2.5">
            
            {/* Device Viewport Toggle (Desktop ↔ Mobile Frame) */}
            <button
              onClick={() => setDeviceMode(deviceMode === 'desktop' ? 'mobile_ios' : 'desktop')}
              title={deviceMode === 'desktop' ? 'Switch to iPhone 16 Pro View' : 'Switch to Desktop Full View'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-[#14231f] text-emerald-300 border border-emerald-800/40 hover:border-emerald-500/50 hover:bg-[#192c27] transition-all"
            >
              {deviceMode === 'desktop' ? (
                <>
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span className="hidden lg:inline text-[11px]">iOS App Mode</span>
                </>
              ) : (
                <>
                  <Monitor className="w-4 h-4 text-emerald-400" />
                  <span className="hidden lg:inline text-[11px]">Desktop Mode</span>
                </>
              )}
            </button>

            {/* Currency Picker */}
            <div className="relative group">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="appearance-none bg-[#14231f] text-slate-200 text-xs font-bold pl-2.5 pr-7 py-1.5 rounded-xl border border-emerald-800/40 focus:outline-none focus:border-emerald-400 cursor-pointer transition-all"
              >
                {Object.values(CURRENCIES).map((curr) => (
                  <option key={curr.code} value={curr.code} className="bg-[#12211c] text-white">
                    {curr.flag} {curr.code} ({curr.symbol.trim()})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* AI Diagnostics Fast Button */}
            <button
              onClick={onOpenAIReport}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-900/60 to-teal-900/60 border border-emerald-500/30 text-emerald-300 hover:text-white hover:border-emerald-400 transition-all shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>AI Vision Scan</span>
            </button>

            {/* Emergency 1-Tap Trigger */}
            <button
              onClick={onOpenEmergency}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white transition-all shadow-lg ${
                activeEmergency
                  ? 'bg-rose-600 animate-pulse border border-rose-400'
                  : 'bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 border border-rose-500/40'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 animate-bounce" />
              <span className="hidden sm:inline">Monsoon Emergency</span>
              <span className="sm:hidden">Alert</span>
            </button>

            {/* Manager Direct Call Quick Pill */}
            {activeProperty?.dedicatedManager && (
              <a
                href={`tel:${activeProperty.dedicatedManager.phone}`}
                className="hidden xl:flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-emerald-500 transition-all"
                title="Call your dedicated Kerala property guardian"
              >
                <img
                  src={activeProperty.dedicatedManager.avatar}
                  alt={activeProperty.dedicatedManager.name}
                  className="w-6 h-6 rounded-full object-cover border border-emerald-400/40"
                />
                <div className="text-left leading-tight">
                  <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <UserCheck className="w-2.5 h-2.5" /> Guardian
                  </p>
                  <p className="text-[11px] font-bold text-slate-200 truncate max-w-[90px]">
                    {activeProperty.dedicatedManager.name.split(' ')[0]}
                  </p>
                </div>
                <PhoneCall className="w-3 h-3 text-emerald-400 ml-0.5" />
              </a>
            )}
          </div>
        </div>

        {/* Mobile Sub-bar for Role Selection on Small Screens */}
        <div className="md:hidden flex items-center justify-between pb-3 pt-1 border-t border-emerald-950/60">
          <div className="flex items-center gap-1.5 w-full">
            {(['customer', 'worker', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-1 rounded-lg text-[11px] font-bold text-center capitalize transition-all ${
                  role === r
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-[#12211c] text-slate-400 border border-emerald-900/30'
                }`}
              >
                {r === 'customer' ? '🏠 Client' : r === 'worker' ? '👷 Worker' : '🛡️ Admin'}
              </button>
            ))}
          </div>
        </div>

      </div>
    </header>
  );
};
