import React, { useState } from 'react';
import '../../modals/ModalBase/ModalBase.css';
import '../../modals/NotificationPanel/NotificationPanel.css';

const REVISION_HISTORY = [
  { id: '1', title: 'Termination Management', date: '12 Dec, 2024', details: 'Updated termination guidelines and severance package calculations.' },
  { id: '2', title: 'Labor & Recruitment', date: '15 Nov, 2024', details: 'Revised recruitment interview protocols and EEOC compliance standards.' },
  { id: '3', title: 'Labor & Recruitment', date: '02 Nov, 2024', details: 'Added mandatory background check requirements for management roles.' },
  { id: '4', title: 'Labor & Recruitment', date: '20 Oct, 2024', details: 'Adjusted remote work allowance policies.' },
  { id: '5', title: 'Labor & Recruitment', date: '04 Oct, 2024', details: 'Updated probationary period parameters.' },
  { id: '6', title: 'Labor & Recruitment', date: '12 Sep, 2024', details: 'Quarterly compliance policy review.' },
  { id: '7', title: 'Labor & Recruitment', date: '22 Aug, 2024', details: 'Added health benefit enrollment updates.' },
  { id: '8', title: 'Labor & Recruitment', date: '02 Aug, 2024', details: 'Updated workplace safety and reporting channels.' },
  { id: '9', title: 'Labor & Recruitment', date: '04 Jul, 2024', details: 'Holiday calendar and overtime rate adjustments.' },
  { id: '10', title: 'Labor & Recruitment', date: '19 Jun, 2024', details: 'Revised code of ethics statement.' },
  { id: '11', title: 'Labor & Recruitment', date: '08 May, 2024', details: 'Initial policy creation and baseline documentation.' }
];

export default function UpdatesHistoryModal({ isOpen, onClose, policyTitle }) {
  const [expandedId, setExpandedId] = useState(null);

  if (!isOpen) return null;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const titleText = policyTitle ? `${policyTitle} Updates` : 'Labor & Recruitment Updates';

  return (
    <>
      {/* Backdrop overlay */}
      <div className="notif-backdrop" onClick={onClose} style={{ zIndex: 1100 }} />

      {/* Slide-over Right Drawer Panel matching NotificationPanel & PolicyDetailsModal */}
      <div
        className="notif-panel"
        style={{
          width: 'min(560px, calc(100vw - 32px))',
          height: 'calc(100vh - 32px)',
          top: '16px',
          right: '16px',
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1101,
          overflow: 'hidden'
        }}
      >
        {/* Clean White Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid #f1f5f9',
            flexShrink: 0
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0, fontFamily: 'Rubik, sans-serif' }}>
            {titleText}
          </h3>
          <button
            onClick={onClose}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '22px',
              color: '#64748b',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '6px',
              lineHeight: 1
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Accordion List */}
        <div
          style={{
            flex: '1 1 auto',
            minHeight: 0,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {REVISION_HISTORY.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#edf4ff',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  transition: 'background-color 0.15s ease'
                }}
              >
                <div
                  onClick={() => toggleExpand(item.id)}
                  style={{
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#334155'
                  }}
                >
                  <span>{item.title}__{item.date}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                      color: '#475569'
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {isExpanded && (
                  <div
                    style={{
                      padding: '14px 16px',
                      borderTop: '1px solid #dbeafe',
                      fontSize: '13px',
                      color: '#475569',
                      lineHeight: '1.55',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    {item.details}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer with right-aligned Close button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '16px 24px',
            borderTop: '1px solid #f1f5f9',
            backgroundColor: '#ffffff',
            flexShrink: 0
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '9px 24px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#edf4ff',
              color: '#1d4ed8',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#dbeafe')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#edf4ff')}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
