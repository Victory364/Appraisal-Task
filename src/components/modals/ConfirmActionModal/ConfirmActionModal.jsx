import { HelpCircle, X } from 'lucide-react';
import '../ModalBase/ModalBase.css';
import './ConfirmActionModal.css';

export default function ConfirmActionModal({ onClose, onConfirm, message }) {
  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="claim-modal confirm-action-modal">
        <div className="claim-modal-header confirm-action-header">
          <h3 className="claim-modal-title">
            <HelpCircle size={19} className="claim-modal-title-icon" aria-hidden="true" />
            <span>Confirm Action</span>
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="confirm-action-body">
          <p style={{ margin: 0 }}>
            {message || (
              <>
                Are you sure you want to save the changes made to your profile?<br/>
                This action cannot be undone.
              </>
            )}
          </p>
        </div>

        <div className="claim-modal-actions confirm-action-footer">
          <button type="button" onClick={onClose} className="confirm-btn-cancel">Cancel</button>
          <button type="button" onClick={onConfirm} className="confirm-action-btn-yes">Yes, I'm sure</button>
        </div>
      </div>
    </div>
  );
}
