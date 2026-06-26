import { useState } from 'react';
import fullStarIcon from '../../../assets/Fowgate Folder/Full start.svg';
import halfStarIcon from '../../../assets/Fowgate Folder/Hlaf star.svg';
import arrowDownIcon from '../../../assets/Fowgate Folder/arrow-down-01.svg';
import './AppraisalReport.css';

// Returns the correct star icon: full star for 5, half star for anything under 5
const getStarIcon = (score) => score >= 5 ? fullStarIcon : halfStarIcon;

const DATES = [
  '24 Dec, 2024 - Q3',
  '2 Jul, 2024 - Q2',
  '28 Mar, 2024 - Q1',
  '28 Dec, 2023 - Q3',
  '15 Sep, 2023 - Q2',
  '10 Jun, 2023 - Q1',
  '20 Dec, 2022 - Q3',
  '14 Jul, 2022 - Q2'
];

const UserModal = ({ isOpen, onClose, user, sections = [], scores = {} }) => {
  const [selectedDate, setSelectedDate] = useState('24 Dec, 2024 - Q3');
  const [showDropdown, setShowDropdown] = useState(false);

  if (!isOpen) return null;

  const sectionAverage = section => {
    const values = section.metrics
      .map(metric => scores[metric.id])
      .filter(value => value !== null && value !== undefined);

    return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0;
  };

  const fallbackRows = [
    { id: 'r1', label: 'Takes responsibility of his actions', score: 3 },
    { id: 'r2', label: "Listens to colleagues and accepts other's ideas", score: 4 },
    { id: 'r3', label: 'Takes ownership of tasks', score: 5 },
  ];

  const reportSections = sections.length
    ? sections.map(section => ({
      ...section,
      average: sectionAverage(section),
      rows: section.metrics.map(metric => ({
        id: metric.id,
        label: metric.label,
        score: scores[metric.id] ?? 0,
      })),
    }))
    : [{ id: 'team', title: 'Team Appraisal', average: 4, rows: fallbackRows }];

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose}></div>

      {/* Slide-in Modal */}
      <div className={`modal-container ${isOpen ? 'open' : ''}`}>

        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <img src={user.avatar} alt={user.name} className="modal-avatar" />
            <div>
              <h2 className="modal-title">My Appraisal Report</h2>
              <p className="modal-user-subtitle">{user.name} - {user.role}</p>
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="modal-content">

          <div className="date-filter-container" style={{ position: 'relative', display: 'inline-block' }}>
            <div className="date-filter" onClick={() => setShowDropdown(prev => !prev)}>
              <span className="date-text">
                {selectedDate.split(' - ')[0]} - <span className="highlight-q3">{selectedDate.split(' - ')[1]}</span>
              </span>
              <span className="dropdown-icon">
                <img src={arrowDownIcon} alt="dropdown" style={{ width: '16px', height: '16px' }} />
              </span>
            </div>
            {showDropdown && (
              <>
                <div className="dropdown-backdrop" onClick={() => setShowDropdown(false)} />
                <div className="report-dropdown">
                  {DATES.map((d, i) => (
                    <div
                      key={i}
                      className={`report-dropdown-item${selectedDate === d ? ' active' : ''}`}
                      onClick={() => {
                        setSelectedDate(d);
                        setShowDropdown(false);
                      }}
                    >
                      {d}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {reportSections.map(section => (
            <div className="appraisal-section" key={section.id}>
              <div className="section-header">
                <h3>{section.title}</h3>
                <div className="rating-badge blue-badge">
                  <span className="rating-label">Rating</span>
                  <span className="rating-value">{section.average.toFixed(1)}</span>
                </div>
              </div>
              <div className="section-body">
                {section.rows.map(row => (
                  <div className="rating-row" key={row.id}>
                    <span className="rating-desc">{row.label}</span>
                    <div className="rating-score">
                      <img src={getStarIcon(row.score)} alt="" className="report-star-icon" />
                      <span>{row.score ? row.score.toFixed(1) : '0.0'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button className="footer-close-btn" onClick={onClose}>Close</button>
        </div>

      </div>
    </>
  );
};

export default UserModal;
