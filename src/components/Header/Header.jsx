import { useState } from 'react';
import './Header.css';
import NotificationPanel from '../modals/NotificationPanel/NotificationPanel';

import searchIcon from '../../assets/Fowgate Folder/search-normal.svg';
import bellIcon   from '../../assets/Fowgate Folder/Group 1226.svg';

export default function Header({
  title = 'My Account',
  showTabs = true,
  activeTab = 'Expense Claims',
  onTabChange
}) {
  const [notifOpen, setNotifOpen] = useState(false);

  const handleBellClick = () => {
    setNotifOpen((prev) => !prev);
  };

  const tabs = [
    'My Profile',
    'Memo',
    'Calendar',
    'Leave Applications',
    'Paystub',
    'Timesheet',
    'Earnings',
    'Appraisals',
    'Expense Claims',
    'Loans & Advances',
    'Files',
    'Cases',
  ];

  return (
    <>
      <header className={`fowgate-header${!showTabs ? ' fowgate-header--compact' : ''}`}>
        {/* Row 1: Top Bar */}
        <div className="header-top-bar">
          <div className="header-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {title}
          </div>

          <div className="header-search-container">
            <div className="search-icon-wrapper">
              <img src={searchIcon} alt="Search" />
            </div>
            <input
              type="text"
              placeholder="Search here..."
              className="header-search-input"
            />
          </div>

          <div className="header-actions-area">
            <button
              className={`alert-bell-button${notifOpen ? ' active' : ''}`}
              aria-label="Notifications"
              id="header-bell-btn"
              onClick={handleBellClick}
            >
              <img src={bellIcon} alt="Notifications" />
              <span className="bell-badge-dot" />
            </button>

            <div className="header-profile-dropdown">
              <div className="avatar-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="User Profile"
                />
              </div>
              <div className="dropdown-arrow-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Sub-Navigation Tabs */}
        {showTabs && (
          <nav className="header-sub-nav">
            {tabs.map((tab, idx) => {
              const isActive = tab === activeTab;
              return (
                <a
                  key={idx}
                  href={`#${tab.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`sub-nav-tab-item ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onTabChange) {
                      onTabChange(tab);
                    }
                  }}
                >
                  {tab}
                </a>
              );
            })}
          </nav>
        )}
      </header>

      <NotificationPanel
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
      />
    </>
  );
}
