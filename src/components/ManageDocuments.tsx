import React, { useState } from 'react';
import { PaperlessSetting } from '../types';
import { Settings, Shield, Mail, CheckCircle2, AlertCircle, Save, Smartphone, Lock } from 'lucide-react';

interface ManageDocumentsProps {
  settings: PaperlessSetting[];
  onSaveSettings: (updated: PaperlessSetting[]) => void;
}

export const ManageDocuments: React.FC<ManageDocumentsProps> = ({ settings, onSaveSettings }) => {
  const [localSettings, setLocalSettings] = useState<PaperlessSetting[]>(settings);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pdfPasswordEnabled, setPdfPasswordEnabled] = useState(true);

  const handleTogglePaperless = (id: string) => {
    setLocalSettings((prev) =>
      prev.map((item) => (item.accountId === id ? { ...item, isPaperless: !item.isPaperless } : item))
    );
  };

  const handleToggleEmail = (id: string) => {
    setLocalSettings((prev) =>
      prev.map((item) => (item.accountId === id ? { ...item, emailNotify: !item.emailNotify } : item))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(localSettings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <div className="mb-2">
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-900 uppercase border-t-2 border-[#ED1C24] pt-1">
            MANAGE STATEMENT/LETTER
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Paperless & Statement Delivery Preferences</h1>
        <p className="text-sm text-[#666666]">
          Go green with OCBC e-Statements. Manage your paperless subscription, statement email notifications, and PDF password security.
        </p>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center space-x-3 text-emerald-800 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Your paperless delivery and security preferences have been updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Paperless Toggle Table */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg shadow-2xs overflow-hidden">
          <div className="bg-gray-50 p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 text-sm flex items-center space-x-2">
              <Shield className="w-4 h-4 text-[#ED1C24]" />
              <span>e-Statement Subscriptions by Account</span>
            </h3>
            <span className="text-xs text-gray-500 font-medium">All accounts recommended on e-Statement</span>
          </div>

          <div className="divide-y divide-gray-200">
            {localSettings.map((item) => (
              <div key={item.accountId} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/50">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 text-sm">{item.accountName}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{item.category}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-mono">Account No: {item.accountNumber}</p>
                </div>

                <div className="flex items-center space-x-6 shrink-0 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                  {/* Email Alert Toggle */}
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <label className="text-xs text-gray-700 font-medium cursor-pointer">
                      Email Alert
                    </label>
                    <input
                      type="checkbox"
                      checked={item.emailNotify}
                      onChange={() => handleToggleEmail(item.accountId)}
                      className="w-4 h-4 text-[#ED1C24] rounded border-gray-300 focus:ring-[#ED1C24]"
                    />
                  </div>

                  {/* e-Statement Switch */}
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-semibold ${item.isPaperless ? 'text-emerald-700' : 'text-gray-500'}`}>
                      {item.isPaperless ? 'e-Statement' : 'Printed Mail'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleTogglePaperless(item.accountId)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        item.isPaperless ? 'bg-[#ED1C24]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          item.isPaperless ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Preferences */}
        <div className="bg-white border border-[#E0E0E0] rounded-lg p-5 shadow-2xs space-y-4">
          <h3 className="font-bold text-gray-800 text-sm flex items-center space-x-2">
            <Lock className="w-4 h-4 text-[#ED1C24]" />
            <span>Document Security & Password Protection</span>
          </h3>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
            <div>
              <p className="text-xs font-semibold text-gray-900">Encrypt downloaded PDF files with NRIC / FIN password</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Downloaded e-Statements will require your registered NRIC/FIN to open.</p>
            </div>
            <input
              type="checkbox"
              checked={pdfPasswordEnabled}
              onChange={(e) => setPdfPasswordEnabled(e.target.checked)}
              className="w-4 h-4 text-[#ED1C24] rounded border-gray-300 focus:ring-[#ED1C24]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-[#ED1C24] hover:bg-red-700 text-white font-semibold text-sm rounded shadow-sm transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
