import React, { useState } from 'react';
import './CancelLoanModal.css';
import { HelpCircle, X } from 'lucide-react';

export default function CancelLoanModal({ onClose, onConfirm }) {
  const [isCancelled, setIsCancelled] = useState(false);

  if (isCancelled) {
    return (
      <div className="loan-modal-overlay success-overlay" role="presentation" onClick={onConfirm}>
        <div className="application-cancelled-modal" role="dialog" aria-modal="true" aria-labelledby="application-cancelled-title" onClick={(event) => event.stopPropagation()}>
          <div className="cancel-success-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="success-copy">
            <h2 id="application-cancelled-title">Application Cancelled!</h2>
            <p>Your loan application has been cancelled successfully.</p>
          </div>
          <button className="success-okay-button" type="button" onClick={onConfirm}>Okay</button>
        </div>
      </div>
    );
  }

  return (
    <div className="loan-modal-overlay confirm-overlay" role="presentation" onClick={onClose}>
      <div className="confirm-action-modal" role="dialog" aria-modal="true" aria-labelledby="cancel-loan-title" onClick={(event) => event.stopPropagation()}>
        <div className="confirm-action-header">
          <div className="confirm-action-title">
            <HelpCircle size={18} />
            <h2 id="cancel-loan-title">Confirm Action</h2>
          </div>
          <button className="new-loan-close" type="button" aria-label="Close cancel confirmation" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="confirm-action-body">
          <p>Are you sure you want to proceed with the action of cancelling this loan application?</p>
        </div>

        <div className="confirm-action-footer">
          <button className="cancel-loan-button" type="button" onClick={onClose}>Cancel</button>
          <button className="submit-loan-button" type="button" onClick={() => setIsCancelled(true)}>Yes, I'm sure</button>
        </div>
      </div>
    </div>
  );
}
