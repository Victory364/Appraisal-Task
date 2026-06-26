import React, { useState, useEffect } from 'react';
import './LoanManagement.css';
import fileIllustration from '../assets/Fowgate Folder/File Illustration.svg';
import plusIcon from '../assets/Fowgate Folder/add-01.svg';
import calendarIcon from '../assets/Fowgate Folder/calendar-03.svg';
import totalClaimsIcon from '../assets/Fowgate Folder/Total claims.svg';
import totalReimbursedIcon from '../assets/Fowgate Folder/Total reimbursed.svg';
import balanceToReimburseIcon from '../assets/Fowgate Folder/Balance to Reimburse.svg';
import totalNumberClaimsIcon from '../assets/Fowgate Folder/user-multiple-02.svg';
import searchIcon from '../assets/Fowgate Folder/search-normal.svg';
import arrowUpRight from '../assets/Fowgate Folder/arrow-up-right-03.svg';

import { currencyOptions } from '../utils/constants';
import { formatMoney } from '../utils/helpers';
import LoanDetailsModal from './LoanDetailsModal';
import NewLoanModal from './NewLoanModal';
import CancelLoanModal from './CancelLoanModal';
import ConfirmActionModal from './modals/ConfirmActionModal/ConfirmActionModal';

const defaultLoans = [
  {
    id: 1,
    dateTaken: '23 March, 2024',
    amount: 60150.50,
    currency: { country: 'Nigeria', countryCode: 'NG', code: 'NGN', symbol: '₦', flag: '🇳🇬' },
    duration: '12',
    purpose: 'Medical Expenses',
    balance: 20150.50,
    status: 'Ongoing',
    type: 'Loan'
  },
  {
    id: 2,
    dateTaken: '23 March, 2024',
    amount: 60150.50,
    currency: { country: 'Nigeria', countryCode: 'NG', code: 'NGN', symbol: '₦', flag: '🇳🇬' },
    duration: '3',
    purpose: 'Education',
    balance: 20150.50,
    status: 'Completed',
    type: 'Loan'
  },
  {
    id: 3,
    dateTaken: '23 March, 2024',
    amount: 60150.50,
    currency: { country: 'Nigeria', countryCode: 'NG', code: 'NGN', symbol: '₦', flag: '🇳🇬' },
    duration: '6',
    purpose: 'Personal Needs',
    balance: 20150.50,
    status: 'Completed',
    type: 'Loan'
  },
  {
    id: 4,
    dateTaken: '23 March, 2024',
    amount: 60150.50,
    currency: { country: 'Nigeria', countryCode: 'NG', code: 'NGN', symbol: '₦', flag: '🇳🇬' },
    duration: '6',
    purpose: 'Home Renovation',
    balance: 20150.50,
    status: 'Rejected',
    type: 'Loan'
  },
  {
    id: 5,
    dateTaken: '23 March, 2024',
    amount: 60150.50,
    currency: { country: 'Nigeria', countryCode: 'NG', code: 'NGN', symbol: '₦', flag: '🇳🇬' },
    duration: '4',
    purpose: 'Legal Expenses',
    balance: 20150.50,
    status: 'Completed',
    type: 'Loan'
  },
  {
    id: 6,
    dateTaken: '23 March, 2024',
    amount: 25000.00,
    currency: { country: 'Nigeria', countryCode: 'NG', code: 'NGN', symbol: '₦', flag: '🇳🇬' },
    duration: '2',
    purpose: 'Mortgage Payment',
    balance: 0.00,
    status: 'Completed',
    type: 'Loan'
  }
];

export default function LoanManagement() {
  const [loans, setLoans] = useState(() => {
    const savedLoans = sessionStorage.getItem('loans_advances');
    if (savedLoans) {
      try {
        return JSON.parse(savedLoans);
      } catch (e) {
        console.error("Failed to parse saved loans:", e);
      }
    }
    return [];
  });

  useEffect(() => {
    sessionStorage.setItem('loans_advances', JSON.stringify(loans));
  }, [loans]);

  const getTodayFormattedDate = () => {
    const d = new Date();
    const day = d.getDate();
    const month = d.toLocaleDateString('en-US', { month: 'long' });
    const year = d.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [dropdownOpenFor, setDropdownOpenFor] = useState(null);

  const [detailsLoan, setDetailsLoan] = useState(null);
  const [editLoan, setEditLoan] = useState(null);
  const [loanToCancel, setLoanToCancel] = useState(null);
  const [cancelStatus, setCancelStatus] = useState('confirm');
  const [confirmAction, setConfirmAction] = useState(null);

  // Pagination states
  const LOANS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageDirection, setPageDirection] = useState('forward');

  const onNewLoan = () => setEditLoan({ isNew: true });

  const onEditLoan = (updatedLoan) => {
    const exists = loans.some(l => l.id === updatedLoan.id);
    if (!exists) {
      setLoans([...loans, { ...updatedLoan, isNew: undefined }]);
    } else {
      setLoans(loans.map(l => l.id === updatedLoan.id ? updatedLoan : l));
    }
  };

  const handleCancelLoan = (id) => {
    setLoanToCancel(id);
    setCancelStatus('confirm');
  };

  const handleApproveLoan = (id) => {
    setLoans(loans.map(l => l.id === id ? { ...l, status: 'Approved' } : l));
  };

  const handleRejectLoan = (id) => {
    setLoans(loans.map(l => l.id === id ? { ...l, status: 'Rejected', balance: 0 } : l));
  };

  const confirmCancelLoan = () => {
    if (loanToCancel) {
      setLoans(loans.map(l => l.id === loanToCancel ? { ...l, status: 'Cancelled', balance: 0 } : l));
      setCancelStatus('success');
    }
  };

  const closeCancelSuccess = () => {
    setLoanToCancel(null);
    setCancelStatus('confirm');
  };

  // Calculations
  const displayCurrency = loans[0]?.currency || currencyOptions[0];
  const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);

  const totalRepaidAmount = loans
    .filter(loan => loan.status === 'Completed' || loan.status === 'Ongoing')
    .reduce((sum, loan) => {
      // Repaid = amount - balance
      if (loan.status === 'Completed') return sum + loan.amount;
      return sum + (loan.amount - loan.balance);
    }, 0);

  const totalOutstandingBalance = loans
    .filter(loan => loan.status === 'Approved' || loan.status === 'Ongoing' || loan.status === 'Pending')
    .reduce((sum, loan) => sum + loan.balance, 0);

  // Filters
  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.amount.toString().includes(searchTerm);
    const matchesStatus = selectedStatus === 'All Status' || loan.status === selectedStatus;
    const matchesDate = loan.dateTaken.toLowerCase() === getTodayFormattedDate().toLowerCase();
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredLoans.length / LOANS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedLoans = filteredLoans.slice((safePage - 1) * LOANS_PER_PAGE, safePage * LOANS_PER_PAGE);

  const goToPage = (page) => {
    if (page === currentPage) return;
    setPageDirection(page > currentPage ? 'forward' : 'backward');
    setCurrentPage(page);
    setDropdownOpenFor(null);
  };

  // Helper for formatting currency in local Naira style if NGN, otherwise standard
  const formatCurrency = (val, cur) => {
    return formatMoney(val, cur);
  };

  return (
    <div className="expense-claims-page">
      {/* Page Title & Filter */}
      <div className="expense-page-title-row">
        <h2 className="expense-page-title">Loan Management</h2>
        <div className="filter-by-dropdown">
          <span className="filter-by-label">Filter by:</span>
          <span className="filter-by-value">
            {getTodayFormattedDate()}
            <svg viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5z" fill="#292929" />
            </svg>
          </span>
        </div>
      </div>

      {/* Metrics Row (4 Cards) */}
      <div className="expense-metrics-grid">
        {/* Card 1: Total Amount of Loans */}
        <div className="metric-card">
          <div className="metric-card-label">
            <img src={totalClaimsIcon} className="metric-card-icon" alt="Total Loans" />
            <span>Total Amount of Loans</span>
          </div>
          <div className="metric-value-container">
            <div className="metric-card-value">{formatCurrency(totalAmount, displayCurrency)}</div>
            <div className="metric-growth-badge"><img src={arrowUpRight} alt="Arrow" /> 0.00</div>
          </div>
        </div>

        {/* Card 2: Total Loan Repaid */}
        <div className="metric-card">
          <div className="metric-card-label">
            <img src={totalReimbursedIcon} className="metric-card-icon" alt="Total Repaid" />
            <span>Total Loan Repaid</span>
          </div>
          <div className="metric-value-container">
            <div className="metric-card-value">{formatCurrency(totalRepaidAmount, displayCurrency)}</div>
            <div className="metric-growth-badge"><img src={arrowUpRight} alt="Arrow" /> 0.00</div>
          </div>
        </div>

        {/* Card 3: Outstanding Loan Balance */}
        <div className="metric-card">
          <div className="metric-card-label">
            <img src={balanceToReimburseIcon} className="metric-card-icon" alt="Outstanding Balance" />
            <span>Outstanding Loan Balance</span>
          </div>
          <div className="metric-value-container">
            <div className="metric-card-value">{formatCurrency(totalOutstandingBalance, displayCurrency)}</div>
            <div className="metric-growth-badge"><img src={arrowUpRight} alt="Arrow" /> 0.00</div>
          </div>
        </div>

        {/* Card 4: Total Loans */}
        <div className="metric-card">
          <div className="metric-card-label">
            <img src={totalNumberClaimsIcon} className="metric-card-icon" alt="Total Count" />
            <span>Total Loans</span>
          </div>
          <div className="metric-value-container">
            <div className="metric-card-value">{loans.length}</div>
            <div className="metric-growth-badge">↗ 0.00</div>
          </div>
        </div>
      </div>

      {/* Loan History Card */}
      <div className="expense-history-section">
        {/* Header Controls */}
        <div className="history-header-row">
          <div className="history-title-search">
            <h3 className="history-title">Loan History</h3>
            <div className="history-search-container">
              <img src={searchIcon} alt="Search" />
              <input
                type="text"
                placeholder="Search purpose, etc..."
                className="history-search-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className="history-controls">
            <div className="history-action-controls">
              {/* Dynamic current date display */}
              <div className="history-date-picker">
                <span>{getTodayFormattedDate()}</span>
                <img src={calendarIcon} alt="Calendar" />
              </div>

              {/* Status Selector dropdown */}
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
                      {['All Status', 'Pending', 'Approved', 'Ongoing', 'Completed', 'Cancelled', 'Rejected'].map(status => (
                        <div
                          key={status}
                          onClick={() => {
                            setSelectedStatus(status);
                            setIsStatusDropdownOpen(false);
                            setCurrentPage(1);
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

              {/* New Loan Button */}
              <button className="add-claim-button" type="button" onClick={onNewLoan}>
                <img src={plusIcon} alt="New Loan" />
                <span>New Loan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Conditional Layout: Empty State vs Table */}
        {filteredLoans.length === 0 ? (
          <div className="empty-claims-container">
            <div className="empty-state-icon-wrapper" style={{ width: '150px', height: '151px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={fileIllustration}
                alt="No loan report illustration"
                style={{ width: '150px', height: '151px', display: 'block' }}
              />
            </div>
            <div className="empty-state-copy">
              <h4 className="empty-state-title">No loan report</h4>
              <p className="empty-state-subtitle">Use the "Add New" button</p>
            </div>
          </div>
        ) : (
          <div className="claims-table-wrapper">
            <div className="claims-page-frame">
              <table className="claims-table">
                <colgroup>
                  <col className="claims-col-date-taken" />
                  <col className="claims-col-loan-amount" />
                  <col className="claims-col-loan-duration" />
                  <col className="claims-col-balance" />
                  <col className="claims-col-purpose" />
                  <col className="claims-col-repayment-status" />
                  <col className="claims-col-action" />
                </colgroup>
                <thead>
                  <tr>
                    <th>Date Taken</th>
                    <th>Loan Amount</th>
                    <th>Loan Duration</th>
                    <th>Balance</th>
                    <th>Loan Purpose</th>
                    <th>Repayment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody
                  key={`page-${safePage}`}
                  className={`claims-page-slide ${pageDirection}`}
                >
                  {paginatedLoans.map((loan) => (
                    <tr
                      key={loan.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setDropdownOpenFor(dropdownOpenFor === loan.id ? null : loan.id)}
                    >
                      <td className="claims-date-cell">{loan.dateTaken}</td>
                      <td className="claims-money-cell">{formatCurrency(loan.amount, loan.currency)}</td>
                      <td>{loan.duration} months</td>
                      <td className="claims-money-cell">{formatCurrency(loan.balance, loan.currency)}</td>
                      <td className="claims-details-cell">{loan.purpose}</td>
                      <td>
                        <span className={`claim-status-pill ${loan.status.toLowerCase()}`}>
                          {loan.status}
                        </span>
                      </td>
                      <td className="claims-action-cell">
                        <div className="claims-action-trigger">&#8942;</div>
                        {dropdownOpenFor === loan.id && (
                          <div
                            className="claims-action-menu"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setDetailsLoan(loan);
                                setDropdownOpenFor(null);
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><circle cx="10" cy="13" r="2"></circle><line x1="14" y1="17" x2="14.01" y2="17"></line></svg>
                              View Details
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditLoan(loan);
                                setDropdownOpenFor(null);
                              }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg>
                              Edit
                            </button>

                            {loan.status !== 'Cancelled' && loan.status !== 'Rejected' && loan.status !== 'Completed' && (
                              <button
                                className="danger-action"
                                type="button"
                                onClick={() => {
                                  handleCancelLoan(loan.id);
                                  setDropdownOpenFor(null);
                                }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                Cancel
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="expense-pagination">
                <button
                  className="pagination-btn pagination-arrow"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                >
                  <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 1L1 6L6 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                    <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {detailsLoan && (
        <LoanDetailsModal
          loan={detailsLoan}
          onClose={() => setDetailsLoan(null)}
          onApprove={(id) => {
            setConfirmAction({
              type: 'approve',
              loanId: id,
              title: 'Approve Loan Request',
              message: 'Are you sure you want to approve this loan request? The applicant will be notified and the loan will be marked as Approved.'
            });
            setDetailsLoan(null);
          }}
          onReject={(id) => {
            setConfirmAction({
              type: 'reject',
              loanId: id,
              title: 'Reject Loan Request',
              message: 'Are you sure you want to reject this loan request? The applicant will be notified and the loan will be marked as Rejected.'
            });
            setDetailsLoan(null);
          }}
        />
      )}

      {editLoan && (
        <NewLoanModal
          initialLoan={editLoan.isNew ? null : editLoan}
          onClose={() => setEditLoan(null)}
          onSubmitLoan={(updatedLoan) => {
            onEditLoan(updatedLoan);
            setEditLoan(null);
          }}
        />
      )}

      {loanToCancel && (
        <CancelLoanModal
          cancelStatus={cancelStatus}
          onClose={() => setLoanToCancel(null)}
          onConfirmCancel={confirmCancelLoan}
          onCloseSuccess={closeCancelSuccess}
        />
      )}

      {confirmAction && (
        <ConfirmActionModal
          title={confirmAction.title}
          message={confirmAction.message}
          onClose={() => setConfirmAction(null)}
          onConfirm={() => {
            if (confirmAction.type === 'approve') {
              handleApproveLoan(confirmAction.loanId);
            } else if (confirmAction.type === 'reject') {
              handleRejectLoan(confirmAction.loanId);
            }
            setConfirmAction(null);
          }}
        />
      )}
    </div>
  );
}
