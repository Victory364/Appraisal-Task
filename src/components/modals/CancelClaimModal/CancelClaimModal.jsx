import '../ModalBase/ModalBase.css';
import './CancelClaimModal.css';
import confirmIcon from '../../../assets/Fowgate Folder/help-circle.svg';
import successIllustration from '../../../assets/Fowgate Folder/Check for success page.svg';

export default function CancelClaimModal({
  cancelStatus,
  onClose,
  onConfirmCancel,
  onCloseSuccess
}) {
  return (
    <div className="modal-overlay">
      {cancelStatus === 'confirm' ? (
        <div className="cancel-claim-modal">
          <div className="cancel-claim-header">
            <div className="cancel-claim-title">
              <img src={confirmIcon} alt="Confirm" />
              Confirm Action
            </div>
            <button onClick={onClose} className="claim-modal-close cancel-claim-close">x</button>
          </div>
          <div className="cancel-claim-copy">
            Are you sure you want to proceed with cancelling this expense claim application?
          </div>
          <div className="cancel-claim-actions">
            <button onClick={onClose} className="modal-btn-cancel cancel-claim-ghost">Cancel</button>
            <button onClick={onConfirmCancel} className="modal-btn-submit cancel-claim-confirm">Yes, I'm sure</button>
          </div>
        </div>
      ) : (
        <div className="cancel-success-modal">
          <img src={successIllustration} alt="Success checkmark" className="cancel-success-illustration" />
          <h3>Application Cancelled!</h3>
          <p>Your expense claim application has been cancelled successfully.</p>
          <button onClick={onCloseSuccess} className="modal-btn-submit cancel-success-button">Okay</button>
        </div>
      )}
    </div>
  );
}
