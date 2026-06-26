import React, { useState } from 'react';
import './LoanDetailsModal.css';
import { ChevronDown } from 'lucide-react';
import { JaneSmithAvatar } from './Icons';
import alfredBeckettAvatar from '../Access/Fowgate Folder/alfred_beckett.png';
import viewDetailIcon from '../assets/Fowgate Folder/file-02.svg';
import {
  parseDateTaken,
  formatMoney,
  formatMoneyNoDecimals,
  getApprovalAndDisbursalDates,
} from '../utils/helpers';

export default function LoanDetailsModal({ loan, onClose, onApprove, onReject }) {
  const [openSections, setOpenSections] = useState({
    approval: true,
    loanTerms: true,
  });
  
  const duration = Math.max(Number(loan.duration || 1), 1);
  const monthlyAmount = loan.amount / duration;
  const repaymentTotal = monthlyAmount * duration;
  const isApproved = loan.status === 'Ongoing' || loan.status === 'Completed' || loan.status === 'Approved';

  // Generate payment rows with correct last-day-of-month due dates
  const { startMonth, startYear } = parseDateTaken(loan.dateTaken);
  const paymentRows = Array.from({ length: Math.min(duration, 12) }, (_, index) => {
    const date = new Date(startYear, startMonth + index, 1);
    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const monthLabel = `${monthName} ${year}`;
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="claim-modal loan-details-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="claim-modal-header view-detail-header">
          <h3 className="claim-modal-title view-detail-title">
            <img src={viewDetailIcon} alt="View Detail" />
            View Loan Details
          </h3>
          <button onClick={onClose} className="claim-modal-close view-detail-close">&times;</button>
        </div>

        {/* Scrollable Body */}
        <div className="hide-scrollbar loan-details-body">
          
          {/* Borrower Person Row */}
          <div className="view-detail-person-row">
            <div className="view-detail-person">
              <div className="view-detail-avatar">
                <img src={alfredBeckettAvatar} alt="Alfred Beckett" />
              </div>
              <div>
                <div className="view-detail-name">Alfred Beckett</div>
                <div className="view-detail-role">Audit Manager</div>
              </div>
            </div>
            <div className={`view-detail-status ${loan.status.toLowerCase()}`}>
              {loan.status}
            </div>
          </div>

          {/* Stats summary block (using view-detail-dates styling) */}
          <div className="view-detail-dates">
            <div>
              <div>Loan Amount</div>
              <strong>{formatMoneyNoDecimals(loan.amount, loan.currency)}</strong>
            </div>
            <div>
              <div>Loan Duration</div>
              <strong>{loan.duration} {Number(loan.duration) === 1 ? 'Month' : 'Months'}</strong>
            </div>
            <div>
              <div>Loan Purpose</div>
              <strong>{loan.purpose}</strong>
            </div>
          </div>

          {/* Approval Info Collapsible Panel */}
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
                    <span>Approved Loan Amount</span>
                    <strong>
                      {isApproved ? formatMoney(loan.amount, loan.currency) : '-'}
                    </strong>
                  </div>
                  <div className="approval-info-item">
                    <span>Approved Loan Duration</span>
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

          {/* Payment Breakdown Table */}
          <div className="payment-table-section">
            <h4 className="payment-table-title">Payment Breakdown</h4>
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
                  } else if (loan.status === 'Ongoing' || loan.status === 'Approved') {
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
          </div>

          {/* Loan Terms Collapsible Panel */}
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
              <div className="approval-info-grid">
                <div className="approval-info-row">
                  <div className="approval-info-item">
                    <span>Monthly Payment</span>
                    <strong>{formatMoney(monthlyAmount, loan.currency)}</strong>
                  </div>
                  <div className="approval-info-item">
                    <span>Total Repayment</span>
                    <strong>{formatMoney(repaymentTotal, loan.currency)}</strong>
                  </div>
                </div>
                <div className="approval-info-row">
                  <div className="loan-terms-full-row">
                    <span>Outstanding Balance</span>
                    <strong className="green-balance">
                      {formatMoney(
                        loan.status === 'Ongoing' || loan.status === 'Pending' || loan.status === 'Approved' ? loan.balance : 0,
                        loan.currency
                      )}
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="view-detail-footer">
          <button 
            type="button" 
            onClick={onClose} 
            className="view-detail-button"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
