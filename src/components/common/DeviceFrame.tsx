import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Wifi,
  BatteryMedium,
  Home,
  Layers,
  Wrench,
  AlertOctagon,
  Sparkles,
  Smartphone
} from 'lucide-react';

interface DeviceFrameProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onOpenEmergency?: () => void;
  onOpenServices?: () => void;
  onOpenAI?: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  activeTab = 'home',
  onTabChange,
  onOpenEmergency,
  onOpenServices,
  onOpenAI
}) => {
  const { deviceMode, setDeviceMode } = useApp();

  if (deviceMode === 'desktop') {
    return <div className="w-full flex-1 flex flex-col">{children}</div>;
  }

  // Mobile / iOS Simulation Frame Mode
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center py-6 px-2 sm:px-4 bg-[#080d0c]">
      
      {/* Device Switcher Banner on top */}
      <div className="mb-4 flex items-center justify-between gap-4 w-full max-w-[430px] px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-800/40 text-xs text-emerald-300">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold">iPhone 16 Pro Simulation</span>
        </div>
        <button
          onClick={() => setDeviceMode('desktop')}
          className="px-2.5 py-0.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-all"
        >
          Exit to Full Web
        </button>
      </div>

      {/* iPhone 16 Pro Frame Shell */}
      <div className="relative w-full max-w-[420px] h-[860px] max-h-[92vh] bg-[#0b1311] rounded-[50px] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_50px_rgba(16,185,129,0.15)] border-[5px] border-[#22352f] ring-1 ring-emerald-500/20 flex flex-col overflow-hidden">
        
        {/* Dynamic Island & Status Bar */}
        <div className="relative z-30 pt-3 px-6 pb-2 flex items-center justify-between text-xs font-semibold text-white bg-[#0b1311]">
          {/* iOS Clock */}
          <span className="text-[13px] tracking-tight font-bold">{currentTime}</span>

          {/* Dynamic Island Pill */}
          <div className="w-28 h-6 rounded-full bg-black border border-slate-800 flex items-center justify-between px-2 shadow-inner">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-slate-700 flex items-center justify-center">
              <span className="w-1 h-1 rounded-full bg-blue-900" />
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] text-emerald-400 font-mono tracking-tighter">MyVeedu</span>
            </div>
          </div>

          {/* iOS Status Icons */}
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="text-[10px] font-bold">5G</span>
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Scrollable iOS Content Body */}
        <div className="flex-1 overflow-y-auto no-scrollbar pb-20 relative">
          {children}
        </div>

        {/* iOS Native Bottom Navigation Bar */}
        <div className="absolute bottom-0 inset-x-0 h-18 bg-[#0d1815]/95 backdrop-blur-2xl border-t border-emerald-900/40 px-3 py-1 flex items-center justify-around z-30">
          <button
            onClick={() => onTabChange?.('home')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-all ${
              activeTab === 'home' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onOpenServices?.()}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-all ${
              activeTab === 'services' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wrench className="w-5 h-5" />
            <span>Services</span>
          </button>

          {/* Floating Emergency Action in Bottom Center */}
          <button
            onClick={() => onOpenEmergency?.()}
            className="-mt-5 w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 border-2 border-[#0d1815] text-white flex items-center justify-center shadow-lg shadow-rose-900/60 active:scale-95 transition-all"
            title="Monsoon Emergency Alert"
          >
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </button>

          <button
            onClick={() => onOpenAI?.()}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-all ${
              activeTab === 'ai' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>AI Report</span>
          </button>

          <button
            onClick={() => onTabChange?.('land')}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-medium transition-all ${
              activeTab === 'land' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span>Land & Plot</span>
          </button>
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="absolute bottom-1 inset-x-0 flex justify-center pointer-events-none z-40">
          <div className="w-32 h-1 rounded-full bg-slate-500/60" />
        </div>

      </div>
    </div>
  );
};
