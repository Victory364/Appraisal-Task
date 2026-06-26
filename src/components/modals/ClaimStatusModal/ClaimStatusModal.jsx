import '../ModalBase/ModalBase.css';
import './ClaimStatusModal.css';
import confirmIcon from '../../../assets/Fowgate Folder/help-circle.svg';
import successIllustration from '../../../assets/Fowgate Folder/Check for success page.svg';

export function SubmitConfirmModal({ modalMode, onCancel, onConfirm }) {
  const message = modalMode === 'edit'
    ? (
      <>
        Are you sure you want to submit the changes made to this <strong>Expense Claim</strong>? Ensure all details are correct before proceeding
      </>
    )
    : (
      <>
        Are you sure you want to submit this <strong>Expense Claim</strong>? Ensure all details are correct before proceeding.
      </>
    );

  return (
    <div className="modal-overlay">
      <div className={`claim-modal claim-status-modal ${modalMode === 'edit' ? 'is-edit' : ''}`}>
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={confirmIcon} alt="Confirm" className="claim-status-title-icon" />
            Confirm Action
          </h3>
          <button onClick={onCancel} className="claim-modal-close">
            {modalMode === 'edit' ? '✕' : 'X'}
          </button>
        </div>
        <div className="claim-status-copy">
          {message}
        </div>
        <div className="claim-modal-actions claim-status-actions">
          <button type="button" onClick={onCancel} className="modal-btn-cancel">Cancel</button>
          <button type="button" onClick={onConfirm} className="modal-btn-submit claim-status-confirm-button">
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  );
}

export function ClaimSuccessModal({ modalMode, onFinish }) {
  return (
    <div className="modal-overlay">
      <div className="claim-modal claim-success-modal">
        <img src={successIllustration} alt="Success checkmark" className="claim-success-illustration" />
        <h3 className="claim-success-title">{modalMode === 'edit' ? 'Changes Saved!' : 'Claim Submitted'}</h3>
        <p className="claim-success-copy">
          Your submission has been received and is under review; you'll be notified once it is processed.
        </p>
        <button type="button" onClick={onFinish} className="modal-btn-primary">Okay</button>
      </div>
    </div>
  );
}
