import React, { useState } from 'react';
import pen01Icon from '../../assets/Fowgate Folder/pen-01.svg';
import delete02Icon from '../../assets/Fowgate Folder/delete-02.svg';


const DEFAULT_MANAGE_ROWS = [
  {
    id: 'm1',
    title: 'Code of Conduct and Ethics',
    type: 'Operational',
    dateCreated: '12 Dec, 2024; 01:11PM',
    recipientsText: 'Audit, Marketing, +6more'
  },
  {
    id: 'm2',
    title: 'Contractual Compliance',
    type: 'Regulatory, Corporate',
    dateCreated: '20 Mar, 2024; 05:16PM',
    recipientsText: 'Audit, Marketing, +1more'
  },
  {
    id: 'm3',
    title: 'Data Compliance',
    type: 'Corporate',
    dateCreated: '20 Mar, 2024; 05:16PM',
    recipientsText: 'Audit, Marketing, +5more'
  },
  {
    id: 'm4',
    title: 'Financial Compliance',
    type: 'Regulatory',
    dateCreated: '20 Mar, 2024; 05:16PM',
    recipientsText: 'Audit, Marketing, +5more'
  },
  {
    id: 'm5',
    title: 'Security Compliance',
    type: 'Regulatory, Corporate',
    dateCreated: '20 Mar, 2024; 05:16PM',
    recipientsText: 'Audit, Marketing, +5more'
  },
  {
    id: 'm6',
    title: 'HSE Compliance',
    type: 'Corporate',
    dateCreated: '20 Mar, 2024; 05:16PM',
    recipientsText: 'Audit, Marketing, +5more'
  },
  {
    id: 'm7',
    title: 'Tax Laws Compliance',
    type: 'Regulatory',
    dateCreated: '20 Mar, 2024; 05:16PM',
    recipientsText: 'Audit, Marketing, +5more'
  },
  {
    id: 'm8',
    title: 'Health Compliance',
    type: 'Regulatory, Corporate',
    dateCreated: '20 Mar, 2024; 05:16PM',
    recipientsText: 'Audit, Marketing, +5more'
  },
  {
    id: 'm9',
    title: 'Consumer Compliance',
    type: 'Regulatory, Corporate',
    dateCreated: '20 Mar, 2024; 05:16PM',
    recipientsText: 'Audit, Marketing, +5more'
  }
];

export default function ManageCompliance({
  categories,
  onBackToOverview,
  onOpenCreateCategory,
  onDeleteCategory
}) {
  const [searchTerm, setSearchTerm] = useState('');

  // Build dynamic rows from genuinely new categories (ID contains a real Date.now() timestamp)
  // Date.now() values are always > 1,000,000,000,000 so cat-1, cat-2 etc. are excluded
  const dynamicRows = (categories || [])
    .filter((cat) => cat.id && cat.id.startsWith('cat-') && Number(cat.id.replace('cat-', '')) > 1_000_000_000_000)
    .map((cat) => ({
      id: cat.id,
      title: cat.title,
      type: cat.type,
      dateCreated: cat.dateCreated || 'Just Now',
      recipientsText:
        cat.recipients && cat.recipients.length > 0
          ? cat.recipients.slice(0, 2).join(', ') +
            (cat.recipients.length > 2 ? ` +${cat.recipients.length - 2}more` : '')
          : 'N/A'
    }));

  // Merge dynamic rows at the top, then static defaults below
  const allRows = [...dynamicRows, ...DEFAULT_MANAGE_ROWS];

  const displayRows = allRows.filter((row) =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="compliance-container" style={{ padding: '24px 32px' }}>
      {/* Outer White Card Container */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px 28px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
        }}
      >

        {/* Title & Toolbar Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
              Compliance Management
            </h2>

            {/* Search Box directly beside title as in Figma */}
            <div className="compliance-search-box" style={{ minWidth: '220px' }}>
              <input
                type="text"
                className="compliance-search-input"
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="compliance-search-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
            </div>
          </div>

          {/* + Add Category Primary Blue Button */}
          <button
            className="btn-primary-blue"
            onClick={onOpenCreateCategory}
            style={{ padding: '9px 20px', fontSize: '13.5px', fontWeight: '600' }}
          >
            + Add Category
          </button>
        </div>

        {/* Table Container with Light Blue Header Tint */}
        <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <table className="compliance-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#ebf3fe' }}>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#1e293b', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                  Compliance Title
                </th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#1e293b', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                  Type
                </th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#1e293b', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                  Date Created
                </th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#1e293b', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                  Recipients
                </th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#1e293b', textAlign: 'center', width: '90px', borderBottom: '1px solid #cbd5e1' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {displayRows.map((row, idx) => (
                <tr
                  key={row.id}
                  style={{
                    borderBottom: idx < displayRows.length - 1 ? '1px solid #f1f5f9' : 'none',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                    {row.title}
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '13px', color: '#475569' }}>
                    {row.type}
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '13px', color: '#475569' }}>
                    {row.dateCreated}
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '13px', color: '#475569' }}>
                    {row.recipientsText}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                        {/* Pen Edit Icon */}
                        <button
                          onClick={onOpenCreateCategory}
                          title="Edit Category"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px'
                          }}
                        >
                          <img src={pen01Icon} alt="Edit" style={{ width: '18px', height: '18px' }} />
                        </button>

                        {/* Delete Icon */}
                        <button
                          onClick={() => onDeleteCategory(row)}
                          title="Delete Category"
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px'
                          }}
                        >
                          <img src={delete02Icon} alt="Delete" style={{ width: '18px', height: '18px' }} />
                        </button>
                      </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
