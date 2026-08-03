import React from 'react';
import { PrimaryNav } from '../types';
import { User, LogOut, Bell, Search } from 'lucide-react';

interface HeaderProps {
  activeNav: PrimaryNav;
  setActiveNav: (nav: PrimaryNav) => void;
  onNotificationClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeNav, setActiveNav, onNotificationClick }) => {
  return (
    <header className="border-b border-[#E0E0E0] bg-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with Logo & Quick User Profile */}
        <div className="py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Logo container matching prompt clip-path or styled fallback */}
            <div className="flex items-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6GtlV3E9QrUPcIh9WG0DjmFPOLOmSR5T3YmM1LlBpbkql1g6Ik3h5iuHVA824pmb0QoWTC3xGoEA-9dXp1DCgHr5V9sXrq7_fJlpclTEqfbSterFacZMTHsq8wlJFsrvchBmwFvQjAdqr9QxH9VbB3snhfg7abRdTeYutCqjwoxukGckpS7a6AA5rlDaBh9RNblcI6Nv5WbRAnhz_sbABuPsZ0rBorfCSfyL9p8eOqopodysc68CMOx_sXxJ01N4wQpA"
                alt="OCBC Logo"
                className="h-10 object-contain object-left"
                style={{ maxWidth: '150px', clipPath: 'inset(0 75% 0 0)' }}
                onError={(e) => {
                  // Fallback logo if image fails to render
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.logo-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'logo-fallback flex items-center gap-2 text-[#ED1C24] font-bold text-2xl tracking-tighter';
                    fallback.innerHTML = `<span class="bg-[#ED1C24] text-white px-2 py-1 rounded text-lg font-black">OCBC</span><span class="text-gray-800 text-sm font-semibold tracking-normal hidden sm:inline">Bank</span>`;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs sm:text-sm text-[#666666]">
            <button 
              onClick={onNotificationClick} 
              className="relative p-2 text-gray-600 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ED1C24] rounded-full"></span>
            </button>
            <div className="hidden md:flex items-center space-x-2 border-l border-gray-200 pl-4">
              <User className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-800">Welcome, Tan Ah Kow</span>
            </div>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-[#ED1C24] transition-colors border-l border-gray-200 pl-4">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="flex items-center text-xs sm:text-sm font-medium text-[#666666] overflow-x-auto scrollbar-none border-t border-gray-100">
          <button
            onClick={() => setActiveNav('accounts')}
            className={`px-4 py-3.5 hover:text-black border-r border-[#E0E0E0] whitespace-nowrap transition-colors ${
              activeNav === 'accounts' ? 'text-black font-semibold bg-gray-50/80 border-b-2 border-b-[#ED1C24]' : ''
            }`}
          >
            View accounts
          </button>
          <button
            onClick={() => setActiveNav('transfers')}
            className={`px-4 py-3.5 hover:text-black border-r border-[#E0E0E0] whitespace-nowrap transition-colors ${
              activeNav === 'transfers' ? 'text-black font-semibold bg-gray-50/80 border-b-2 border-b-[#ED1C24]' : ''
            }`}
          >
            Transfers & payments
          </button>
          <button
            onClick={() => setActiveNav('investments')}
            className={`px-4 py-3.5 hover:text-black border-r border-[#E0E0E0] whitespace-nowrap transition-colors ${
              activeNav === 'investments' ? 'text-black font-semibold bg-gray-50/80 border-b-2 border-b-[#ED1C24]' : ''
            }`}
          >
            Investments & insurance
          </button>
          <button
            onClick={() => setActiveNav('service')}
            className={`px-4 py-3.5 hover:text-black border-r border-[#E0E0E0] whitespace-nowrap transition-colors ${
              activeNav === 'service' ? 'text-black font-semibold bg-gray-50/80 border-b-2 border-b-[#ED1C24]' : ''
            }`}
          >
            Customer service
          </button>
          <button
            onClick={() => setActiveNav('apply')}
            className={`px-4 py-3.5 hover:text-black border-r border-[#E0E0E0] whitespace-nowrap transition-colors ${
              activeNav === 'apply' ? 'text-black font-semibold bg-gray-50/80 border-b-2 border-b-[#ED1C24]' : ''
            }`}
          >
            Apply
          </button>
          <button
            onClick={() => setActiveNav('rewards')}
            className={`px-4 py-3.5 hover:text-black whitespace-nowrap transition-colors ${
              activeNav === 'rewards' ? 'text-black font-semibold bg-gray-50/80 border-b-2 border-b-[#ED1C24]' : ''
            }`}
          >
            Rewards
          </button>
        </nav>
      </div>
    </header>
  );
};
