import React, { useState, useRef, useEffect } from 'react';
import './ExpenseClaimsPage.css';
import fileIllustration from '../assets/Fowgate Folder/File Illustration.svg';
import successIllustration from '../assets/Fowgate Folder/Check for success page.svg';
import plusIcon from '../assets/Fowgate Folder/add-01.svg';

// Custom calendar and metric card icons
import calendarIcon from '../assets/Fowgate Folder/calendar-03.svg';
import totalClaimsIcon from '../assets/Fowgate Folder/Total claims.svg';
import totalReimbursedIcon from '../assets/Fowgate Folder/Total reimbursed.svg';
import balanceToReimburseIcon from '../assets/Fowgate Folder/Balance to Reimburse.svg';
import totalNumberClaimsIcon from '../assets/Fowgate Folder/user-multiple-02.svg';
import searchIcon from '../assets/Fowgate Folder/search-normal.svg';
import arrowUpRight from '../assets/Fowgate Folder/arrow-up-right-03.svg';
import viewDetail from '../assets/Fowgate Folder/file-02.svg';
import fileUpload from '../assets/Fowgate Folder/file-upload.svg';
import confirm from '../assets/Fowgate Folder/help-circle.svg';

const getFileExtension = (fileName) => {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts.pop().toLowerCase() : '';
};

const AttachmentIcon = ({ file }) => {
  const extension = getFileExtension(file.name);
  const fileType = file.type || '';
  const isImage = fileType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
  const isPdf = file.type === 'application/pdf' || extension === 'pdf';
  const isDocument = ['doc', 'docx'].includes(extension);

  if (isImage) {
    return (
      <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Image file">
        <path d="M4.5 0C2.01472 0 0 2.01472 0 4.5V37.5C0 39.9853 2.01472 42 4.5 42H31.5C33.9853 42 36 39.9853 36 37.5V12L24 0H4.5Z" fill="#1F66C7" />
        <path d="M24 0V12H36L24 0Z" fill="#164EA0" />
        <circle cx="12" cy="19" r="3" fill="white" />
        <path d="M7 32L14 25L18 29L22 24L29 32H7Z" fill="white" />
      </svg>
    );
  }

  if (isPdf) {
    return (
      <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PDF file">
        <path d="M4.5 0C2.01472 0 0 2.01472 0 4.5V37.5C0 39.9853 2.01472 42 4.5 42H31.5C33.9853 42 36 39.9853 36 37.5V12L24 0H4.5Z" fill="#E53935" />
        <path d="M24 0V12H36L24 0Z" fill="#B71C1C" />
        <rect x="4" y="6" width="12" height="7" rx="1" fill="white" />
        <text x="5.5" y="11" fill="#E53935" fontSize="5" fontWeight="bold" fontFamily="sans-serif">PDF</text>
        <path d="M10.5 32C9 32 7.5 30 7.5 27C7.5 24 9.5 22 10.5 22C11.5 22 12.5 23 13 25C14.5 23 17.5 20 19 20C21 20 23 21.5 23 23C23 24.5 21.5 26 19.5 26C17 26 14.5 28 13.5 30C12 31.5 11.5 32 10.5 32Z" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M11 24C11 25.5 10 28 10.5 29" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (isDocument) {
    return (
      <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Document file">
        <path d="M4.5 0C2.01472 0 0 2.01472 0 4.5V37.5C0 39.9853 2.01472 42 4.5 42H31.5C33.9853 42 36 39.9853 36 37.5V12L24 0H4.5Z" fill="#2F80ED" />
        <path d="M24 0V12H36L24 0Z" fill="#1C5FB8" />
        <rect x="7" y="17" width="22" height="2.5" rx="1.25" fill="white" />
        <rect x="7" y="23" width="18" height="2.5" rx="1.25" fill="white" />
        <rect x="7" y="29" width="14" height="2.5" rx="1.25" fill="white" />
      </svg>
    );
  }

  return (
    <svg width="36" height="42" viewBox="0 0 36 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="File">
      <path d="M4.5 0C2.01472 0 0 2.01472 0 4.5V37.5C0 39.9853 2.01472 42 4.5 42H31.5C33.9853 42 36 39.9853 36 37.5V12L24 0H4.5Z" fill="#64748B" />
      <path d="M24 0V12H36L24 0Z" fill="#475569" />
      <rect x="8" y="18" width="20" height="2.5" rx="1.25" fill="white" />
      <rect x="8" y="24" width="16" height="2.5" rx="1.25" fill="white" />
      <rect x="8" y="30" width="12" height="2.5" rx="1.25" fill="white" />
    </svg>
  );
};

const getAttachmentMeta = (file) => ({
  name: file.name,
  size: file.size,
  type: file.type || '',
  extension: getFileExtension(file.name),
  lastModified: file.lastModified || Date.now()
});

const formatFileSize = (size) => {
  if (!size) return '0KB';
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)}MB`;
  return `${Math.max(1, Math.round(size / 1024))}KB`;
};

const formatAttachmentDate = (dateValue) => {
  const date = new Date(dateValue || Date.now());
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-GB');
};


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
  const [isDateFocused, setIsDateFocused] = useState(false);
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
  const [calendarPos, setCalendarPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isDateDropdownOpen && dateButtonRef.current) {
      const rect = dateButtonRef.current.getBoundingClientRect();
      setCalendarPos({ top: rect.bottom + 4, left: rect.left });
    }
  }, [isDateDropdownOpen]);

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
    if (!newClaim.purpose) return;

    if (modalStep === 1) {
      setModalStep(2);
      return;
    }

    if (formStatus === 'editing') {
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
      const today = new Date();
      const day = today.getDate().toString().padStart(2, '0');
      const month = today.toLocaleString('default', { month: 'short' }).toUpperCase();
      const year = today.getFullYear();
      const formattedDate = `${day} ${month}, ${year}`;
      const date = newClaim.date || formattedDate;

      const addedClaim = {
        id: claimId,
        purpose: newClaim.purpose,
        extraNote: newClaim.extraNote,
        category: mainCategory,
        categories: [...categories],
        amount: totalAmount,
        date: date,
        rawDate: newClaim.rawDate || parseDateToRaw(date),
        dateSubmitted: date,
        dateApproved: '-',
        status: 'Pending Approval',
        user: { name: 'David Adeniyi', role: 'Sales Manager' },
        attachments
      };
      setClaims([addedClaim, ...claims]);
    } else {
      setClaims(claims.map(c => {
        if (c.id === editClaimId) {
          return {
            ...c,
            purpose: newClaim.purpose,
            extraNote: newClaim.extraNote,
            category: mainCategory,
            categories: [...categories],
            amount: totalAmount,
            date: newClaim.date || c.date,
            rawDate: newClaim.rawDate || c.rawDate,
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
            <table className="claims-table">
              <thead>
                <tr>
                  <th>Date Created</th>
                  <th>Details</th>
                  <th>Amount</th>
                  <th>Reimburse</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {claims.map((claim) => (
                  <tr
                    key={claim.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setDropdownOpenFor(dropdownOpenFor === claim.id ? null : claim.id)}
                  >
                    <td style={{ fontWeight: '500', color: '#292929' }}>{claim.date}</td>
                    <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#292929' }}>{claim.purpose}</td>
                    <td style={{ fontWeight: '700', color: '#292929' }}>{formatCurrency(claim.amount)}</td>
                    <td style={{ color: '#292929' }}>-</td>
                    <td>
                      <span className={`claim-status-pill ${claim.status.toLowerCase()}`}>
                        {claim.status}
                      </span>
                    </td>
                    <td style={{ position: 'relative', textAlign: 'center', color: '#7a7a7a', fontSize: '18px', fontWeight: 'bold' }}>
                      <div style={{ cursor: 'pointer', padding: '4px' }}>⋮</div>
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
        )}
      </div>

      {/* Styled React Form Modal */}
      {isModalOpen && (
        <div className="modal-overlay" style={modalOverlayStyle}>
          {formStatus === 'editing' && (
            <div style={modalContainerStyle}>
              <div style={modalHeaderStyle}>
                <h3 style={modalTitleStyle}>
                  <svg viewBox="0 0 24 24" style={modalTitleIconStyle} aria-hidden="true">
                    <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 14h-3v3h-2v-3H8v-2h3v-3h2v3h3v2zm-3-7V3.5L18.5 9H13z" />
                  </svg>
                  {modalMode === 'edit' ? 'Edit Expense Claim' : 'Add Expense Claim'}
                </h3>
                <button
                  onClick={closeClaimModal}
                  style={closeButtonStyle}
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleAddClaimSubmit} style={formStyle}>
                <div className="hide-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 0' }}>
                  <div style={stepHeaderStyle}>
                    <span style={{
                      ...stepSpinnerStyle,
                      ...(modalStep === 2 ? { borderColor: '#1f66c7' } : {})
                    }} />
                    <span>{modalStep}/2 - <strong>{modalStep === 1 ? 'EXPENSE DETAILS' : 'EXPENSE AMOUNT'}</strong></span>
                  </div>

                  {modalStep === 1 ? (
                    <>
                      <div style={descriptionGroupStyle}>
                        <label style={labelStyle}>Description</label>
                        <div style={textareaWrapStyle}>
                          <textarea
                            placeholder="Type here"
                            maxLength="150"
                            value={newClaim.purpose}
                            onChange={(e) => setNewClaim({ ...newClaim, purpose: e.target.value })}
                            style={textareaStyle}
                            required
                          />
                          <span style={counterStyle}>{newClaim.purpose.length}/150</span>
                        </div>
                      </div>

                      <div style={fieldGroupStyle}>
                        <label style={labelStyle}>Extra Note</label>
                        <input
                          type="text"
                          placeholder="Type here"
                          value={newClaim.extraNote}
                          onChange={(e) => setNewClaim({ ...newClaim, extraNote: e.target.value })}
                          style={inputStyle}
                        />
                      </div>

                      <div style={dateFieldGroupStyle}>
                        <label style={labelStyle}>Expense Date</label>
                        <div style={{ ...dateInputWrapStyle, position: 'relative' }}>
                          <div
                            ref={dateButtonRef}
                            style={{ ...dateInputStyle, width: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                          >
                            <span style={{ color: newClaim.date ? '#292929' : '#7a7a7a' }}>{newClaim.date || 'Select date'}</span>
                          </div>
                          <img
                            ref={dateIconRef}
                            src={calendarIcon}
                            style={dateIconStyle}
                            alt="Calendar"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsDateDropdownOpen((isOpen) => !isOpen);
                            }}
                          />

                          {isDateDropdownOpen && (
                            <div
                              ref={calendarRef}
                              style={calendarDropdownStyle}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div style={calendarHeaderStyleCustom}>
                                <button
                                  type="button"
                                  onClick={handlePrevMonth}
                                  style={calendarNavButtonStyle}
                                >
                                  &lt;
                                </button>
                                <span style={calendarMonthYearStyle}>
                                  {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                                </span>
                                <button
                                  type="button"
                                  onClick={handleNextMonth}
                                  style={calendarNavButtonStyle}
                                >
                                  &gt;
                                </button>
                              </div>
                              <div style={calendarWeekdaysStyle}>
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((wd, i) => (
                                  <div key={i} style={calendarWeekdayCellStyle}>{wd}</div>
                                ))}
                              </div>
                              <div style={calendarDaysGridStyle}>
                                {calendarDays.map((day, i) => {
                                  if (day === null) {
                                    return <div key={`empty-${i}`} style={calendarDayCellEmptyStyle} />;
                                  }
                                  const selected = isSelectedDate(day);
                                  return (
                                    <div
                                      key={`day-${day}`}
                                      onClick={() => handleSelectDate(day)}
                                      style={{
                                        ...calendarDayCellActiveStyle,
                                        ...(selected ? calendarDayCellSelectedStyle : {})
                                      }}
                                      onMouseEnter={(e) => {
                                        if (!selected) {
                                          e.target.style.backgroundColor = '#f1f5f9';
                                        }
                                      }}
                                      onMouseLeave={(e) => {
                                        if (!selected) {
                                          e.target.style.backgroundColor = 'transparent';
                                        }
                                      }}
                                    >
                                      {day}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>

                      {categories.map((cat, index) => (
                        <div key={cat.id} style={amountPanelStyle}>
                          <div
                            style={{ ...amountPanelHeaderStyle, cursor: 'pointer' }}
                            onClick={() => {
                              const newCats = [...categories];
                              newCats[index].isExpanded = !newCats[index].isExpanded;
                              setCategories(newCats);
                            }}
                          >
                            <strong>Category {index + 1}</strong>
                            <span style={{ transform: cat.isExpanded ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }}>
                              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6.5L6 1.5L11 6.5" stroke="#292929" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </div>
                          {cat.isExpanded && (
                            <div style={amountPanelBodyStyle}>
                              <div style={fieldGroupStyle}>
                                <label style={labelStyle}>Expense Category {index + 1}</label>
                                <select
                                  value={cat.type}
                                  onChange={(e) => {
                                    const newCats = [...categories];
                                    newCats[index].type = e.target.value;
                                    setCategories(newCats);
                                  }}
                                  style={selectInputStyle}
                                >
                                  <option value="">Select</option>
                                  <option>Transportation</option>
                                  <option>Food</option>
                                  <option>Accommodation</option>
                                  <option>Communication</option>
                                  <option>Medical</option>
                                  <option>Equipment Purchases</option>
                                </select>
                              </div>

                              <div style={fieldGroupStyle}>
                                <label style={labelStyle}>Amount</label>
                                <div style={{ position: 'relative' }}>
                                  <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#292929', fontSize: '13px', fontWeight: '500' }}>₦</span>
                                  <input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={cat.amount}
                                    onChange={(e) => {
                                      const newCats = [...categories];
                                      newCats[index].amount = e.target.value;
                                      setCategories(newCats);
                                    }}
                                    style={{ ...inputStyle, paddingLeft: '24px' }}
                                    min="0"
                                  />
                                </div>
                              </div>

                              <div style={detailsGroupStyle}>
                                <label style={labelStyle}>Details</label>
                                <textarea
                                  placeholder="Type here"
                                  value={cat.details}
                                  onChange={(e) => {
                                    const newCats = [...categories];
                                    newCats[index].details = e.target.value;
                                    setCategories(newCats);
                                  }}
                                  style={detailsTextareaStyle}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      <div
                        style={{ ...addCategoriesStyle, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}
                        onClick={() => {
                          setCategories([...categories, { id: Date.now(), type: '', amount: '', details: '', isExpanded: true }]);
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 1V11M1 6H11" stroke="#1f66c7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Add Categories
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <div style={attachFileStyle}>Attach file</div>
                        <div style={{ border: '1.5px dashed #1f66c7', borderRadius: '8px', padding: '32px 24px', textAlign: 'center', backgroundColor: '#f4f8ff', cursor: 'pointer', position: 'relative' }}>
                          <input
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            onChange={(e) => {
                              const selectedFiles = Array.from(e.target.files || []);
                              if (selectedFiles.length > 0) {
                                setUploadedFiles((currentFiles) => [
                                  ...currentFiles,
                                  ...selectedFiles.map(getAttachmentMeta)
                                ]);
                              }
                              e.target.value = '';
                            }}
                          />
                          <img src={fileUpload} alt="Upload File" style={{ width: '28px', height: '28px', marginBottom: '12px' }} />
                          <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>Drag and drop file or <span style={{ color: '#1f66c7' }}>Browse</span></div>
                          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>File must be JPG, PNG, PDF or DOC and max of 5MB</div>
                        </div>

                        {uploadedFiles.length > 0 && (
                          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {uploadedFiles.map((file, index) => (
                              <div key={`${file.name}-${file.lastModified}-${index}`} style={{ border: '1px solid #eaeaea', borderRadius: '8px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <AttachmentIcon file={file} />

                                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ fontSize: '15px', color: '#292929', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                                    <div style={{ fontSize: '14px', color: '#7a7a7a', flexShrink: 0 }}>{(file.size / 1024).toFixed(0)}KB</div>
                                  </div>
                                  <div style={{ width: '100%', height: '6px', backgroundColor: '#e0e0e0', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: '100%', height: '100%', backgroundColor: '#34a853', borderRadius: '3px' }}></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div style={totalAmountStyle}>
                        <span>Total Amount</span>
                        <strong>{formatCurrency(categories.reduce((sum, cat) => sum + parseFloat(cat.amount || 0), 0))}</strong>
                      </div>
                    </>
                  )}
                </div>

                <div style={{ ...formActionsStyle, padding: '16px 24px', backgroundColor: '#ffffff', marginTop: 'auto', borderTop: '0.5px solid #eaeaea' }}>
                  <button
                    type="button"
                    onClick={closeClaimModal}
                    className="modal-btn-cancel"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="modal-btn-submit"
                  >
                    {modalStep === 1 ? 'Next' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {formStatus === 'confirm' && (
            <div style={{ ...modalContainerStyle, width: '400px', height: 'auto', minHeight: '200px' }}>
              <div style={modalHeaderStyle}>
                <h3 style={modalTitleStyle}>
                  <img src={confirm} alt="Confirm" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
                  Confirm Action
                </h3>
                <button
                  onClick={() => setFormStatus('editing')}
                  style={closeButtonStyle}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: '24px', flex: 1, color: '#292929', fontSize: '14px', lineHeight: '1.5' }}>
                Are you sure you want to submit this <strong>Expense Claim</strong>? Ensure all data is correct before proceeding.
              </div>
              <div style={{ ...formActionsStyle, padding: '16px 24px', backgroundColor: '#ffffff', marginTop: 'auto', borderTop: 'none', justifyContent: 'flex-end', gap: '16px', display: 'flex' }}>
                <button
                  type="button"
                  onClick={() => setFormStatus('editing')}
                  className="modal-btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmSubmit}
                  className="modal-btn-submit"
                  style={{ width: 'auto', padding: '0 16px' }}
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          )}

          {formStatus === 'success' && (
            <div style={{ ...modalContainerStyle, width: '380px', height: 'auto', padding: '32px 24px', alignItems: 'center', textAlign: 'center' }}>
              <img
                src={successIllustration}
                alt="Success checkmark"
                style={{ width: '100px', height: '100px', marginBottom: '20px' }}
              />
              <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600', color: '#292929' }}>
                {modalMode === 'edit' ? 'Changes Saved!' : 'Claim Submitted'}
              </h3>
              <p style={{ margin: '0 0 24px 0', fontSize: '13px', color: '#7a7a7a', lineHeight: '1.5' }}>
                Your submission has been received and is under review, you'll be notified once it is processed.
              </p>
              <button
                type="button"
                onClick={finishSubmit}
                className="modal-btn-primary"
              >
                Okay
              </button>
            </div>
          )}
        </div>
      )}

      {/* View Modal */}
      {viewModalClaim && (
        <div className="modal-overlay" style={modalOverlayStyle}>
          <div style={{ ...modalContainerStyle, width: 'min(370px, calc(100vw - 48px))', height: 'min(756px, calc(100vh - 48px))', maxHeight: 'calc(100vh - 48px)' }}>
            <div style={{ ...modalHeaderStyle, height: '58px', padding: '0 16px' }}>
              <h3 style={{ ...modalTitleStyle, flex: 1, minWidth: 0, height: '34px', fontFamily: "'Rubik', var(--font-family)", fontSize: '24px', fontWeight: '500', lineHeight: '140%', letterSpacing: 0, gap: '8px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                <img src={viewDetail} alt="View Detail" style={{ width: '18px', height: '18px' }} />
                View Expense Claim
              </h3>
              <button onClick={() => setViewModalClaim(null)} style={{ ...closeButtonStyle, fontSize: '24px' }}>×</button>
            </div>

            <div className="hide-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#e9f2ff', overflow: 'hidden' }}>
                  <img src="https://i.pravatar.cc/100" alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#292929' }}>{viewModalClaim.user?.name || 'David Adeniyi'}</div>
                    <div style={{ fontSize: '9px', color: '#7a7a7a', marginTop: '3px' }}>{viewModalClaim.user?.role || 'Sales Manager'}</div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#fff0d9', color: '#f59e0b', borderRadius: '999px', padding: '6px 10px', fontSize: '10px', fontWeight: '500' }}>
                  {viewModalClaim.status}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', backgroundColor: '#f3f4f6', borderRadius: '6px', padding: '14px 10px', gap: '8px', marginBottom: '18px' }}>
                <div>
                  <div style={{ fontSize: '9px', color: '#b0b6c0', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '7px', fontWeight: '700' }}>Date Created</div>
                  <div style={{ fontSize: '12px', color: '#292929', fontWeight: '700' }}>{viewModalClaim.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: '#b0b6c0', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '7px', fontWeight: '700' }}>Date Submitted</div>
                  <div style={{ fontSize: '12px', color: '#292929', fontWeight: '700' }}>{viewModalClaim.dateSubmitted || viewModalClaim.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: '#b0b6c0', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '7px', fontWeight: '700' }}>Date Approved</div>
                  <div style={{ fontSize: '12px', color: '#292929', fontWeight: '700' }}>{viewModalClaim.dateApproved || '-'}</div>
                </div>
              </div>

              <div style={{ fontSize: '12px', fontWeight: '700', color: '#292929', marginBottom: '10px' }}>Description</div>
              <div style={{ fontSize: '10px', color: '#555', lineHeight: '1.7', marginBottom: '18px' }}>
                {viewModalClaim.purpose}
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginBottom: '6px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f0f1f3' }}>
                    <th style={{ textAlign: 'left', padding: '10px 8px', color: '#292929', fontWeight: '700', width: '34%' }}>Expense Category</th>
                    <th style={{ textAlign: 'left', padding: '10px 8px', color: '#292929', fontWeight: '700', width: '44%' }}>Details</th>
                    <th style={{ textAlign: 'right', padding: '10px 8px', color: '#292929', fontWeight: '700', width: '22%' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {viewModalClaim.categories?.map((cat, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eaeaea' }}>
                      <td style={{ padding: '13px 8px', color: '#292929' }}>{cat.type}</td>
                      <td style={{ padding: '13px 8px', color: '#292929', maxWidth: '130px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cat.details}</td>
                      <td style={{ padding: '13px 8px', color: '#292929', textAlign: 'right', fontWeight: '700' }}>{formatCurrency(cat.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 8px', fontWeight: '700', color: '#292929', fontSize: '11px', borderBottom: '1px solid #eaeaea', marginBottom: '16px' }}>
                <span>Total Amount</span>
                <span style={{ color: '#1f66c7' }}>{formatCurrency(viewModalClaim.amount)}</span>
              </div>

              <div style={{ fontSize: '13px', fontWeight: '700', color: '#292929', marginBottom: '8px' }}>
                Attachments ({viewModalClaim.attachments?.length || 0})
              </div>
              {(viewModalClaim.attachments || []).map((file, index) => (
                <div key={`${file.name}-${file.lastModified}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #eeeeee' }}>
                  <div style={{ width: '26px', height: '30px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <div style={{ transform: 'scale(0.72)', transformOrigin: 'center' }}>
                      <AttachmentIcon file={file} />
                    </div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#292929', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.name}</div>
                    <div style={{ color: '#8a8a8a', fontSize: '10px', marginTop: '4px' }}>File • {formatFileSize(file.size)}</div>
                  </div>
                  <div style={{ color: '#5f6368', fontSize: '10px', flexShrink: 0 }}>{formatAttachmentDate(file.lastModified)}</div>
                </div>
              ))}
            </div>

            <div style={{ padding: '14px 14px', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #eaeaea' }}>
              <button onClick={() => setViewModalClaim(null)} className="modal-btn-submit" style={{ width: '70px', height: '38px', backgroundColor: '#eaf2ff', color: '#1f66c7' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {claimToCancel && (
        <div className="modal-overlay" style={modalOverlayStyle}>
          {cancelStatus === 'confirm' ? (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '4px', width: '504px', boxShadow: '0 24px 60px rgba(0,0,0,0.22)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#1f66c7', padding: '22px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ffffff', fontSize: '22px', fontWeight: '700' }}>
                  <img src={confirm} alt="Confirm" style={{ width: '22px', height: '22px' }} />
                  Confirm Action
                </div>
                <button onClick={() => setClaimToCancel(null)} style={{ ...closeButtonStyle, fontSize: '30px' }}>×</button>
              </div>
              <div style={{ padding: '20px 24px 24px', color: '#3f3f46', fontSize: '16px', lineHeight: '1.6', borderBottom: '1px solid #f1f1f1' }}>
                Are you sure you want to proceed with cancelling this expense claim application?
              </div>
              <div style={{ padding: '16px 22px', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'flex-end', gap: '24px' }}>
                <button onClick={() => setClaimToCancel(null)} className="modal-btn-cancel" style={{ border: 'none', background: 'transparent', width: '110px' }}>Cancel</button>
                <button onClick={confirmCancelClaim} className="modal-btn-submit" style={{ width: '134px', backgroundColor: '#eaf2ff', color: '#1f66c7' }}>Yes, I'm sure</button>
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '4px', width: '450px', boxShadow: '0 24px 60px rgba(0,0,0,0.22)', padding: '40px 44px 38px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxSizing: 'border-box' }}>
              <img src={successIllustration} alt="Success checkmark" style={{ width: '96px', height: '96px', marginBottom: '28px' }} />
              <h3 style={{ margin: '0 0 12px 0', fontSize: '30px', lineHeight: '1.2', fontWeight: '700', color: '#292929' }}>
                Application Cancelled!
              </h3>
              <p style={{ margin: '0 0 40px 0', color: '#3f3f46', fontSize: '15px', lineHeight: '1.5' }}>
                Your expense claim application has been cancelled successfully.
              </p>
              <button onClick={closeCancelSuccess} className="modal-btn-submit" style={{ width: '100%', height: '48px', backgroundColor: '#1f66c7', color: '#ffffff', fontWeight: '700' }}>
                Okay
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Basic modal styling overrides
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.58)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  zIndex: 1000,
  backdropFilter: 'blur(4px)',
  boxSizing: 'border-box'
};

const modalContainerStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '4px',
  width: 'min(528px, calc(100vw - 48px))',
  height: 'min(664px, calc(100vh - 48px))',
  maxHeight: 'calc(100vh - 48px)',
  boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
};

const modalHeaderStyle = {
  height: '78px',
  backgroundColor: '#1f66c7',
  color: '#ffffff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 24px',
  boxSizing: 'border-box'
};

const modalTitleStyle = {
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  fontFamily: "'Rubik', var(--font-family)",
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '140%'
};

const modalTitleIconStyle = {
  width: '18px',
  height: '18px',
  fill: 'currentColor',
  stroke: 'none'
};

const closeButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  lineHeight: 1,
  cursor: 'pointer',
  color: '#ffffff',
  fontWeight: 300
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  boxSizing: 'border-box',
  overflow: 'hidden'
};

const stepHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  height: '38px',
  borderBottom: '0.5px solid #eaeaea',
  color: '#292929',
  fontSize: '13px',
  marginBottom: '20px'
};

const stepSpinnerStyle = {
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  border: '2px solid #d9e8ff',
  borderLeftColor: '#1f66c7',
  borderBottomColor: '#1f66c7',
  transform: 'rotate(45deg)',
  boxSizing: 'border-box'
};

const fieldGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  marginBottom: '8px'
};

const descriptionGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  height: '154px',
  marginBottom: '8px'
};

const dateFieldGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  height: '78px',
  marginBottom: '96px'
};

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: '500',
  color: '#292929'
};

const textareaWrapStyle = {
  position: 'relative',
  width: '100%'
};

const textareaStyle = {
  width: '100%',
  height: '128px',
  padding: '14px 12px 28px',
  borderRadius: '4px',
  border: '0.5px solid #d9dfe8',
  fontSize: '13px',
  outline: 'none',
  resize: 'none',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-family)'
};

const counterStyle = {
  position: 'absolute',
  right: '12px',
  bottom: '12px',
  fontSize: '12px',
  color: '#7a7a7a'
};

const inputStyle = {
  width: '100%',
  height: '40px',
  padding: '0 12px',
  borderRadius: '4px',
  border: '0.5px solid #d9dfe8',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box'
};

const amountPanelStyle = {
  width: '100%',
  border: '0.5px solid #eaeaea',
  borderRadius: '4px',
  overflow: 'hidden',
  marginBottom: '16px'
};

const amountPanelHeaderStyle = {
  height: '54px',
  padding: '0 14px',
  backgroundColor: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#292929',
  boxSizing: 'border-box'
};

const amountPanelBodyStyle = {
  padding: '18px 14px 14px',
  boxSizing: 'border-box'
};

const selectInputStyle = {
  ...inputStyle,
  appearance: 'auto',
  backgroundColor: '#ffffff',
  color: '#7a7a7a'
};

const detailsGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  marginBottom: '0'
};

const detailsTextareaStyle = {
  ...textareaStyle,
  height: '80px',
  padding: '14px 12px'
};

const addCategoriesStyle = {
  width: '100%',
  color: '#1f66c7',
  fontSize: '14px',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'flex-end',
  fontWeight: '500'
};

const attachFileStyle = {
  width: '100%',
  fontSize: '14px',
  color: '#292929',
  marginBottom: '8px',
  fontWeight: '500'
};

const totalAmountStyle = {
  width: 'calc(100% + 48px)',
  marginLeft: '-24px',
  padding: '16px 24px',
  borderTop: '0.5px solid #eaeaea',
  borderBottom: '0.5px solid #eaeaea',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxSizing: 'border-box',
  fontSize: '14px',
  color: '#292929'
};

const dateInputWrapStyle = {
  position: 'relative'
};

const dateInputStyle = {
  ...inputStyle,
  paddingRight: '42px',
  // marginBottom: '20px'
};

const dateIconStyle = {
  position: 'absolute',
  right: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '18px',
  height: '18px',
  fill: 'none',
  cursor: 'pointer',
};

const formActionsStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '16px',
  marginTop: 0,
  padding: '24px 0 20px',
  borderTop: '0.5px solid #eaeaea',

};

const cancelButtonStyle = {
  backgroundColor: '#ffffff',
  border: '0.5px solid #d9dfe8',
  color: '#292929',
  width: '98px',
  height: '42px',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: '500',
  cursor: 'pointer'
};

const submitButtonStyle = {
  backgroundColor: '#e8f0fb',
  border: 'none',
  color: '#1f66c7',
  width: '98px',
  height: '42px',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: '500',
  cursor: 'pointer'
};

const calendarDropdownStyle = {
  position: 'absolute',
  top: 'calc(100% + 6px)',
  right: 0,
  width: '300px',
  backgroundColor: '#ffffff',
  border: '1px solid #d9dfe8',
  borderRadius: '8px',
  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
  zIndex: 100,
  padding: '16px',
  boxSizing: 'border-box',
  userSelect: 'none',
  fontFamily: 'var(--font-family)'
};

const calendarHeaderStyleCustom = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px'
};

const calendarNavButtonStyle = {
  background: 'none',
  border: '1px solid #d9dfe8',
  borderRadius: '4px',
  width: '28px',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#64748b',
  fontWeight: '500',
  transition: 'all 0.2s',
  outline: 'none',
  padding: 0
};

const calendarMonthYearStyle = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#1e293b'
};

const calendarWeekdaysStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '4px',
  marginBottom: '8px',
  textAlign: 'center'
};

const calendarWeekdayCellStyle = {
  fontSize: '11px',
  fontWeight: '600',
  color: '#94a3b8',
  textTransform: 'uppercase'
};

const calendarDaysGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '4px'
};

const calendarDayCellEmptyStyle = {
  aspectRatio: '1',
  pointerEvents: 'none'
};

const calendarDayCellActiveStyle = {
  aspectRatio: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '13px',
  color: '#334155',
  cursor: 'pointer',
  borderRadius: '6px',
  transition: 'all 0.15s ease',
  fontWeight: '500'
};

const calendarDayCellSelectedStyle = {
  backgroundColor: '#1f66c7',
  color: '#ffffff',
  fontWeight: '600'
};
