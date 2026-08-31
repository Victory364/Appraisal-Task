import React from 'react';
import '../../modals/ModalBase/ModalBase.css';
import '../../modals/ClaimStatusModal/ClaimStatusModal.css';
import successIllustration from '../../../assets/Fowgate Folder/Check for success page.svg';

export default function CategoryCreatedModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="claim-modal claim-success-modal" onClick={(e) => e.stopPropagation()}>
        <img src={successIllustration} alt="Success checkmark" className="claim-success-illustration" />
        <h3 className="claim-success-title">Category Created!</h3>
        <p className="claim-success-copy">
          Your events have been successfully added to the calendar. Stay organized and on track!
        </p>
        <button type="button" onClick={onClose} className="modal-btn-primary">
          Okay
        </button>
      </div>
    </div>
  );
}
