import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ExpenseClaimsPage from './components/ExpenseClaimsPage';
import './App.css';

function App() {
  return (
    <div className="dashboard-container">
      {/* 1. Left Sidebar: exactly 250px wide */}
      <Sidebar activeItem="My Account" />
      
      {/* 2. Main Area flow: exactly 1126px wide */}
      <main className="dashboard-main-area">
        {/* Header Area: width 1126px, hug height approx 150px */}
        <Header activeTab="Expense Claims" />
        
        {/* Page Content Area Container: holds 1094px main Expense Claims view */}
        <div className="page-content-wrapper">
          <ExpenseClaimsPage />
        </div>
      </main>
    </div>
  );
}

export default App;
