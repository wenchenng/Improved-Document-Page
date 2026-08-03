import React, { useState } from 'react';
import { DocumentItem, TabType } from '../types';
import { FileText, Download, Eye, Search, CheckSquare, Square, FileCheck, ArrowUpDown, Filter, Sparkles } from 'lucide-react';

interface DocumentListProps {
  documents: DocumentItem[];
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onViewDocument: (doc: DocumentItem) => void;
  onDownloadDocument: (doc: DocumentItem) => void;
}

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  activeTab,
  setActiveTab,
  onViewDocument,
  onDownloadDocument,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [sortByDate, setSortByDate] = useState<'desc' | 'asc'>('desc');

  // Filter documents by tab type, category/date, and search query
  const filteredDocs = documents
    .filter((doc) => {
      const isCorrectTab = activeTab === 'Statements' ? doc.type === 'statement' : doc.type === 'letter';
      if (!isCorrectTab) return false;

      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        doc.title.toLowerCase().includes(query) ||
        doc.accountName.toLowerCase().includes(query) ||
        doc.accountNumber.toLowerCase().includes(query) ||
        doc.monthYear.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortByDate === 'desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

  const handleSelectAll = () => {
    if (selectedDocIds.length === filteredDocs.length) {
      setSelectedDocIds([]);
    } else {
      setSelectedDocIds(filteredDocs.map((d) => d.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    if (selectedDocIds.includes(id)) {
      setSelectedDocIds(selectedDocIds.filter((item) => item !== id));
    } else {
      setSelectedDocIds([...selectedDocIds, id]);
    }
  };

  const handleBulkDownload = () => {
    const docsToDownload = filteredDocs.filter((d) => selectedDocIds.includes(d.id));
    docsToDownload.forEach((doc) => onDownloadDocument(doc));
  };

  return (
    <div>
      {/* BEGIN: Tabs */}
      <div className="border-b border-[#E0E0E0] mb-6">
        <div className="flex">
          <button
            onClick={() => {
              setActiveTab('Statements');
              setSelectedDocIds([]);
            }}
            className={`w-1/2 text-center py-4 text-base sm:text-lg transition-colors duration-150 cursor-pointer ${
              activeTab === 'Statements'
                ? 'border-b-3 border-[#ED1C24] font-bold text-gray-900 bg-gray-50/50'
                : 'text-[#666666] hover:text-black font-medium'
            }`}
          >
            Statements
          </button>
          <button
            onClick={() => {
              setActiveTab('Letters');
              setSelectedDocIds([]);
            }}
            className={`w-1/2 text-center py-4 text-base sm:text-lg transition-colors duration-150 cursor-pointer ${
              activeTab === 'Letters'
                ? 'border-b-3 border-[#ED1C24] font-bold text-gray-900 bg-gray-50/50'
                : 'text-[#666666] hover:text-black font-medium'
            }`}
          >
            Letters
          </button>
        </div>
      </div>
      {/* END: Tabs */}

      {/* Control Bar: Search, Sort & Bulk Download */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-gray-50 p-3 rounded-md border border-gray-200 text-xs sm:text-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab.toLowerCase()} by account name or keyword...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#ED1C24]"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end space-x-3">
          <button
            onClick={() => setSortByDate(sortByDate === 'desc' ? 'asc' : 'desc')}
            className="flex items-center space-x-1.5 px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-gray-700 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
            <span>Sort: {sortByDate === 'desc' ? 'Newest' : 'Oldest'}</span>
          </button>

          {filteredDocs.length > 0 && (
            <button
              onClick={handleSelectAll}
              className="flex items-center space-x-1.5 px-3 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100 text-gray-700 transition-colors"
            >
              {selectedDocIds.length === filteredDocs.length ? (
                <CheckSquare className="w-4 h-4 text-[#ED1C24]" />
              ) : (
                <Square className="w-4 h-4 text-gray-400" />
              )}
              <span className="hidden sm:inline">Select All</span>
            </button>
          )}

          {selectedDocIds.length > 0 && (
            <button
              onClick={handleBulkDownload}
              className="flex items-center space-x-1 px-3 py-2 bg-[#ED1C24] hover:bg-red-700 text-white rounded font-medium shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ({selectedDocIds.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Document Items List */}
      {filteredDocs.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-gray-200 rounded-lg my-6 bg-gray-50/50">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No {activeTab.toLowerCase()} found for selected filters.</p>
          <p className="text-xs text-gray-400 mt-1">Try selecting a broader date range or category above.</p>
        </div>
      ) : (
        <div className="space-y-3 mb-16">
          {filteredDocs.map((doc) => {
            const isSelected = selectedDocIds.includes(doc.id);
            return (
              <div
                key={doc.id}
                className={`border rounded-lg p-4 transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isSelected
                    ? 'border-[#ED1C24] bg-red-50/20 shadow-2xs'
                    : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/60'
                }`}
              >
                <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                  <button
                    onClick={() => handleToggleSelect(doc.id)}
                    className="mt-1 text-gray-400 hover:text-[#ED1C24] transition-colors"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5 text-[#ED1C24]" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>

                  <div className="p-2.5 bg-red-50 text-[#ED1C24] rounded-md shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base hover:text-[#ED1C24] cursor-pointer transition-colors" onClick={() => onViewDocument(doc)}>
                        {doc.title}
                      </h4>
                      {doc.isNew && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase tracking-wider">
                          New
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] font-medium rounded">
                        {doc.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1.5 flex-wrap gap-y-1">
                      <span>Acc: <strong className="text-gray-700">{doc.accountName}</strong> ({doc.accountNumber})</span>
                      <span>•</span>
                      <span>Period: <strong className="text-gray-700">{doc.monthYear}</strong></span>
                      <span>•</span>
                      <span>Size: {doc.fileSize}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 shrink-0 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => onViewDocument(doc)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-gray-600" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => onDownloadDocument(doc)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 bg-[#ED1C24] hover:bg-red-700 text-white text-xs font-semibold rounded shadow-2xs transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
