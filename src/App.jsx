import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';

import ExpenseClaimsPage from './components/ExpenseClaimsPage/ExpenseClaimsPage';
import MyAppraisalsPage from './components/MyAppraisalsPage/MyAppraisalsPage';
import MyProfilePage from './components/MyProfilePage/MyProfilePage';
import LoanManagement from './components/LoanManagement/LoanManagement';
import CasesPage from './components/CasesPage/CasesPage';
import ComplianceManagement from './components/ComplianceManagement/ComplianceManagement';

import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('My Profile');
  const [activeNavItem, setActiveNavItem] = useState('My Account');
  const isAccountArea = activeNavItem === 'My Account';

  const renderPage = () => {
    if (activeNavItem === 'Compliance Management') return <ComplianceManagement />;
    if (!isAccountArea) return null;
    switch (activeTab) {
      case 'My Profile':
        return <MyProfilePage />;
      case 'Appraisals':
        return <MyAppraisalsPage />;
      case 'Expense Claims':
        return <ExpenseClaimsPage />;
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
      {/* Left Sidebar */}
      <Sidebar activeItem={activeNavItem} onNavChange={setActiveNavItem} />

      {/* Main Content Column */}
      <main className="dashboard-main-area">
        {/* Top Header — Suppressed for Compliance Management as it embeds its own header */}
        {activeNavItem !== 'Compliance Management' && (
          <Header
            title={isAccountArea ? 'My Account' : activeNavItem}
            showTabs={isAccountArea}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}

        {/* Scrollable Page Body */}
        <div className={`page-content-wrapper${activeTab === 'Appraisals' ? ' appraisals-content-wrapper' : ''}`}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
