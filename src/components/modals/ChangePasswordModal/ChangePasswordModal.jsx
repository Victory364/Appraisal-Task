import { useState } from 'react';
import '../ModalBase/ModalBase.css';
import './ChangePasswordModal.css';

import securitySafe from '../../../assets/Fowgate Folder/security-safe.svg';


// We'll use an inline SVG for the eye icon, checkmarks, and shield lock


const EyeIcon = ({ show, onClick }) => (
  <svg onClick={onClick} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer', position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
    {show ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      </>
    )}
  </svg>
);

const CheckIcon = ({ isValid }) => {
  return isValid ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#22C55E">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
       <circle cx="12" cy="12" r="10"></circle>
    </svg>
  );
};

export default function ChangePasswordModal({ onClose, onSubmit }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showRetype, setShowRetype] = useState(false);
  
  const [showErrors, setShowErrors] = useState(false);

  const validations = {
    length: newPassword.length >= 6,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword)
  };

  const isFormValid = currentPassword.length > 0 && 
                      newPassword.length > 0 && 
                      retypePassword === newPassword && 
                      Object.values(validations).every(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setShowErrors(true);
      return;
    }
    if (onSubmit) onSubmit({ currentPassword, newPassword });
  };

  return (
    <div className="modal-overlay">
      <div className="claim-modal change-password-modal">
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={securitySafe} alt="Security Safe" className="claim-modal-title-icon" />
            Change Password
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="change-password-form">
          <div className="change-password-scroll">
            
            <div className="change-password-field">
              <label>Current Password <span className="required-asterisk">*</span></label>
              <div className="password-input-wrapper">
                <input 
                  type={showCurrent ? "text" : "password"} 
                  placeholder="*****************"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={`change-password-input ${showErrors && currentPassword.length === 0 ? 'input-mismatch' : ''}`} 
                />
                <EyeIcon show={showCurrent} onClick={() => setShowCurrent(!showCurrent)} />
              </div>
            </div>

            <div className="change-password-field">
              <label>New Password <span className="required-asterisk">*</span></label>
              <div className="password-input-wrapper">
                <input 
                  type={showNew ? "text" : "password"} 
                  placeholder="Enter password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={`change-password-input ${showErrors && (!Object.values(validations).every(Boolean)) ? 'input-mismatch' : ''}`} 
                />
                <EyeIcon show={showNew} onClick={() => setShowNew(!showNew)} />
              </div>
            </div>

            <div className="change-password-field">
              <label>Retype Password <span className="required-asterisk">*</span></label>
              <div className="password-input-wrapper">
                <input 
                  type={showRetype ? "text" : "password"} 
                  placeholder="Enter password"
                  value={retypePassword}
                  onChange={(e) => setRetypePassword(e.target.value)}
                  className={`change-password-input ${
                    retypePassword.length > 0 
                      ? (retypePassword === newPassword ? 'input-match' : 'input-mismatch') 
                      : (showErrors ? 'input-mismatch' : '')
                  }`}
                />
                <EyeIcon show={showRetype} onClick={() => setShowRetype(!showRetype)} />
              </div>
            </div>

            <div className="password-requirements">
              <p>Password must contain:</p>
              <ul>
                <li><CheckIcon isValid={validations.length} /> <span className={validations.length ? 'valid-text' : ''}>At least 6 characters</span></li>
                <li><CheckIcon isValid={validations.uppercase} /> <span className={validations.uppercase ? 'valid-text' : ''}>At least 1 upper case letter (A-Z)</span></li>
                <li><CheckIcon isValid={validations.lowercase} /> <span className={validations.lowercase ? 'valid-text' : ''}>At least 1 lower case letter (a-z)</span></li>
                <li><CheckIcon isValid={validations.number} /> <span className={validations.number ? 'valid-text' : ''}>At least 1 number</span></li>
              </ul>
            </div>
            
          </div>

          <div className="claim-modal-actions">
            <button type="button" onClick={onClose} className="modal-btn-cancel" style={{ border: 'none', background: 'transparent' }}>Cancel</button>
            <button type="submit" className="modal-btn-submit">Change Password</button>
          </div>
        </form>
      </div>
    </div>
  );
}
