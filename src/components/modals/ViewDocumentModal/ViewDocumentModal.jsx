import React from 'react';
import '../ModalBase/ModalBase.css';
import './ViewDocumentModal.css';
import documentIcon from '../../../assets/Fowgate Folder/file-02.svg';
import pdfIcon from '../../../assets/Fowgate Folder/pdf-file-svgrepo-com 1.svg';

const defaultDoc = {
  to: 'John Doe',
  from: 'Fowgate Ltd.',
  cc: 'Lisa Carter; Okonkwo Joshua; Sophia Greene; +5more',
  date: '28 November, 2024',
  re: 'Termination of Employment',
  companyName: 'Fowgate Ltd.',
  companyAddress: '123 Innovation Street,\nPort Harcourt, Nigeria',
  documentDate: 'November 7, 2024',
  recipientName: 'Mr. John Doe',
  recipientAddress: '45 Maple Avenue,\nLagos, Nigeria',
  subject: 'Termination of Employment',
  salutation: 'Dear Mr. Doe,',
  body: 'We regret to inform you that your employment with XYZ Technologies Ltd. is being terminated effective January 14, 2025. This decision was made due to your repeated failure to meet performance expectations.'
};

export default function ViewDocumentModal({ documentData, onClose, onDownload }) {
  const doc = { ...defaultDoc, ...documentData };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(doc);
    } else {
      const content = `TO: ${doc.to}\nFROM: ${doc.from}\nDATE: ${doc.date}\nRE: ${doc.re}\n\n${doc.companyName}\n${doc.companyAddress}\n${doc.documentDate}\n\n${doc.recipientName}\n${doc.recipientAddress}\n\nSubject: ${doc.subject}\n\n${doc.salutation}\n\n${doc.body}`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${doc.subject || 'Document'}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="claim-modal view-document-modal">
        <div className="claim-modal-header view-document-header">
          <h3 className="claim-modal-title view-document-title">
            <img src={documentIcon} alt="" className="view-document-header-icon" />
            View Document
          </h3>
          <button onClick={onClose} type="button" className="claim-modal-close" aria-label="Close">✕</button>
        </div>

        <div className="view-document-body hide-scrollbar">
          {/* Metadata Grid */}
          <div className="view-document-meta-grid">
            <div className="view-document-meta-row">
              <span className="view-document-meta-label">To:</span>
              <span className="view-document-meta-value">{doc.to}</span>
            </div>
            <div className="view-document-meta-row">
              <span className="view-document-meta-label">From:</span>
              <span className="view-document-meta-value">{doc.from}</span>
            </div>
            <div className="view-document-meta-row">
              <span className="view-document-meta-label">CC:</span>
              <span className="view-document-meta-value">{doc.cc}</span>
            </div>
            <div className="view-document-meta-row">
              <span className="view-document-meta-label">Date:</span>
              <span className="view-document-meta-value">{doc.date}</span>
            </div>
            <div className="view-document-meta-row">
              <span className="view-document-meta-label">Re:</span>
              <span className="view-document-meta-value">{doc.re}</span>
            </div>
          </div>

          <div className="view-document-divider" />

          {/* Letter Document Body */}
          <div className="view-document-content-box">
            <div className="view-document-sender-info">
              <p className="view-document-bold">{doc.companyName}</p>
              {doc.companyAddress.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
              <p className="view-document-date-margin">{doc.documentDate}</p>
            </div>

            <div className="view-document-recipient-info">
              <p className="view-document-bold">{doc.recipientName}</p>
              {doc.recipientAddress.split('\n').map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>

            <div className="view-document-subject-row">
              <span>Subject:</span> <strong>{doc.subject}</strong>
            </div>

            <div className="view-document-text-body">
              <p className="view-document-salutation">{doc.salutation}</p>
              <p className="view-document-main-text">{doc.body}</p>
            </div>
          </div>
        </div>

        <div className="view-document-footer">
          <button type="button" onClick={onClose} className="view-document-btn-close">
            Close
          </button>
          <button type="button" onClick={handleDownload} className="view-document-btn-download">
            <img src={pdfIcon} alt="PDF" className="view-document-pdf-icon" />
            Download File
          </button>
        </div>
      </div>
    </div>
  );
}
