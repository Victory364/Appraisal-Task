import React from 'react';
import './CancelLoanModal.css';
import confirmIcon from '../assets/Fowgate Folder/help-circle.svg';
import successIllustration from '../assets/Fowgate Folder/Check for success page.svg';

export default function CancelLoanModal({
  cancelStatus,
  onClose,
  onConfirmCancel,
  onCloseSuccess
}) {
  return (
    <div className="modal-overlay">
      {cancelStatus === 'confirm' ? (
        <div className="cancel-loan-modal">
          <div className="cancel-loan-header">
            <div className="cancel-loan-title">
              <img src={confirmIcon} alt="Confirm" />
              Confirm Action
            </div>
            <button onClick={onClose} className="cancel-loan-close">✕</button>
          </div>
          <div className="cancel-loan-copy">
            Are you sure you want to proceed with cancelling this loan application?
          </div>
          <div className="cancel-loan-actions">
            <button onClick={onClose} className="cancel-loan-ghost">Cancel</button>
            <button onClick={onConfirmCancel} className="cancel-loan-confirm">Yes, I'm sure</button>
          </div>
        </div>
      ) : (
        <div className="cancel-success-modal">
          <img src={successIllustration} alt="Success checkmark" className="cancel-success-illustration" />
          <h3>Application Cancelled!</h3>
          <p>Your loan application has been cancelled successfully.</p>
          <button onClick={onCloseSuccess} className="cancel-success-button">Okay</button>
        </div>
      )}
    </div>
  );
}
