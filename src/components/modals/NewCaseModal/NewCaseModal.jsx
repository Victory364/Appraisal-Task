import React, { useState, useEffect, useRef } from 'react';
import './NewCaseModal.css';
import confirmIcon from '../../../assets/Fowgate Folder/help-circle.svg';
import successIllustration from '../../../assets/Fowgate Folder/Check for success page.svg';
import { ChevronDown, Check } from 'lucide-react';

const EMPLOYEES = [
  { name: 'Sophia Bennett', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Lisa Carter', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Okunboye Joshua', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Sophia Greene', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Samuel Adeyemi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Grace Nwosu', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Scott Pippen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Mary Adkins', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Jane Miller', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Adebayo Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Tunde Cole', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=80&h=80' },
  { name: 'Chidi Okafor', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80&h=80' }
];

const DEPARTMENTS = [
  'Design',
  'Data Science',
  'Marketing',
  'Operations',
  'Finance',
  'Logistics',
  'Product',
  'Engineering',
  'Human Resources',
  'Sales'
];

export default function NewCaseModal({ onClose, onSubmitCase }) {
  const [caseType, setCaseType] = useState('Disciplinary');
  const [subType, setSubType] = useState('Others');
  const [describeIssue, setDescribeIssue] = useState('Unauthorized Absence');
  
  // Custom multi-select & select states
  const [selectedTo, setSelectedTo] = useState([
    'Lisa Carter', 'Okunboye Joshua', 'Sophia Greene', 
    'John Doe', 'Jane Miller', 'Adebayo Samuel', 'Tunde Cole', 'Chidi Okafor'
  ]);
  const [selectedCc, setSelectedCc] = useState([
    'Design', 'Data Science', 'Marketing', 'Operations', 'Finance', 'Logistics', 'Product'
  ]);
  const [selectedSubject, setSelectedSubject] = useState(EMPLOYEES[0]); // Sophia Bennett
  const [priority, setPriority] = useState('High');
  const [message, setMessage] = useState('');

  // Dropdown open states
  const [toOpen, setToOpen] = useState(false);
  const [ccOpen, setCcOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);

  const [formErrors, setFormErrors] = useState({});

  // Wizard flow states
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Refs for closing dropdowns when clicking outside
  const toRef = useRef(null);
  const ccRef = useRef(null);
  const subjectRef = useRef(null);

  useEffect(() => {
    const clickOutside = (e) => {
      if (toRef.current && !toRef.current.contains(e.target)) setToOpen(false);
      if (ccRef.current && !ccRef.current.contains(e.target)) setCcOpen(false);
      if (subjectRef.current && !subjectRef.current.contains(e.target)) setSubjectOpen(false);
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  // Update default subTypes when Case Type changes
  useEffect(() => {
    if (caseType === 'Disciplinary') setSubType('Others');
    else if (caseType === 'Grievance') setSubType('Others');
    else setSubType('Others');
  }, [caseType]);

  const getTodayFormattedDate = () => {
    const d = new Date();
    const day = d.getDate().toString().padStart(2, '0');
    const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const year = d.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!describeIssue.trim()) {
      errors.issue = 'Description of the issue is required.';
    }
    if (selectedTo.length === 0) {
      errors.to = 'At least one recipient is required in "TO:".';
    }
    if (!selectedSubject) {
      errors.subject = 'Subject employee is required.';
    }
    if (!message.trim()) {
      errors.message = 'A composed message is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsConfirming(true);
  };

  const confirmSubmit = () => {
    setIsConfirming(false);
    setIsSubmitted(true);
  };

  const handleFinish = () => {
    const nextCase = {
      id: `CS-${Math.floor(1000 + Math.random() * 9000)}`,
      title: describeIssue,
      category: caseType,
      subType: subType,
      priority: priority,
      description: message,
      status: 'Open',
      dateCreated: getTodayFormattedDate(),
      subject: selectedSubject,
      to: selectedTo,
      cc: selectedCc
    };
    onSubmitCase(nextCase);
    onClose();
  };

  const toggleTo = (name) => {
    setSelectedTo(prev => 
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const toggleCc = (dept) => {
    setSelectedCc(prev => 
      prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
    );
  };

  // Helper to render TO pills
  const renderToPills = () => {
    if (selectedTo.length === 0) {
      return <span className="select-placeholder">Select recipients</span>;
    }
    const visible = selectedTo.slice(0, 3);
    const extra = selectedTo.length - 3;
    return (
      <div className="pill-container">
        {visible.map(name => (
          <span key={name} className="form-pill">
            {name}
          </span>
        ))}
        {extra > 0 && <span className="form-pill extra-pill">+{extra} more</span>}
      </div>
    );
  };

  // Helper to render CC pills
  const renderCcPills = () => {
    if (selectedCc.length === 0) {
      return <span className="select-placeholder">Select departments</span>;
    }
    const visible = selectedCc.slice(0, 4);
    const extra = selectedCc.length - 4;
    return (
      <div className="pill-container">
        {visible.map(dept => (
          <span key={dept} className="form-pill">
            {dept}
          </span>
        ))}
        {extra > 0 && <span className="form-pill extra-pill">+{extra} more</span>}
      </div>
    );
  };

  const getSubOptions = () => {
    if (caseType === 'Disciplinary') {
      return ['Others', 'Absenteeism', 'Misconduct', 'Performance', 'Insubordination'];
    } else if (caseType === 'Grievance') {
      return ['Others', 'Workplace Conflict', 'Compensation', 'Harassment', 'Policy Violation'];
    } else {
      return ['Others', 'General Query', 'Request', 'Dispute'];
    }
  };

  if (isSubmitted) {
    return (
      <div className="modal-overlay">
        <div className="claim-modal claim-success-modal">
          <img src={successIllustration} alt="Success checkmark" className="claim-success-illustration" />
          <h3 className="claim-success-title">Case Submitted</h3>
          <p className="claim-success-copy">
            Your case regarding <strong>"{describeIssue}"</strong> has been successfully registered. The Subject is <strong>{selectedSubject.name}</strong>.
          </p>
          <button type="button" onClick={handleFinish} className="modal-btn-primary">Okay</button>
        </div>
      </div>
    );
  }

  if (isConfirming) {
    return (
      <div className="modal-overlay">
        <div className="claim-modal confirm-action-modal-card scale-in">
          <div className="claim-modal-header">
            <h3 className="claim-modal-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Confirm Action
            </h3>
            <button type="button" onClick={() => setIsConfirming(false)} className="claim-modal-close" aria-label="Close dialog">×</button>
          </div>
          <div className="confirm-action-body">
            <p className="confirm-action-message">
              Are you sure you want to create this case? Please review the details and confirm.
            </p>
          </div>
          <div className="claim-modal-actions confirm-action-footer">
            <button type="button" onClick={() => setIsConfirming(false)} className="modal-btn-secondary">Cancel</button>
            <button type="button" onClick={confirmSubmit} className="modal-btn-primary">Yes, I'm sure</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target.classList.contains('modal-overlay')) onClose(); }}>
      <div className="claim-modal scale-in create-case-modal-container">
        {/* Header matching Figma document icon and text */}
        <div className="claim-modal-header">
          <h3 className="claim-modal-title">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Create New Case
          </h3>
          <button type="button" onClick={onClose} className="claim-modal-close" aria-label="Close dialog">×</button>
        </div>

        {/* Scroll area */}
        <div className="add-edit-scroll">
          <form onSubmit={handleFormSubmit} className="new-case-form">
            
            {/* Case Type Selector */}
            <div className="form-group">
              <label className="form-label" htmlFor="case-type">Case Type</label>
              <select
                id="case-type"
                value={caseType}
                onChange={(e) => setCaseType(e.target.value)}
                className="form-select"
              >
                <option value="Disciplinary">Disciplinary</option>
                <option value="Grievance">Grievance</option>
                <option value="Dispute">Dispute</option>
                <option value="Inquiry">Inquiry</option>
              </select>
            </div>

            {/* Dynamic Type Selector (e.g. Disciplinary Type) */}
            <div className="form-group">
              <label className="form-label" htmlFor="case-subtype">
                {caseType === 'Disciplinary' ? 'Disciplinary Type' : caseType === 'Grievance' ? 'Grievance Type' : 'Sub-Category'}
              </label>
              <select
                id="case-subtype"
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className="form-select"
              >
                {getSubOptions().map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Describe the Issue (Single line input in screenshot) */}
            <div className="form-group">
              <label className="form-label" htmlFor="case-issue">Describe the Issue</label>
              <input
                id="case-issue"
                type="text"
                placeholder="Enter description of the issue"
                value={describeIssue}
                onChange={(e) => {
                  setDescribeIssue(e.target.value);
                  if (formErrors.issue) {
                    setFormErrors(prev => ({ ...prev, issue: '' }));
                  }
                }}
                className={`form-input ${formErrors.issue ? 'error' : ''}`}
              />
              {formErrors.issue && <span className="error-text">{formErrors.issue}</span>}
            </div>

            {/* TO: Custom Multi-select pill selector */}
            <div className="form-group" ref={toRef}>
              <label className="form-label">TO:</label>
              <div 
                className={`custom-select-trigger ${toOpen ? 'focused' : ''} ${formErrors.to ? 'error' : ''}`}
                onClick={() => setToOpen(!toOpen)}
              >
                {renderToPills()}
                <ChevronDown size={16} className="trigger-arrow" />
              </div>
              {formErrors.to && <span className="error-text">{formErrors.to}</span>}
              {toOpen && (
                <div className="custom-select-dropdown">
                  {EMPLOYEES.map(emp => {
                    const isSelected = selectedTo.includes(emp.name);
                    return (
                      <div 
                        key={emp.name} 
                        className={`custom-select-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleTo(emp.name)}
                      >
                        <div className="item-checkbox">
                          {isSelected && <Check size={12} />}
                        </div>
                        <img src={emp.avatar} alt={emp.name} className="item-avatar" />
                        <span className="item-name">{emp.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CC: Custom Multi-select pill selector */}
            <div className="form-group" ref={ccRef}>
              <label className="form-label">CC</label>
              <div 
                className={`custom-select-trigger ${ccOpen ? 'focused' : ''}`}
                onClick={() => setCcOpen(!ccOpen)}
              >
                {renderCcPills()}
                <ChevronDown size={16} className="trigger-arrow" />
              </div>
              {ccOpen && (
                <div className="custom-select-dropdown">
                  {DEPARTMENTS.map(dept => {
                    const isSelected = selectedCc.includes(dept);
                    return (
                      <div 
                        key={dept} 
                        className={`custom-select-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleCc(dept)}
                      >
                        <div className="item-checkbox">
                          {isSelected && <Check size={12} />}
                        </div>
                        <span className="item-name">{dept}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Subject: Dropdown selector showing Avatar + Name */}
            <div className="form-group" ref={subjectRef}>
              <label className="form-label">Subject</label>
              <div 
                className={`custom-select-trigger ${subjectOpen ? 'focused' : ''}`}
                onClick={() => setSubjectOpen(!subjectOpen)}
              >
                {selectedSubject ? (
                  <div className="selected-subject-display">
                    <img src={selectedSubject.avatar} alt={selectedSubject.name} className="subject-avatar-img" />
                    <span className="subject-name-text">{selectedSubject.name}</span>
                  </div>
                ) : (
                  <span className="select-placeholder">Select subject employee</span>
                )}
                <ChevronDown size={16} className="trigger-arrow" />
              </div>
              {subjectOpen && (
                <div className="custom-select-dropdown">
                  {EMPLOYEES.map(emp => {
                    const isSelected = selectedSubject?.name === emp.name;
                    return (
                      <div 
                        key={emp.name} 
                        className={`custom-select-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedSubject(emp);
                          setSubjectOpen(false);
                        }}
                      >
                        <img src={emp.avatar} alt={emp.name} className="item-avatar" />
                        <span className="item-name">{emp.name}</span>
                        {isSelected && <Check size={14} className="selected-check" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Priority Level Dropdown */}
            <div className="form-group">
              <label className="form-label" htmlFor="case-priority">Priority Level</label>
              <select
                id="case-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-select"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Compose Message Rich-Text Editor block */}
            <div className="form-group">
              <label className="form-label" htmlFor="case-message">Compose Message</label>
              <div className={`compose-message-container ${formErrors.message ? 'error' : ''}`}>
                <textarea
                  id="case-message"
                  className="compose-message-textarea"
                  placeholder="Enter details of your message here..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value.slice(0, 1500));
                    if (formErrors.message) {
                      setFormErrors(prev => ({ ...prev, message: '' }));
                    }
                  }}
                  maxLength={1500}
                />
                <div className="compose-message-toolbar">
                  <div className="toolbar-actions">
                    <button type="button" className="toolbar-btn" title="Add attachment">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <line x1="9" y1="15" x2="15" y2="15" />
                      </svg>
                    </button>
                    <div className="toolbar-divider" />
                    <button type="button" className="toolbar-btn text-bold" title="Bold">
                      B
                    </button>
                    <button type="button" className="toolbar-btn text-italic" title="Italic">
                      I
                    </button>
                    <button type="button" className="toolbar-btn text-underline" title="Underline">
                      U
                    </button>
                    <button type="button" className="toolbar-btn" title="Bullet List">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="9" y1="6" x2="20" y2="6" />
                        <line x1="9" y1="12" x2="20" y2="12" />
                        <line x1="9" y1="18" x2="20" y2="18" />
                        <circle cx="4" cy="6" r="1" fill="currentColor" />
                        <circle cx="4" cy="12" r="1" fill="currentColor" />
                        <circle cx="4" cy="18" r="1" fill="currentColor" />
                      </svg>
                    </button>
                    <button type="button" className="toolbar-btn" title="Numbered List">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="10" y1="6" x2="21" y2="6" />
                        <line x1="10" y1="12" x2="21" y2="12" />
                        <line x1="10" y1="18" x2="21" y2="18" />
                        <path d="M4 6h1c.5 0 1 .5 1 1v2c0 .5-.5 1-1 1H4" />
                        <path d="M4 12h1c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1H4" />
                        <path d="M4 18h1c.5 0 1 .5 1 1v1c0 .5-.5 1-1 1H4" />
                      </svg>
                    </button>
                  </div>
                  <div className="char-counter">
                    {message.length}/1500
                  </div>
                </div>
              </div>
              {formErrors.message && <span className="error-text">{formErrors.message}</span>}
            </div>

          </form>
        </div>

        {/* Action buttons (Close and Submit in screenshot) */}
        <div className="claim-modal-actions">
          <button type="button" onClick={onClose} className="modal-btn-secondary">Close</button>
          <button type="submit" onClick={handleFormSubmit} className="modal-btn-primary">Submit</button>
        </div>
      </div>
    </div>
  );
}
