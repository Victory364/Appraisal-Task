import { useState, useEffect } from 'react';
import { FileText, HelpCircle, AtSign, RotateCcw, Smile, X } from 'lucide-react';
import './PayrollClaimReviewModal.css';
import alfredBeckettAvatar from '../../../assets/Fowgate Folder/alfred_beckett.png';

export default function PayrollClaimReviewModal({
  claim,
  formatCurrency,
  mode = 'details',
  onClose,
  onDecision,
  onSaveComment,
  onRequestReject,
  onRequestApprove,
}) {
  const [currentView, setCurrentView] = useState(mode === 'reject' ? 'reject' : 'details');
  const [rejectionReason, setRejectionReason] = useState(claim.reviewerComment || '');
  const isPending = claim.status === 'Pending';

  useEffect(() => {
    setCurrentView(mode === 'reject' ? 'reject' : 'details');
  }, [mode]);

  const handleRejectSubmit = () => {
    if (!rejectionReason.trim()) return;
    setCurrentView('confirm');
  };

  const handleConfirmReject = () => {
    if (!rejectionReason.trim()) return;
    onDecision(claim.id, 'Rejected', rejectionReason.trim());
  };

  const categories = claim.categories?.length
    ? claim.categories
    : [
        { type: 'Public Transport', details: 'Lorem ipsum dolor sit amet, co...', amount: 7500 },
        { type: 'Food', details: 'Lorem ipsum dolor sit', amount: 5000 },
      ];

  return (
    <div
      className="payroll-modal-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {currentView === 'confirm' ? (
        /* ── 3. Confirm Action Modal (matching Picture 2 in Figma) ── */
        <section
          className="payroll-claim-dialog payroll-confirm-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payroll-confirm-title"
        >
          <header className="payroll-modal-blue-header">
            <h3 id="payroll-confirm-title" className="payroll-modal-heading">
              <HelpCircle size={19} aria-hidden="true" />
              <span>Confirm Action</span>
            </h3>
            <button onClick={onClose} className="payroll-modal-x-btn" aria-label="Close">
              <X size={18} />
            </button>
          </header>

          <div className="payroll-confirm-body">
            <p className="payroll-confirm-prompt">
              Are you sure you want to reject this Expense Claim? Ensure you've check and confirm the details before proceeding
            </p>
          </div>

          <footer className="payroll-confirm-footer">
            <button
              type="button"
              className="payroll-btn-cancel"
              onClick={() => setCurrentView('reject')}
            >
              Cancel
            </button>
            <button
              type="button"
              className="payroll-btn-confirm-yes"
              onClick={handleConfirmReject}
            >
              Yes, I'm sure
            </button>
          </footer>
        </section>
      ) : currentView === 'reject' ? (
        /* ── 2. Reject Expense Claim Modal (matching Picture 1 in Figma) ── */
        <section
          className="payroll-claim-dialog payroll-reject-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payroll-reject-title"
        >
          <header className="payroll-modal-blue-header">
            <h3 id="payroll-reject-title" className="payroll-modal-heading">
              <HelpCircle size={19} aria-hidden="true" />
              <span>Reject Expense Claim</span>
            </h3>
            <button onClick={onClose} className="payroll-modal-x-btn" aria-label="Close">
              <X size={18} />
            </button>
          </header>

          <div className="payroll-reject-body">
            <p className="payroll-reject-prompt">
              Please provide a reason for rejecting this expense claim to address concerns and prevent future issues
            </p>

            <div className="payroll-reject-editor">
              <textarea
                maxLength={500}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Type your comment here...."
              />
              <div className="payroll-reject-editor-footer">
                <span className="payroll-reject-tools">
                  <button type="button" aria-label="Add emoji"><Smile size={14} /></button>
                  <button type="button" aria-label="Undo"><RotateCcw size={14} /></button>
                  <button type="button" aria-label="Mention user"><AtSign size={14} /></button>
                </span>
                <small>{rejectionReason.length}/500</small>
              </div>
            </div>
          </div>

          <footer className="payroll-reject-footer">
            <button
              type="button"
              className="payroll-btn-cancel"
              onClick={() => {
                if (mode === 'reject') {
                  onClose();
                } else {
                  setCurrentView('details');
                }
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="payroll-btn-submit"
              onClick={handleRejectSubmit}
              disabled={!rejectionReason.trim()}
            >
              Submit
            </button>
          </footer>
        </section>
      ) : (
        /* ── 1. View Expense Claim Modal (matching left frame in Figma) ── */
        <section
          className="payroll-claim-dialog payroll-view-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="payroll-view-title"
        >
          <header className="payroll-modal-blue-header">
            <h3 id="payroll-view-title" className="payroll-modal-heading">
              <FileText size={18} aria-hidden="true" />
              <span>View Expense Claim</span>
            </h3>
            <button onClick={onClose} className="payroll-modal-x-btn" aria-label="Close">
              <X size={18} />
            </button>
          </header>

          <div className="payroll-view-body">
            <div className="payroll-person-card">
              <div className="payroll-person-left">
                <img
                  src={claim.user?.avatar || alfredBeckettAvatar}
                  alt={claim.user?.name || 'Employee'}
                />
                <div>
                  <strong>{claim.user?.name || 'Alfred Beckett'}</strong>
                  <span>{claim.user?.role || 'Software Engineer'}</span>
                </div>
              </div>
              <span className={`payroll-status ${claim.status.toLowerCase()}`}>{claim.status}</span>
            </div>

            <div className="payroll-meta-bar">
              <div>
                <strong>{claim.dateCreated || '12 JAN, 2025'}</strong>
                <span>DATE CREATED</span>
              </div>
              <div>
                <strong>{claim.dateSubmitted || claim.dateCreated || '12 JAN, 2025'}</strong>
                <span>DATE SUBMITTED</span>
              </div>
              <div>
                <strong>{claim.dateApproved || '-'}</strong>
                <span>DATE APPROVED</span>
              </div>
            </div>

            <div className="payroll-detail-section">
              <h4>Description</h4>
              <p>
                {claim.purpose && claim.purpose.length > 30
                  ? claim.purpose
                  : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat, sed diam voluptua.'}
              </p>
            </div>

            <div className="payroll-detail-section">
              <h4>Comment</h4>
              <p>
                {claim.extraNote ||
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.'}
              </p>
            </div>

            <div className="payroll-expense-breakdown">
              <div className="payroll-breakdown-head">
                <span>Expense Category</span>
                <span>Details</span>
                <span>Amount</span>
              </div>
              {categories.map((item, idx) => (
                <div className="payroll-breakdown-row" key={idx}>
                  <span className="payroll-cat-cell">{item.type}</span>
                  <span className="payroll-detail-cell">{item.details}</span>
                  <strong className="payroll-amount-cell">{formatCurrency(item.amount)}</strong>
                </div>
              ))}
            </div>
          </div>

          <footer className="payroll-view-footer">
            {isPending && (
              <>
                <button
                  type="button"
                  className="payroll-btn-reject-pill"
                  onClick={() => {
                    if (onRequestReject) {
                      onRequestReject();
                    }
                    setCurrentView('reject');
                  }}
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="payroll-btn-approve-pill"
                  onClick={onRequestApprove}
                >
                  Approve
                </button>
              </>
            )}
            {!isPending && (
              <button type="button" className="payroll-btn-cancel" onClick={onClose}>
                Close
              </button>
            )}
          </footer>
        </section>
      )}
    </div>
  );
}
