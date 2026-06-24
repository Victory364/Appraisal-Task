/**
 * MyAppraisalsPage.jsx — My Appraisals Feature Page
 * Matches the Figma design (image 2):
 *  - Blue-bordered outer frame
 *  - Search icon on RIGHT of search bar
 *  - Profile: name+location top-left, Download top-right; rating badge+email row; Role/Dept/Manager row
 *  - Rating: empty circles on top, numbers (5 4 3 2 1) below each circle
 *  - Sections: Team Appraisal + Line Manager's Appraisal only
 *  - Appraisal Summary row + ghost Submit Appraisal button
 */

import { useState } from 'react';
import './MyAppraisalsPage.css';
import AppraisalReport from '../modals/AppraisalReport/AppraisalReport';

import searchIcon from '../../assets/Fowgate Folder/search-normal.svg';
import locationIcon from '../../assets/Fowgate Folder/location.svg';
import downloadIcon from '../../assets/Fowgate Folder/download-04.svg';
import fullStarIcon from '../../assets/Fowgate Folder/Full start.svg';
import halfStarIcon from '../../assets/Fowgate Folder/Hlaf star.svg';
import noStarIcon from '../../assets/Fowgate Folder/No star.svg';
import successIcon from '../../assets/Fowgate Folder/Check for success page.svg';
import helpIcon from '../../assets/Fowgate Folder/help-circle.svg';
import InfoIcon from '../../assets/Fowgate Folder/Info.svg';



// ── StarRating helper ────────────────────────────────────────────────────────
function StarRating({ score = 0, size = 14 }) {
  const scoreVal = typeof score === 'number' && !Number.isNaN(score) ? score : 0;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let src = noStarIcon, alt = 'No star';
    if (scoreVal >= i) { src = fullStarIcon; alt = 'Full star'; }
    else if (scoreVal >= i - 0.75) { src = halfStarIcon; alt = 'Half star'; }
    stars.push(<img key={i} src={src} alt={alt} style={{ width: size, height: size }} />);
  }
  return <>{stars}</>;
}


// ── Static data ──────────────────────────────────────────────────────────────

const SELF_MEMBER = {
  id: 'self',
  name: 'Jane Smith',
  role: 'Marketing Manager',
  department: 'Marketing',
  manager: 'Samuel Adeyemi',
  location: 'Lagos, Nigeria',
  email: 'jane.smith@fowgate.com',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80&h=80',
  score: 4.5,
  isSelf: true,
};

const TEAM_MEMBERS = [
  {
    id: 'tm1',
    name: 'Samuel Adeyemi',
    role: 'Chief Marketing Officer',
    department: 'Marketing',
    manager: 'Noah Jenkins',
    location: 'Lagos, Nigeria',
    email: 'Samuel.adeyemi@fowgate.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80&h=80',
    score: 4.1,
  },
  {
    id: 'tm2',
    name: 'Jane Smith',
    role: 'Marketing Manager',
    department: 'Marketing',
    manager: 'Samuel Adeyemi',
    location: 'Lagos, Nigeria',
    email: 'jane.smith2@fowgate.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=80&h=80',
    score: 4.5,
  },
  {
    id: 'tm3',
    name: 'Nathaniel Gloria',
    role: 'Marketing Analyst',
    department: 'Marketing',
    manager: 'Samuel Adeyemi',
    location: 'Lagos, Nigeria',
    email: 'nathaniel.gloria@fowgate.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80&h=80',
    score: 4.5,
  },
  {
    id: 'tm4',
    name: 'Okafor Judith',
    role: 'Field Marketing Manager',
    department: 'Marketing',
    manager: 'Samuel Adeyemi',
    location: 'Lagos, Nigeria',
    email: 'okafor.judith@fowgate.com',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=80&h=80',
    score: 4.5,
  },
  {
    id: 'tm5',
    name: 'Grace Nwosu',
    role: 'Marketing Manager',
    department: 'Marketing',
    manager: 'Samuel Adeyemi',
    location: 'Abuja, Nigeria',
    email: 'grace.nwosu@fowgate.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=80&h=80',
    score: 4.5,
  },
  {
    id: 'tm6',
    name: 'Scott Pippen',
    role: 'Marketing Director',
    department: 'Marketing',
    manager: 'Samuel Adeyemi',
    location: 'Lagos, Nigeria',
    email: 'scott.pippen@fowgate.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=80&h=80',
    score: 4.5,
  },
  {
    id: 'tm7',
    name: 'Mary Adkins',
    role: 'Brand Manager',
    department: 'Marketing',
    manager: 'Samuel Adeyemi',
    location: 'Port Harcourt, Nigeria',
    email: 'mary.adkins@fowgate.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=80&h=80',
    score: 4.5,
  },
  {
    id: 'tm8',
    name: 'Olawale Michael',
    role: 'Sales Marketer',
    department: 'Marketing',
    manager: 'Samuel Adeyemi',
    location: 'Lagos, Nigeria',
    email: 'olawale.michael@fowgate.com',
    avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=80&h=80',
    score: 3.5,
  },
];

// Appraisal sections — Team + Line Manager + Self + HR Appraisals
const DEFAULT_SECTIONS = [
  {
    id: 'team',
    title: 'Team Appraisal',
    metrics: [
      { id: 't1', label: 'Takes responsibility of his actions' },
      { id: 't2', label: 'Listens to colleagues and accepts other\'s ideas' },
      { id: 't3', label: 'Takes ownership of tasks' },
    ],
  },
  {
    id: 'line',
    title: "Line Manager's Appraisal",
    metrics: [
      { id: 'l1', label: 'Follows company rules, regulation and procedures' },
      { id: 'l2', label: 'Communicates precisely and gets what is needed' },
      { id: 'l3', label: 'Has good work ethics' },
      { id: 'l4', label: 'Helps colleagues whenever needed' },
    ],
  },
  {
    id: 'self-appraisal',
    title: 'Self Appraisal',
    metrics: [
      { id: 's1', label: 'Improvement in certain areas' },
      { id: 's2', label: 'Understanding of the role' },
      { id: 's3', label: 'Understanding of the role' },
      { id: 's4', label: 'Understanding of the role' },
    ],
  },
  {
    id: 'hr',
    title: "HR's Appraisal",
    metrics: [
      { id: 'h1', label: 'Accountability' },
      { id: 'h2', label: 'Dependability' },
      { id: 'h3', label: 'Professionalism' },
    ],
  },
];

function buildInitialScores() {
  const s = {};
  DEFAULT_SECTIONS.forEach(sec => sec.metrics.forEach(m => { s[m.id] = null; }));
  return s;
}

function ratingRemark(score) {
  if (score >= 4.5) return 'Excellent';
  if (score >= 3.5) return 'Very Good';
  if (score >= 2.5) return 'Good';
  if (score >= 1.5) return 'Fair';
  return 'Needs Improvement';
}

// ── Main component ───────────────────────────────────────────────────────────
export default function MyAppraisalsPage() {
  const [activeMemberId, setActiveMemberId] = useState('tm1'); // Samuel Adeyemi selected by default
  const [searchQuery, setSearchQuery] = useState('');
  const [allScores, setAllScores] = useState({ tm1: buildInitialScores() });
  const [submittedMap, setSubmittedMap] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showInfoDropdown, setShowInfoDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState('24 Dec, 2024 - Q3');

  const dates = [
    '24 Dec, 2024 - Q3',
    '2 Jul, 2024 - Q2',
    '28 Mar, 2024 - Q1',
    '28 Dec, 2023 - Q3',
    '15 Sep, 2023 - Q2',
    '10 Jun, 2023 - Q1',
    '20 Dec, 2022 - Q3',
    '14 Jul, 2022 - Q2'
  ];

  const allMembers = [SELF_MEMBER, ...TEAM_MEMBERS];
  const activeMember = allMembers.find(m => m.id === activeMemberId) || TEAM_MEMBERS[0];
  const activeScores = allScores[activeMemberId] || buildInitialScores();
  const isSubmitted = !!submittedMap[activeMemberId];

  const visibleSections = activeMember.isSelf
    ? DEFAULT_SECTIONS.filter(s => s.id === 'self-appraisal')
    : DEFAULT_SECTIONS;

  const visibleMetricIds = visibleSections.flatMap(s => s.metrics.map(m => m.id));

  const filterMembers = list =>
    list.filter(m => {
      const q = searchQuery.toLowerCase();
      return m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        (m.department || '').toLowerCase().includes(q);
    });

  const filteredSelf = filterMembers([SELF_MEMBER]);
  const filteredTeam = filterMembers(TEAM_MEMBERS);

  const sectionAvg = id => {
    const sec = DEFAULT_SECTIONS.find(s => s.id === id);
    if (!sec) return 0;
    const scored = sec.metrics
      .map(m => activeScores[m.id])
      .filter(v => typeof v === 'number' && !Number.isNaN(v));
    return scored.length ? scored.reduce((a, b) => a + b, 0) / scored.length : 0;
  };

  const overallAvg = () => {
    const scored = visibleMetricIds
      .map(id => activeScores[id])
      .filter(v => typeof v === 'number' && !Number.isNaN(v));
    return scored.length ? scored.reduce((a, b) => a + b, 0) / scored.length : 0;
  };

  const scoreForMember = member => {
    const scores = allScores[member.id];
    if (!scores) {
      const s = Number(member.score);
      return Number.isNaN(s) ? 0.0 : s;
    }

    const memberSections = member.isSelf
      ? DEFAULT_SECTIONS.filter(s => s.id === 'self-appraisal')
      : DEFAULT_SECTIONS;
    const memberMetricIds = memberSections.flatMap(s => s.metrics.map(m => m.id));

    const scored = memberMetricIds
      .map(id => scores[id])
      .filter(v => typeof v === 'number' && !Number.isNaN(v));

    if (scored.length > 0) {
      return scored.reduce((a, b) => a + b, 0) / scored.length;
    }

    const s = Number(member.score);
    return Number.isNaN(s) ? 0.0 : s;
  };

  const hasAllScores = visibleMetricIds.every(id => activeScores[id] !== null);

  const handleSelectMember = id => {
    setActiveMemberId(id);
    if (!allScores[id]) setAllScores(p => ({ ...p, [id]: buildInitialScores() }));
  };

  const handleRate = (metricId, val) => {
    if (isSubmitted) return;
    setAllScores(p => ({
      ...p,
      [activeMemberId]: { ...(p[activeMemberId] || buildInitialScores()), [metricId]: val },
    }));
  };

  const avgValue = overallAvg();
  const avgDisplay = avgValue > 0 ? avgValue.toFixed(1) : '0.0';
  const avgRemark = ratingRemark(avgValue);
  const activeDisplayScore = scoreForMember(activeMember);

  // ── Sub-components ─────────────────────────────────────────────────────────

  const MemberRow = ({ member }) => {
    const isActive = member.id === activeMemberId;
    const memberScore = scoreForMember(member);
    return (
      <div
        className={`appraisals-member-row${isActive ? ' active' : ''}`}
        onClick={() => handleSelectMember(member.id)}
      >
        <img
          src={member.avatar}
          alt={member.name}
          className="appraisals-member-avatar"
          onError={e => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0f52ba&color=fff&size=80`;
          }}
        />
        <div className="appraisals-member-info">
          <div className="appraisals-member-name">{member.name}</div>
          <div className="appraisals-member-role">{member.role}</div>
          <div className="appraisals-star-row">
            <StarRating score={memberScore} size={13} />
            <span className="appraisals-member-score">{memberScore.toFixed(1)}</span>
          </div>
        </div>
      </div>
    );
  };

  /** Circle on top, number below — matches Figma target */
  const RatingButtons = ({ metricId }) => {
    const current = activeScores[metricId];
    return (
      <div className="appraisals-rating-buttons">
        {[5, 4, 3, 2, 1].map(val => (
          <button
            key={val}
            className={`appraisals-rating-btn-wrap${current === val ? ' selected' : ''}${isSubmitted ? ' locked' : ''}`}
            onClick={() => !isSubmitted && handleRate(metricId, val)}
            type="button"
            aria-label={`Rate ${val} out of 5`}
            aria-pressed={current === val}
            disabled={isSubmitted}
          >
            <div className="appraisals-rating-circle" />
            <span className="appraisals-rating-num">{val}</span>
          </button>
        ))}
      </div>
    );
  };

  // ── JSX ────────────────────────────────────────────────────────────────────
  return (
    <div className="appraisals-page">
      <div className="appraisals-card-frame">

        {/* ── Top row ── */}
        <div className="appraisals-top-row">
          <h2 className="appraisals-page-title">My Appraisals</h2>
          <button
            className="appraisals-report-btn"
            id="appraisals-report-btn"
            onClick={() => setShowReportModal(true)}
          >
            My Appraisal Report
          </button>
        </div>

        {/* ── Body ── */}
        <div className="appraisals-body">

          {/* ── LEFT: Assigned Appraisal ── */}
          <aside className="appraisals-left">
            <div className="appraisals-left-header">Assigned Appraisal</div>

            {/* Search — icon on RIGHT */}
            <div className="appraisals-search-wrap">
              <input
                type="text"
                className="appraisals-search-input"
                placeholder="Search name, department..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                id="appraisals-search-input"
              />
              <img src={searchIcon} alt="Search" className="appraisals-search-icon-right" />
            </div>

            <div className="appraisals-left-list">
              {filteredSelf.length > 0 && (
                <>
                  <div className="appraisals-left-section-label">Self Appraisal</div>
                  {filteredSelf.map(m => <MemberRow key={m.id} member={m} />)}
                </>
              )}
              {filteredTeam.length > 0 && (
                <>
                  <div className="appraisals-left-section-label">Team Members</div>
                  {filteredTeam.map(m => <MemberRow key={m.id} member={m} />)}
                </>
              )}
              {filteredSelf.length === 0 && filteredTeam.length === 0 && (
                <div style={{ padding: '24px 16px', color: '#94a3b8', fontSize: '13px', textAlign: 'center' }}>
                  No members match your search.
                </div>
              )}
            </div>
          </aside>

          {/* ── RIGHT: Appraisal Sheet ── */}
          <div className="appraisals-right">

            {/* ── Profile strip ── */}
            <div className="appraisals-profile-strip">

              {/* Row 1: avatar + name/location  |  Download Report */}
              <div className="appraisals-profile-row1">
                <div className="appraisals-profile-name-block">
                  <img
                    src={activeMember.avatar}
                    alt={activeMember.name}
                    className="appraisals-profile-avatar"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(activeMember.name)}&background=0f52ba&color=fff&size=80`;
                    }}
                  />
                  <div className="appraisals-profile-name-meta">
                    <p className="appraisals-profile-name">{activeMember.name}</p>
                    <div className="appraisals-profile-location">
                      <img src={locationIcon} alt="Location" />
                      {activeMember.location}
                    </div>
                  </div>
                </div>

                <button className="appraisals-download-btn" id="appraisals-download-report-btn">
                  <img src={downloadIcon} alt="Download" />
                  Download Report
                </button>
              </div>

              {/* Row 2: rating badge + growth  |  email */}
              <div className="appraisals-profile-row2">
                <span className="appraisals-cycle-badge">
                  <img src={fullStarIcon} alt="star" />
                  {activeDisplayScore.toFixed(1)}
                  <span className="badge-growth">&nbsp;+0.0%&nbsp;↗</span>
                  <span className="badge-suffix">From last cycle</span>
                </span>
                <span className="appraisals-email-tag">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {activeMember.email}
                </span>
              </div>

              {/* Row 3: Role / Department / Reporting Manager */}
              <div className="appraisals-profile-detail-grid">
                <div className="appraisals-detail-cell">
                  <span className="appraisals-detail-label">Role</span>
                  <span className="appraisals-detail-value">{activeMember.role}</span>
                </div>
                <div className="appraisals-detail-cell">
                  <span className="appraisals-detail-label">Department</span>
                  <span className="appraisals-detail-value">{activeMember.department}</span>
                </div>
                <div className="appraisals-detail-cell">
                  <span className="appraisals-detail-label">Reporting Manager</span>
                  <span className="appraisals-detail-value">{activeMember.manager}</span>
                </div>
              </div>
            </div>

            {!isSubmitted && (
              <div className={`appraisals-appraise-banner${activeMember.isSelf ? ' self-appraisal' : ''}`}>
                {activeMember.isSelf ? (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <img src={InfoIcon} alt="info" />
                      Self Appraisal
                    </div>
                    <div className="appraisals-date-filter-container" style={{ position: 'relative', display: 'inline-block' }}>
                      <div className="appraisals-date-filter" onClick={() => setShowInfoDropdown(prev => !prev)}>
                        <span className="appraisals-date-filter-text">
                          {selectedDate.split(' - ')[0]} - <span className="appraisals-highlight-q">{selectedDate.split(' - ')[1]}</span>
                        </span>
                      </div>
                      {showInfoDropdown && (
                        <>
                          <div className="appraisals-info-dropdown-backdrop" onClick={() => setShowInfoDropdown(false)} />
                          <div className="appraisals-info-dropdown" style={{ right: 0, left: 'auto' }}>
                            {dates.map((d, i) => (
                              <div
                                key={i}
                                className={`appraisals-info-dropdown-item${selectedDate === d ? ' active' : ''}`}
                                onClick={() => {
                                  setSelectedDate(d);
                                  setShowInfoDropdown(false);
                                }}
                              >
                                {d}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="appraisals-info-container" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', height: '18px' }}>
                      <img
                        src={InfoIcon}
                        alt="info"
                        style={{ cursor: 'pointer', display: 'block' }}
                        onClick={() => setShowInfoDropdown(prev => !prev)}
                      />
                      {showInfoDropdown && (
                        <>
                          <div className="appraisals-info-dropdown-backdrop" onClick={() => setShowInfoDropdown(false)} />
                          <div className="appraisals-info-dropdown legend-dropdown">
                            <div className="appraisals-info-dropdown-item">1 - Strongly Agree</div>
                            <div className="appraisals-info-dropdown-item">2 - Agree</div>
                            <div className="appraisals-info-dropdown-item">3 - Sometimes Agree</div>
                            <div className="appraisals-info-dropdown-item">4 - Disagree</div>
                            <div className="appraisals-info-dropdown-item">5 - Strongly Disagree</div>
                          </div>
                        </>
                      )}
                    </div>
                    Appraise
                  </>
                )}
              </div>
            )}

            {/* Rating sections */}
            <div className="appraisals-sections-wrap">
              {visibleSections.map(section => {
                const avg = sectionAvg(section.id);
                const secMetrics = section.metrics.map(m => m.id);
                const ratedMetrics = secMetrics.filter(id => activeScores[id] !== null && activeScores[id] !== undefined);

                let pillText;
                let isCalculating = false;

                if (ratedMetrics.length === 0) {
                  pillText = '0.0';
                } else if (ratedMetrics.length < secMetrics.length) {
                  pillText = 'Calculating.';
                  isCalculating = true;
                } else {
                  pillText = avg > 0 ? avg.toFixed(1) : '0.0';
                }

                return (
                  <div className="appraisals-section" key={section.id}>
                    <div className="appraisals-section-header">
                      <h3 className="appraisals-section-title">{section.title}</h3>
                      <div className="appraisals-section-avg">
                        <span className="appraisals-section-avg-label">Rating</span>
                        <span className={`appraisals-section-avg-pill${isCalculating ? ' calculating' : ''}`}>
                          {pillText}
                        </span>
                      </div>
                    </div>
                    {section.metrics.map(metric => (
                      <div className="appraisals-metric-row" key={metric.id}>
                        <span className="appraisals-metric-label">{metric.label}</span>
                        <RatingButtons metricId={metric.id} />
                      </div>
                    ))}
                  </div>
                );
              })}

            </div>

            {/* Appraisal Summary */}
            {isSubmitted ? (
              <div className="appraisals-submitted-summary-row">
                <span className="appraisals-summary-label">Appraisal Summary</span>
                <div className="appraisals-summary-stars-wrap">
                  <div className="appraisals-summary-stars">
                    <StarRating score={avgValue} size={20} />
                  </div>
                  <span className="appraisals-summary-score">{avgDisplay}</span>
                  <span className="appraisals-summary-remark">({avgRemark})</span>
                </div>
              </div>
            ) : (
              <div className="appraisals-summary-row">
                <span className="appraisals-summary-label">Appraisal Summary</span>
                <div className="appraisals-summary-stars-wrap">
                  <div className="appraisals-summary-stars">
                    <StarRating score={avgValue} size={16} />
                  </div>
                  <span className="appraisals-summary-score">{avgDisplay}</span>
                </div>
              </div>
            )}

            {/* Submit button — hidden once submitted */}
            {!isSubmitted && (
              <div className="appraisals-submit-row">
                <button
                  id="appraisals-submit-btn"
                  className="appraisals-submit-btn"
                  onClick={() => hasAllScores && setShowConfirmModal(true)}
                  disabled={!hasAllScores}
                >
                  Submit Appraisal
                </button>
              </div>
            )}

          </div>{/* end appraisals-right */}
        </div>{/* end appraisals-body */}
      </div>{/* end appraisals-card-frame */}

      {/* ── Confirm modal ── */}
      {showConfirmModal && (
        <div className="appraisal-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
          <div className="appraisal-confirm-modal">
            <div className="appraisal-modal-header">
              <h3 id="confirm-modal-title">
                <img src={helpIcon} alt="" className="appraisal-confirm-icon" />
                Confirm Action
              </h3>
              <button className="appraisal-modal-close" onClick={() => setShowConfirmModal(false)} aria-label="Close">✕</button>
            </div>
            <div className="appraisal-modal-body">
              <p>Are you sure you want to submit this appraisal for <strong>{activeMember.name}?</strong> Once submitted, changes may not be allowed.</p>
            </div>
            <div className="appraisal-modal-actions">
              <button className="appraisal-btn-cancel" onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button
                className="appraisal-btn-confirm"
                id="appraisals-confirm-submit-btn"
                onClick={() => { setShowConfirmModal(false); setShowSuccessModal(true); }}
              >Yes, I'm sure</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Success modal ── */}
      {showSuccessModal && (
        <div className="appraisal-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="success-modal-title">
          <div className="appraisal-success-modal">
            <img src={successIcon} alt="Success" className="appraisal-success-icon" />
            <h3 className="appraisal-success-title" id="success-modal-title">Appraisal Submitted!</h3>
            <p className="appraisal-success-copy">
              Appraisal submitted successfully! Reach out if you have questions.
            </p>
            <button
              className="appraisal-success-btn"
              id="appraisals-success-close-btn"
              onClick={() => {
                setShowSuccessModal(false);
                setSubmittedMap(p => ({ ...p, [activeMemberId]: true }));
              }}
            >Okay</button>
          </div>
        </div>
      )}

      <AppraisalReport
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        user={activeMember}
        sections={DEFAULT_SECTIONS}
        scores={activeScores}
      />
    </div>
  );
}
