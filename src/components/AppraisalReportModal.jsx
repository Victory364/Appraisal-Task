import React from 'react';
import './AppraisalReportModal.css';
import { X, ChevronDown, Star } from 'lucide-react';
import { reportSections } from '../utils/constants';

export default function AppraisalReportModal({ onClose }) {
  return (
    <div className="report-modal-overlay" role="presentation" onClick={onClose}>
      <div className="report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title" onClick={(event) => event.stopPropagation()}>
        <div className="report-modal-header">
          <div className="report-modal-title">
            <div className="report-avatar">JS</div>
            <h2 id="report-title">My Appraisal Report</h2>
          </div>
          <button className="report-close-icon" type="button" aria-label="Close report" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="report-modal-body">
          <button className="report-date-select" type="button">
            24 Dec, 2024 - <span>Q3</span>
            <ChevronDown size={16} />
          </button>

          {reportSections.map((section) => (
            <div key={section.title} className="report-section">
              <div className="report-section-header">
                <strong>{section.title}</strong>
                <div className="report-rating">
                  <span>Rating</span>
                  <strong>{section.rating.toFixed(1)}</strong>
                </div>
              </div>

              <div className="report-row-list">
                {section.rows.map((row) => (
                  <div key={row.label} className="report-row">
                    <span>{row.label}</span>
                    <div className="report-row-score">
                      <Star className="report-row-star" />
                      <strong>{row.rating.toFixed(1)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="report-modal-footer">
          <button className="report-close-button" type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
