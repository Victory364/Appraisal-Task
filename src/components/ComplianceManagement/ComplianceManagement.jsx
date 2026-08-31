import React, { useState, useEffect } from 'react';
import './ComplianceManagement.css';

import ComplianceOverview from './ComplianceOverview';
import ManageCompliance from './ManageCompliance';
import DocumentDetails from './DocumentDetails';

import CreateCategoryModal from './modals/CreateCategoryModal';
import ConfirmActionModal from './modals/ConfirmActionModal';
import CategoryCreatedModal from './modals/CategoryCreatedModal';
import AddPolicyModal from './modals/AddPolicyModal';
import PolicyDetailsModal from './modals/PolicyDetailsModal';
import UpdatePolicyModal from './modals/UpdatePolicyModal';
import PolicyUpdatedModal from './modals/PolicyUpdatedModal';
import UpdatesHistoryModal from './modals/UpdatesHistoryModal';
import PolicyAddedModal from './modals/PolicyAddedModal';
import ChangesSavedModal from './modals/ChangesSavedModal';
import NotificationPanel from '../modals/NotificationPanel/NotificationPanel';

import searchIcon from '../../assets/Fowgate Folder/search-normal.svg';
import bellIcon from '../../assets/Fowgate Folder/Group 1226.svg';

const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    title: 'Operational Compliance',
    type: 'Regulatory',
    fileCount: 6,
    dateCreated: '12 Jan 2024',
    recipients: ['Operations', 'Finance', '+5 more'],
    hasNotification: false,
    policies: []
  },
  {
    id: 'cat-2',
    title: 'Contractual Compliance',
    type: 'Regulatory',
    fileCount: 6,
    dateCreated: '15 Feb 2024',
    recipients: ['Legal', 'HR', 'Executive'],
    hasNotification: true,
    policies: [
      { id: 'pol-1', title: 'Labor & Recruitment', completed: 4, total: 6, hasBell: true },
      { id: 'pol-2', title: 'Leave Management', completed: 3, total: 12, hasBell: false },
      { id: 'pol-3', title: 'Performance Management', completed: 8, total: 9, hasBell: false },
      { id: 'pol-4', title: 'Performance Management', completed: 8, total: 9, hasBell: false },
      { id: 'pol-5', title: 'Performance Management', completed: 6, total: 7, hasBell: false }
    ]
  },
  {
    id: 'cat-3',
    title: 'Data Compliance',
    type: 'Regulatory',
    fileCount: 6,
    dateCreated: '01 Mar 2024',
    recipients: ['IT', 'Security'],
    hasNotification: false,
    policies: []
  },
  {
    id: 'cat-4',
    title: 'Financial Compliance',
    type: 'Regulatory',
    fileCount: 6,
    dateCreated: '10 Jan 2024',
    recipients: ['Finance', 'Accounting'],
    hasNotification: false,
    policies: []
  },
  {
    id: 'cat-5',
    title: 'Security Compliance',
    type: 'Regulatory',
    fileCount: 6,
    dateCreated: '20 Jan 2024',
    recipients: ['IT', 'All Staff'],
    hasNotification: false,
    policies: []
  },
  {
    id: 'cat-6',
    title: 'HSE Compliance',
    type: 'Regulatory',
    fileCount: 6,
    dateCreated: '05 Feb 2024',
    recipients: ['Operations'],
    hasNotification: false,
    policies: []
  },
  {
    id: 'cat-7',
    title: 'Tax Laws Compliance',
    type: 'Regulatory',
    fileCount: 6,
    dateCreated: '18 Feb 2024',
    recipients: ['Finance'],
    hasNotification: false,
    policies: []
  },
  {
    id: 'cat-8',
    title: 'Health Compliance',
    type: 'Regulatory',
    fileCount: 6,
    dateCreated: '20 Feb 2024',
    recipients: ['HR'],
    hasNotification: false,
    policies: []
  },
  {
    id: 'cat-9',
    title: 'Consumer Compliance',
    type: 'Regulatory',
    fileCount: 6,
    dateCreated: '25 Feb 2024',
    recipients: ['Legal'],
    hasNotification: false,
    policies: []
  }
];

export default function ComplianceManagement({ onHeaderTitleChange }) {
  const [currentView, setCurrentView] = useState('overview'); // 'overview' | 'manage' | 'details'
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState(INITIAL_CATEGORIES[1]);
  const [selectedPolicy, setSelectedPolicy] = useState(INITIAL_CATEGORIES[1].policies[0]);

  // Modal Open States
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({});
  const [isCategoryCreatedOpen, setIsCategoryCreatedOpen] = useState(false);
  const [isAddPolicyOpen, setIsAddPolicyOpen] = useState(false);
  const [isPolicyAddedOpen, setIsPolicyAddedOpen] = useState(false);
  const [pendingPolicyData, setPendingPolicyData] = useState(null);
  const [isPolicyDetailsOpen, setIsPolicyDetailsOpen] = useState(false);
  const [isChangesSavedOpen, setIsChangesSavedOpen] = useState(false);
  const [isUpdatePolicyOpen, setIsUpdatePolicyOpen] = useState(false);
  const [isPolicyUpdatedSuccessOpen, setIsPolicyUpdatedSuccessOpen] = useState(false);
  const [isUpdatesHistoryOpen, setIsUpdatesHistoryOpen] = useState(false);

  // Update top header title in parent shell
  useEffect(() => {
    if (!onHeaderTitleChange) return;

    if (currentView === 'overview') {
      onHeaderTitleChange('Compliance');
    } else if (currentView === 'manage') {
      onHeaderTitleChange(
        <>
          <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '15px' }}>Compliance Management</span>
          <span style={{ color: '#94a3b8', fontSize: '14px', margin: '0 6px' }}>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600, fontSize: '15px' }}>Manage Compliance</span>
        </>
      );
    } else if (currentView === 'details') {
      onHeaderTitleChange(
        <>
          <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '15px' }}>Compliance Management</span>
          <span style={{ color: '#94a3b8', fontSize: '14px', margin: '0 6px' }}>/</span>
          <span style={{ color: '#0f172a', fontWeight: 600, fontSize: '15px' }}>
            {selectedPolicy?.title || 'Labor & Recruitment'}
          </span>
        </>
      );
    }
  }, [currentView, selectedPolicy, onHeaderTitleChange]);

  const handleSelectPolicy = (policy) => {
    setSelectedPolicy(policy);
    setCurrentView('details');
  };

  const handleCreateCategorySubmit = (newCatData) => {
    setIsCreateCategoryOpen(false);
    setConfirmConfig({
      title: '? Confirm Action',
      message: <>Are you sure you want to create the event <strong>"Internal Asset Audit Kickoff ?"</strong> Ensure all details are correct before proceeding</>,
      onConfirm: () => {
        const newCategory = {
          id: `cat-${Date.now()}`,
          title: newCatData.title,
          type: newCatData.type,
          dateCreated: newCatData.dateCreated,
          recipients: newCatData.recipients,
          hasNotification: false,
          policies: []
        };
        setCategories((prev) => [newCategory, ...prev]);
        setIsConfirmModalOpen(false);
        setIsCategoryCreatedOpen(true);
      }
    });
    setIsConfirmModalOpen(true);
  };

  const handleAddPolicySubmit = (policyTitle, policyData) => {
    // Store pending data and show confirmation modal
    setPendingPolicyData({ policyTitle, policyData });
    setIsAddPolicyOpen(false);
    setConfirmConfig({
      title: '? Confirm Action',
      message: (
        <>
          Are you sure you want to add this policy <strong>&ldquo;{policyTitle}&rdquo;</strong>? Ensure all details are correct before proceeding
        </>
      ),
      onConfirm: () => {
        const title = policyTitle;
        const newPolicy = {
          id: `pol-${Date.now()}`,
          title,
          completed: 0,
          total: 5,
          hasBell: false
        };
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === selectedCategory.id
              ? { ...cat, policies: [...(cat.policies || []), newPolicy] }
              : cat
          )
        );
        setSelectedCategory((prev) => ({
          ...prev,
          policies: [...(prev.policies || []), newPolicy]
        }));
        setIsConfirmModalOpen(false);
        setPendingPolicyData(null);
        setIsPolicyAddedOpen(true);
      }
    });
    setIsConfirmModalOpen(true);
  };

  const handleSavePolicyDetails = ({ completedCount, totalCount }) => {
    if (selectedCategory && selectedPolicy) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === selectedCategory.id
            ? {
              ...cat,
              policies: cat.policies.map((p) =>
                p.id === selectedPolicy.id
                  ? { ...p, completed: completedCount, total: totalCount }
                  : p
              )
            }
            : cat
        )
      );
    }
    setIsPolicyDetailsOpen(false);
    setIsChangesSavedOpen(true);
  };

  const handleSaveUpdatePolicyForm = (updatedData) => {
    setIsUpdatePolicyOpen(false);
    setConfirmConfig({
      title: '? Confirm Action',
      message: (
        <>
          Are you sure you want to save the changes made to <strong>&ldquo;{updatedData.title}&rdquo;</strong>? Ensure all details are correct before proceeding
        </>
      ),
      onConfirm: () => {
        setIsConfirmModalOpen(false);
        setIsPolicyUpdatedSuccessOpen(true);
      }
    });
    setIsConfirmModalOpen(true);
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setConfirmConfig({
      title: '? Confirm Action',
      message: <>Are you sure you want to delete category <strong>"Internal Asset Audit Kickoff ?"</strong></>,
      onConfirm: () => {
        setCategories((prev) => prev.filter((c) => c.id !== categoryToDelete.id));
        setIsConfirmModalOpen(false);
      }
    });
    setIsConfirmModalOpen(true);
  };

  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="compliance-module-wrapper">
      {/* Integrated Top Header Bar inside Compliance Management */}
      <div className="compliance-top-bar">
        <div className="compliance-header-title">
          {currentView === 'overview' && 'HCM'}
          {currentView === 'manage' && (
            <>
              <span className="breadcrumb-muted">Compliance Management</span>
              <span className="breadcrumb-slash">/</span>
              <span className="breadcrumb-active">Manage Compliance</span>
            </>
          )}
          {currentView === 'details' && (
            <>
              <span className="breadcrumb-muted">Compliance Management</span>
              <span className="breadcrumb-slash">/</span>
              <span className="breadcrumb-active">{selectedPolicy?.title || 'Labor & Recruitment'}</span>
            </>
          )}
        </div>

        <div className="compliance-search-container">
          <input
            type="text"
            placeholder="Search here"
            className="compliance-header-search-input"
          />
          <div className="compliance-search-icon-wrapper" style={{ left: 'auto', right: '14px' }}>
            <img src={searchIcon} alt="Search" />
          </div>
        </div>

        <div className="compliance-header-actions">
          <button
            className={`alert-bell-button${notifOpen ? ' active' : ''}`}
            aria-label="Notifications"
            onClick={() => setNotifOpen((prev) => !prev)}
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
      {/* 1. Overview View */}
      {currentView === 'overview' && (
        <ComplianceOverview
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onOpenManageCompliance={() => setCurrentView('manage')}
          onOpenAddPolicy={() => setIsAddPolicyOpen(true)}
          onSelectPolicy={handleSelectPolicy}
        />
      )}

      {/* 2. Manage Compliance View */}
      {currentView === 'manage' && (
        <ManageCompliance
          categories={categories}
          onBackToOverview={() => setCurrentView('overview')}
          onOpenCreateCategory={() => setIsCreateCategoryOpen(true)}
          onDeleteCategory={handleDeleteCategory}
        />
      )}

      {/* 3. Document Details View */}
      {currentView === 'details' && (
        <DocumentDetails
          selectedPolicy={selectedPolicy}
          onBackToOverview={() => setCurrentView('overview')}
          onOpenUpdatesHistory={() => setIsUpdatesHistoryOpen(true)}
          onOpenViewPolicy={() => setIsPolicyDetailsOpen(true)}
          onOpenUpdatePolicy={() => setIsUpdatePolicyOpen(true)}
          onOpenDeleteConfirm={(doc) => {
            setConfirmConfig({
              title: '? Confirm Action',
              message: `Are you sure you want to delete policy document "${doc.fileName}"?`,
              onConfirm: () => setIsConfirmModalOpen(false)
            });
            setIsConfirmModalOpen(true);
          }}
        />
      )}

      {/* MODALS */}
      <CreateCategoryModal
        isOpen={isCreateCategoryOpen}
        onClose={() => setIsCreateCategoryOpen(false)}
        onSubmit={handleCreateCategorySubmit}
      />

      <ConfirmActionModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
      />

      <CategoryCreatedModal
        isOpen={isCategoryCreatedOpen}
        onClose={() => setIsCategoryCreatedOpen(false)}
      />

      <AddPolicyModal
        isOpen={isAddPolicyOpen}
        onClose={() => setIsAddPolicyOpen(false)}
        onSubmit={handleAddPolicySubmit}
      />

      <PolicyDetailsModal
        isOpen={isPolicyDetailsOpen}
        onClose={() => setIsPolicyDetailsOpen(false)}
        policyData={selectedPolicy}
        onSaveSuccess={handleSavePolicyDetails}
        onSaveChanges={handleSavePolicyDetails}
      />

      <UpdatePolicyModal
        isOpen={isUpdatePolicyOpen}
        onClose={() => setIsUpdatePolicyOpen(false)}
        policyData={selectedPolicy}
        onSave={handleSaveUpdatePolicyForm}
      />

      <PolicyUpdatedModal
        isOpen={isPolicyUpdatedSuccessOpen}
        onClose={() => setIsPolicyUpdatedSuccessOpen(false)}
      />

      <PolicyAddedModal
        isOpen={isPolicyAddedOpen}
        onClose={() => setIsPolicyAddedOpen(false)}
      />

      <ChangesSavedModal
        isOpen={isChangesSavedOpen}
        onClose={() => setIsChangesSavedOpen(false)}
      />

      <UpdatesHistoryModal
        isOpen={isUpdatesHistoryOpen}
        onClose={() => setIsUpdatesHistoryOpen(false)}
        policyTitle={selectedPolicy?.title}
      />

      <NotificationPanel
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
      />
    </div>
  );
}
