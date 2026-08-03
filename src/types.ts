export type PrimaryNav = 
  | 'accounts' 
  | 'transfers' 
  | 'investments' 
  | 'service' 
  | 'apply' 
  | 'rewards';

export type SidebarNav = 
  | 'view-documents' 
  | 'manage-documents' 
  | 'e-notices' 
  | 'tax-statements';

export type CategoryFilter = 
  | 'All Products' 
  | 'Deposit Accounts' 
  | 'Credit Cards' 
  | 'Loans & Mortgages' 
  | 'Investments & Insurance';

export type DateRangePreset = 
  | 'Aug 2026 to Aug 2026'
  | 'May 2026 to Aug 2026'
  | 'Jan 2026 to Aug 2026'
  | 'Year 2025'
  | 'Custom Date Range';

export type TabType = 'Statements' | 'Letters';

export interface DocumentItem {
  id: string;
  type: 'statement' | 'letter';
  title: string;
  category: CategoryFilter;
  accountName: string;
  accountNumber: string;
  date: string; // YYYY-MM-DD or formatted
  monthYear: string; // e.g., "Aug 2026"
  fileSize: string;
  isNew?: boolean;
  downloaded?: boolean;
  // Detail data for PDF preview
  statementPeriod?: string;
  openingBalance?: string;
  closingBalance?: string;
  totalDeposits?: string;
  totalWithdrawals?: string;
  transactions?: Array<{
    date: string;
    description: string;
    amount: string;
    type: 'credit' | 'debit';
    balance: string;
  }>;
  letterContent?: string;
  referenceNo?: string;
}

export interface PaperlessSetting {
  accountId: string;
  accountName: string;
  accountNumber: string;
  category: string;
  isPaperless: boolean;
  emailNotify: boolean;
}
