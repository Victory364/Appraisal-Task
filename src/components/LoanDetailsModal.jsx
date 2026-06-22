import React, { useState } from 'react';
import './LoanDetailsModal.css';
import { X, ChevronDown } from 'lucide-react';
import { LoanDetailsHeaderIcon, JaneSmithAvatar } from './Icons';
import alfredBeckettAvatar from '../Access/Fowgate Folder/alfred_beckett.png';
import {
  parseDateTaken,
  formatMoney,
  formatMoneyNoDecimals,
  getApprovalAndDisbursalDates,
} from '../utils/helpers';

export default function LoanDetailsModal({ loan, onClose }) {
  const [openSections, setOpenSections] = useState({
    approval: true,
    loanTerms: true,
  });
  const duration = Math.max(Number(loan.duration || 1), 1);
  const monthlyAmount = loan.amount / duration;
  const repaymentTotal = monthlyAmount * duration;
  const isApproved = loan.status === 'Ongoing' || loan.status === 'Completed';

  // Generate payment rows with correct last-day-of-month due dates
  const { startMonth, startYear } = parseDateTaken(loan.dateTaken);
  const paymentRows = Array.from({ length: Math.min(duration, 12) }, (_, index) => {
    const date = new Date(startYear, startMonth + index, 1);
    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const monthLabel = `${monthName} ${year}`;
    // Last day of month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const dueDate = `${monthName} ${lastDay}, ${year}`;
    return { month: monthLabel, dueDate, amount: monthlyAmount, rawDate: date };
  });

  function toggleSection(section) {
    setOpenSections((currentSections) => ({
      ...currentSections,
      [section]: !currentSections[section],
    }));
  }

  return (
    <div className="loan-modal-overlay details-overlay" role="presentation" onClick={onClose}>
      <div className="loan-details-modal" role="dialog" aria-modal="true" aria-labelledby="loan-details-title" onClick={(event) => event.stopPropagation()}>
        <div className="loan-details-header">
          <div className="loan-details-title">
            <LoanDetailsHeaderIcon />
            <h2 id="loan-details-title">Loan Details</h2>
          </div>
          <button className="new-loan-close" type="button" aria-label="Close loan details" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="loan-details-body">
          <div className="borrower-row">
            <img className="borrower-avatar-img" src={alfredBeckettAvatar} alt="Alfred Beckett" />
            <div>
              <strong>Alfred Beckett</strong>
              <span>Audit Manager</span>
            </div>
            <span className={`active-pill ${loan.status.toLowerCase()}`}>
              {loan.status === 'Ongoing' ? '• Ongoing' : (loan.status === 'Completed' || loan.status === 'Rejected' ? `• ${loan.status}` : loan.status)}
            </span>
          </div>

          <div className="loan-detail-summary">
            <div>
              <strong>{formatMoneyNoDecimals(loan.amount, loan.currency)}</strong>
              <span>LOAN AMOUNT</span>
            </div>
            <div>
              <strong>{loan.duration} MONTHS</strong>
              <span>LOAN DURATION</span>
            </div>
            <div>
              <strong>{loan.purpose.replace(' Loan', '')}</strong>
              <span>LOAN PURPOSE</span>
            </div>
          </div>

          <div className="approval-info-panel">
            <button
              className="details-section-title"
              type="button"
              aria-expanded={openSections.approval}
              onClick={() => toggleSection('approval')}
            >
              <strong>Approval Info</strong>
              <ChevronDown className={openSections.approval ? 'section-chevron open' : 'section-chevron'} size={16} />
            </button>
            {openSections.approval && (
              <div className="approval-info-grid">
                <div className="approval-info-row">
                  <div className="approval-info-item">
                    <span>Approve Loan Amount</span>
                    <strong>
                      {isApproved ? formatMoney(loan.amount, loan.currency) : '-'}
                    </strong>
                  </div>
                  <div className="approval-info-item">
                    <span>Approve Loan Duration</span>
                    <strong>
                      {isApproved ? `${loan.duration} ${Number(loan.duration) === 1 ? 'Month' : 'Months'}` : '-'}
                    </strong>
                  </div>
                </div>
                <div className="approval-info-row">
                  <div className="approval-info-item">
                    <span>Approved By</span>
                    <strong>
                      {isApproved ? (
                        <>
                          <JaneSmithAvatar size={20} />
                          Jane Smith
                        </>
                      ) : (
                        '-'
                      )}
                    </strong>
                  </div>
                  <div className="approval-info-item">
                    <span>Repayment Method</span>
                    <strong>
                      {isApproved ? 'Payroll Deduction' : '-'}
                    </strong>
                  </div>
                </div>
                <div className="approval-info-row">
                  <div className="approval-info-item">
                    <span>Approval Date</span>
                    <strong>
                      {isApproved ? getApprovalAndDisbursalDates(loan.dateTaken).approvalDateStr : '-'}
                    </strong>
                  </div>
                  <div className="approval-info-item">
                    <span>Loan Disbursal Date</span>
                    <strong>
                      {isApproved ? getApprovalAndDisbursalDates(loan.dateTaken).disbursalDateStr : '-'}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          <h3>Payment Breakdown</h3>
          <table className="payment-breakdown-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Due Date</th>
                <th>Amount Paid</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentRows.map((row) => {
                let statusText = 'Paid';
                let statusClass = 'paid-pill';
                let displayedAmount = row.amount;

                if (loan.status === 'Rejected') {
                  displayedAmount = 0;
                  statusText = 'Rejected';
                  statusClass = 'rejected-pill';
                } else if (loan.status === 'Cancelled') {
                  displayedAmount = 0;
                  statusText = 'Unpaid';
                  statusClass = 'unpaid-pill';
                } else if (loan.status === 'Pending') {
                  displayedAmount = 0;
                  statusText = 'Pending';
                  statusClass = 'pending-pill';
                } else if (loan.status === 'Completed') {
                  displayedAmount = row.amount;
                  statusText = 'Paid';
                  statusClass = 'paid-pill';
                } else if (loan.status === 'Ongoing') {
                  // Compare row due date with June 11, 2026
                  const today = new Date(2026, 5, 11);
                  const endOfMonth = new Date(row.rawDate.getFullYear(), row.rawDate.getMonth() + 1, 0);
                  const isPast = endOfMonth < today;

                  if (isPast) {
                    displayedAmount = row.amount;
                    statusText = 'Paid';
                    statusClass = 'paid-pill';
                  } else {
                    displayedAmount = 0;
                    statusText = 'Pending';
                    statusClass = 'pending-pill';
                  }
                }

                return (
                  <tr key={row.month}>
                    <td className="breakdown-month">{row.month}</td>
                    <td className="breakdown-due-date">{row.dueDate}</td>
                    <td className="breakdown-amount-paid">{formatMoney(displayedAmount, loan.currency)}</td>
                    <td><span className={statusClass}>{statusText}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="loan-terms-panel">
            <button
              className="details-section-title"
              type="button"
              aria-expanded={openSections.loanTerms}
              onClick={() => toggleSection('loanTerms')}
            >
              <strong>Loan Terms &amp; Payment Schedule</strong>
              <ChevronDown className={openSections.loanTerms ? 'section-chevron open' : 'section-chevron'} size={16} />
            </button>
            {openSections.loanTerms && (
              <div className="loan-terms-grid">
                <div>
                  <span>Monthly Payment</span>
                  <strong>{formatMoney(monthlyAmount, loan.currency)}</strong>
                </div>
                <div>
                  <span>Total Repayment</span>
                  <strong>{formatMoney(repaymentTotal, loan.currency)}</strong>
                </div>
                <div className="loan-terms-full-row">
                  <span>Outstanding Balance</span>
                  <strong className="green-balance">
                    {formatMoney(
                      loan.status === 'Ongoing' || loan.status === 'Pending' ? loan.balance : 0,
                      loan.currency
                    )}
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="loan-details-footer">
          <button className="report-close-button" type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
