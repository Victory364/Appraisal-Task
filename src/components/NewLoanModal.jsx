import React, { useState } from 'react';
import './NewLoanModal.css';
import { X, HelpCircle } from 'lucide-react';
import { LoanHeaderIcon } from './Icons';
import { loanPurposes, currencyOptions } from '../utils/constants';
import { formatMoney } from '../utils/helpers';

export default function NewLoanModal({ initialLoan = null, onClose, onSubmitLoan }) {
  const isEditing = Boolean(initialLoan);
  const modalTitle = isEditing ? 'Edit Loan Details' : 'New Loan';
  const [selectedPurpose, setSelectedPurpose] = useState(initialLoan?.purpose || '');
  const [selectedCurrency, setSelectedCurrency] = useState(initialLoan?.currency || currencyOptions[0]);
  const [loanAmount, setLoanAmount] = useState(initialLoan?.amount ? String(initialLoan.amount) : '');
  const [loanDuration, setLoanDuration] = useState(initialLoan?.duration ? String(initialLoan.duration) : '');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formattedLoanAmount = formatMoney(loanAmount, selectedCurrency);
  const finalPurpose = selectedPurpose || 'selected purpose';

  function handleFinishLoan() {
    const nextAmount = Number(loanAmount || 0);

    onSubmitLoan({
      ...(initialLoan || {}),
      id: initialLoan?.id || Date.now(),
      dateTaken: initialLoan?.dateTaken || '25 May, 2026',
      amount: nextAmount,
      currency: selectedCurrency,
      duration: loanDuration || '0',
      purpose: finalPurpose,
      balance: nextAmount,
      status: initialLoan?.status || 'Pending',
    });
    onClose();
  }

  if (isSubmitted) {
    return (
      <div className="loan-modal-overlay success-overlay" role="presentation" onClick={handleFinishLoan}>
        <div className="request-submitted-modal" role="dialog" aria-modal="true" aria-labelledby="request-submitted-title" onClick={(event) => event.stopPropagation()}>
          <div className="success-dot">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="success-copy">
            <h2 id="request-submitted-title">{isEditing ? 'Changes Saved!' : 'Request Submitted!'}</h2>
            <p>{isEditing ? 'The loan application has been updated to reflect the latest change' : 'The loan has been successfully submitted and the HR has been notified'}</p>
          </div>
          <button className="success-okay-button" type="button" onClick={handleFinishLoan}>Okay</button>
        </div>
      </div>
    );
  }

  if (isConfirming) {
    return (
      <div className="loan-modal-overlay confirm-overlay" role="presentation" onClick={onClose}>
        <div className="confirm-action-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-action-title" onClick={(event) => event.stopPropagation()}>
          <div className="confirm-action-header">
            <div className="confirm-action-title">
              <HelpCircle size={18} />
              <h2 id="confirm-action-title">Confirm Action</h2>
            </div>
            <button className="new-loan-close" type="button" aria-label="Close confirmation" onClick={() => setIsConfirming(false)}>
              <X />
            </button>
          </div>

          <div className="confirm-action-body">
            {isEditing ? (
              <p>Are you sure you want to save the changes made to this loan application? Ensure all details are correct before proceeding</p>
            ) : (
              <p>
                Are you sure you want to proceed with the process of creating a loan of{' '}
                <strong>{formattedLoanAmount}</strong> for <strong>{finalPurpose}</strong>?
              </p>
            )}
          </div>

          <div className="confirm-action-footer">
            <button className="cancel-loan-button" type="button" onClick={() => setIsConfirming(false)}>Cancel</button>
            <button className="submit-loan-button" type="button" onClick={() => setIsSubmitted(true)}>Yes, I'm sure</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loan-modal-overlay" role="presentation" onClick={onClose}>
      <div className="new-loan-modal" role="dialog" aria-modal="true" aria-labelledby="new-loan-title" onClick={(event) => event.stopPropagation()}>
        <div className="new-loan-header">
          <div className="new-loan-title">
            <LoanHeaderIcon />
            <h2 id="new-loan-title">{modalTitle}</h2>
          </div>
          <button className="new-loan-close" type="button" aria-label={`Close ${modalTitle.toLowerCase()} form`} onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="new-loan-body">
          <div className="loan-type-switch">
            <button className="active" type="button">Loan</button>
            <button type="button">Advances</button>
          </div>

          <div className="loan-form-fields">
            <label className="form-field">
              <span>Employee</span>
              <input value="Alfred Beckett" readOnly />
            </label>

            <label className="form-field">
              <span>Purpose of the Loan</span>
              <select className="native-select" value={selectedPurpose} onChange={(event) => setSelectedPurpose(event.target.value)}>
                <option value="">Select</option>
                {loanPurposes.map((purpose) => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Amount</span>
              <div className="amount-input amount-country-input">
                <input
                  inputMode="decimal"
                  placeholder="Enter amount"
                  value={loanAmount}
                  onChange={(event) => setLoanAmount(event.target.value)}
                />
                <div className="amount-country-button" aria-label={`Currency ${selectedCurrency.code}`}>
                  <span className="nigeria-flag" aria-hidden="true" />
                  {selectedCurrency.code}
                </div>
              </div>
            </label>

            <label className="form-field">
              <span>Duration of the loan</span>
              <div className="amount-input">
                <input
                  inputMode="numeric"
                  placeholder="Enter number of month"
                  value={loanDuration}
                  onChange={(event) => setLoanDuration(event.target.value)}
                />
                <div className="input-addon">Months</div>
              </div>
            </label>
          </div>
        </div>

        <div className="new-loan-footer">
          <button className="cancel-loan-button" type="button" onClick={onClose}>Cancel</button>
          <button className="submit-loan-button" type="button" onClick={() => setIsConfirming(true)}>Submit</button>
        </div>
      </div>
    </div>
  );
}
