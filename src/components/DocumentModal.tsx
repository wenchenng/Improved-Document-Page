import React, { useState } from 'react';
import { DocumentItem } from '../types';
import { X, Download, Printer, ZoomIn, ZoomOut, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

interface DocumentModalProps {
  document: DocumentItem | null;
  onClose: () => void;
}

export const DocumentModal: React.FC<DocumentModalProps> = ({ document, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!document) return null;

  const handleDownload = () => {
    setDownloadSuccess(true);
    // Create a mock text file download or trigger print
    const content = `OCBC BANK e-STATEMENT / OFFICIAL DOCUMENT
======================================================
Ref: ${document.referenceNo || 'N/A'}
Document Title: ${document.title}
Account: ${document.accountName} (${document.accountNumber})
Date Issued: ${document.date}
Period: ${document.statementPeriod || 'N/A'}

Opening Balance: ${document.openingBalance || 'N/A'}
Closing Balance: ${document.closingBalance || 'N/A'}

Transactions:
${document.transactions?.map(t => `${t.date} | ${t.description.padEnd(35)} | ${t.amount} | Bal: ${t.balance}`).join('\n') || document.letterContent || 'No transactions listed.'}

======================================================
Confidential - Oversea-Chinese Banking Corporation Limited
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.title.replace(/\s+/g, '_')}_${document.monthYear.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#525659] rounded-lg shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-gray-800">
        
        {/* PDF Viewer Top Action Bar */}
        <div className="bg-[#323639] text-white px-4 py-3 flex items-center justify-between shrink-0 text-sm">
          <div className="flex items-center space-x-3 truncate mr-4">
            <FileText className="w-5 h-5 text-red-500 shrink-0" />
            <div className="truncate">
              <h3 className="font-medium text-xs sm:text-sm truncate">{document.title}</h3>
              <p className="text-[11px] text-gray-400">{document.accountName} ({document.accountNumber})</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center space-x-1 bg-black/30 px-2 py-1 rounded text-xs">
              <button 
                onClick={() => setZoomLevel(prev => Math.max(75, prev - 15))}
                className="hover:text-gray-300 p-1"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-mono">{zoomLevel}%</span>
              <button 
                onClick={() => setZoomLevel(prev => Math.min(150, prev + 15))}
                className="hover:text-gray-300 p-1"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded text-xs transition-colors"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1 bg-[#ED1C24] hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors shadow-xs"
              title="Download Statement"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-gray-300 hover:text-white ml-2"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Statement downloaded successfully as PDF reference file.</span>
            </div>
            <button onClick={() => setDownloadSuccess(false)} className="underline">Dismiss</button>
          </div>
        )}

        {/* PDF Page Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-[#525659]">
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="bg-white shadow-2xl p-6 sm:p-10 w-full max-w-3xl min-h-[850px] transition-transform duration-200 text-gray-900 border border-gray-200 relative flex flex-col justify-between"
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-4 select-none">
              <span className="text-8xl font-black rotate-[-30deg] tracking-widest text-gray-900">OCBC BANK</span>
            </div>

            <div>
              {/* Document Header */}
              <div className="flex justify-between items-start border-b-2 border-[#ED1C24] pb-6 mb-8">
                <div>
                  <div className="text-3xl font-black tracking-tighter text-[#ED1C24]">OCBC<span className="text-gray-800 text-base font-medium tracking-normal ml-1">Bank</span></div>
                  <p className="text-[11px] text-gray-500 mt-1">Oversea-Chinese Banking Corporation Limited</p>
                  <p className="text-[10px] text-gray-400">Co. Reg. No. 193200032W</p>
                </div>
                <div className="text-right">
                  <h2 className="text-lg font-bold text-gray-900 uppercase tracking-tight">{document.type === 'statement' ? 'ACCOUNT STATEMENT' : 'OFFICIAL NOTICE'}</h2>
                  <p className="text-xs font-semibold text-[#ED1C24] mt-0.5">{document.monthYear}</p>
                  <p className="text-[11px] text-gray-500 mt-1">Ref: {document.referenceNo}</p>
                </div>
              </div>

              {/* Customer & Account Details */}
              <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded border border-gray-200 mb-8 text-xs">
                <div>
                  <p className="font-bold text-gray-800 uppercase tracking-wider text-[10px] text-gray-500 mb-1">Account Holder</p>
                  <p className="font-semibold text-gray-900 text-sm">TAN AH KOW</p>
                  <p className="text-gray-600">123 ORCHARD ROAD</p>
                  <p className="text-gray-600">#12-34 ORCHARD RESIDENCES</p>
                  <p className="text-gray-600">SINGAPORE 238888</p>
                </div>
                <div className="border-l border-gray-200 pl-4 space-y-1">
                  <div>
                    <span className="text-gray-500">Account Type:</span>{' '}
                    <span className="font-semibold text-gray-800">{document.accountName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Account Number:</span>{' '}
                    <span className="font-mono font-semibold text-gray-800">{document.accountNumber}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Statement Period:</span>{' '}
                    <span className="font-medium text-gray-800">{document.statementPeriod || document.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Currency:</span>{' '}
                    <span className="font-semibold text-gray-800">SGD</span>
                  </div>
                </div>
              </div>

              {/* Statement Summary Section (If Statement) */}
              {document.type === 'statement' && (
                <div className="mb-8">
                  <h3 className="font-bold text-xs uppercase text-gray-500 tracking-wider mb-2">Account Balance Summary</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-red-50/50 p-4 rounded border border-red-100 text-center">
                    <div>
                      <p className="text-[11px] text-gray-500">Opening Balance</p>
                      <p className="font-bold text-sm text-gray-800">{document.openingBalance || 'S$ 0.00'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500">Total Credits (+)</p>
                      <p className="font-bold text-sm text-emerald-700">{document.totalDeposits || 'S$ 0.00'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500">Total Debits (-)</p>
                      <p className="font-bold text-sm text-red-600">{document.totalWithdrawals || 'S$ 0.00'}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-500">Closing Balance</p>
                      <p className="font-bold text-sm text-[#ED1C24]">{document.closingBalance || 'S$ 0.00'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Transactions Table or Letter Body */}
              {document.type === 'statement' && document.transactions ? (
                <div>
                  <h3 className="font-bold text-xs uppercase text-gray-500 tracking-wider mb-3">Transaction Details</h3>
                  <div className="border border-gray-200 rounded overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-[10px] font-bold">
                        <tr>
                          <th className="p-2.5">Date</th>
                          <th className="p-2.5">Description</th>
                          <th className="p-2.5 text-right">Amount (SGD)</th>
                          <th className="p-2.5 text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {document.transactions.map((tx, idx) => (
                          <tr key={idx} className="hover:bg-gray-50/80">
                            <td className="p-2.5 text-gray-600 font-mono text-[11px] whitespace-nowrap">{tx.date}</td>
                            <td className="p-2.5 font-medium text-gray-800">{tx.description}</td>
                            <td className={`p-2.5 text-right font-semibold whitespace-nowrap ${tx.type === 'credit' ? 'text-emerald-700' : 'text-gray-900'}`}>
                              {tx.amount}
                            </td>
                            <td className="p-2.5 text-right text-gray-600 font-mono text-[11px] whitespace-nowrap">{tx.balance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50/60 p-6 rounded border border-gray-200 whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                  {document.letterContent}
                </div>
              )}
            </div>

            {/* Document Footer */}
            <div className="pt-8 border-t border-gray-200 mt-12 text-[10px] text-gray-400 flex justify-between items-center">
              <div className="flex items-center space-x-1.5 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Digitally Authenticated OCBC Bank e-Statement</span>
              </div>
              <div>Page 1 of 1</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
