/**
 * NotificationPanel.jsx — Notification Dropdown Panel
 * -----------------------------------------------------
 * Matches the Figma frame 2087327863:
 *   Width: 560px fixed
 *   Flow: Vertical
 *   Top: 104px (below header)
 *
 * Features:
 *   - Inbox / Teams tabs with counts
 *   - Mark all as read link
 *   - Settings gear icon
 *   - Notification items with avatars/icons, red unread dots,
 *     timestamp, category tag, and optional action cards
 *   - Closes on outside click via the backdrop overlay
 */

import { useState } from 'react';
import './NotificationPanel.css';
import CalendarIcon from '../../../assets/Fowgate Folder/Calendar.svg';
import CheckMarkIcon from '../../../assets/Fowgate Folder/checkmark-circle-04.svg';
import DocumentIcon from '../../../assets/Fowgate Folder/document-svgrepo-com-3 1.svg';
import GoogleMeetIcon from '../../../assets/Fowgate Folder/google-meet-svgrepo-com 1.svg';
import PdfIcon from '../../../assets/Fowgate Folder/pdf-file-svgrepo-com 1.svg';
import SettingsIcon from '../../../assets/Fowgate Folder/Settings.svg';
import BellIcon from '../../../assets/Fowgate Folder/Group 1226.svg';
import ViewDocumentModal from '../ViewDocumentModal/ViewDocumentModal';
import NotificationBell from '../../../assets/Fowgate Folder/Notification - Blue.svg'

// ── Static notification data ──────────────────────────────────────────────────
const INBOX_NOTIFICATIONS = [
  {
    id: 'n0',
    iconType: 'bell',
    isAvatar: false,
    unread: true,
    isDocModal: true,
    title: 'Off-boarding Files Sent!',
    message: 'Your off-boarding documents have been sent. Reach out to HR if you have any questions.',
    time: '2 mins ago',
    category: 'Off-Boarding',
    chips: [
      { name: 'Termination Letter', isDocModal: true },
      { name: 'Fowgate NDA', isDocModal: true },
      { name: 'Payout Slip', isDocModal: true }
    ],
    card: null,
  },
  {
    id: 'n1',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80',
    isAvatar: true,
    online: true,
    unread: true,
    message: <>Sonia Bennet asked to <strong>appraise your team members</strong></>,
    time: '1 hour ago',
    category: 'Appraisal',
    card: {
      icon: null,
      iconType: 'document',
      title: 'Team Appraisal',
      subtitle: 'Created 1 hour ago',
      action: { label: 'Appraise Team', color: 'blue' },
    },
  },
  {
    id: 'n2',
    iconType: 'calendar',
    isAvatar: false,
    unread: true,
    message: 'Your leave request for 28 Nov, 2024 has been approved',
    time: '2 hours ago',
    category: 'Leave Request',
    card: null,
  },
  {
    id: 'n3',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80&h=80',
    isAvatar: true,
    online: true,
    unread: false,
    message: 'Meeting invitation: 12 Nov 2024, 3:15 PM.',
    time: '2 days ago',
    category: 'Meeting',
    card: {
      iconType: 'pdf',
      title: 'Audit Review Meeting',
      subtitle: 'Created 2 days ago',
      action: { label: 'Join Meeting', color: 'meet' },
    },
  },
  {
    id: 'n4',
    iconType: 'calendar',
    isAvatar: false,
    unread: false,
    message: 'Your leave request for 13 Nov, 2024 has been approved',
    time: '2 hours ago',
    category: 'Leave Request',
    card: null,
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

// ── Icon sub-components ───────────────────────────────────────────────────────

function CalendarIconComponent() {
  return (
    <div className="notif-icon-wrap notif-icon-calendar">
      <img src={CalendarIcon} alt="calendar" style={{ width: '28px', height: '28px' }} />
    </div>
  );
}

function BellIconComponent() {
  return (
    <div className="notif-icon-wrap notif-icon-bell">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="#1F66C7"/>
      </svg>
    </div>
  );
}

function DocumentCardIcon() {
  return (
    <div className="notif-card-icon notif-card-icon-doc">
      <img src={DocumentIcon} alt="document" style={{ width: '40px', height: '40px' }} />
    </div>
  );
}

function PdfCardIcon() {
  return (
    <div className="notif-card-icon notif-card-icon-pdf">
      <img src={PdfIcon} alt="pdf" style={{ width: '40px', height: '40px' }} />
    </div>
  );
}

function CheckIcon() {
  return (
    <img src={CheckMarkIcon} alt="check" style={{ width: '15px', height: '15px' }} />
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function NotificationPanel({ isOpen, onClose }) {
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

  const handleNotifClick = (notif, chip = null) => {
    if (notif.unread) {
      setNotifications(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].map(n => n.id === notif.id ? { ...n, unread: false } : n)
      }));
    }

    if (notif.isDocModal || chip?.isDocModal) {
      if (chip) {
        setSelectedDocData({
          re: chip.name,
          subject: chip.name
        });
      } else {
        setSelectedDocData(null);
      }
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
              const displayCount = tab === 'Inbox' ? notifications.Inbox.length : notifications.Teams.length;
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

                {/* Optional attachment chips */}
                {notif.chips && (
                  <div className="notif-chips-container">
                    {notif.chips.map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="notif-chip-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotifClick(notif, chip);
                        }}
                      >
                        <img src={PdfIcon} alt="PDF" className="notif-chip-icon" />
                        <span>{chip.name}</span>
                      </button>
                    ))}
                  </div>
                )}

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
                      className={`notif-action-btn notif-action-btn--${notif.card.action.color}`}
                    >
                      {notif.card.action.color === 'meet' && (
                        <img src={GoogleMeetIcon} alt="Google Meet" style={{ width: '16px', height: '16px' }} />
                      )}
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
