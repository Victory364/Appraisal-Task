/**
 * Header.jsx — Top Navigation Header
 * -------------------------------------
 * Renders the fixed header bar at the top of the Fowgate dashboard's main
 * content area.  It has two visual rows stacked vertically:
 *
 *   Row 1 — Top Bar:
 *     [ My Account (h1) ]   [ Search here… ]   [ 🔔 Bell ]  [ Avatar ▾ ]
 *
 *   Row 2 — Sub-navigation tabs:
 *     My Profile | Memo | Calendar | ... | Expense Claims | Loans & Advances | My Files
 *
 * The active tab is underlined in Fowgate blue and receives bold styling.
 * Inactive tabs are muted grey and darken on hover.
 *
 * Props:
 *   activeTab {string} — The tab name that should appear selected.
 *                        Default: 'Expense Claims'
 *                        Must match one of the strings in the `tabs` array exactly.
 *
 * Notes:
 *   • The horizontal tab row scrolls without showing a scrollbar (CSS hides it)
 *     so all 11 tabs are accessible even on narrower screens.
 *   • The notification bell has a red dot badge (bell-badge-dot) to signal
 *     unread notifications. In this prototype it is always visible.
 *   • The profile avatar uses an Unsplash URL for demo purposes; replace with
 *     a real user image from your backend in production.
 */

// Component-scoped styles — header layout, search bar, bell, profile, tabs
import { useState } from 'react';
import './Header.css';
import NotificationPanel from '../modals/NotificationPanel/NotificationPanel';

// Search and bell icon assets imported from the shared Fowgate asset folder
import searchIcon from '../../assets/Fowgate Folder/search-normal.svg';
import bellIcon   from '../../assets/Fowgate Folder/Group 1226.svg';


export default function Header({ activeTab = 'Expense Claims', onTabChange }) {
  const [notifOpen, setNotifOpen] = useState(false);

  const handleBellClick = () => {
    console.log("Notification bell clicked. Toggle state to:", !notifOpen);
    setNotifOpen(prev => !prev);
  };

  /**
   * tabs — all navigation tabs shown in the horizontal sub-nav row.
   * Order matches the Figma design exactly.
   * Each string is compared to `activeTab` to determine which gets the
   * blue underline and bold weight.
   */
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
    {/**
     * <header> is the correct semantic HTML5 element for a page header.
     * fowgate-header applies the white background, bottom border, and the
     * flex-column layout that stacks the top bar above the tab row.
     */}
    <header className="fowgate-header">

      {/* ── Row 1: Top Bar ─────────────────────────────────────────────────
          Three regions side-by-side using space-between:
            Left   — "My Account" page title (h1 for accessibility/SEO)
            Centre — global search input
            Right  — notification bell + profile avatar dropdown          */}
      <div className="header-top-bar">

        {/* Page title — h1 is correct here because it's the main heading
            of the currently visible page content                         */}
        <h1 className="header-title">My Account</h1>

        {/* Search bar — positioned container so the icon can be pinned
            to the right side of the input without affecting text flow    */}
        <div className="header-search-container">
          {/* Icon is inside a wrapper so it can be centred precisely     */}
          <div className="search-icon-wrapper">
            <img src={searchIcon} alt="Search" />
          </div>
          {/* The actual text input; placeholder guides the user           */}
          <input
            type="text"
            placeholder="Search here..."
            className="header-search-input"
          />
        </div>

        {/* Right action area — bell + profile grouped with a gap         */}
        <div className="header-actions-area">

          {/* Notification Bell Button */}
          <button
            className={`alert-bell-button${notifOpen ? ' active' : ''}`}
            aria-label="Notifications"
            id="header-bell-btn"
            onClick={handleBellClick}
          >
            <img src={bellIcon} alt="Notifications" />
            <span className="bell-badge-dot" />
          </button>

          {/* Profile Dropdown Trigger
              Shows the user's avatar and a chevron caret (▾) to hint that
              clicking opens a dropdown menu (dropdown behaviour not yet
              implemented in this prototype — just the visual shell).    */}
          <div className="header-profile-dropdown">
            {/* Circular avatar — overflow:hidden + border-radius:50% clips
                the rectangular image into a circle                       */}
            <div className="avatar-wrapper">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100"
                alt="User Profile"
              />
            </div>
            {/* Chevron / caret icon signals "click to open dropdown"    */}
            <div className="dropdown-arrow-icon">
              <svg viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
          </div>

        </div>
      </div>{/* end header-top-bar */}


      {/* ── Row 2: Sub-Navigation Tabs ─────────────────────────────────────
          A horizontal scrollable <nav> with one <a> per tab.
          Scrolling is enabled but the scrollbar is visually hidden (see
          Header.css) so it looks clean on all screen sizes.

          Each tab href is generated from the tab name so direct links
          work in a real router setup (e.g. "#expense-claims").         */}
      <nav className="header-sub-nav">
        {tabs.map((tab, idx) => {
          // Compare this tab to the activeTab prop
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

    </header>

    {/* Notification panel — rendered outside <header> so it overlays the page */}
    <NotificationPanel
      isOpen={notifOpen}
      onClose={() => setNotifOpen(false)}
    />
  </>
  );
}
