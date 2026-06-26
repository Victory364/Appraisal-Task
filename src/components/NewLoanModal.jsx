import React, { useState } from 'react';
import './NewLoanModal.css';
import { LoanHeaderIcon } from './Icons';
import { loanPurposes, currencyOptions } from '../utils/constants';
import { formatMoney } from '../utils/helpers';
import confirmIcon from '../assets/Fowgate Folder/help-circle.svg';
import successIllustration from '../assets/Fowgate Folder/Check for success page.svg';

export default function NewLoanModal({ initialLoan = null, onClose, onSubmitLoan }) {
  const isEditing = Boolean(initialLoan);
  const modalTitle = isEditing ? 'Edit Loan Details' : 'New Loan';

  // State values
  const [activeType, setActiveType] = useState(initialLoan?.type || 'Loan');
  const [selectedPurpose, setSelectedPurpose] = useState(initialLoan?.purpose || '');
  const [selectedCurrency, setSelectedCurrency] = useState(initialLoan?.currency || currencyOptions[0]);
  const [loanAmount, setLoanAmount] = useState(initialLoan?.amount ? String(initialLoan.amount) : '');
  const [loanDuration, setLoanDuration] = useState(initialLoan?.duration ? String(initialLoan.duration) : '');
  
  // Validation errors
  const [formErrors, setFormErrors] = useState({});

  // Overlay states
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formattedLoanAmount = formatMoney(loanAmount || 0, selectedCurrency);
  const finalPurpose = selectedPurpose || 'selected purpose';

  const getTodayFormattedDate = () => {
    const d = new Date();
    const day = d.getDate();
    const month = d.toLocaleDateString('en-US', { month: 'long' });
    const year = d.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  function handleFinishLoan() {
    const nextAmount = Number(loanAmount || 0);
    onSubmitLoan({
      ...(initialLoan || {}),
      id: initialLoan?.id || Date.now(),
      dateTaken: initialLoan?.dateTaken || getTodayFormattedDate(),
      amount: nextAmount,
      currency: selectedCurrency,
      duration: activeType === 'Loan' ? (loanDuration || '0') : '0',
      purpose: finalPurpose,
      balance: nextAmount,
      status: initialLoan?.status || 'Pending',
      type: activeType
    });
    onClose();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields at once
    const errors = {};
    if (!selectedPurpose) {
      errors.purpose = 'Purpose of the loan is required.';
    }
    if (activeType === 'Loan' && (!loanDuration || Number(loanDuration) <= 0)) {
      errors.duration = 'Loan duration must be greater than 0.';
    }
    if (!loanAmount || Number(loanAmount) <= 0) {
      errors.amount = 'Amount must be greater than 0.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsConfirming(true);
  };

  if (isSubmitted) {
    return (
      <div className="modal-overlay">
        <div className="claim-modal claim-success-modal">
          <img src={successIllustration} alt="Success checkmark" className="claim-success-illustration" />
          <h3 className="claim-success-title">{isEditing ? 'Changes Saved!' : 'Loan Submitted'}</h3>
          <p className="claim-success-copy">
            {isEditing 
              ? 'The loan application has been updated to reflect the latest changes.' 
              : 'The loan request has been successfully submitted and the HR has been notified.'}
          </p>
          <button type="button" onClick={handleFinishLoan} className="modal-btn-primary">Okay</button>
        </div>
      </div>
    );
  }

  if (isConfirming) {
    return (
      <div className="modal-overlay">
        <div className="claim-modal claim-status-modal">
          <div className="claim-modal-header">
            <h3 className="claim-modal-title">
              <img src={confirmIcon} alt="Confirm" className="claim-status-title-icon" />
              Confirm Action
            </h3>
            <button onClick={() => setIsConfirming(false)} className="claim-modal-close">✕</button>
          </div>
          <div className="claim-status-copy">
            {isEditing ? (
              <>Are you sure you want to submit the changes made to this <strong>Loan</strong>? Ensure all details are correct before proceeding.</>
            ) : (
              <>Are you sure you want to proceed with the process of creating a loan of <strong>{formattedLoanAmount}</strong> for <strong>{finalPurpose}</strong>?</>
            )}
          </div>
          <div className="claim-modal-actions claim-status-actions">
            <button type="button" onClick={() => setIsConfirming(false)} className="modal-btn-cancel">Cancel</button>
            <button type="button" onClick={() => setIsSubmitted(true)} className="modal-btn-submit claim-status-confirm-button">
              Yes, I'm sure
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="claim-modal" onClick={(e) => e.stopPropagation()}>
        <div className="claim-modal-header">
          <h3 className="claim-modal-title add-edit-title">
            <LoanHeaderIcon className="claim-modal-title-icon" />
            {modalTitle}
          </h3>
          <button onClick={onClose} className="claim-modal-close">x</button>
        </div>

        <form onSubmit={handleSubmit} className="add-edit-form">
          <div className="hide-scrollbar add-edit-scroll">
            
            {/* Switcher Tab */}
            <div className="loan-type-switch">
              <button 
                type="button" 
                className={activeType === 'Loan' ? 'active' : ''} 
                onClick={() => {
                  setActiveType('Loan');
                  setFormErrors({});
                }}
              >
                Loan
              </button>
              <button 
                type="button" 
                className={activeType === 'Advances' ? 'active' : ''} 
                onClick={() => {
                  setActiveType('Advances');
                  setFormErrors({});
                }}
              >
                Advances
              </button>
            </div>

            <div className="add-edit-field">
              <label>Employee</label>
              <input value="Alfred Beckett" readOnly />
            </div>

            <div className="add-edit-field">
              <label>Purpose of the {activeType}</label>
              <select 
                value={selectedPurpose} 
                onChange={(e) => {
                  setSelectedPurpose(e.target.value);
                  setFormErrors(errs => ({ ...errs, purpose: '' }));
                }}
                className={formErrors.purpose ? 'is-invalid' : ''}
              >
                <option value="">Select</option>
                {loanPurposes.map((purpose) => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
              {formErrors.purpose && <span className="add-edit-error">{formErrors.purpose}</span>}
            </div>

            <div className="add-edit-field">
              <label>Amount</label>
              <div className="amount-input-container">
                <input
                  type="number"
                  inputMode="decimal"
                  placeholder="Enter amount"
                  value={loanAmount}
                  onChange={(e) => {
                    setLoanAmount(e.target.value);
                    setFormErrors(errs => ({ ...errs, amount: '' }));
                  }}
                  className={formErrors.amount ? 'is-invalid' : ''}
                  min="0"
                />
                <div className="amount-input-flag-btn">
                  <span className="nigeria-flag" />
                  {selectedCurrency.code}
                </div>
              </div>
              {formErrors.amount && <span className="add-edit-error">{formErrors.amount}</span>}
            </div>

            {activeType === 'Loan' && (
              <div className="add-edit-field">
                <label>Duration of the Loan</label>
                <div className="duration-input-container">
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="Enter number of months"
                    value={loanDuration}
                    onChange={(e) => {
                      setLoanDuration(e.target.value);
                      setFormErrors(errs => ({ ...errs, duration: '' }));
                    }}
                    className={formErrors.duration ? 'is-invalid' : ''}
                  />
                  <div className="duration-input-addon">Months</div>
                </div>
                {formErrors.duration && <span className="add-edit-error">{formErrors.duration}</span>}
              </div>
            )}
          </div>

          <div className="claim-modal-actions">
            <button type="button" onClick={onClose} className="modal-btn-cancel">Close</button>
            <button type="submit" className="modal-btn-submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
