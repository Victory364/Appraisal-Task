import React, { useState } from 'react';
import '../../modals/ModalBase/ModalBase.css';
import addExpense from '../../../assets/Fowgate Folder/Add Expense Claim.svg';
import arrowDown from '../../../assets/Fowgate Folder/arrow-down-01.svg';

const COMPLIANCE_TYPES = ['Regulatory', 'Corporate', 'Statutory', 'Operational', 'Others'];

// Generates a formatted timestamp like "12 Dec, 2024; 01:11PM"
const formatCategoryTimestamp = (date = new Date()) => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${day} ${month}, ${year}; ${hours.toString().padStart(2, '0')}:${minutes}${ampm}`;
};

const RECIPIENT_OPTIONS = [
  'Grace Nwosu',
  'michaeljohnson@gmail.com',
  'Lisa Carter',
  'Human Resources',
  'Ava Carter',
  'Finance',
  'Marketing',
  'Operations',
  'Information Technology',
  'Daniel Thompson',
  'Product Development',
  'Research and Development',
  'Legal',
  'Audit',
];

export default function CreateCategoryModal({ isOpen, onClose, onNext, onSubmit }) {
  const [title, setTitle] = useState('Code of Conduct and Ethics');
  const [type, setType] = useState('');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [showCustomType, setShowCustomType] = useState(false);
  const [customType, setCustomType] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [isRecipientOpen, setIsRecipientOpen] = useState(true);

  if (!isOpen) return null;

  const toggleRecipient = (tag) => {
    if (selectedRecipients.includes(tag)) {
      setSelectedRecipients(selectedRecipients.filter((r) => r !== tag));
    } else {
      setSelectedRecipients([...selectedRecipients, tag]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const finalType = showCustomType && customType.trim()
      ? customType.trim()
      : type || 'Corporate';

    // Capture the exact creation timestamp at the moment of submission
    const categoryData = {
      title: title || 'New Category',
      type: finalType,
      recipients: selectedRecipients.length > 0 ? selectedRecipients : ['Operations'],
      dateCreated: formatCategoryTimestamp(),
    };

    if (onSubmit) {
      onSubmit(categoryData);
    } else if (onNext) {
      onNext(categoryData);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="claim-modal create-category-modal" onClick={(e) => e.stopPropagation()}>
        {/* Blue Header Bar matching Write Letter modal */}
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <img src={addExpense} alt="" className="claim-modal-title-icon" />
            Create Category
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close" aria-label="Close">
            ✕
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <div className="hide-scrollbar" style={{ padding: '24px 24px 16px 24px', display: 'flex', flexDirection: 'column', gap: '18px', flex: 1, overflowY: 'auto' }}>

            {/* Compliance Title */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                Compliance Title
              </label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter compliance title"
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

            {/* Compliance Type Custom Dropdown */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                Compliance Type
              </label>
              <div style={{ position: 'relative' }}>
                {/* Trigger Box */}
                <div
                  onClick={() => setIsTypeOpen(!isTypeOpen)}
                  style={{
                    height: '42px',
                    borderRadius: '4px',
                    border: `1px solid ${isTypeOpen ? '#1f66c7' : '#cbd5e1'}`,
                    boxShadow: isTypeOpen ? '0 0 0 3px rgba(31, 102, 199, 0.1)' : 'none',
                    fontSize: '14px',
                    color: type ? '#1e293b' : '#94a3b8',
                    padding: '0 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{type || 'Select'}</span>
                  <img
                    src={arrowDown}
                    alt=""
                    style={{
                      width: '14px',
                      height: '14px',
                      transform: isTypeOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </div>

                {/* Custom Fancy Dropdown Popover */}
                {isTypeOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      left: 0,
                      width: '100%',
                      backgroundColor: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '6px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                      zIndex: 100,
                      overflow: 'hidden',
                      padding: '4px 0'
                    }}
                  >
                    {COMPLIANCE_TYPES.map((t) => {
                      const isSelected = type === t;
                      return (
                        <div
                          key={t}
                          onClick={() => {
                            setType(t);
                            setIsTypeOpen(false);
                          }}
                          style={{
                            padding: '10px 14px',
                            fontSize: '13.5px',
                            color: isSelected ? '#1f66c7' : '#334155',
                            backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                            fontWeight: isSelected ? '600' : '400',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'background-color 0.12s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = '#f8fafc';
                              e.currentTarget.style.color = '#1f66c7';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = '#ffffff';
                              e.currentTarget.style.color = '#334155';
                            }
                          }}
                        >
                          <span>{t}</span>
                          {isSelected && <span style={{ fontSize: '13px', fontWeight: 'bold' }}>✓</span>}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* + Add Type link */}
              <button
                type="button"
                onClick={() => setShowCustomType(!showCustomType)}
                style={{
                  alignSelf: 'flex-end',
                  background: 'none',
                  border: 'none',
                  color: '#1f66c7',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  padding: '4px 0 0 0',
                }}
              >
                + Add Type
              </button>

              {showCustomType && (
                <input
                  type="text"
                  className="form-input"
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                  placeholder="Type custom type here"
                  style={{
                    height: '42px',
                    borderRadius: '4px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    padding: '0 14px',
                    marginTop: '6px',
                    outline: 'none'
                  }}
                />
              )}
            </div>

            {/* Recipient */}
            <div className="form-group">
              <label className="form-label" style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>
                Recipient
              </label>

              {/* Recipient Field Box */}
              <div
                className={`recipient-select-box ${isRecipientOpen ? 'active' : ''}`}
                onClick={() => setIsRecipientOpen(!isRecipientOpen)}
                style={{
                  minHeight: '42px',
                  border: `1px solid ${isRecipientOpen ? '#1f66c7' : '#cbd5e1'}`,
                  borderRadius: '4px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '6px',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                {selectedRecipients.length === 0 ? (
                  <span style={{ color: '#94a3b8', fontSize: '14px' }}>Select</span>
                ) : (
                  <>
                    {selectedRecipients.slice(0, 4).map((rec) => (
                      <span
                        key={rec}
                        className="recipient-pill-selected"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          backgroundColor: '#eff6ff',
                          border: '1px solid #bfdbfe',
                          color: '#1f66c7',
                          fontSize: '12px',
                          fontWeight: '500',
                          padding: '3px 8px',
                          borderRadius: '14px'
                        }}
                      >
                        {rec}
                        <button
                          type="button"
                          className="recipient-pill-remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRecipient(rec);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#1f66c7',
                            cursor: 'pointer',
                            padding: '0 0 0 2px',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            lineHeight: 1
                          }}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {selectedRecipients.length > 4 && (
                      <span
                        className="recipient-pill-more"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          color: '#1f66c7',
                          fontSize: '12px',
                          fontWeight: '500',
                          padding: '3px 6px'
                        }}
                      >
                        +{selectedRecipients.length - 4} more
                      </span>
                    )}
                  </>
                )}

                <img
                  src={arrowDown}
                  alt=""
                  style={{
                    marginLeft: 'auto',
                    width: '14px',
                    height: '14px',
                    transform: isRecipientOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0
                  }}
                />
              </div>

              {/* Tag Selection Popover Grid below */}
              {isRecipientOpen && (
                <div
                  className="recipient-dropdown-popover hide-scrollbar"
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    marginTop: '6px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    maxHeight: '180px',
                    overflowY: 'auto'
                  }}
                >
                  {RECIPIENT_OPTIONS.map((tag) => {
                    const isSelected = selectedRecipients.includes(tag);
                    return (
                      <div
                        key={tag}
                        className={`recipient-pill-tag ${isSelected ? 'selected' : 'unselected'}`}
                        onClick={() => toggleRecipient(tag)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          fontWeight: '500',
                          padding: '5px 10px',
                          borderRadius: '16px',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          userSelect: 'none',
                          backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                          color: isSelected ? '#1f66c7' : '#475569',
                          border: `1px solid ${isSelected ? '#bfdbfe' : '#e2e8f0'}`
                        }}
                      >
                        <span>{tag}</span>
                        <span style={{ fontSize: '11px', fontWeight: isSelected ? 'bold' : 'normal' }}>
                          {isSelected ? '✕' : '+'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Spacer */}
          <div style={{ minHeight: '40px' }} />

          {/* Modal Footer */}
          <div className="claim-modal-actions">
            <button type="button" onClick={onClose} className="modal-btn-cancel">
              Cancel
            </button>
            <button type="submit" className="modal-btn-submit">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


