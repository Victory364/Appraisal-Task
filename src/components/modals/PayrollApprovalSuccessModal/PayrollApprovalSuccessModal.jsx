import '../ModalBase/ModalBase.css';
import './PayrollApprovalSuccessModal.css';
import successIllustration from '../../../assets/Fowgate Folder/Check for success page.svg';

export default function PayrollApprovalSuccessModal({ onClose }) {
  return (
    <div className="modal-overlay" role="presentation">
      <section className="claim-modal payroll-approval-success" role="dialog" aria-modal="true" aria-labelledby="claim-approved-title">
        <img src={successIllustration} alt="Success" />
        <h3 id="claim-approved-title">Claim Approved!</h3>
        <p>The expense claim has been successfully approved and the employee has been notified.</p>
        <button onClick={onClose}>Okay</button>
      </section>
    </div>
  );
}
