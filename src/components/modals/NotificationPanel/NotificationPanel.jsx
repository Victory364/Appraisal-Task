/**
 * NotificationPanel.jsx — Notification Dropdown Panel
 * -----------------------------------------------------
 * Matches the Figma design:
 *   - Title: Notification
 *   - Mark all as read with checkmark icon
 *   - Inbox (12) and Teams (4) tabs + Settings icon
 *   - Items:
 *     1. New Expense Claim Submitted (bell icon, red dot, "Click here" link)
 *     2. Sonia Bennet asked to appraise your team members (avatar, Team Appraisal card, Appraise Team button)
 *     3. Your leave request for 28 Nov, 2024 has been approved (calendar icon)
 *     4. Meeting invitation: 12 Nov 2024, 3:15 PM. (avatar, Audit Review Meeting card, Join Meeting button)
 */

import { useState } from 'react';
import './NotificationPanel.css';
import CalendarIcon from '../../../assets/Fowgate Folder/Calendar.svg';
import CheckMarkIcon from '../../../assets/Fowgate Folder/checkmark-circle-04.svg';
import DocumentIcon from '../../../assets/Fowgate Folder/document-svgrepo-com-3 1.svg';
import PdfIcon from '../../../assets/Fowgate Folder/pdf-file-svgrepo-com 1.svg';
import SettingsIcon from '../../../assets/Fowgate Folder/Settings.svg';
import ViewDocumentModal from '../ViewDocumentModal/ViewDocumentModal';

// ── Static notification data matching Figma ────────────────────────────────────
const INBOX_NOTIFICATIONS = [
  {
    id: 'n1',
    iconType: 'bell',
    isAvatar: false,
    unread: true,
    title: 'New Expense Claim Submitted',
    messageType: 'expense',
    message: (
      <>
        Alfred Beckett has submitted an expense claim for review.{' '}
        <span className="notif-inline-link">Click here</span> to review the details and process accordingly.
      </>
    ),
    time: '5 mins ago',
    category: 'Expense Claim',
    card: null,
  },
  {
    id: 'n2',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=80&h=80',
    isAvatar: true,
    online: true,
    unread: false,
    message: <>Sonia Bennet asked to appraise your team members</>,
    time: '2 days ago',
    category: 'Appraisal',
    card: {
      iconType: 'document',
      title: 'Team Appraisal',
      subtitle: 'Created 1 hour ago',
      action: { label: 'Appraise Team', color: 'blue' },
    },
  },
  {
    id: 'n3',
    iconType: 'calendar',
    isAvatar: false,
    unread: false,
    message: 'Your leave request for 28 Nov, 2024 has been approved',
    time: '4 days ago',
    category: 'Leave Request',
    card: null,
  },
  {
    id: 'n4',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80',
    isAvatar: true,
    online: true,
    unread: false,
    message: 'Meeting invitation: 12 Nov 2024, 3:15 PM.',
    time: '10 Nov, 2024',
    category: 'Meeting',
    card: {
      iconType: 'pdf',
      title: 'Audit Review Meeting',
      subtitle: 'Created 2 days ago',
      action: { label: 'Join Meeting', color: 'blue' },
    },
  },
];

const TEAMS_NOTIFICATIONS = [
  {
    id: 't1',
    iconType: 'calendar',
    isAvatar: false,
    unread: true,
    message: 'Samuel Adeyemi submitted his appraisal',
    time: '30 min ago',
    category: 'Appraisal',
    card: null,
  },
  {
    id: 't2',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80&h=80',
    isAvatar: true,
    online: false,
    unread: true,
    message: 'Mary Adkins requested a team meeting',
    time: '1 hour ago',
    category: 'Meeting',
    card: null,
  },
  {
    id: 't3',
    iconType: 'calendar',
    isAvatar: false,
    unread: false,
    message: 'Grace Nwosu updated the Q3 report',
    time: '3 hours ago',
    category: 'Report',
    card: null,
  },
  {
    id: 't4',
    iconType: 'calendar',
    isAvatar: false,
    unread: false,
    message: 'Scott Pippen approved your timesheet',
    time: '1 day ago',
    category: 'Timesheet',
    card: null,
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function CalendarIconComponent() {
  return (
    <div className="notif-icon-wrap notif-icon-calendar">
      <img src={CalendarIcon} alt="calendar" style={{ width: '26px', height: '26px' }} />
    </div>
  );
}

function BellIconComponent() {
  return (
    <div className="notif-icon-wrap notif-icon-bell">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="#1F66C7"/>
      </svg>
    </div>
  );
}

function DocumentCardIcon() {
  return (
    <div className="notif-card-icon notif-card-icon-doc">
      <img src={DocumentIcon} alt="document" style={{ width: '38px', height: '38px' }} />
    </div>
  );
}

function PdfCardIcon() {
  return (
    <div className="notif-card-icon notif-card-icon-pdf">
      <img src={PdfIcon} alt="pdf" style={{ width: '38px', height: '38px' }} />
    </div>
  );
}

function CheckIcon() {
  return (
    <img src={CheckMarkIcon} alt="check" style={{ width: '15px', height: '15px' }} />
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function NotificationPanel({ isOpen, onClose, onSelectClaim }) {
  const [activeTab, setActiveTab] = useState('Inbox');
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [selectedDocData, setSelectedDocData] = useState(null);
  const [notifications, setNotifications] = useState({
    Inbox: INBOX_NOTIFICATIONS,
    Teams: TEAMS_NOTIFICATIONS,
  });

  if (!isOpen) return null;

  const current = notifications[activeTab];

  const markAllRead = () => {
    setNotifications(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(n => ({ ...n, unread: false })),
    }));
  };

  const handleNotifClick = (notif) => {
    if (notif.unread) {
      setNotifications(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(n => n.id === notif.id ? { ...n, unread: false } : n)
      }));
    }

    if (notif.messageType === 'expense' && onSelectClaim) {
      onClose();
      onSelectClaim();
      return;
    }

    if (notif.isDocModal) {
      setSelectedDocData(null);
      setDocModalOpen(true);
    }
  };

  return (
    <>
      {/* Transparent backdrop — click outside to close */}
      <div className="notif-backdrop" onClick={onClose} />

      {/* Panel */}
      <div className="notif-panel" role="dialog" aria-label="Notifications">

        {/* ── Header ── */}
        <div className="notif-header">
          <h2 className="notif-title">Notification</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="notif-mark-read" onClick={markAllRead}>
              <CheckIcon />
              Mark all as read
            </button>
          </div>
        </div>

        {/* ── Tabs + Settings ── */}
        <div className="notif-tabs-row">
          <div className="notif-tabs">
            {['Inbox', 'Teams'].map(tab => {
              const displayCount = tab === 'Inbox' ? 12 : 4;
              return (
                <button
                  key={tab}
                  className={`notif-tab${activeTab === tab ? ' active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  <span className={`notif-tab-badge${activeTab === tab ? ' active' : ''}`}>
                    {displayCount}
                  </span>
                </button>
              );
            })}
          </div>
          <button className="notif-settings-btn" aria-label="Notification settings">
            <img src={SettingsIcon} alt="settings" style={{ width: '18px', height: '18px' }} />
          </button>
        </div>

        {/* ── Notification list ── */}
        <div className="notif-list">
          {current.map(notif => (
            <div
              className={`notif-item${notif.unread ? ' unread' : ''}`}
              key={notif.id}
              onClick={() => handleNotifClick(notif)}
              style={{ cursor: 'pointer' }}
            >
              {/* Avatar or icon */}
              <div className="notif-avatar-col">
                {notif.isAvatar ? (
                  <div className="notif-avatar-wrap">
                    <img
                      src={notif.avatar}
                      alt=""
                      className="notif-avatar"
                      onError={e => { e.target.onerror = null; e.target.src = 'https://ui-avatars.com/api/?name=User&background=0f52ba&color=fff&size=80'; }}
                    />
                    {notif.online && <span className="notif-online-dot" />}
                  </div>
                ) : notif.iconType === 'bell' ? (
                  <BellIconComponent />
                ) : (
                  <CalendarIconComponent />
                )}
              </div>

              {/* Content */}
              <div className="notif-content">
                {notif.title && (
                  <h4 className="notif-item-title">{notif.title}</h4>
                )}
                <p className="notif-message">{notif.message}</p>
                <div className="notif-meta">
                  <span className="notif-time">{notif.time}</span>
                  <span className="notif-circle-dot" />
                  <span className="notif-category">{notif.category}</span>
                </div>

                {/* Optional action card */}
                {notif.card && (
                  <div className="notif-card">
                    <div className="notif-card-top">
                      {notif.card.iconType === 'pdf' ? <PdfCardIcon /> : <DocumentCardIcon />}
                      <div className="notif-card-info">
                        <span className="notif-card-title">{notif.card.title}</span>
                        <span className="notif-card-subtitle">{notif.card.subtitle}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="notif-action-btn notif-action-btn--blue"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {notif.card.action.label}
                    </button>
                  </div>
                )}
              </div>

              {/* Unread dot */}
              {notif.unread && <span className="notif-unread-dot" />}
            </div>
          ))}
        </div>

      </div>

      {/* View Document Modal Trigger */}
      {docModalOpen && (
        <ViewDocumentModal
          documentData={selectedDocData}
          onClose={() => setDocModalOpen(false)}
        />
      )}
    </>
  );
}
