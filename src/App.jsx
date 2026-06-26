/**
 * App.jsx — Root Application Shell
 * ----------------------------------
 * This is the top-level component that every page in the Fowgate HR portal
 * passes through. It composes the three major layout regions side-by-side:
 *
 *   ┌──────────────┬─────────────────────────────────────┐
 *   │              │  Header (My Account + tab nav)       │
 *   │   Sidebar    ├─────────────────────────────────────┤
 *   │  (250 px)    │  Page Content                        │
 *   │              │  (ExpenseClaimsPage in this build)   │
 *   └──────────────┴─────────────────────────────────────┘
 *
 * Layout rules:
 *   • The Sidebar is fixed-position (defined in Sidebar.css) and always 250 px
 *     wide. The main area compensates with margin-left: 250px in index.css.
 *   • The Header is sticky at the top of the main column.
 *   • page-content-wrapper adds bottom padding so the last section is never
 *     flush against the edge of the viewport.
 *
 * Props passed down:
 *   • Sidebar  → activeItem="My Account"    highlights the correct nav link
 *   • Header   → activeTab="Expense Claims" underlines the correct tab
 */

// Layout components — each lives in its own file inside /components
import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

// The main feature pages
import ExpenseClaimsPage from './components/ExpenseClaimsPage/ExpenseClaimsPage';
import MyAppraisalsPage from './components/MyAppraisalsPage/MyAppraisalsPage';
import MyProfilePage from './components/MyProfilePage/MyProfilePage';
import LoanManagement from './components/LoanManagement.jsx';

// App-level CSS (currently just a comment; global styles live in index.css)
import './App.css';

function App() {
  // Track which header tab is currently active
  const [activeTab, setActiveTab] = useState('Loans & Advances');

  // Render the correct page component based on the active tab
  const renderPage = () => {
    switch (activeTab) {
      case 'My Profile':
        return <MyProfilePage />;
      case 'Appraisals':
        return <MyAppraisalsPage />;
      case 'Expense Claims':
        return <ExpenseClaimsPage />;
      case 'Loans & Advances':
        return <LoanManagement />;
      default:
        // Placeholder for tabs not yet implemented
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            color: '#94a3b8',
            gap: '12px'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p style={{ fontSize: '15px', fontWeight: '500' }}>{activeTab} — Coming Soon</p>
          </div>
        );
    }
  };

  return (
    /**
     * dashboard-container
     * A full-width flex row defined in index.css.
     * The Sidebar sits on the left; the main area grows to fill the rest.
     */
    <div className="dashboard-container">

      {/* ── Left Sidebar ──────────────────────────────────────────────────
          Fixed column, always visible. activeItem controls which link
          is highlighted with the white left-border indicator.          */}
      <Sidebar activeItem="My Account" />

      {/* ── Main Content Column ───────────────────────────────────────────
          Grows to fill the remaining width after the 250 px sidebar.
          Stacks the Header on top and the page content below it.       */}
      <main className="dashboard-main-area">

        {/* Header — "My Account" title, search bar, bell, profile, and
            the horizontal tab row. activeTab keeps the selected tab
            underlined in blue.                                          */}
        <Header activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Scrollable page body — wraps the active feature page.
            The page-content-wrapper class adds 40 px bottom padding so
            content is never flush against the bottom of the viewport.  */}
        <div className={`page-content-wrapper${activeTab === 'Appraisals' ? ' appraisals-content-wrapper' : ''}`}>
          {renderPage()}
        </div>

      </main>
    </div>
  );
}

export default App;
