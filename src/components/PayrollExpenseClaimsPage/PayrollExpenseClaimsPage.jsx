import { useEffect, useMemo, useState } from 'react';
import { FileSearch, MessageCircle, XCircle } from 'lucide-react';
import './PayrollExpenseClaimsPage.css';
import fileIllustration from '../../assets/Fowgate Folder/File Illustration.svg';
import searchIcon from '../../assets/Fowgate Folder/search-normal.svg';
import calendarIcon from '../../assets/Fowgate Folder/calendar-03.svg';
import totalClaimsIcon from '../../assets/Fowgate Folder/Total claims.svg';
import totalReimbursedIcon from '../../assets/Fowgate Folder/Total reimbursed.svg';
import balanceToReimburseIcon from '../../assets/Fowgate Folder/Balance to Reimburse.svg';
import totalNumberClaimsIcon from '../../assets/Fowgate Folder/user-multiple-02.svg';
import PayrollClaimReviewModal from '../modals/PayrollClaimReviewModal/PayrollClaimReviewModal';
import ConfirmActionModal from '../modals/ConfirmActionModal/ConfirmActionModal';
import PayrollApprovalSuccessModal from '../modals/PayrollApprovalSuccessModal/PayrollApprovalSuccessModal';
import PayrollRejectionSuccessModal from '../modals/PayrollRejectionSuccessModal/PayrollRejectionSuccessModal';
import PayrollCommentsPanel from '../modals/PayrollCommentsPanel/PayrollCommentsPanel';
import NotificationPanel from '../modals/NotificationPanel/NotificationPanel';
import bellIcon from '../../assets/Fowgate Folder/Group 1226.svg';
import { AiBotIcon } from '../Icons/Icons';
import alfredBeckettAvatar from '../../assets/Fowgate Folder/alfred_beckett.png';

// Share the same storage key as ExpenseClaimsPage so both views show the same data
const CLAIMS_STORAGE_KEY = 'expense_claims';

const readClaims = () => {
  try {
    const raw = sessionStorage.getItem(CLAIMS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Ensure every claim has a `user` object (Payroll table needs it)
    return parsed.map((claim) => ({
      ...claim,
      user: claim.user || { name: claim.employeeName || 'Employee', role: claim.role || 'Employee' },
    }));
  } catch {
    return [];
  }
};

const formatCurrency = (value) => {
  const num = Number(value || 0);
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: num % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(num).replace('NGN', '₦').trim();
};

export default function PayrollExpenseClaimsPage() {
  const [claims, setClaims] = useState(readClaims);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [actionMenuFor, setActionMenuFor] = useState(null);
  const [reviewMode, setReviewMode] = useState('details');
  const [claimToApprove, setClaimToApprove] = useState(null);
  const [approvedClaim, setApprovedClaim] = useState(null);
  const [rejectedClaim, setRejectedClaim] = useState(null);
  const [commentClaim, setCommentClaim] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    // Keep sessionStorage in sync so changes made in Payroll view reflect in My Account view too
    sessionStorage.setItem(CLAIMS_STORAGE_KEY, JSON.stringify(claims));
  }, [claims]);

  const visibleClaims = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return claims.filter((claim) => {
      const employee = claim.user?.name || '';
      const matchesSearch = !query || [employee, claim.purpose, claim.dateCreated, claim.date]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
      const matchesStatus = statusFilter === 'All Status' || claim.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [claims, searchTerm, statusFilter]);

  const totalClaimAmount = claims.reduce((total, claim) => total + Number(claim.amount || 0), 0);
  const reimbursedAmount = claims
    .filter((claim) => claim.status === 'Approved')
    .reduce((total, claim) => total + Number(claim.amount || 0), 0);
  const pendingAmount = totalClaimAmount - reimbursedAmount;

  const updateClaimDecision = (id, decision, reviewerComment) => {
    const decisionDate = new Date().toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
    }).toUpperCase();

    setClaims((currentClaims) => currentClaims.map((claim) => (
      claim.id === id
        ? {
          ...claim,
          status: decision,
          dateApproved: decision === 'Approved' ? decisionDate : '-',
          dateReviewed: decisionDate,
          approvedBy: 'HR Manager',
          reviewerComment,
          lastEdited: decisionDate,
        }
        : claim
    )));
    setSelectedClaim(null);
    setCommentClaim(null);
    setActionMenuFor(null);
    setClaimToApprove(null);
    if (decision === 'Approved') setApprovedClaim(claims.find((claim) => claim.id === id) || { id });
    if (decision === 'Rejected') setRejectedClaim(claims.find((claim) => claim.id === id) || { id });
  };

  const saveComment = (id, reviewerComment) => {
    setClaims((currentClaims) => currentClaims.map((claim) => (
      claim.id === id ? { ...claim, reviewerComment, approvedBy: claim.approvedBy || 'HR Manager' } : claim
    )));
    setSelectedClaim(null);
    setCommentClaim((currentClaim) => currentClaim?.id === id ? { ...currentClaim, reviewerComment } : currentClaim);
  };

  const openReview = (claim, mode) => {
    setReviewMode(mode);
    setSelectedClaim(claim);
    setActionMenuFor(null);
  };

  const openComments = (claim) => {
    setCommentClaim(claim);
    setActionMenuFor(null);
  };

  return (
    <div className="payroll-claims-page">
      <div className="payroll-top-row">
        <div className="payroll-breadcrumb">Payroll / Expense Claims</div>
        <div className="payroll-top-actions">
          <button
            className="alert-bell-button payroll-ai-btn"
            aria-label="AI Assistant"
            type="button"
          >
            <AiBotIcon size={22} />
          </button>
          <button
            className={`alert-bell-button${notifOpen ? ' active' : ''}`}
            aria-label="Notifications"
            id="payroll-bell-btn"
            onClick={() => setNotifOpen(!notifOpen)}
          >
            <img src={bellIcon} alt="Notifications" />
            <span className="bell-badge-dot" />
          </button>
          <div className="payroll-avatar-wrapper">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100"
              alt="Profile"
            />
          </div>
        </div>
      </div>
      <div className="payroll-page-heading">
        <h2>Expense Management</h2>
        <div className="payroll-month-filter"><span>Filter by:</span><button>Dec 2024 <img src={calendarIcon} alt="" /></button></div>
      </div>

      <section className="payroll-metrics-grid" aria-label="Expense claim summary">
        <div className="payroll-metric-card"><div><img src={totalClaimsIcon} alt="" />Total Claims</div><strong>{formatCurrency(totalClaimAmount)}</strong><span className="payroll-metric-up">↗ +18.4%</span></div>
        <div className="payroll-metric-card"><div><img src={totalReimbursedIcon} alt="" />Total Reimbursed</div><strong>{formatCurrency(reimbursedAmount)}</strong><span className="payroll-metric-up">↗ +12.6%</span></div>
        <div className="payroll-metric-card"><div><img src={balanceToReimburseIcon} alt="" />Balance to Reimburse</div><strong>{formatCurrency(pendingAmount)}</strong><span className="payroll-metric-down">↘ -2.8%</span></div>
        <div className="payroll-metric-card"><div><img src={totalNumberClaimsIcon} alt="" />Total Number of Claims</div><strong>{claims.length}</strong><span className="payroll-metric-down">↘ -10.6%</span></div>
      </section>

      <section className="payroll-claims-card">
        <div className="payroll-claims-toolbar">
          <div className="payroll-table-title-area">
            <h3>Employee Expense Claims</h3>
            <div className="payroll-search">
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search name, date..." aria-label="Search employee claims" />
              <img src={searchIcon} alt="" />
            </div>
          </div>
          <div className="payroll-table-controls">
            <button className="payroll-date-range">Jan 12 - Jan 01 <img src={calendarIcon} alt="" /></button>
            <label className="payroll-status-filter"><span className="sr-only">Filter by status</span><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select></label>
          </div>
        </div>

        {visibleClaims.length === 0 ? (
          <div className="payroll-empty-state">
            <img src={fileIllustration} alt="No employee claims" />
            <h3>No employee claims found</h3>
            <p>Claims submitted by employees will appear here for HR review.</p>
          </div>
        ) : (
          <div className="payroll-table-scroll">
            <table className="payroll-claims-table">
              <thead>
                <tr>
                  <th>Employee Name</th>
                  <th>Details</th>
                  <th>Date Created</th>
                  <th>Amount</th>
                  <th>Actioned by</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleClaims.map((claim) => (
                  <tr key={claim.id}>
                    <td>
                      <div className="payroll-employee-cell">
                        <img
                          className="payroll-employee-avatar"
                          src={claim.user?.avatar || alfredBeckettAvatar}
                          alt=""
                        />
                        <span className="payroll-employee-info"><strong>{claim.user?.name || 'Employee'}</strong><span>{claim.user?.role || 'Employee'}</span></span>
                      </div>
                    </td>
                    <td className="payroll-details-cell" title={claim.purpose}>{claim.purpose}</td>
                    <td>{claim.dateCreated || claim.date || '-'}</td>
                    <td className="payroll-amount">{formatCurrency(claim.amount)}</td>
                    <td>{claim.approvedBy ? <span className="payroll-actioned-by"><i>SC</i>{claim.approvedBy}</span> : <span className="payroll-not-actioned">-</span>}</td>
                    <td><span className={`payroll-status ${claim.status.toLowerCase()}`}>{claim.status}</span></td>
                    <td className="payroll-action-cell">
                      <button className="payroll-kebab-button" onClick={() => setActionMenuFor(actionMenuFor === claim.id ? null : claim.id)} aria-label={`Actions for ${claim.user?.name || 'employee'}`}>
                        ⋮
                      </button>
                      {actionMenuFor === claim.id && <div className="payroll-action-menu">
                        <button onClick={() => openReview(claim, 'details')}><FileSearch className="payroll-menu-icon" aria-hidden="true" />View Details</button>
                        <button onClick={() => openComments(claim)}><MessageCircle className="payroll-menu-icon" aria-hidden="true" />Comment</button>
                        {claim.status === 'Pending' && <button className="payroll-menu-reject" onClick={() => openReview(claim, 'reject')}><XCircle className="payroll-menu-icon" aria-hidden="true" />Reject</button>}
                      </div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {selectedClaim && (
        <PayrollClaimReviewModal
          claim={selectedClaim}
          formatCurrency={formatCurrency}
          mode={reviewMode}
          onClose={() => setSelectedClaim(null)}
          onDecision={updateClaimDecision}
          onSaveComment={saveComment}
          onRequestReject={() => setReviewMode('reject')}
          onRequestApprove={() => { setClaimToApprove(selectedClaim); setSelectedClaim(null); }}
        />
      )}
      {claimToApprove && (
        <ConfirmActionModal
          message="Are you sure you want to approve this Expense Claim? Ensure you’ve checked and confirmed the details before proceeding."
          onClose={() => setClaimToApprove(null)}
          onConfirm={() => updateClaimDecision(claimToApprove.id, 'Approved', claimToApprove.reviewerComment || '')}
        />
      )}
      {approvedClaim && <PayrollApprovalSuccessModal onClose={() => setApprovedClaim(null)} />}
      {rejectedClaim && <PayrollRejectionSuccessModal onClose={() => setRejectedClaim(null)} />}
      {commentClaim && <PayrollCommentsPanel claim={commentClaim} onClose={() => setCommentClaim(null)} onSaveComment={saveComment} />}
      <NotificationPanel
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
        onSelectClaim={() => {
          const first = claims[0];
          if (first) openReview(first, 'details');
        }}
      />
    </div>
  );
}
