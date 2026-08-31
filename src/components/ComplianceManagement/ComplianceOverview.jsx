import React, { useState } from 'react';
import notifRedIcon from '../../assets/Fowgate Folder/Notification - red.svg';
import fileIllustration from '../../assets/Fowgate Folder/File Illustration.svg';

export default function ComplianceOverview({
  categories,
  selectedCategory,
  onSelectCategory,
  onOpenManageCompliance,
  onOpenAddPolicy,
  onSelectPolicy
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Categories');

  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCat = selectedCategory || categories[1] || categories[0];

  return (
    <div className="compliance-container">
      {/* Top Header Bar */}
      <div className="compliance-top-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 className="compliance-page-title" style={{ margin: 0 }}>
            Compliance
          </h1>
          <div className="compliance-search-box">
            <input
              type="text"
              className="compliance-search-input"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="compliance-search-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>
        </div>

        <button className="btn-primary-blue" onClick={onOpenManageCompliance}>
          Manage Compliance
        </button>
      </div>

      {/* Two-Column Grid Layout */}
      <div className="compliance-overview-grid">
        {/* Left Card: Categories List */}
        <div className="compliance-left-card">
          {/* Dropdown Button */}
          <button className="category-dropdown-btn">
            <span>All Categories</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Category Search Input */}
          <div className="category-search-box">
            <input
              type="text"
              className="category-search-input"
              placeholder="Search name, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="compliance-search-icon" style={{ right: '12px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>

          {/* Category List */}
          <div className="category-list">
            {filteredCategories.map((cat) => {
              const isSelected = activeCat?.id === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat)}
                  className={`category-item ${isSelected ? 'active' : ''}`}
                >
                  <div className="category-item-header">
                    <span className="category-item-title">{cat.title}</span>
                    {cat.hasNotification && (
                      <img src={notifRedIcon} alt="notification" style={{ width: '15px', height: '15px', flexShrink: 0 }} />
                    )}
                  </div>
                  <div className="category-item-subtitle">
                    Type: {cat.type} • Files: {cat.fileCount || (cat.policies?.length > 0 ? cat.policies.length : 6)} Policies
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Card: Category Policy Progress View / Empty State */}
        <div className="compliance-right-card">
          {/* Header */}
          <div className="compliance-right-header">
            <h3 className="compliance-right-title">
              {activeCat?.title ? activeCat.title.replace(/\s+Compliance$/, '') : 'Contractual'}
            </h3>
            <button className="btn-secondary-link" onClick={onOpenAddPolicy}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Add Policy</span>
            </button>
          </div>

          {/* Body Content */}
          {!activeCat?.policies || activeCat.policies.length === 0 ? (
            /* Empty State matching Expense Claims illustration */
            <div className="compliance-empty-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center' }}>
              <div className="compliance-empty-icon-wrapper" style={{ width: '140px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <img
                  src={fileIllustration}
                  alt="Nothing to show illustration"
                  style={{ width: '140px', height: '140px', display: 'block' }}
                />
              </div>
              <div className="compliance-empty-title" style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '6px' }}>
                Nothing to show here
              </div>
              <div className="compliance-empty-subtitle" style={{ fontSize: '13.5px', color: '#64748b' }}>
                or use the "Add Policy" button
              </div>
            </div>

          ) : (
            /* Figma Policy Progress Cards List */
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {activeCat.policies.map((policy) => {
                const percent = Math.round((policy.completed / policy.total) * 100);
                return (
                  <div
                    key={policy.id}
                    onClick={() => onSelectPolicy(policy)}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '16px 20px',
                      cursor: 'pointer',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#93c5fd';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                          {policy.title}
                        </span>
                        {policy.hasBell && (
                          <img src={notifRedIcon} alt="notification" style={{ width: '16px', height: '16px', flexShrink: 0 }} />
                        )}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: '500', color: '#64748b' }}>
                        {policy.completed} of {policy.total} complete
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${percent}%`,
                          height: '100%',
                          backgroundColor: '#22c55e',
                          borderRadius: '3px',
                          transition: 'width 0.3s ease'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
