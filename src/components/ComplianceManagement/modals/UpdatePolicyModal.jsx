import React, { useState } from 'react';
import '../../modals/ModalBase/ModalBase.css';
import edit02Icon from '../../../assets/Fowgate Folder/edit-02.svg';
import arrowDown from '../../../assets/Fowgate Folder/arrow-down-01.svg';

export default function UpdatePolicyModal({ isOpen, onClose, policyData, onSave }) {
  const [title, setTitle] = useState(policyData?.title || 'Termination Management');
  const [category, setCategory] = useState(policyData?.category || 'Contractual');
  const [dateCreated, setDateCreated] = useState(policyData?.dateCreated || '12 Dec, 2024');
  const [renewalDate, setRenewalDate] = useState(policyData?.renewalDate || '12 Mar, 2025');
  const [description, setDescription] = useState(
    'At Fowgate, we are committed to supporting our employees during life\'s most significant and challenging moments. Our Paid Family and Medical Leave policy is designed to provide eligible team members with the time needed to care for loved ones or themselves, fostering both peace of mind and financial security.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, category, dateCreated, renewalDate, description });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="claim-modal update-policy-modal" onClick={(e) => e.stopPropagation()}>
        {/* Blue Header Bar matching Write Letter modal */}
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={edit02Icon} alt="" className="claim-modal-title-icon" />
            Update Policy
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close" aria-label="Close">
            ✕
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <div
            className="notif-list"
            style={{
              flex: '1 1 auto',
              minHeight: 0,
              overflowY: 'auto',
              padding: '24px 24px 16px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Policy Title */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                Policy Title
              </label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  height: '42px',
                  borderRadius: '4px',
                  border: '1px solid #cbd5e1',
                  fontSize: '14px',
                  padding: '0 14px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Compliance Category */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                Compliance Category
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    height: '42px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    color: '#1e293b',
                    appearance: 'none',
                    paddingRight: '36px',
                    paddingLeft: '14px',
                    backgroundImage: 'none',
                    width: '100%',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="Contractual">Contractual</option>
                  <option value="Operational">Operational</option>
                  <option value="Data">Data</option>
                  <option value="Financial">Financial</option>
                  <option value="Security">Security</option>
                  <option value="HSE">HSE</option>
                  <option value="Tax Laws">Tax Laws</option>
                </select>
                <img
                  src={arrowDown}
                  alt=""
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    width: '14px',
                    height: '14px'
                  }}
                />
              </div>
            </div>

            {/* Dates row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                  Date Created
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={dateCreated}
                  onChange={(e) => setDateCreated(e.target.value)}
                  style={{
                    height: '42px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    padding: '0 14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                  Renewal Date
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={renewalDate}
                  onChange={(e) => setRenewalDate(e.target.value)}
                  style={{
                    height: '42px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    padding: '0 14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Create Policy link button */}
            <div style={{ textAlign: 'right' }}>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1f66c7',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                + Create Policy
              </button>
            </div>

            {/* Conduct Interviews section matching Figma Image 1: header + bullet points */}
            <div
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#ffffff'
              }}
            >
              {/* Light blue header bar matching AddPolicyModal & Figma */}
              <div
                style={{
                  backgroundColor: '#edf4ff',
                  padding: '10px 16px',
                  borderBottom: '1px solid #dbeafe'
                }}
              >
                <h4 style={{ fontSize: '13.5px', fontWeight: '600', color: '#1e293b', margin: 0, fontFamily: 'Rubik, sans-serif' }}>
                  Conduct Interviews
                </h4>
              </div>

              {/* Bullet point content body — no textarea, no scrollbar controls */}
              <div style={{ padding: '14px 16px' }}>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: '#475569', lineHeight: '1.65' }}>
                  <li style={{ marginBottom: '8px' }}>
                    At Fowgate, we believe in supporting our employees during life&apos;s most critical moments.
                  </li>
                  <li style={{ marginBottom: '8px' }}>
                    Our Paid Family and Medical Leave policy provides eligible team members with the time needed to care for loved ones or themselves, ensuring peace of mind and financial stability.
                  </li>
                  <li>
                    Whether welcoming a new family member, recovering from a condition, or supporting a family member in need, we are here to help you balance work and life with confidence.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer matching Write Letter modal */}
          <div className="claim-modal-actions">
            <button type="button" className="modal-btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-btn-submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

