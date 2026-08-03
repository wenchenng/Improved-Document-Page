import { DocumentItem, PaperlessSetting } from '../types';

export const mockDocuments: DocumentItem[] = [
  {
    id: 'DOC-2026-08-360',
    type: 'statement',
    title: '360 Account Monthly Statement',
    category: 'Deposit Accounts',
    accountName: 'OCBC 360 Account',
    accountNumber: '588-123456-001',
    date: '2026-08-01',
    monthYear: 'Aug 2026',
    fileSize: '1.4 MB',
    isNew: true,
    statementPeriod: '01 Aug 2026 - 31 Aug 2026',
    openingBalance: 'S$ 14,850.20',
    closingBalance: 'S$ 18,240.50',
    totalDeposits: 'S$ 6,500.00',
    totalWithdrawals: 'S$ 3,109.70',
    referenceNo: 'OCBC/360/202608/00918',
    transactions: [
      { date: '01 Aug 2026', description: 'Opening Balance Carried Forward', amount: '-', type: 'credit', balance: 'S$ 14,850.20' },
      { date: '02 Aug 2026', description: 'SALARY CREDIT - ACME CORP PTE LTD', amount: '+S$ 5,200.00', type: 'credit', balance: 'S$ 20,050.20' },
      { date: '05 Aug 2026', description: 'PAYNOW TO 91234567 - LUNCH EXPENSE', amount: '-S$ 42.50', type: 'debit', balance: 'S$ 20,007.70' },
      { date: '10 Aug 2026', description: 'GIRO - OCBC CREDIT CARD PAYMENT', amount: '-S$ 1,820.00', type: 'debit', balance: 'S$ 18,187.70' },
      { date: '15 Aug 2026', description: 'INTEREST CREDIT - 360 BONUS INTEREST', amount: '+S$ 1,300.00', type: 'credit', balance: 'S$ 19,487.70' },
      { date: '22 Aug 2026', description: 'NETS QR - FAIRPRICE SUPERMARKET', amount: '-S$ 187.20', type: 'debit', balance: 'S$ 19,300.50' },
      { date: '28 Aug 2026', description: 'GIRO - SP SERVICES UTILITIES', amount: '-S$ 1,060.00', type: 'debit', balance: 'S$ 18,240.50' }
    ]
  },
  {
    id: 'DOC-2026-08-FRANK',
    type: 'statement',
    title: 'FRANK Credit Card Statement',
    category: 'Credit Cards',
    accountName: 'FRANK Credit Card',
    accountNumber: '4541-XXXX-XXXX-9812',
    date: '2026-08-01',
    monthYear: 'Aug 2026',
    fileSize: '890 KB',
    isNew: true,
    statementPeriod: '01 Jul 2026 - 01 Aug 2026',
    openingBalance: 'S$ 1,820.00',
    closingBalance: 'S$ 2,140.80',
    totalDeposits: 'S$ 1,820.00',
    totalWithdrawals: 'S$ 2,140.80',
    referenceNo: 'OCBC/CC/202608/88219',
    transactions: [
      { date: '03 Jul 2026', description: 'NETFLIX SINGAPORE SUBSCRIPTION', amount: '-S$ 21.98', type: 'debit', balance: 'S$ 21.98' },
      { date: '10 Jul 2026', description: 'PAYMENT - THANK YOU VIA PAYNOW', amount: '+S$ 1,820.00', type: 'credit', balance: 'S$ 0.00' },
      { date: '14 Jul 2026', description: 'APPLE.COM/BILL - APPS & SERVICES', amount: '-S$ 14.98', type: 'debit', balance: 'S$ 14.98' },
      { date: '20 Jul 2026', description: 'GRAB* TRANSPORTATION SINGAPORE', amount: '-S$ 28.50', type: 'debit', balance: 'S$ 43.48' },
      { date: '25 Jul 2026', description: 'LAZADA SINGAPORE ONLINE STORE', amount: '-S$ 345.00', type: 'debit', balance: 'S$ 388.48' },
      { date: '30 Jul 2026', description: 'CHANEL BOUTIQUE MARINA BAY SANDS', amount: '-S$ 1,752.32', type: 'debit', balance: 'S$ 2,140.80' }
    ]
  },
  {
    id: 'DOC-2026-08-LOAN',
    type: 'statement',
    title: 'Home Loan Account Advice',
    category: 'Loans & Mortgages',
    accountName: 'OCBC Home Loan',
    accountNumber: '701-987654-001',
    date: '2026-08-02',
    monthYear: 'Aug 2026',
    fileSize: '650 KB',
    isNew: false,
    statementPeriod: '01 Aug 2026 - 31 Aug 2026',
    openingBalance: 'S$ 485,000.00',
    closingBalance: 'S$ 482,850.00',
    totalDeposits: 'S$ 2,150.00',
    totalWithdrawals: 'S$ 0.00',
    referenceNo: 'OCBC/HL/202608/55011',
    transactions: [
      { date: '01 Aug 2026', description: 'MONTHLY INSTALMENT REPAYMENT (CPF)', amount: '+S$ 1,500.00', type: 'credit', balance: 'S$ 483,500.00' },
      { date: '01 Aug 2026', description: 'MONTHLY INSTALMENT REPAYMENT (CASH)', amount: '+S$ 650.00', type: 'credit', balance: 'S$ 482,850.00' }
    ]
  },
  {
    id: 'DOC-2026-07-360',
    type: 'statement',
    title: '360 Account Monthly Statement',
    category: 'Deposit Accounts',
    accountName: 'OCBC 360 Account',
    accountNumber: '588-123456-001',
    date: '2026-07-01',
    monthYear: 'May 2026 to Aug 2026',
    fileSize: '1.3 MB',
    isNew: false,
    statementPeriod: '01 Jul 2026 - 31 Jul 2026',
    openingBalance: 'S$ 12,400.00',
    closingBalance: 'S$ 14,850.20',
    totalDeposits: 'S$ 5,800.00',
    totalWithdrawals: 'S$ 3,349.80',
    referenceNo: 'OCBC/360/202607/00742',
    transactions: [
      { date: '01 Jul 2026', description: 'Opening Balance', amount: '-', type: 'credit', balance: 'S$ 12,400.00' },
      { date: '02 Jul 2026', description: 'SALARY CREDIT - ACME CORP PTE LTD', amount: '+S$ 5,200.00', type: 'credit', balance: 'S$ 17,600.00' },
      { date: '15 Jul 2026', description: 'INTEREST CREDIT - 360 BONUS INTEREST', amount: '+S$ 600.00', type: 'credit', balance: 'S$ 18,200.00' },
      { date: '28 Jul 2026', description: 'CREDIT CARD GIRO BILL PAYMENT', amount: '-S$ 3,349.80', type: 'debit', balance: 'S$ 14,850.20' }
    ]
  },
  {
    id: 'DOC-2026-06-INVEST',
    type: 'statement',
    title: 'RoboInvest Portfolio Statement',
    category: 'Investments & Insurance',
    accountName: 'OCBC RoboInvest Growth Portfolio',
    accountNumber: 'INV-883921-99',
    date: '2026-06-30',
    monthYear: 'May 2026 to Aug 2026',
    fileSize: '2.1 MB',
    isNew: false,
    statementPeriod: '01 Jun 2026 - 30 Jun 2026',
    openingBalance: 'S$ 32,100.00',
    closingBalance: 'S$ 34,580.00',
    totalDeposits: 'S$ 1,000.00',
    totalWithdrawals: 'S$ 0.00',
    referenceNo: 'OCBC/INV/202606/33921',
    transactions: [
      { date: '01 Jun 2026', description: 'MONTHLY REGULAR SAVINGS PLAN (RSP)', amount: '+S$ 1,000.00', type: 'credit', balance: 'S$ 33,100.00' },
      { date: '30 Jun 2026', description: 'PORTFOLIO GAIN / REBALANCING', amount: '+S$ 1,480.00', type: 'credit', balance: 'S$ 34,580.00' }
    ]
  },
  // LETTERS
  {
    id: 'LET-2026-08-01',
    type: 'letter',
    title: 'Important Notice: Digital Banking Security Enhancements',
    category: 'Deposit Accounts',
    accountName: 'All Accounts',
    accountNumber: 'N/A',
    date: '2026-08-01',
    monthYear: 'Aug 2026',
    fileSize: '320 KB',
    isNew: true,
    referenceNo: 'OCBC/SEC/2026/0801',
    letterContent: `Dear Valued Customer,

We are writing to inform you of enhanced security measures being introduced to protect your online banking transactions.

Effective 15 August 2026:
1. One-token authentication will be required for high-risk transfers exceeding S$ 5,000.
2. Real-time push notification alerts will be sent for all online purchases and transfers.
3. Enhanced ScamShield safeguards have been integrated into your mobile banking app.

No action is required if you have already activated OneToken on your primary registered mobile device.

Thank you for banking with OCBC.

Yours faithfully,
OCBC Bank Customer Experience Team`
  },
  {
    id: 'LET-2026-07-15',
    type: 'letter',
    title: 'Annual Interest Rate Adjustment Notice',
    category: 'Loans & Mortgages',
    accountName: 'OCBC Home Loan',
    accountNumber: '701-987654-001',
    date: '2026-07-15',
    monthYear: 'May 2026 to Aug 2026',
    fileSize: '410 KB',
    isNew: false,
    referenceNo: 'OCBC/HL/NOT/202607',
    letterContent: `Dear Customer,

Re: Home Loan Account 701-987654-001

We refer to your Home Loan facility with OCBC Bank.

Please be advised that in accordance with prevailing market benchmark rates (SORA), the applicable interest rate for your Home Loan package will be adjusted from 2.85% p.a. to 2.75% p.a. effective 1 September 2026.

Your revised monthly instalment amount will be S$ 2,120.00 starting from September 2026.

Should you wish to review your financing options or convert to a fixed-rate package, please contact your loan specialist at 1800 363 3333.

Thank you.

OCBC Consumer Mortgages`
  },
  {
    id: 'LET-2026-05-10',
    type: 'letter',
    title: 'Tax Statement Advice (Year of Assessment 2026)',
    category: 'Deposit Accounts',
    accountName: '360 Account',
    accountNumber: '588-123456-001',
    date: '2026-05-10',
    monthYear: 'May 2026 to Aug 2026',
    fileSize: '510 KB',
    isNew: false,
    referenceNo: 'OCBC/TAX/YA2026/1029',
    letterContent: `Dear Customer,

Tax Statement Confirmation - Year of Assessment 2026

This is to confirm that the total interest credited to your OCBC 360 Account (588-123456-001) for the calendar year ended 31 December 2025 was S$ 1,420.50.

In Singapore, interest earned from bank savings accounts is tax-exempt for individuals. This statement is provided for your reference and personal records.

Yours sincerely,
OCBC Bank Tax Operations`
  }
];

export const initialPaperlessSettings: PaperlessSetting[] = [
  {
    accountId: '1',
    accountName: '360 Account',
    accountNumber: '588-123456-001',
    category: 'Deposit Accounts',
    isPaperless: true,
    emailNotify: true
  },
  {
    accountId: '2',
    accountName: 'FRANK Credit Card',
    accountNumber: '4541-XXXX-XXXX-9812',
    category: 'Credit Cards',
    isPaperless: true,
    emailNotify: true
  },
  {
    accountId: '3',
    accountName: 'OCBC Home Loan',
    accountNumber: '701-987654-001',
    category: 'Loans & Mortgages',
    isPaperless: true,
    emailNotify: false
  },
  {
    accountId: '4',
    accountName: 'RoboInvest Growth Portfolio',
    accountNumber: 'INV-883921-99',
    category: 'Investments & Insurance',
    isPaperless: true,
    emailNotify: true
  }
];
