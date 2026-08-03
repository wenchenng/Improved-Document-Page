import React from 'react';
import { SidebarNav } from '../types';
import { ChevronRight, FileText, Settings, ShieldAlert, FileSpreadsheet } from 'lucide-react';

interface SidebarProps {
  activeSidebar: SidebarNav;
  setActiveSidebar: (nav: SidebarNav) => void;
  documentCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSidebar, setActiveSidebar, documentCount = 0 }) => {
  return (
    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E0E0E0] pt-6 md:pt-10 px-2 sm:px-4 shrink-0 bg-white" data-purpose="sidebar-navigation">
      <h2 className="text-xl font-semibold mb-6 px-4 text-gray-900">Statement/Letter</h2>
      <nav className="space-y-1">
        {/* View Documents */}
        <button
          onClick={() => setActiveSidebar('view-documents')}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-150 ${
            activeSidebar === 'view-documents'
              ? 'bg-gray-50 text-blue-700 font-medium border-r-4 border-blue-600 shadow-xs'
              : 'text-[#666666] hover:text-black hover:bg-gray-50/50'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <FileText className={`w-4 h-4 ${activeSidebar === 'view-documents' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span>View Statement/Letter</span>
          </div>
          <ChevronRight className={`w-4 h-4 ${activeSidebar === 'view-documents' ? 'text-blue-600' : 'text-gray-400'}`} />
        </button>

        {/* Manage Documents */}
        <button
          onClick={() => setActiveSidebar('manage-documents')}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-150 ${
            activeSidebar === 'manage-documents'
              ? 'bg-gray-50 text-blue-700 font-medium border-r-4 border-blue-600 shadow-xs'
              : 'text-[#666666] hover:text-black hover:bg-gray-50/50'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <Settings className={`w-4 h-4 ${activeSidebar === 'manage-documents' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span>Manage Statement/Letter</span>
          </div>
          {activeSidebar === 'manage-documents' && <ChevronRight className="w-4 h-4 text-blue-600" />}
        </button>

        {/* e-Notices */}
        <button
          onClick={() => setActiveSidebar('e-notices')}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-150 ${
            activeSidebar === 'e-notices'
              ? 'bg-gray-50 text-blue-700 font-medium border-r-4 border-blue-600 shadow-xs'
              : 'text-[#666666] hover:text-black hover:bg-gray-50/50'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <ShieldAlert className={`w-4 h-4 ${activeSidebar === 'e-notices' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span>e-Notices & Alerts</span>
          </div>
          {activeSidebar === 'e-notices' && <ChevronRight className="w-4 h-4 text-blue-600" />}
        </button>

        {/* Tax Statements */}
        <button
          onClick={() => setActiveSidebar('tax-statements')}
          className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-all duration-150 ${
            activeSidebar === 'tax-statements'
              ? 'bg-gray-50 text-blue-700 font-medium border-r-4 border-blue-600 shadow-xs'
              : 'text-[#666666] hover:text-black hover:bg-gray-50/50'
          }`}
        >
          <div className="flex items-center space-x-2.5">
            <FileSpreadsheet className={`w-4 h-4 ${activeSidebar === 'tax-statements' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span>Tax Certificates</span>
          </div>
          {activeSidebar === 'tax-statements' && <ChevronRight className="w-4 h-4 text-blue-600" />}
        </button>
      </nav>

      {/* Quick Security Badge at Sidebar Bottom */}
      <div className="mt-12 p-4 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 space-y-2 hidden md:block">
        <div className="flex items-center space-x-1.5 font-semibold text-gray-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Paperless Active</span>
        </div>
        <p className="leading-relaxed text-gray-500 text-[11px]">
          Your e-Statements are protected with 256-bit SSL encryption.
        </p>
      </div>
    </aside>
  );
};
