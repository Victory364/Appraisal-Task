import { useState } from 'react';
import fullStarIcon from '../../../assets/Fowgate Folder/Full start.svg';
import halfStarIcon from '../../../assets/Fowgate Folder/Hlaf star.svg';
import arrowDownIcon from '../../../assets/Fowgate Folder/arrow-down-01.svg';
import './AppraisalReport.css';

// Returns the correct star icon: full star for 5, half star for anything under 5
const getStarIcon = (score) => score >= 5 ? fullStarIcon : halfStarIcon;

const getQuarter = (d) => {
  const m = d.getMonth();
  if (m < 3) return 'Q1';
  if (m < 6) return 'Q2';
  if (m < 9) return 'Q3';
  return 'Q4';
};

const getAppraisalDates = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const startYear = 2022;
  const endYear = currentYear + 1; // Allows showing future dates
  
  const list = [];
  for (let y = endYear; y >= startYear; y--) {
    list.push({ date: new Date(y, 11, 24), label: `24 Dec, ${y} - Q3` });
    list.push({ date: new Date(y, 6, 2), label: `2 Jul, ${y} - Q2` });
    list.push({ date: new Date(y, 2, 28), label: `28 Mar, ${y} - Q1` });
  }

  const dayName = now.getDate();
  const monthName = now.toLocaleString('en-US', { month: 'short' });
  const yearName = now.getFullYear();
  const qName = getQuarter(now);
  const currentLabel = `${dayName} ${monthName}, ${yearName} - ${qName}`;

  if (!list.some(item => item.label === currentLabel)) {
    list.push({ date: now, label: currentLabel });
  }

  list.sort((a, b) => b.date - a.date);

  const uniqueLabels = [];
  const seen = new Set();
  for (const item of list) {
    if (!seen.has(item.label)) {
      seen.add(item.label);
      uniqueLabels.push(item.label);
    }
  }
  return uniqueLabels;
};

const UserModal = ({ isOpen, onClose, user, sections = [], scores = {} }) => {
  const dynamicDates = getAppraisalDates();
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    const dayName = now.getDate();
    const monthName = now.toLocaleString('en-US', { month: 'short' });
    const yearName = now.getFullYear();
    const qName = getQuarter(now);
    return `${dayName} ${monthName}, ${yearName} - ${qName}`;
  });
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
                  {dynamicDates.map((d, i) => (
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
