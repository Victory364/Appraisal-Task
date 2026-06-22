import React, { useState } from 'react';
import './LoanManagement.css';
import { ChevronDown, Users, Search, Plus } from 'lucide-react';
import { LoanEmptyIcon } from './Icons';
import { currencyOptions } from '../utils/constants';
import { formatMoney } from '../utils/helpers';
import LoanDetailsModal from './LoanDetailsModal';
import NewLoanModal from './NewLoanModal';
import CancelLoanModal from './CancelLoanModal';

export default function LoanManagement({ onNewLoan, loans, onCancelLoan, onEditLoan }) {
  const displayCurrency = loans[0]?.currency || currencyOptions[0];
  const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalBalance = loans.reduce((sum, loan) => sum + loan.balance, 0);
  const [openActionLoanId, setOpenActionLoanId] = useState(null);
  const [detailsLoan, setDetailsLoan] = useState(null);
  const [editLoan, setEditLoan] = useState(null);
  const [cancelLoan, setCancelLoan] = useState(null);
  const dynamicLoanStats = [
    { label: 'Total Amount of Loans', value: formatMoney(totalAmount, displayCurrency) },
    { label: 'Total Loan Repaid', value: formatMoney(0, displayCurrency) },
    { label: 'Outstanding Loan Balance', value: formatMoney(totalBalance, displayCurrency) },
    { label: 'Total Loans', value: String(loans.length) },
  ];

  return (
    <section className="loan-workspace">
      <div className="loan-header">
        <h2>Loan Management</h2>
        <div className="loan-filter">
          <span>Filter by:</span>
          <button type="button">
            MAY 2026
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="loan-stats-grid">
        {dynamicLoanStats.map((stat) => (
          <div key={stat.label} className="loan-stat-card">
            <div className="loan-stat-label">
              <Users size={14} />
              <span>{stat.label}</span>
            </div>
            <div className="loan-stat-value-row">
              <strong>{stat.value}</strong>
              <span>↗ 0.00</span>
            </div>
          </div>
        ))}
      </div>

      <div className="loan-history-bar">
        <h3>Loan History</h3>
        <div className="loan-history-search">
          <input placeholder="Search purpose, etc..." />
          <Search size={18} />
        </div>
        <button className="loan-status-button" type="button">
          All Status
          <ChevronDown size={15} />
        </button>
        <button className="new-loan-button" type="button" onClick={onNewLoan}>
          <Plus size={16} />
          New Loan
        </button>
      </div>

      {loans.length === 0 ? (
        <div className="loan-empty-state">
          <div className="loan-empty-icon">
            <LoanEmptyIcon />
          </div>
          <strong>No loan report</strong>
          <p>Use the "Add New" button</p>
        </div>
      ) : (
        <div className="loan-table-wrap">
          <table className="loan-history-table">
            <thead>
              <tr>
                <th>Date Taken</th>
                <th>Loan Amount</th>
                <th>Loan Duration</th>
                <th>Balance</th>
                <th>Loan Purpose</th>
                <th>Repayment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.dateTaken}</td>
                  <td>{formatMoney(loan.amount, loan.currency)}</td>
                  <td>{loan.duration} months</td>
                  <td>{formatMoney(loan.balance, loan.currency)}</td>
                  <td>{loan.purpose}</td>
                  <td><span className={`repayment-status ${loan.status.toLowerCase()}`}>{loan.status}</span></td>
                  <td className="loan-action-cell">
                    <button
                      className="loan-action-button"
                      type="button"
                      aria-label="Loan actions"
                      onClick={() => setOpenActionLoanId((currentId) => (currentId === loan.id ? null : loan.id))}
                    >
                      <span /><span /><span />
                    </button>
                    {openActionLoanId === loan.id && (
                      <div className="loan-action-menu">
                        <button
                          type="button"
                          onClick={() => {
                            setDetailsLoan(loan);
                            setOpenActionLoanId(null);
                          }}
                        >
                          <span className="action-icon document-icon" />
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditLoan(loan);
                            setOpenActionLoanId(null);
                          }}
                        >
                          <span className="action-icon edit-icon" />
                          Edit
                        </button>
                        <button
                          className="danger-action"
                          type="button"
                          onClick={() => {
                            setCancelLoan(loan);
                            setOpenActionLoanId(null);
                          }}
                        >
                          <span className="action-icon cancel-icon" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {detailsLoan && <LoanDetailsModal loan={detailsLoan} onClose={() => setDetailsLoan(null)} />}
      {editLoan && (
        <NewLoanModal
          initialLoan={editLoan}
          onClose={() => setEditLoan(null)}
          onSubmitLoan={(updatedLoan) => {
            onEditLoan(updatedLoan);
            setEditLoan(null);
          }}
        />
      )}
      {cancelLoan && (
        <CancelLoanModal
          onClose={() => setCancelLoan(null)}
          onConfirm={() => {
            onCancelLoan(cancelLoan.id);
            setCancelLoan(null);
          }}
        />
      )}
    </section>
  );
}
