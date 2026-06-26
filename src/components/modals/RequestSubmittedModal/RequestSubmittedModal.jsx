import '../ModalBase/ModalBase.css';
import './RequestSubmittedModal.css';
import successIcon from '../../../assets/Fowgate Folder/Check for success page.svg'; 

export default function RequestSubmittedModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="claim-modal request-submitted-modal" style={{ width: '528px' }}>
        <img src={successIcon} alt="Success" className="request-submitted-icon" />
        <h3 className="request-submitted-title">Requested Submitted</h3>
        <p className="request-submitted-text">
          Your request has been received. We'll notify you<br/>
          with updates soon!
        </p>
        <button type="button" onClick={onClose} className="request-submitted-btn">
          Okay
        </button>
      </div>
    </div>
  );
}
