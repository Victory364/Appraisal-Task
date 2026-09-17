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

const CLAIMS_STORAGE_KEY = 'payroll_claims_data_v2';

const DEFAULT_PAYROLL_CLAIMS = [
  {
    id: 'CL-001',
    user: { name: 'Alfred Beckett', role: 'Software Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80' },
    purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateCreated: '12 Jan, 2024',
    date: '12 Jan, 2024',
    amount: 35000,
    status: 'Pending',
    approvedBy: '',
    reviewerComment: 'The expense details have been reviewed and is in line with company policies. Reimbursement will be processed shortly.'
  },
  {
    id: 'CL-002',
    user: { name: 'Samuel Adeniyi', role: 'Product Designer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80' },
    purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateCreated: '03 Jan, 2024',
    date: '03 Jan, 2024',
    amount: 20000,
    status: 'Approved',
    approvedBy: 'HR Manager',
    dateApproved: '04 Jan, 2024'
  },
  {
    id: 'CL-003',
    user: { name: 'Jane Smith', role: 'Operations Lead', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80' },
    purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateCreated: '23 Dec, 2024',
    date: '23 Dec, 2024',
    amount: 10000,
    status: 'Pending',
    approvedBy: ''
  },
  {
    id: 'CL-004',
    user: { name: 'Emma Brown', role: 'HR Specialist', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80' },
    purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateCreated: '18 Dec, 2024',
    date: '18 Dec, 2024',
    amount: 15000,
    status: 'Approved',
    approvedBy: 'HR Manager',
    dateApproved: '19 Dec, 2024'
  },
  {
    id: 'CL-005',
    user: { name: 'William Garcia', role: 'Accountant', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80' },
    purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateCreated: '06 Dec, 2024',
    date: '06 Dec, 2024',
    amount: 10000,
    status: 'Pending',
    approvedBy: ''
  },
  {
    id: 'CL-006',
    user: { name: 'Sophia Martinez', role: 'Marketing Manager', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=80' },
    purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateCreated: '30 Nov, 2024',
    date: '30 Nov, 2024',
    amount: 10000,
    status: 'Rejected',
    approvedBy: 'HR Manager'
  },
  {
    id: 'CL-007',
    user: { name: 'Benjamin Wilson', role: 'Legal Counsel', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80' },
    purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateCreated: '24 Nov, 2024',
    date: '24 Nov, 2024',
    amount: 30000,
    status: 'Approved',
    approvedBy: 'HR Manager'
  },
  {
    id: 'CL-008',
    user: { name: 'Ibrahim Abdullahi', role: 'Support Specialist', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80' },
    purpose: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    dateCreated: '01 Nov, 2024',
    date: '01 Nov, 2024',
    amount: 20000,
    status: 'Approved',
    approvedBy: 'HR Manager'
  }
];

const readClaims = () => {
  try {
    const raw = sessionStorage.getItem(CLAIMS_STORAGE_KEY);
    if (!raw) return DEFAULT_PAYROLL_CLAIMS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length >= 8 ? parsed : DEFAULT_PAYROLL_CLAIMS;
  } catch {
    return DEFAULT_PAYROLL_CLAIMS;
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
                          src={claim.user?.avatar || `https://i.pravatar.cc/80?u=${encodeURIComponent(claim.user?.name || claim.id)}`}
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
          const alfred = claims.find((c) => c.user?.name === 'Alfred Beckett') || claims[0];
          if (alfred) openReview(alfred, 'details');
        }}
      />
    </div>
  );
}
