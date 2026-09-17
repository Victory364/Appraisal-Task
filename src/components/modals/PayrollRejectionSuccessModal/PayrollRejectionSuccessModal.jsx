import '../ModalBase/ModalBase.css';
import './PayrollRejectionSuccessModal.css';
import successIllustration from '../../../assets/Fowgate Folder/Check for success page.svg';

export default function PayrollRejectionSuccessModal({ onClose }) {
  return (
    <div className="modal-overlay" role="presentation" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section
        className="claim-modal payroll-rejection-success"
        role="dialog"
        aria-modal="true"
        aria-labelledby="claim-rejected-title"
      >
        <img src={successIllustration} alt="Success" />
        <h3 id="claim-rejected-title">Claim Rejected!</h3>
        <p>The expense claim has been rejected, and the employee has been notified</p>
        <button type="button" onClick={onClose}>Okay</button>
      </section>
    </div>
  );
}
