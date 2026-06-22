import { useState, useRef, useEffect } from 'react';
import './ExpenseClaimsPage.css';
import fileIllustration from '../../assets/Fowgate Folder/File Illustration.svg';
import plusIcon from '../../assets/Fowgate Folder/add-01.svg';
import AddEditClaimModal from '../modals/AddEditClaimModal/AddEditClaimModal';
import CancelClaimModal from '../modals/CancelClaimModal/CancelClaimModal';
import { ClaimSuccessModal, SubmitConfirmModal } from '../modals/ClaimStatusModal/ClaimStatusModal';
import ViewDetailModal from '../modals/ViewDetailModal/ViewDetailModal';
import { getAttachmentMeta } from '../modals/attachmentUtils';

// Custom calendar and metric card icons
import calendarIcon from '../../assets/Fowgate Folder/calendar-03.svg';
import totalClaimsIcon from '../../assets/Fowgate Folder/Total claims.svg';
import totalReimbursedIcon from '../../assets/Fowgate Folder/Total reimbursed.svg';
import balanceToReimburseIcon from '../../assets/Fowgate Folder/Balance to Reimburse.svg';
import totalNumberClaimsIcon from '../../assets/Fowgate Folder/user-multiple-02.svg';
import searchIcon from '../../assets/Fowgate Folder/search-normal.svg';
import arrowUpRight from '../../assets/Fowgate Folder/arrow-up-right-03.svg';


export default function ExpenseClaimsPage() {
  const [claims, setClaims] = useState(() => {
    const savedClaims = sessionStorage.getItem('expense_claims');
    if (savedClaims) {
      try {
        return JSON.parse(savedClaims).filter((claim) => claim.id !== 'CL-1234');
      } catch (e) {
        console.error("Failed to parse saved claims:", e);
      }
    }
    return [];
  });

  useEffect(() => {
    sessionStorage.setItem('expense_claims', JSON.stringify(claims));
  }, [claims]);
  const CLAIMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageDirection, setPageDirection] = useState('forward');
  const [dropdownOpenFor, setDropdownOpenFor] = useState(null);
  const [viewModalClaim, setViewModalClaim] = useState(null);
  const [modalMode, setModalMode] = useState('add');
  const [editClaimId, setEditClaimId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [claimToCancel, setClaimToCancel] = useState(null);
  const [cancelStatus, setCancelStatus] = useState('confirm');
  const [formStatus, setFormStatus] = useState('editing');
  const [modalStep, setModalStep] = useState(1);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [formErrors, setFormErrors] = useState({});
  const [newClaim, setNewClaim] = useState({
    purpose: '',
    extraNote: '',
    date: '',
    rawDate: ''
  });

  const parseDateToRaw = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split(' ');
    if (parts.length < 3) return '';
    const day = parts[0];
    const monthStr = parts[1].replace(',', '');
    const year = parts[2];
    const monthMap = { JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06', JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12' };
    const month = monthMap[monthStr.toUpperCase()];
    if (!month) return '';
    return `${year}-${month}-${day.padStart(2, '0')}`;
  };

  const formatDisplayDate = (date = new Date()) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };
  const [categories, setCategories] = useState([
    { id: 1, type: '', amount: '', details: '', isExpanded: true }
  ]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // --- Calendar Date Picker State ---
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 4, 1)); // Default to May 2026
  const dateButtonRef = useRef(null);
  const dateIconRef = useRef(null);
  const calendarRef = useRef(null);
  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dateButtonRef.current && !dateButtonRef.current.contains(e.target) &&
        dateIconRef.current && !dateIconRef.current.contains(e.target) &&
        calendarRef.current && !calendarRef.current.contains(e.target)
      ) {
        setIsDateDropdownOpen(false);
      }
    };
    if (isDateDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDateDropdownOpen]);

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
  };

  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const offset = firstDay === 0 ? 6 : firstDay - 1; // Mon=0, Sun=6
    const days = [];
    for (let i = 0; i < offset; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const calendarDays = getCalendarDays(calendarDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleSelectDate = (day) => {
    if (!day) return;
    const year = calendarDate.getFullYear();
    const monthIndex = calendarDate.getMonth();
    const monthMap = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const formattedDate = `${day.toString().padStart(2, '0')} ${monthMap[monthIndex]}, ${year}`;
    const rawDate = `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    setNewClaim({ ...newClaim, date: formattedDate, rawDate: rawDate });
    setFormErrors((errors) => ({ ...errors, date: '' }));
    setIsDateDropdownOpen(false);
  };

  const isSelectedDate = (day) => {
    if (!day || !newClaim.rawDate) return false;
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const dateToCheck = new Date(year, month, day);
    const selectedParts = newClaim.rawDate.split('-');
    if (selectedParts.length !== 3) return false;
    return dateToCheck.getFullYear() === parseInt(selectedParts[0]) &&
      dateToCheck.getMonth() === parseInt(selectedParts[1]) - 1 &&
      dateToCheck.getDate() === parseInt(selectedParts[2]);
  };
  // -----------------------------------

  // Calculate dynamic totals based on claim list
  const totalClaimsCount = claims.length;
  const totalClaimsAmount = claims.reduce((sum, claim) => sum + parseFloat(claim.amount || 0), 0);
  const totalReimbursedAmount = claims
    .filter(claim => claim.status === 'Approved')
    .reduce((sum, claim) => sum + parseFloat(claim.amount || 0), 0);
  const balanceToReimburse = totalClaimsAmount - totalReimbursedAmount;

  // Pagination derived values
  const totalPages = Math.max(1, Math.ceil(claims.length / CLAIMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedClaims = claims.slice((safePage - 1) * CLAIMS_PER_PAGE, safePage * CLAIMS_PER_PAGE);

  const goToPage = (page) => {
    if (page === currentPage) return;
    setPageDirection(page > currentPage ? 'forward' : 'backward');
    setCurrentPage(page);
    setDropdownOpenFor(null);
  };

  // Format helper for Naira currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(value).replace('NGN', '₦');
  };

  const handleView = (claim) => {
    setViewModalClaim(claim);
    setDropdownOpenFor(null);
  };

  const handleEdit = (claim) => {
    setModalMode('edit');
    setEditClaimId(claim.id);
    setNewClaim({
      purpose: claim.purpose,
      extraNote: claim.extraNote || '',
      date: claim.date,
      rawDate: claim.rawDate || parseDateToRaw(claim.date)
    });
    setCategories(claim.categories && claim.categories.length > 0 ? claim.categories : [
      { id: Date.now(), type: claim.category || '', amount: claim.amount, details: '', isExpanded: true }
    ]);
    setModalStep(1);
    setFormStatus('editing');
    setFormErrors({});
    setUploadedFiles(claim.attachments || []);
    setIsModalOpen(true);
    setDropdownOpenFor(null);
  };

  const resetClaimForm = () => {
    setModalStep(1);
    setFormStatus('editing');
    setNewClaim({ purpose: '', extraNote: '', date: '', rawDate: '' });
    setCategories([{ id: 1, type: '', amount: '', details: '', isExpanded: true }]);
    setUploadedFiles([]);
    setFormErrors({});
  };

  const closeClaimModal = () => {
    setIsModalOpen(false);
    resetClaimForm();
  };

  const handleCancelClaim = (claimId) => {
    setClaimToCancel(claimId);
    setCancelStatus('confirm');
    setDropdownOpenFor(null);
  };

  const confirmCancelClaim = () => {
    if (claimToCancel) {
      setClaims(claims.filter(c => c.id !== claimToCancel));
      setCancelStatus('success');
    }
  };

  const closeCancelSuccess = () => {
    setClaimToCancel(null);
    setCancelStatus('confirm');
  };

  const handleAddClaimSubmit = (e) => {
    e.preventDefault();

    if (modalStep === 1) {
      const stepOneErrors = {};
      if (!newClaim.purpose.trim()) {
        stepOneErrors.purpose = 'Description is required.';
      }
      if (!newClaim.date) {
        stepOneErrors.date = 'Expense date is required.';
      }

      if (Object.keys(stepOneErrors).length > 0) {
        setFormErrors(stepOneErrors);
        return;
      }

      setFormErrors({});
      setModalStep(2);
      return;
    }

    if (formStatus === 'editing') {
      const categoryErrors = {};
      const validCategories = categories.filter((cat) => (
        cat.type.trim() &&
        cat.details.trim() &&
        Number(cat.amount) > 0
      ));

      categories.forEach((cat, index) => {
        if (!cat.type.trim()) {
          categoryErrors[`categoryType-${index}`] = 'Select an expense category.';
        }
        if (!cat.amount || Number(cat.amount) <= 0) {
          categoryErrors[`categoryAmount-${index}`] = 'Enter an amount greater than 0.';
        }
        if (!cat.details.trim()) {
          categoryErrors[`categoryDetails-${index}`] = 'Details are required.';
        }
      });

      if (validCategories.length === 0) {
        categoryErrors.categories = 'Add at least one complete expense category.';
      }

      if (Object.keys(categoryErrors).length > 0) {
        setFormErrors(categoryErrors);
        return;
      }

      setFormErrors({});
      setFormStatus('confirm');
      return;
    }
  };

  const confirmSubmit = () => {
    setFormStatus('success');
  };

  const finishSubmit = () => {
    const totalAmount = categories.reduce((sum, cat) => sum + parseFloat(cat.amount || 0), 0);
    const mainCategory = categories[0]?.type || 'Uncategorized';
    const attachments = uploadedFiles.map(getAttachmentMeta);

    if (modalMode === 'add') {
      const claimId = `CL-${Math.floor(1000 + Math.random() * 9000)}`;
      const formattedDate = formatDisplayDate();
      const date = newClaim.date || formattedDate;

      const addedClaim = {
        id: claimId,
        purpose: newClaim.purpose,
        extraNote: newClaim.extraNote,
        category: mainCategory,
        categories: [...categories],
        amount: totalAmount,
        date: date,
        dateCreated: date,
        rawDate: newClaim.rawDate || parseDateToRaw(date),
        dateSubmitted: formattedDate,
        dateApproved: '-',
        lastEdited: formattedDate,
        status: 'Pending',
        user: { name: 'David Adeniyi', role: 'Sales Manager' },
        attachments
      };
      setClaims([addedClaim, ...claims]);
    } else {
      const lastEdited = formatDisplayDate();
      setClaims(claims.map(c => {
        if (c.id === editClaimId) {
          const date = newClaim.date || c.date;
          return {
            ...c,
            purpose: newClaim.purpose,
            extraNote: newClaim.extraNote,
            category: mainCategory,
            categories: [...categories],
            amount: totalAmount,
            date,
            dateCreated: c.dateCreated || date,
            rawDate: newClaim.rawDate || c.rawDate,
            dateSubmitted: c.dateSubmitted || c.date || date,
            lastEdited,
            attachments
          };
        }
        return c;
      }));
    }

    setIsModalOpen(false);
    resetClaimForm();
  };

  return (
    <div className="expense-claims-page">
      {/* Page Title & Filter */}
      <div className="expense-page-title-row">
        <h2 className="expense-page-title">Expense Management</h2>
        <div className="filter-by-dropdown">
          <span className="filter-by-label">Filter by:</span>
          <span className="filter-by-value">
            Dec 2024
            <svg viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Metrics Row (4 Cards) */}
      <div className="expense-metrics-grid">
        {/* Card 1: Total Claims */}
        <div className="metric-card">
          <div className="metric-card-label">
            <img src={totalClaimsIcon} className="metric-card-icon" alt="Total Claims" />
            <span>Total Claims</span>
          </div>
          <div className="metric-value-container">
            <div className="metric-card-value">{formatCurrency(totalClaimsAmount)}</div>
            <div className="metric-growth-badge"><img src={arrowUpRight} alt="arrow up right" /> 0.00</div>
          </div>
        </div>

        {/* Card 2: Total Reimbursed */}
        <div className="metric-card">
          <div className="metric-card-label">
            <img src={totalReimbursedIcon} className="metric-card-icon" alt="Total Reimbursed" />
            <span>Total Reimbursed</span>
          </div>
          <div className="metric-value-container">
            <div className="metric-card-value">{formatCurrency(totalReimbursedAmount)}</div>
            <div className="metric-growth-badge"><img src={arrowUpRight} alt="arrow up right" /> 0.00</div>
          </div>
        </div>

        {/* Card 3: Balance to Reimburse */}
        <div className="metric-card">
          <div className="metric-card-label">
            <img src={balanceToReimburseIcon} className="metric-card-icon" alt="Balance to Reimburse" />
            <span>Balance to Reimburse</span>
          </div>
          <div className="metric-value-container">
            <div className="metric-card-value">{formatCurrency(balanceToReimburse)}</div>
            <div className="metric-growth-badge"><img src={arrowUpRight} alt="arrow up right" /> 0.00</div>
          </div>
        </div>

        {/* Card 4: Total Number of Claims */}
        <div className="metric-card">
          <div className="metric-card-label">
            <img src={totalNumberClaimsIcon} className="metric-card-icon" alt="Total Number of Claims" />
            <span>Total Number of Claims</span>
          </div>
          <div className="metric-value-container">
            <div className="metric-card-value">{totalClaimsCount}</div>
            <div className="metric-growth-badge">↗ 0.00</div>
          </div>
        </div>
      </div>

      {/* Expense History Section Card */}
      <div className="expense-history-section">
        {/* Header Controls */}
        <div className="history-header-row">
          <div className="history-title-search">
            <h3 className="history-title">Expense History</h3>
            {/* Search */}
            <div className="history-search-container">
              <img src={searchIcon} alt="Search" />
              <input type="text" placeholder="Search name, date..." className="history-search-input" />
            </div>
          </div>
          <div className="history-controls">
            <div className="history-action-controls">
              {/* Date Pick */}
              <div className="history-date-picker">
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b', whiteSpace: 'nowrap' }}>Jan 12 - Jan 01</span>
                <img src={calendarIcon} alt="Calendar" style={{ filter: 'brightness(0) opacity(0.6)', flexShrink: 0 }} />
              </div>

              {/* Status Select */}
              <div style={{ position: 'relative' }}>
                <div
                  className="history-status-select"
                  onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', minWidth: '110px', whiteSpace: 'nowrap' }}
                >
                  <span>{selectedStatus}</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#292929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
                {isStatusDropdownOpen && (
                  <>
                    <div
                      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 19 }}
                      onClick={() => setIsStatusDropdownOpen(false)}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '100%',
                      backgroundColor: '#ffffff',
                      border: '1px solid #d9dfe8',
                      borderRadius: '4px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      zIndex: 20,
                      marginTop: '4px',
                      overflow: 'hidden'
                    }}>
                      {['All Status', 'Pending', 'Approved'].map(status => (
                        <div
                          key={status}
                          onClick={() => {
                            setSelectedStatus(status);
                            setIsStatusDropdownOpen(false);
                          }}
                          style={{
                            padding: '10px 12px',
                            cursor: 'pointer',
                            backgroundColor: selectedStatus === status ? '#1f66c7' : '#ffffff',
                            color: selectedStatus === status ? '#ffffff' : '#1f66c7',
                            fontSize: '13px',
                            fontWeight: '400'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedStatus !== status) e.target.style.backgroundColor = '#f5f8fc';
                          }}
                          onMouseLeave={(e) => {
                            if (selectedStatus !== status) e.target.style.backgroundColor = '#ffffff';
                          }}
                        >
                          {status}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Add Claim Button */}
              <button
                className="add-claim-button"
                onClick={() => {
                  setModalMode('add');
                  setEditClaimId(null);
                  resetClaimForm();
                  setIsModalOpen(true);
                }}
              >
                <img src={plusIcon} alt="Add Claim" /> 
                <span> Add Claim</span>
              </button>
            </div>
          </div>
        </div>

        {/* Conditional Layout: Empty State vs. Populated Table */}
        {claims.length === 0 ? (
          <div className="empty-claims-container">
            <div className="empty-state-icon-wrapper" style={{ width: '150px', height: '151px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={fileIllustration}
                alt="No claim report illustration"
                style={{ width: '150px', height: '151px', display: 'block' }}
              />
            </div>
            <div className="empty-state-copy">
              <h4 className="empty-state-title">No claim report</h4>
              <p className="empty-state-subtitle">Use the "Add New" button</p>
            </div>
          </div>
        ) : (
          <div className="claims-table-wrapper">
            <div className="claims-page-frame">
              <table className="claims-table">
                <colgroup>
                  <col className="claims-col-date" />
                  <col className="claims-col-details" />
                  <col className="claims-col-amount" />
                  <col className="claims-col-reimburse" />
                  <col className="claims-col-status" />
                  <col className="claims-col-action" />
                </colgroup>
                <thead>
                  <tr>
                    <th>Date Created</th>
                    <th>Details</th>
                    <th>Amount</th>
                    <th>Reimburse</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody
                  key={`page-${safePage}`}
                  className={`claims-page-slide ${pageDirection}`}
                >
                  {paginatedClaims.map((claim) => (
                    <tr
                      key={claim.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setDropdownOpenFor(dropdownOpenFor === claim.id ? null : claim.id)}
                    >
                      <td className="claims-date-cell">{claim.dateCreated || claim.date}</td>
                      <td className="claims-details-cell">{claim.purpose}</td>
                      <td className="claims-money-cell">{formatCurrency(claim.amount)}</td>
                      <td className="claims-reimburse-cell">-</td>
                      <td>
                        <span className={`claim-status-pill ${claim.status.toLowerCase()}`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="claims-action-cell">
                        <div className="claims-action-trigger">&#8942;</div>
                        {dropdownOpenFor === claim.id && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: 'absolute',
                              right: '32px',
                              top: '24px',
                              backgroundColor: '#ffffff',
                              border: '0.5px solid #eaeaea',
                              borderRadius: '4px',
                              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                              width: '150px',
                              zIndex: 50,
                              display: 'flex',
                              flexDirection: 'column',
                              padding: '8px 0',
                              textAlign: 'left',
                              fontSize: '13px',
                              fontWeight: '500'
                            }}>
                            <div style={{ padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: '#292929' }} onClick={() => handleView(claim)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><circle cx="10" cy="13" r="2"></circle><line x1="14" y1="17" x2="14.01" y2="17"></line></svg>
                              View Details
                            </div>
                            <div style={{ padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: '#292929' }} onClick={() => handleEdit(claim)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg>
                              Edit
                            </div>
                            <div style={{ padding: '10px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', color: '#e53935' }} onClick={() => handleCancelClaim(claim.id)}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                              Cancel
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            <div className="expense-pagination">
                <button
                  className="pagination-btn pagination-arrow"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                >
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination-btn pagination-page${page === safePage ? ' active' : ''}`}
                    onClick={() => goToPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={page === safePage ? 'page' : undefined}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="pagination-btn pagination-arrow"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                >
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
          </div>
        )}
      </div>

      {/* Styled React Form Modal */}
      {isModalOpen && ['editing', 'confirm'].includes(formStatus) && (
        <AddEditClaimModal
          modalMode={modalMode}
          modalStep={modalStep}
          newClaim={newClaim}
          setNewClaim={setNewClaim}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          categories={categories}
          setCategories={setCategories}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          onClose={closeClaimModal}
          onSubmit={handleAddClaimSubmit}
          formatCurrency={formatCurrency}
          dateButtonRef={dateButtonRef}
          dateIconRef={dateIconRef}
          calendarRef={calendarRef}
          isDateDropdownOpen={isDateDropdownOpen}
          setIsDateDropdownOpen={setIsDateDropdownOpen}
          calendarDate={calendarDate}
          monthNames={monthNames}
          calendarDays={calendarDays}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          handleSelectDate={handleSelectDate}
          isSelectedDate={isSelectedDate}
        />
      )}

      {isModalOpen && formStatus === 'confirm' && (
        <SubmitConfirmModal
          modalMode={modalMode}
          onCancel={() => setFormStatus('editing')}
          onConfirm={confirmSubmit}
        />
      )}

      {isModalOpen && formStatus === 'success' && (
        <ClaimSuccessModal
          modalMode={modalMode}
          onFinish={finishSubmit}
        />
      )}
      {/* View Modal */}
      {viewModalClaim && (
        <ViewDetailModal
          claim={viewModalClaim}
          formatCurrency={formatCurrency}
          onClose={() => setViewModalClaim(null)}
        />
      )}
      {/* Confirmation Modal */}
      {claimToCancel && (
        <CancelClaimModal
          cancelStatus={cancelStatus}
          onClose={() => setClaimToCancel(null)}
          onConfirmCancel={confirmCancelClaim}
          onCloseSuccess={closeCancelSuccess}
        />
      )}

    </div>
  );
}
