import React from 'react';
import '../../modals/ModalBase/ModalBase.css';
import helpCircle from '../../../assets/Fowgate Folder/help-circle.svg';

export default function ConfirmActionModal({ isOpen, onClose, onConfirm, title, policyTitle, message }) {
  if (!isOpen) return null;

  const modalTitle = title ? title.replace(/^\?\s*/, '') : 'Confirm Action';
  const name = policyTitle || 'Termination Management';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="claim-modal confirm-action-modal" onClick={(e) => e.stopPropagation()}>
        {/* Blue Header Bar matching Write Letter modal */}
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={helpCircle} alt="" className="claim-modal-title-icon" />
            {modalTitle}
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close" aria-label="Close">
            ✕
          </button>
        </div>

        {/* Modal Body matching Image 1 */}
        <div style={{ padding: '24px 24px 20px 24px' }}>
          <p className="confirm-modal-text" style={{ margin: 0, fontSize: '13.5px', color: '#475569', lineHeight: '1.6' }}>
            {message ? (
              message
            ) : (
              <>
                Are you sure you want to add this policy "<strong>{name}</strong>"? Ensure all details are correct before proceeding
              </>
            )}
          </p>
        </div>

        {/* Modal Footer matching Image 1 */}
        <div className="claim-modal-actions">
          <button type="button" className="modal-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: '9px 22px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#edf4ff',
              color: '#1d4ed8',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#dbeafe')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#edf4ff')}
          >
            Yes, I'm sure
          </button>
        </div>
      </div>
    </div>
  );
}
