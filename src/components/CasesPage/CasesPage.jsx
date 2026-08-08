import React, { useState, useEffect } from 'react';
import './CasesPage.css';
import fileIllustration from '../../assets/Fowgate Folder/File Illustration.svg';
import NewCaseModal from '../modals/NewCaseModal/NewCaseModal';
import { 
  List, 
  LayoutGrid, 
  Search, 
  ChevronDown, 
  Plus,
  Mail,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Upload,
  Send
} from 'lucide-react';

const initialMockCases = [];

const getCaseThreadMessages = (caseData) => {
  const subjectName = caseData.subject?.name || 'Sophia Bennett';
  const title = caseData.title || '';
  const dateStr = caseData.dateCreated || '18 Jul, 2026';
  const descriptionText = caseData.description || `Regarding the case: ${title}`;
  const ccStr = caseData.cc && caseData.cc.length > 0 ? caseData.cc.join('; ') : '-';

  return [
    {
      id: 1,
      from: 'HR Department',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80&h=80',
      title: title || 'Query For Case',
      to: subjectName,
      cc: ccStr,
      date: `${dateStr}, 09:15 AM`,
      body: descriptionText,
      signature: 'HR Department'
    }
  ];
};

const getFormattedDateTime = () => {
  const d = new Date();
  const day = d.getDate().toString().padStart(2, '0');
  const month = d.toLocaleDateString('en-US', { month: 'short' });
  const year = d.getFullYear();
  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const timeStr = `${hours}:${minutes} ${ampm}`;
  return `${day} ${month}, ${year}, ${timeStr}`;
};

export default function CasesPage() {
  const [cases, setCases] = useState(() => {
    const saved = sessionStorage.getItem('fowgate_cases');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Filter out mock cases so only user's manual input cases remain
      const userCases = parsed.filter(c => !['CS-8392', 'CS-4839', 'CS-1928', 'CS-9284', 'CS-7463', 'CS-7858'].includes(c.id));
      return userCases;
    }
    return initialMockCases;
  });

  const [layout, setLayout] = useState('list'); // 'list' or 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStatusFilter, setActiveStatusFilter] = useState('All'); // 'All', 'Open', 'Pending', 'Closed'
  const [selectedMonth, setSelectedMonth] = useState('JUN, 2026');
  
  // Selection states
  const [selectedCaseIds, setSelectedCaseIds] = useState([]);

  // Dropdown states
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [activeActionsMenu, setActiveActionsMenu] = useState(null); // stores case.id

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseForDetail, setSelectedCaseForDetail] = useState(null);
  const [typedMessage, setTypedMessage] = useState('');

  const handleSendMessage = (caseId, text) => {
    if (!text.trim()) return;
    
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const currentMessages = c.messages || getCaseThreadMessages(c);
        const newMsg = {
          id: Date.now(),
          from: 'HR Department',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80&h=80',
          title: `RE: ${c.title}`,
          to: c.subject?.name || 'Sophia Bennett',
          cc: '-',
          date: getFormattedDateTime(),
          body: text,
          signature: 'HR Department'
        };
        return {
          ...c,
          messages: [...currentMessages, newMsg]
        };
      }
      return c;
    }));
    
    setTypedMessage('');
  };

  // Sync cases to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('fowgate_cases', JSON.stringify(cases));
  }, [cases]);

  // Click outside handlers for custom dropdowns
  useEffect(() => {
    const handleOutsideClick = () => {
      setIsFilterDropdownOpen(false);
      setIsMonthDropdownOpen(false);
      setActiveActionsMenu(null);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleAddCase = (newCase) => {
    // Add default resolutionTime if not present
    const updatedCase = {
      ...newCase,
      resolutionTime: newCase.resolutionTime || '-'
    };
    setCases(prev => [updatedCase, ...prev]);
  };

  const handleDeleteCase = (id) => {
    setCases(prev => prev.filter(c => c.id !== id));
    setActiveActionsMenu(null);
    setSelectedCaseIds(prev => prev.filter(item => item !== id));
  };

  const handleUpdateStatus = (id, newStatus) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    setActiveActionsMenu(null);
  };

  // Status mapping to match Figma's labels
  const getFigmaStatus = (status) => {
    const s = status.toLowerCase();
    if (s === 'open' || s === 'unresolved') return 'Unresolved';
    if (s === 'pending' || s === 'ongoing') return 'Ongoing';
    if (s === 'closed' || s === 'resolved') return 'Resolved';
    return status;
  };

  // Filter & Search logic
  const filteredCases = cases.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category.toLowerCase().includes(searchQuery.toLowerCase());
                          
    const figmaStatus = getFigmaStatus(c.status);
    
    // Status filter options in dropdown are: 'All', 'Open' (matches Unresolved), 'Pending' (matches Ongoing), 'Closed' (matches Resolved)
    let matchesStatus = false;
    if (activeStatusFilter === 'All') {
      matchesStatus = true;
    } else if (activeStatusFilter === 'Open') {
      matchesStatus = figmaStatus === 'Unresolved';
    } else if (activeStatusFilter === 'Pending') {
      matchesStatus = figmaStatus === 'Ongoing';
    } else if (activeStatusFilter === 'Closed') {
      matchesStatus = figmaStatus === 'Resolved';
    }
    
    // Simple month filtering simulation:
    const matchesMonth = true; 
    
    return matchesSearch && matchesStatus && matchesMonth;
  });

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    const figmaStatus = getFigmaStatus(status).toLowerCase();
    if (figmaStatus === 'unresolved') return 'status-unresolved';
    if (figmaStatus === 'ongoing') return 'status-ongoing';
    if (figmaStatus === 'resolved') return 'status-resolved';
    return '';
  };

  const handleSelectAllToggle = () => {
    if (selectedCaseIds.length === filteredCases.length) {
      setSelectedCaseIds([]);
    } else {
      setSelectedCaseIds(filteredCases.map(c => c.id));
    }
  };

  const handleRowSelectToggle = (id, e) => {
    e.stopPropagation();
    setSelectedCaseIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const months = ['JAN, 2026', 'FEB, 2026', 'MAR, 2026', 'APR, 2026', 'MAY, 2026', 'JUN, 2026', 'JUL, 2026', 'AUG, 2026'];

  return (
    <div className="cases-page-container">
      <div className="cases-card">
        {/* Header / Controls Area */}
        <div className="cases-card-header">
          <div className="header-left">
            <h2 className="cases-title">Case Management</h2>
            
            {/* Search Input */}
            <div className="cases-search-box">
              <input 
                type="text" 
                placeholder="Search here..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              <Search className="search-icon-inside" size={16} />
            </div>
          </div>

          <div className="header-right">
            {/* Layout Toggles */}
            <div className="layout-toggle-group">
              <button 
                className={`layout-btn ${layout === 'list' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setLayout('list'); }}
                title="List View"
              >
                <List size={18} />
              </button>
              <button 
                className={`layout-btn ${layout === 'grid' ? 'active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setLayout('grid'); }}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
            </div>

            {/* Filter Dropdown */}
            <div className="custom-dropdown-container">
              <button 
                className="dropdown-trigger-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMonthDropdownOpen(false);
                  setIsFilterDropdownOpen(!isFilterDropdownOpen);
                }}
              >
                <span>Filter: {activeStatusFilter}</span>
                <ChevronDown size={14} />
              </button>
              {isFilterDropdownOpen && (
                <div className="dropdown-menu-list" onClick={(e) => e.stopPropagation()}>
                  {['All', 'Open', 'Pending', 'Closed'].map(status => (
                    <div 
                      key={status}
                      className={`dropdown-menu-item ${activeStatusFilter === status ? 'active' : ''}`}
                      onClick={() => {
                        setActiveStatusFilter(status);
                        setIsFilterDropdownOpen(false);
                      }}
                    >
                      {status === 'Open' ? 'Unresolved' : status === 'Pending' ? 'Ongoing' : status === 'Closed' ? 'Resolved' : 'All'}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date / Month Picker Dropdown */}
            <div className="custom-dropdown-container">
              <button 
                className="dropdown-trigger-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFilterDropdownOpen(false);
                  setIsMonthDropdownOpen(!isMonthDropdownOpen);
                }}
              >
                <span>{selectedMonth}</span>
                <ChevronDown size={14} />
              </button>
              {isMonthDropdownOpen && (
                <div className="dropdown-menu-list dropdown-months" onClick={(e) => e.stopPropagation()}>
                  {months.map(m => (
                    <div 
                      key={m}
                      className={`dropdown-menu-item ${selectedMonth === m ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedMonth(m);
                        setIsMonthDropdownOpen(false);
                      }}
                    >
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* New Case Button */}
            <button 
              className="new-case-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={16} />
              <span>New Case</span>
            </button>
          </div>
        </div>

        {/* Sub-toolbar Row matching Figma */}
        <div className="cases-toolbar-subrow">
          <div className="toolbar-left">
            <div className="toolbar-checkbox-wrapper">
              <input 
                type="checkbox" 
                className="toolbar-checkbox"
                checked={selectedCaseIds.length === filteredCases.length && filteredCases.length > 0}
                onChange={handleSelectAllToggle}
              />
              <ChevronDown size={14} className="checkbox-arrow" />
            </div>
            <div className="toolbar-divider"></div>
            <button className="toolbar-action-btn" title="Email Selected">
              <Mail size={16} />
            </button>
            <button className="toolbar-action-btn" title="Message Selected">
              <MessageSquare size={16} />
            </button>
          </div>
          <div className="toolbar-right">
            <span className="pagination-text">1-6 of {filteredCases.length}</span>
            <div className="pagination-arrows">
              <button className="pagination-btn disabled" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="pagination-btn disabled" disabled>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="cases-card-body">
          {filteredCases.length === 0 ? (
            /* Empty State matching Figma */
            <div className="cases-empty-state">
              <div className="empty-illustration-wrapper">
                <img src={fileIllustration} alt="No case report illustration" />
              </div>
              <div className="empty-text-wrapper">
                <h3 className="empty-title">No case report</h3>
                <p className="empty-subtitle">Use the "New Case" button</p>
              </div>
            </div>
          ) : layout === 'list' ? (
            /* Table/List Layout */
            <div className="cases-table-responsive">
              <table className="cases-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>
                      <input 
                        type="checkbox" 
                        className="toolbar-checkbox"
                        checked={selectedCaseIds.length === filteredCases.length && filteredCases.length > 0}
                        onChange={handleSelectAllToggle}
                      />
                    </th>
                    <th>Date Created</th>
                    <th>Case Title</th>
                    <th>Case Type</th>
                    <th>Resolution Time</th>
                    <th>Subject</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCases.map(c => (
                    <tr key={c.id} className="case-table-row" onClick={() => setSelectedCaseForDetail(c)}>
                      <td onClick={(e) => e.stopPropagation()} style={{ width: '40px' }}>
                        <input 
                          type="checkbox" 
                          className="toolbar-checkbox"
                          checked={selectedCaseIds.includes(c.id)}
                          onChange={(e) => handleRowSelectToggle(c.id, e)}
                        />
                      </td>
                      <td className="case-date-col">{c.dateCreated}</td>
                      <td className="case-title-col">
                        <div className="case-title-text">{c.title}</div>
                      </td>
                      <td className="case-type-col">
                        {c.category}
                      </td>
                      <td className="case-resolution-col">
                        {c.resolutionTime || '-'}
                      </td>
                      <td className="case-subject-col">
                        <div className="subject-profile-wrapper">
                          <img 
                            src={c.subject?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80&h=80'} 
                            alt={c.subject?.name || 'Sophia Bennett'} 
                            className="subject-avatar"
                          />
                          <span className="subject-name">{c.subject?.name || 'Sophia Bennett'}</span>
                        </div>
                      </td>
                      <td className="case-priority-col">
                        <div className="priority-signal-wrapper">
                          <div className={`priority-signal-bars ${c.priority?.toLowerCase()}`}>
                            <span className="bar bar1"></span>
                            <span className="bar bar2"></span>
                            <span className="bar bar3"></span>
                          </div>
                          <span className={`priority-text-label ${c.priority?.toLowerCase()}`}>{c.priority}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`case-badge-status-figma ${getStatusClass(c.status)}`}>
                          {getFigmaStatus(c.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Grid Layout */
            <div className="cases-grid-layout">
              {filteredCases.map(c => (
                <div key={c.id} className="case-grid-card figma-style-card" onClick={() => setSelectedCaseForDetail(c)}>
                  {/* Card Header Section */}
                  <div className="figma-card-header">
                    <h4 className="figma-card-title">
                      {c.id} - {c.title}
                    </h4>
                    <div className="figma-header-actions" onClick={(e) => e.stopPropagation()}>
                      {c.status.toLowerCase() === 'open' && (
                        <span className="figma-badge-new">NEW</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Card Body Section */}
                  <div className="figma-card-body">
                    {/* Row 1: Subject and Last Updated */}
                    <div className="figma-body-row">
                      <div className="figma-body-col">
                        <span className="figma-field-label">Subject:</span>
                        <div className="figma-field-value user-profile">
                          <img 
                            src={c.subject?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80&h=80'} 
                            alt={c.subject?.name || 'Sophia Bennett'} 
                            className="figma-user-avatar"
                          />
                          <span className="figma-user-name">{c.subject?.name || 'Sophia Bennett'}</span>
                        </div>
                      </div>
                      <div className="figma-body-col">
                        <span className="figma-field-label">Last Updated:</span>
                        <span className="figma-field-value">{c.dateCreated}</span>
                      </div>
                    </div>
                    
                    {/* Row 2: Case Type and Priority */}
                    <div className="figma-body-row">
                      <div className="figma-body-col">
                        <span className="figma-field-label">Case Type:</span>
                        <span className="figma-field-value">{c.category}</span>
                      </div>
                      <div className="figma-body-col">
                        <span className="figma-field-label">Priority:</span>
                        <div className="figma-field-value priority-value">
                          <div className={`figma-priority-icon ${c.priority.toLowerCase()}`}>
                            <span className="bar bar-short"></span>
                            <span className="bar bar-medium"></span>
                            <span className="bar bar-tall"></span>
                          </div>
                          <span>{c.priority}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Row 3: Resolution Time and Status */}
                    <div className="figma-body-row figma-body-footer">
                      <div className="figma-body-col inline-field">
                        <span className="figma-field-label">Resolution Time:</span>
                        <span className="figma-field-value">{c.resolutionTime || '-'}</span>
                      </div>
                      <div className="figma-body-col text-right">
                        <span className={`figma-status-badge ${getFigmaStatus(c.status).toLowerCase()}`}>
                          {getFigmaStatus(c.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* New Case Modal */}
      {isModalOpen && (
        <NewCaseModal 
          onClose={() => setIsModalOpen(false)}
          onSubmitCase={handleAddCase}
        />
      )}

      {/* Case Details Sliding Thread Drawer */}
      {selectedCaseForDetail && (() => {
        const activeCase = cases.find(c => c.id === selectedCaseForDetail.id);
        if (!activeCase) return null;
        const messages = activeCase.messages || getCaseThreadMessages(activeCase);
        
        return (
          <div className="case-thread-overlay" onClick={() => setSelectedCaseForDetail(null)}>
            <div className="case-thread-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="case-thread-header">
                <h3 className="case-thread-title">Case Thread</h3>
                <button 
                  type="button" 
                  className="case-thread-close-btn" 
                  onClick={() => setSelectedCaseForDetail(null)}
                >
                  &times;
                </button>
              </div>
              
              <div className="case-thread-body hide-scrollbar">
                {messages.map((msg, index, arr) => {
                  const isFirstMsg = index === 0;
                  const displayTo = isFirstMsg ? activeCase.subject?.name : msg.to;
                  const displayCc = activeCase.cc && activeCase.cc.length > 0 ? activeCase.cc.join('; ') : '-';
                  const displayFrom = 'HR Department';
                  const displaySignature = 'HR Department';
                  const displayAvatar = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80&h=80';

                  return (
                    <div key={msg.id || index} className="thread-message-item">
                      <div className="message-header-row">
                        <img src={displayAvatar} alt={displayFrom} className="message-avatar" />
                        <div className="message-header-text">
                          <div className="message-title-row">
                            <span className="message-title">{msg.title}</span>
                            <span className="message-date">{msg.date}</span>
                          </div>
                          <div className="message-to">TO: {displayTo}</div>
                          <div className="message-cc">CC: {displayCc}</div>
                        </div>
                      </div>
                      
                      <div className="message-body">
                        <p>{msg.body}</p>
                        <div className="message-salutation">
                          <p>Kind Regards,</p>
                          <p>{displaySignature}</p>
                        </div>
                        <div className="signature-line-wrapper">
                          <span className="sig-handwritten">{displaySignature.toLowerCase().replace(/\s/g, '')}</span>
                          <div className="sig-line"></div>
                        </div>
                      </div>
                      
                      {index < arr.length - 1 && <div className="message-divider" />}
                    </div>
                  );
                })}
              </div>

              {/* Type Message input box */}
              <div className="thread-input-wrapper">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(activeCase.id, typedMessage);
                  }}
                  className="thread-input-box-wrapper"
                >
                  <div className="thread-input-field-container">
                    <input 
                      type="text" 
                      placeholder="Type message..." 
                      value={typedMessage}
                      onChange={(e) => setTypedMessage(e.target.value)}
                    />
                    <button type="button" className="thread-attach-btn" title="Attach file">
                      <Upload size={16} />
                    </button>
                  </div>
                  <button type="submit" className="thread-send-btn-round" title="Send message">
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
