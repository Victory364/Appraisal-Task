import React from 'react';
import './Header.css';
import searchIcon from '../assets/Fowgate Folder/search-normal.svg';
import bellIcon from '../assets/Fowgate Folder/Group 1226.svg';

export default function Header({ activeTab = 'Expense Claims' }) {
  const tabs = [
    'My Profile',
    'Memo',
    'Calendar',
    'Leave Applications',
    'Paystub',
    'My Timesheet',
    'My Earnings',
    'My Appraisals',
    'Expense Claims',
    'Loans & Advances',
    'My Files'
  ];

  return (
    <header className="fowgate-header">
      {/* Top Section */}
      <div className="header-top-bar">
        {/* Title */}
        <h1 className="header-title">My Account</h1>

        {/* Search Bar */}
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

        {/* Actions Area */}
        <div className="header-actions-area">
          {/* Notification Bell */}
          <button className="alert-bell-button" aria-label="Notifications">
            <img src={bellIcon} alt="Notifications" />
            <span className="bell-badge-dot" />
          </button>

          {/* Profile Dropdown */}
          <div className="header-profile-dropdown">
            <div className="avatar-wrapper">
              {/* Profile Avatar using high-quality Unsplash image or local assets */}
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

      {/* Sub-Navigation Area */}
      <nav className="header-sub-nav">
        {tabs.map((tab, idx) => {
          const isActive = tab === activeTab;
          return (
            <a 
              key={idx} 
              href={`#${tab.toLowerCase().replace(/\s+/g, '-')}`} 
              className={`sub-nav-tab-item ${isActive ? 'active' : ''}`}
            >
              {tab}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
