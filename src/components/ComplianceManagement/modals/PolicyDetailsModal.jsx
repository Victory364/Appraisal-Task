import React, { useState } from 'react';
import '../../modals/ModalBase/ModalBase.css';
import '../../modals/NotificationPanel/NotificationPanel.css';

const DEFAULT_SECTIONS = [
  {
    id: 'conduct_interviews',
    title: 'Conduct Interviews',
    bulletPoints: [
      "At Fowgate, we believe in supporting our employees during life's most critical moments.",
      'Our Paid Family and Medical Leave policy provides eligible team members with the time needed to care for loved ones or themselves, fostering peace of mind and financial stability.',
      'Whether welcoming a new family member, recovering from a condition, or supporting a family member in need, we are here to help you balance work and life with confidence.'
    ],
    implemented: false,
    expanded: true
  },
  {
    id: 'recruitment_policies',
    title: 'Recruitment Policies',
    bulletPoints: [
      'At Fowgate, we are dedicated to attracting, hiring, and retaining exceptional talent who align with our core values and contribute to our mission.',
      'Our recruitment process is built to ensure fairness, diversity, and inclusivity at every stage, promoting equal opportunities for all candidates.',
      'We offer a transparent and efficient hiring experience that values skills, experience, and potential above all.'
    ],
    implemented: false,
    expanded: true
  },
  {
    id: 'retirement_plans',
    title: 'Retirement Plans',
    introText: 'Employees are required to actively participate in their retirement planning to ensure financial security for the future. The following responsibilities are mandatory:',
    bulletPoints: [
      'All eligible employees must enroll in a company-sponsored retirement plan within 30 days of their start date or during the designated enrollment period.',
      'Employees must maintain a minimum contribution level as stipulated in the retirement plan guidelines. Adjustments to contributions must be made in consultation with the HR department.',
      'Employees are required to review their retirement plan options annually to ensure alignment with their financial goals and update beneficiaries as necessary.',
      'Employees must comply with all deadlines for submissions, updates, or modifications to their retirement plans to avoid lapses in benefits or penalties.'
    ],
    implemented: false,
    expanded: true
  }
];

export default function PolicyDetailsModal({ isOpen, onClose, policyData, onSaveSuccess, onSaveChanges }) {
  const [sections, setSections] = useState(DEFAULT_SECTIONS);

  if (!isOpen) return null;

  const handleCheckboxToggle = (id) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, implemented: !sec.implemented } : sec))
    );
  };

  const toggleExpand = (id) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === id ? { ...sec, expanded: !sec.expanded } : sec))
    );
  };

  const handleSave = () => {
    const completedCount = sections.filter((s) => s.implemented).length;
    if (onSaveChanges) {
      // Close the modal and trigger ChangesSavedModal
      onSaveChanges({ completedCount, totalCount: sections.length });
    } else if (onSaveSuccess) {
      onSaveSuccess({ completedCount, totalCount: sections.length });
    }
  };

  const policyTitle = policyData?.title ? `${policyData.title}_02 Mar, 2024` : 'Labor & Recruitment_02 Mar, 2024';

  return (
    <>
      {/* Backdrop overlay */}
      <div className="notif-backdrop" onClick={onClose} style={{ zIndex: 1100 }} />

      {/* Slide-over Right Drawer Panel matching NotificationPanel & Figma Image 2 */}
      <div
        className="notif-panel"
        style={{
          width: 'min(640px, calc(100vw - 32px))',
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
            {policyTitle}
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

        {/* Scrollable Body */}
        <div
          style={{
            flex: '1 1 auto',
            minHeight: 0,
            overflowY: 'auto',
            padding: '24px',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {sections.map((sec) => (
            <div
              key={sec.id}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '20px'
              }}
            >
              {/* Grey Card Header Bar across top matching Figma Image 2 */}
              <div
                style={{
                  backgroundColor: '#f1f5f9',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: sec.expanded ? '1px solid #e2e8f0' : 'none'
                }}
              >
                <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                  {sec.title}
                </h4>
                <button
                  type="button"
                  onClick={() => toggleExpand(sec.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px',
                    color: '#1e293b',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{
                      transform: sec.expanded ? 'rotate(0deg)' : 'rotate(180deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </button>
              </div>

              {/* Card Split Body: Left Bullet Points | Right Vertical Divider & Checkbox */}
              {sec.expanded && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 165px' }}>
                  {/* Left Column Content */}
                  <div style={{ padding: '16px 20px', fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
                    {sec.introText && (
                      <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#475569' }}>
                        {sec.introText}
                      </p>
                    )}
                    <ul style={{ paddingLeft: '18px', margin: 0 }}>
                      {sec.bulletPoints.map((pt, i) => (
                        <li key={i} style={{ marginBottom: '8px' }}>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column Checkbox Area separated by Vertical Line */}
                  <div
                    style={{
                      borderLeft: '1px solid #f1f5f9',
                      padding: '20px 16px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500',
                        color: '#475569',
                        lineHeight: '1.4'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={sec.implemented}
                        onChange={() => handleCheckboxToggle(sec.id)}
                        style={{ width: '16px', height: '16px', accentColor: '#1f66c7', marginTop: '2px', cursor: 'pointer', flexShrink: 0 }}
                      />
                      <span>Successfully Implemented Policy</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pinned Right-Aligned Footer matching Figma Image 2 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '14px',
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
              background: 'none',
              border: 'none',
              color: '#334155',
              fontSize: '13.5px',
              fontWeight: '500',
              cursor: 'pointer',
              padding: '8px 12px'
            }}
          >
            Done
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '9px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#dbeafe',
              color: '#1d4ed8',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#bfdbfe')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#dbeafe')}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
