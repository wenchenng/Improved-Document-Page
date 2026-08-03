import React from 'react';
import { PrimaryNav } from '../types';
import { ShieldCheck, FileSpreadsheet, ArrowRight, Wallet, ArrowLeftRight, TrendingUp, Headphones, PlusCircle, Gift, Sparkles } from 'lucide-react';

export const ENoticesView: React.FC<{ onViewDocument: (doc: any) => void }> = ({ onViewDocument }) => (
  <div className="space-y-6 max-w-4xl">
    <div>
      <div className="mb-2">
        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-900 uppercase border-t-2 border-[#ED1C24] pt-1">
          E-NOTICES & ALERTS
        </span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Electronic Notices & Important Advisories</h1>
      <p className="text-sm text-[#666666]">
        Official correspondence, rate adjustments, policy updates, and security announcements issued for your accounts.
      </p>
    </div>

    <div className="bg-white border border-[#E0E0E0] rounded-lg shadow-2xs divide-y divide-gray-200">
      <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Security Advisory: Digital Banking Protection Enhancements</h3>
            <p className="text-xs text-gray-500 mt-0.5">Issued 01 Aug 2026 • Ref: OCBC/SEC/2026/0801</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded shrink-0">Important</span>
      </div>

      <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Annual Interest Rate Adjustment Notice (Home Loan)</h3>
            <p className="text-xs text-gray-500 mt-0.5">Issued 15 Jul 2026 • Ref: OCBC/HL/NOT/202607</p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded shrink-0">Archived</span>
      </div>
    </div>
  </div>
);

export const TaxCertificatesView: React.FC = () => (
  <div className="space-y-6 max-w-4xl">
    <div>
      <div className="mb-2">
        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-900 uppercase border-t-2 border-[#ED1C24] pt-1">
          TAX CERTIFICATES
        </span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Interest & Income Tax Statements</h1>
      <p className="text-sm text-[#666666]">
        Download official tax advice statements for IRAS submission and personal accounting records.
      </p>
    </div>

    <div className="bg-white border border-[#E0E0E0] rounded-lg shadow-2xs divide-y divide-gray-200">
      <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-3">
          <FileSpreadsheet className="w-6 h-6 text-[#ED1C24]" />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Certificate of Interest Earned (Year of Assessment 2026)</h3>
            <p className="text-xs text-gray-500 mt-0.5 font-mono">Issued for: OCBC 360 Account (588-123456-001)</p>
          </div>
        </div>
        <button className="px-3.5 py-1.5 bg-[#ED1C24] text-white text-xs font-semibold rounded hover:bg-red-700 transition-colors">
          Download PDF
        </button>
      </div>

      <div className="p-4 sm:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-3">
          <FileSpreadsheet className="w-6 h-6 text-gray-400" />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">Certificate of Interest Earned (Year of Assessment 2025)</h3>
            <p className="text-xs text-gray-500 mt-0.5 font-mono">Issued for: OCBC 360 Account (588-123456-001)</p>
          </div>
        </div>
        <button className="px-3.5 py-1.5 bg-gray-100 text-gray-800 text-xs font-semibold rounded hover:bg-gray-200 transition-colors">
          Download PDF
        </button>
      </div>
    </div>
  </div>
);

export const PrimaryNavPlaceholder: React.FC<{ activeNav: PrimaryNav; onBackToDocs: () => void }> = ({
  activeNav,
  onBackToDocs,
}) => {
  const getNavMeta = () => {
    switch (activeNav) {
      case 'accounts':
        return {
          title: 'Accounts Summary & Balances',
          icon: <Wallet className="w-8 h-8 text-[#ED1C24]" />,
          items: [
            { name: 'OCBC 360 Account', bal: 'S$ 18,240.50', acc: '588-123456-001' },
            { name: 'FRANK Credit Card', bal: 'S$ -2,140.80', acc: '4541-XXXX-XXXX-9812' },
            { name: 'OCBC Home Loan', bal: 'S$ -482,850.00', acc: '701-987654-001' },
          ],
        };
      case 'transfers':
        return {
          title: 'Transfers & PayNow Payments',
          icon: <ArrowLeftRight className="w-8 h-8 text-[#ED1C24]" />,
          items: [
            { name: 'PayNow to Mobile / NRIC', bal: 'Instant Transfer', acc: 'SGD 0 Fee' },
            { name: 'Local Bank Transfer (FAST)', bal: 'Same Day', acc: 'All SG Banks' },
            { name: 'Overseas Telegraphic Transfer', bal: 'Global Remittance', acc: 'Multi-Currency' },
          ],
        };
      case 'investments':
        return {
          title: 'Investments & Insurance Wealth Portal',
          icon: <TrendingUp className="w-8 h-8 text-[#ED1C24]" />,
          items: [
            { name: 'OCBC RoboInvest Growth Portfolio', bal: 'S$ 34,580.00', acc: 'INV-883921-99' },
            { name: 'Unit Trusts & Blue Chip Shares', bal: 'S$ 12,400.00', acc: 'SGX Direct' },
          ],
        };
      case 'service':
        return {
          title: 'OCBC Customer Service & Support',
          icon: <Headphones className="w-8 h-8 text-[#ED1C24]" />,
          items: [
            { name: 'Submit Online Enquiry', bal: '24/7 Response', acc: 'Case Tracking' },
            { name: 'Block Lost Card / Report Scam', bal: 'Emergency Lock', acc: 'Instant OneToken' },
          ],
        };
      case 'apply':
        return {
          title: 'Apply for New Products',
          icon: <PlusCircle className="w-8 h-8 text-[#ED1C24]" />,
          items: [
            { name: 'OCBC 360 High Interest Account', bal: 'Up to 7.65% p.a.', acc: 'Instant Approval' },
            { name: 'FRANK Credit Card', bal: '6% Cashback', acc: 'Singpass MyInfo' },
          ],
        };
      case 'rewards':
        return {
          title: 'OCBC Rewards & Travel Miles',
          icon: <Gift className="w-8 h-8 text-[#ED1C24]" />,
          items: [
            { name: 'OCBC $ / VOYAGE Miles', bal: '24,800 Points', acc: 'Expires 2028' },
          ],
        };
      default:
        return {
          title: 'Portal Section',
          icon: <Sparkles className="w-8 h-8 text-[#ED1C24]" />,
          items: [],
        };
    }
  };

  const meta = getNavMeta();

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center space-x-3">
          {meta.icon}
          <div>
            <h1 className="text-xl font-bold text-gray-900">{meta.title}</h1>
            <p className="text-xs text-gray-500">OCBC Digital Banking Portal</p>
          </div>
        </div>
        <button
          onClick={onBackToDocs}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
          <span>Back to Statement/Letter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meta.items.map((item, idx) => (
          <div key={idx} className="bg-white border border-gray-200 p-5 rounded-lg shadow-2xs hover:border-gray-300 transition-all">
            <h3 className="font-bold text-gray-900 text-sm">{item.name}</h3>
            <p className="text-lg font-bold text-[#ED1C24] mt-1">{item.bal}</p>
            <p className="text-xs text-gray-500 font-mono mt-0.5">{item.acc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
