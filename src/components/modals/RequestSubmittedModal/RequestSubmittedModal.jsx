import '../ModalBase/ModalBase.css';
import './RequestSubmittedModal.css';
import successIcon from '../../../assets/Fowgate Folder/Check for success page.svg'; 

export default function RequestSubmittedModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="claim-modal request-submitted-modal">
        <img src={successIcon} alt="Success" className="request-submitted-icon" />
        <h3 className="request-submitted-title">Request Submitted</h3>
        <p className="request-submitted-text">
          Your request has been received. We'll notify you with updates soon!
        </p>
        <button type="button" onClick={onClose} className="request-submitted-btn">
          Okay
        </button>
      </div>
    </div>
  );
}
