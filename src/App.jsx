import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

import ExpenseClaimsPage from './components/ExpenseClaimsPage/ExpenseClaimsPage';
import MyAppraisalsPage from './components/MyAppraisalsPage/MyAppraisalsPage';
import MyProfilePage from './components/MyProfilePage/MyProfilePage';
import LoanManagement from './components/LoanManagement/LoanManagement';
import CasesPage from './components/CasesPage/CasesPage';
import ComplianceManagement from './components/ComplianceManagement/ComplianceManagement';
import PayrollExpenseClaimsPage from './components/PayrollExpenseClaimsPage/PayrollExpenseClaimsPage';

import './App.css';

function App() {
  // Track which header tab is currently active
  const [activeTab, setActiveTab] = useState('Cases');
  // Track which sidebar option is active
  const [activeSidebarItem, setActiveSidebarItem] = useState('My Account');

  const isAccountArea = activeSidebarItem === 'My Account';

  // Handle clicks on sidebar links
  const handleSidebarChange = (itemName) => {
    setActiveSidebarItem(itemName);
    if (itemName === 'Payroll') {
      setActiveTab('Expense Claims');
    } else if (itemName === 'My Account') {
      setActiveTab('Cases');
    }
  };

  const renderPage = () => {
    if (activeSidebarItem === 'Compliance Management') return <ComplianceManagement />;
    if (activeSidebarItem === 'Payroll') return <PayrollExpenseClaimsPage />;
    if (!isAccountArea) return null;
    switch (activeTab) {
      case 'My Profile':
        return <MyProfilePage />;
      case 'Appraisals':
        return <MyAppraisalsPage />;
      case 'Expense Claims':
        return <ExpenseClaimsPage activeSidebarItem={activeSidebarItem} />;
      case 'Loans & Advances':
        return <LoanManagement />;
      case 'Cases':
        return <CasesPage />;
      default:
        return <MyProfilePage />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* ── Left Sidebar ──────────────────────────────────────────────────
          Fixed column, always visible. activeItem controls which link
          is highlighted with the white left-border indicator.          */}
      <Sidebar activeItem={activeSidebarItem} onNavChange={handleSidebarChange} />

      {/* ── Main Content Column ───────────────────────────────────────────
          Grows to fill the remaining width after the 250 px sidebar.
          Stacks the Header on top and the page content below it.       */}
      <main className="dashboard-main-area">
        {/* Top Header — Suppressed for Compliance Management as it embeds its own header */}
        {activeSidebarItem !== 'Compliance Management' && activeSidebarItem !== 'Payroll' && (
          <Header
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setActiveSidebarItem('My Account');
            }}
          />
        )}

        {/* Scrollable page body — wraps the active feature page. */}
        <div className={`page-content-wrapper${activeTab === 'Appraisals' ? ' appraisals-content-wrapper' : ''}${activeSidebarItem === 'Payroll' ? ' payroll-view-wrapper' : ''}`}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
