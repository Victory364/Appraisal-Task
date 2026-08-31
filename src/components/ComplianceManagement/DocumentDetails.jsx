import React, { useState } from 'react';
import viewPolicyIcon from '../../assets/Fowgate Folder/View Policy.svg';
import pen01Icon from '../../assets/Fowgate Folder/pen-01.svg';
import delete02Icon from '../../assets/Fowgate Folder/delete-02.svg';

export default function DocumentDetails({
  selectedPolicy,
  onBackToOverview,
  onOpenUpdatesHistory,
  onOpenViewPolicy,
  onOpenUpdatePolicy,
  onOpenDeleteConfirm
}) {
  const [activeMenuId, setActiveMenuId] = useState(null);

  const documents = [
    {
      id: 'doc-1',
      fileName: selectedPolicy?.title || 'Labor & Recruitment',
      owner: 'Labor Union',
      dateCreated: '20 Mar, 2024; 05:16PM',
      lastModified: '12 Nov, 2024; 10:23AM',
      lastModifiedBy: 'Labor Union'
    },
    {
      id: 'doc-2',
      fileName: 'Termination Management',
      owner: 'Labor Union',
      dateCreated: '20 Mar, 2024; 05:16PM',
      lastModified: '12 Nov, 2024; 10:23AM',
      lastModifiedBy: 'Labor Union'
    }
  ];

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  return (
    <div className="compliance-container" style={{ padding: '24px 32px' }} onClick={() => setActiveMenuId(null)}>
      {/* Outer White Card Container */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px 28px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
          minHeight: '520px'
        }}
      >
        {/* Breadcrumb Header */}
        <div
          style={{
            fontSize: '13.5px',
            fontWeight: '500',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '18px'
          }}
        >
          <span
            onClick={onBackToOverview}
            style={{ cursor: 'pointer', color: '#64748b', transition: 'color 0.15s ease' }}
            onMouseEnter={(e) => (e.target.style.color = '#1d4ed8')}
            onMouseLeave={(e) => (e.target.style.color = '#64748b')}
          >
            Compliance Management
          </span>
          <span style={{ color: '#94a3b8' }}>/</span>
          <span style={{ color: '#0f172a', fontWeight: '600' }}>
            {selectedPolicy?.title || 'Labor & Recruitment'}
          </span>
        </div>

        {/* Page Header Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            Document Details
          </h2>

          <button
            className="btn-primary-blue"
            onClick={onOpenUpdatesHistory}
            style={{ padding: '9px 20px', fontSize: '13.5px', fontWeight: '600' }}
          >
            Updates History
          </button>
        </div>

        {/* Document Details Table with Light Blue Header Tint */}
        <div style={{ borderRadius: '8px', overflow: 'visible', border: '1px solid #e2e8f0', marginBottom: '160px' }}>
          <table className="compliance-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#ebf3fe' }}>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#1e293b', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                  File Name
                </th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#1e293b', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                  Owner
                </th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#1e293b', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                  Date Created
                </th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#1e293b', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                  Last modified
                </th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#1e293b', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                  Last Modified by
                </th>
                <th style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '700', color: '#1e293b', textAlign: 'center', width: '80px', borderBottom: '1px solid #cbd5e1' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, idx) => (
                <tr
                  key={doc.id}
                  style={{
                    borderBottom: idx < documents.length - 1 ? '1px solid #f1f5f9' : 'none',
                    transition: 'background-color 0.15s ease',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '14px 18px', fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                    {doc.fileName}
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '13px', color: '#475569' }}>
                    {doc.owner}
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '13px', color: '#475569' }}>
                    {doc.dateCreated}
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '13px', color: '#475569' }}>
                    {doc.lastModified}
                  </td>
                  <td style={{ padding: '14px 18px', fontSize: '13px', color: '#475569' }}>
                    {doc.lastModifiedBy}
                  </td>
                  <td style={{ padding: '14px 18px', textAlign: 'center', position: 'relative' }}>
                    <button
                      onClick={(e) => toggleMenu(e, doc.id)}
                      aria-label="Actions"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#64748b',
                        padding: '4px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                        <circle cx="12" cy="19" r="1.5" fill="currentColor" />
                      </svg>
                    </button>

                    {/* 3-Dots Action Popover Menu matching Figma Image 1 */}
                    {activeMenuId === doc.id && (
                      <div
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '36px',
                          backgroundColor: '#ffffff',
                          borderRadius: '12px',
                          boxShadow: '0 12px 30px -4px rgba(0, 0, 0, 0.12), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
                          border: '1px solid #f1f5f9',
                          padding: '8px 0',
                          zIndex: 1000,
                          width: '195px',
                          textAlign: 'left'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* View Policy */}
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onOpenViewPolicy(doc);
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 18px',
                            border: 'none',
                            background: 'none',
                            fontSize: '14px',
                            color: '#1e293b',
                            fontWeight: '500',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <img src={viewPolicyIcon} alt="" style={{ width: '18px', height: '18px' }} />
                          <span>View Policy</span>
                        </button>

                        {/* Update Policy */}
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onOpenUpdatePolicy(doc);
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 18px',
                            border: 'none',
                            background: 'none',
                            fontSize: '14px',
                            color: '#1e293b',
                            fontWeight: '500',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <img src={pen01Icon} alt="" style={{ width: '18px', height: '18px' }} />
                          <span>Update Policy</span>
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              backgroundColor: '#ef4444',
                              marginLeft: 'auto',
                              flexShrink: 0
                            }}
                          />
                        </button>

                        {/* Delete Policy */}
                        <button
                          onClick={() => {
                            setActiveMenuId(null);
                            onOpenDeleteConfirm(doc);
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '10px 18px',
                            border: 'none',
                            background: 'none',
                            fontSize: '14px',
                            color: '#ef4444',
                            fontWeight: '500',
                            cursor: 'pointer',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fef2f2')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <img src={delete02Icon} alt="" style={{ width: '18px', height: '18px' }} />
                          <span>Delete Policy</span>
                        </button>
                      </div>
                    )}
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
