import React from 'react';
import '../../modals/ModalBase/ModalBase.css';
import '../../modals/ClaimStatusModal/ClaimStatusModal.css';
import successIllustration from '../../../assets/Fowgate Folder/Check for success page.svg';

export default function PolicyAddedModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="claim-modal claim-success-modal" onClick={(e) => e.stopPropagation()}>
        <img src={successIllustration} alt="Success checkmark" className="claim-success-illustration" />
        <h3 className="claim-success-title">Policy Added!</h3>
        <p className="claim-success-copy">
          The new policy has been added and is now available for employees to access.
        </p>
        <button type="button" onClick={onClose} className="modal-btn-primary">
          Okay
        </button>
      </div>
    </div>
  );
}
