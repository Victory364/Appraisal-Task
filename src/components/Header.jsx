import React from 'react';
import './Header.css';
import { Search, Bell, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>My Account</h1>
      </div>
      <div className="topbar-search">
        <div className="search-field">
          <Search className="search-icon" />
          <input placeholder="Search here" />
        </div>
      </div>
      <div className="topbar-actions">
        <button className="icon-button notification-button" type="button" aria-label="Notifications">
          <Bell />
          <span />
        </button>
        <button className="avatar-button" type="button">
          <div className="avatar-badge">JS</div>
          <ChevronDown />
        </button>
      </div>
    </header>
  );
}
