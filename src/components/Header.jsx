import React, { useState, useEffect } from 'react';
import { CheckSquare, Bell, ShieldCheck, User } from 'lucide-react';

export default function Header() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString('en-US', options));
  }, []);

  return (
    <header className="bg-[#1e3a8a] text-white shadow-lg sticky top-0 z-40 border-b border-blue-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-900/40 border border-blue-400/30">
            <CheckSquare className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                Task Tracker
              </h1>
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-blue-200/80 font-normal mt-0.5 hidden sm:block">
              Daily Workflow & Productivity Hub
            </p>
          </div>
        </div>

        {/* Right Tools & User Profile */}
        <div className="flex items-center gap-3">
          {/* Live Date Chip */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900/60 border border-blue-700/50 text-xs text-blue-200 font-medium">
            <span>{currentDate || 'Today'}</span>
          </div>

          {/* Sync Status Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-800/60 border border-blue-700/40 text-[11px] text-blue-100 font-medium"
            title="Local browser storage active & in sync"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Storage Synced</span>
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-blue-800/80">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-sm ring-2 ring-white/20 cursor-pointer">
              JD
            </div>
            <div className="hidden lg:block text-left text-xs leading-tight">
              <span className="block font-semibold text-white">John Doe</span>
              <span className="block text-[10px] text-blue-200/70">Personal Space</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
