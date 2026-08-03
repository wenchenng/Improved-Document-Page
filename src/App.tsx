import React, { useState } from 'react';
import { PrimaryNav, SidebarNav, CategoryFilter, DateRangePreset, TabType, DocumentItem, PaperlessSetting } from './types';
import { mockDocuments, initialPaperlessSettings } from './data/mockDocuments';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { FilterSection } from './components/FilterSection';
import { DocumentList } from './components/DocumentList';
import { DocumentModal } from './components/DocumentModal';
import { ManageDocuments } from './components/ManageDocuments';
import { ENoticesView, TaxCertificatesView, PrimaryNavPlaceholder } from './components/SecondaryViews';

export default function App() {
  const [primaryNav, setPrimaryNav] = useState<PrimaryNav | null>(null);
  const [sidebarNav, setSidebarNav] = useState<SidebarNav>('view-documents');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All Products');
  const [selectedDateRange, setSelectedDateRange] = useState<DateRangePreset>('Aug 2026 to Aug 2026');
  const [activeTab, setActiveTab] = useState<TabType>('Statements');
  
  const [documents, setDocuments] = useState<DocumentItem[]>(mockDocuments);
  const [paperlessSettings, setPaperlessSettings] = useState<PaperlessSetting[]>(initialPaperlessSettings);
  const [selectedModalDoc, setSelectedModalDoc] = useState<DocumentItem | null>(null);

  // Filter documents based on Category and Date Range filters
  const filteredDocuments = documents.filter((doc) => {
    // Category match
    if (selectedCategory !== 'All Products' && doc.category !== selectedCategory) {
      return false;
    }

    // Date range match
    if (selectedDateRange === 'Aug 2026 to Aug 2026') {
      return doc.monthYear === 'Aug 2026';
    } else if (selectedDateRange === 'May 2026 to Aug 2026') {
      return doc.monthYear === 'Aug 2026' || doc.monthYear === 'May 2026 to Aug 2026';
    } else if (selectedDateRange === 'Jan 2026 to Aug 2026') {
      return true; // All 2026 sample docs
    } else if (selectedDateRange === 'Year 2025') {
      return doc.date.startsWith('2025');
    }

    return true;
  });

  const handleDownloadDocument = (doc: DocumentItem) => {
    // Mark as downloaded
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, downloaded: true, isNew: false } : d))
    );

    // Create a text file download
    const content = `OCBC BANK e-STATEMENT / OFFICIAL DOCUMENT
======================================================
Ref: ${doc.referenceNo || 'N/A'}
Document Title: ${doc.title}
Account: ${doc.accountName} (${doc.accountNumber})
Date Issued: ${doc.date}
Period: ${doc.statementPeriod || 'N/A'}

Opening Balance: ${doc.openingBalance || 'N/A'}
Closing Balance: ${doc.closingBalance || 'N/A'}

Transactions / Content:
${doc.transactions?.map(t => `${t.date} | ${t.description.padEnd(35)} | ${t.amount} | Bal: ${t.balance}`).join('\n') || doc.letterContent || 'No transactions listed.'}

======================================================
Confidential - Oversea-Chinese Banking Corporation Limited
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/\s+/g, '_')}_${doc.monthYear.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleViewDocument = (doc: DocumentItem) => {
    // Mark as read/viewed
    setDocuments((prev) =>
      prev.map((d) => (d.id === doc.id ? { ...d, isNew: false } : d))
    );
    setSelectedModalDoc(doc);
  };

  return (
    <div className="bg-white text-gray-800 antialiased min-h-screen flex flex-col font-sans selection:bg-[#ED1C24] selection:text-white">
      {/* BEGIN: MainHeader */}
      <Header
        activeNav={primaryNav || 'accounts'}
        setActiveNav={(nav) => setPrimaryNav(nav)}
        onNotificationClick={() => {
          setPrimaryNav(null);
          setSidebarNav('e-notices');
        }}
      />
      {/* END: MainHeader */}

      {/* BEGIN: PageLayout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row min-h-[calc(100vh-120px)] w-full">
        {/* BEGIN: Sidebar */}
        <Sidebar
          activeSidebar={sidebarNav}
          setActiveSidebar={(nav) => {
            setSidebarNav(nav);
            setPrimaryNav(null);
          }}
          documentCount={documents.length}
        />
        {/* END: Sidebar */}

        {/* BEGIN: ContentArea */}
        <main className="flex-1 pt-6 md:pt-10 px-4 sm:px-8 lg:px-12 pb-16 overflow-x-hidden" data-purpose="main-content">
          {primaryNav ? (
            <PrimaryNavPlaceholder
              activeNav={primaryNav}
              onBackToDocs={() => setPrimaryNav(null)}
            />
          ) : (
            <>
              {sidebarNav === 'view-documents' && (
                <>
                  {/* Section Breadcrumb/Sub-label */}
                  <div className="mb-2">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-gray-900 uppercase border-t-2 border-[#ED1C24] pt-1 inline-block">
                      VIEW STATEMENT/LETTER
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-8">View Statement/Letter</h1>

                  {/* BEGIN: FilterSection */}
                  <FilterSection
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedDateRange={selectedDateRange}
                    setSelectedDateRange={setSelectedDateRange}
                  />
                  {/* END: FilterSection */}

                  {/* BEGIN: DocumentList */}
                  <DocumentList
                    documents={filteredDocuments}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onViewDocument={handleViewDocument}
                    onDownloadDocument={handleDownloadDocument}
                  />
                  {/* END: DocumentList */}
                </>
              )}

              {sidebarNav === 'manage-documents' && (
                <ManageDocuments
                  settings={paperlessSettings}
                  onSaveSettings={(updated) => setPaperlessSettings(updated)}
                />
              )}

              {sidebarNav === 'e-notices' && (
                <ENoticesView onViewDocument={handleViewDocument} />
              )}

              {sidebarNav === 'tax-statements' && (
                <TaxCertificatesView />
              )}
            </>
          )}
        </main>
        {/* END: ContentArea */}
      </div>
      {/* END: PageLayout */}

      {/* PDF Document Viewer Modal */}
      <DocumentModal
        document={selectedModalDoc}
        onClose={() => setSelectedModalDoc(null)}
      />
    </div>
  );
}
