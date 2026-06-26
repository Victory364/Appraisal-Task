import '../ModalBase/ModalBase.css';
import './ConfirmActionModal.css';
import helpIcon from '../../../assets/Fowgate Folder/help-circle.svg'; 

export default function ConfirmActionModal({ onClose, onConfirm, title = 'Confirm Action', message }) {
  return (
    <div className="modal-overlay">
      <div className="claim-modal confirm-action-modal">
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={helpIcon} alt="Help" className="claim-modal-title-icon" />
            {title}
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close">✕</button>
        </div>

        <div className="confirm-action-body">
          <div style={{ margin: 0 }}>
            {message || (
              <>
                Are you sure you want to save the changes made to your profile?<br/>
                This action cannot be undone.
              </>
            )}
          </div>
        </div>

        <div className="claim-modal-actions">
          <button type="button" onClick={onClose} className="modal-btn-cancel" style={{ border: 'none', background: 'transparent' }}>Cancel</button>
          <button type="button" onClick={onConfirm} className="confirm-action-btn-yes">Yes, I'm sure</button>
        </div>
      </div>
    </div>
  );
}
