import { useState } from 'react';
import './App.css';
import {
  Mail,
  Search,
  Download,
  Info,
  MapPin,
  Star,
} from 'lucide-react';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RatingStars from './components/RatingStars';
import AppraisalReportModal from './components/AppraisalReportModal';
import NewLoanModal from './components/NewLoanModal';
import LoanManagement from './components/LoanManagement';
import { selfAppraisal, teamMembers, criteria, tabs } from './utils/constants';

function App() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isNewLoanOpen, setIsNewLoanOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Appraisals');
  const [loans, setLoans] = useState([]);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState(selfAppraisal.name);
  const selectedEmployee = [selfAppraisal, ...teamMembers].find((employee) => employee.name === selectedEmployeeName) || selfAppraisal;

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header />

        <section className="tab-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-item ${tab === activeTab ? 'active-tab' : ''}`}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </section>

        {activeTab === 'Loans & Advances' ? (
          <LoanManagement
            loans={loans}
            onNewLoan={() => setIsNewLoanOpen(true)}
            onEditLoan={(updatedLoan) => {
              setLoans((currentLoans) => currentLoans.map((loan) => (
                loan.id === updatedLoan.id ? updatedLoan : loan
              )));
            }}
            onCancelLoan={(loanId) => {
              setLoans((currentLoans) => currentLoans.map((loan) => (
                loan.id === loanId ? { ...loan, status: 'Cancelled' } : loan
              )));
            }}
          />
        ) : (
        <section className="appraisal-workspace">
          <div className="appraisal-titlebar">
            <h2>Appraisal Task</h2>
            <button className="report-button secondary" type="button" onClick={() => setIsReportOpen(true)}>
              My Appraisal Report
            </button>
          </div>

          <div className="dashboard-grid">
            <div className="panel left-panel">
              <div className="card employee-panel">
                <div className="search-field compact">
                  <Search className="search-icon" />
                  <input placeholder="Search name, department..." />
                </div>

                <div className="task-section">
                  <p className="section-label">Self Appraisal</p>
                  <button
                    className={`employee-row person-row self-appraisal-row ${selectedEmployee.name === selfAppraisal.name ? 'selected-person' : ''}`}
                    type="button"
                    onClick={() => setSelectedEmployeeName(selfAppraisal.name)}
                  >
                    <div className={`employee-avatar team-avatar ${selfAppraisal.tone}`}>{selfAppraisal.avatar}</div>
                    <div className="employee-meta">
                      <p className="employee-name">{selfAppraisal.name}</p>
                      <p className="employee-role">{selfAppraisal.role}</p>
                      <div className="team-rating">
                        <RatingStars value={selfAppraisal.rating} />
                      </div>
                    </div>
                  </button>
                </div>

                <div className="task-section team-section">
                  <p className="section-label">Team Members</p>
                  <div className="employee-list">
                    {teamMembers.map((employee) => (
                      <button
                        key={employee.name}
                        className={`employee-row person-row compact-row ${selectedEmployee.name === employee.name ? 'selected-person' : ''}`}
                        type="button"
                        onClick={() => setSelectedEmployeeName(employee.name)}
                      >
                        <div className={`employee-avatar team-avatar ${employee.tone}`}>{employee.avatar}</div>
                        <div className="employee-meta">
                          <p className="employee-name">{employee.name}</p>
                          <p className="employee-role">{employee.role}</p>
                          <div className="team-rating">
                            <RatingStars value={employee.rating} />
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="panel right-panel">
              <div className="profile-card card">
                <div className="profile-card-top">
                  <div className="profile-identity">
                    <div className={`profile-avatar-large team-avatar ${selectedEmployee.tone}`}>{selectedEmployee.avatar}</div>
                    <div>
                      <h2>{selectedEmployee.name}</h2>
                      <p className="profile-meta">
                        <MapPin className="meta-icon" /> {selectedEmployee.location}
                      </p>
                    </div>
                  </div>
                  <button className="report-button" type="button">
                    <Download size={16} /> Download Report
                  </button>
                </div>

                <div className="profile-main">
                  <div className="profile-info">
                    <div className="profile-badge-row">
                      <div className="profile-badge">
                        <Star className="profile-badge-star" />
                        {selectedEmployee.rating.toFixed(1)}
                      </div>
                      <span className="badge-info">+0.3% From last cycle</span>
                    </div>
                    <div className="profile-contact">
                      <Mail className="meta-icon" /> {selectedEmployee.email}
                    </div>
                  </div>
                </div>

                <div className="profile-details">
                  <div>
                    <span className="detail-label">Role</span>
                    <span>{selectedEmployee.role}</span>
                  </div>
                  <div>
                    <span className="detail-label">Department</span>
                    <span>{selectedEmployee.department}</span>
                  </div>
                  <div>
                    <span className="detail-label">Reporting Manager</span>
                    <span>{selectedEmployee.manager}</span>
                  </div>
                </div>
              </div>

              <div className="card appraisal-card">
                <div className="appraisal-form-header">
                  <div className="appraisal-form-title">
                    <Info className="info-icon" />
                    <h3>Self Appraisal</h3>
                  </div>
                  <div className="date-pill">24 Dec, 2024 - <span>Q3</span></div>
                </div>

                <div className="appraisal-summary-bar">
                  <span className="summary-label">Self Appraisal</span>
                  <div className="rating-summary">
                    <span>Rating</span>
                    <div className="rating-box">4.0</div>
                  </div>
                </div>

                <div className="criteria-list">
                  {criteria.map((label, index) => (
                    <div key={index} className="criteria-row">
                      <div className="criteria-label">{label}</div>
                      <div className="rating-cell">
                        <div className="rating-pills">
                          {[5, 4, 3, 2, 1].map((value) => (
                            <label key={value} className={`pill ${value === 4 ? 'selected' : ''}`}>
                              <input type="radio" name={`rating-${index}`} value={value} defaultChecked={value === 4} />
                              <span>{value}</span>
                            </label>
                          ))}
                        </div>
                        <div className="rating-values">
                          {[5, 4, 3, 2, 1].map((value) => (
                            <span key={value}>{value}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-row">
                  <span>APPRAISAL SUMMARY</span>
                  <div className="summary-score">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="summary-star" />
                    ))}
                    <strong>0.0</strong>
                  </div>
                </div>
                <button className="submit-button" type="button">Submit Appraisal</button>
              </div>
             </div>
          </div>
        </section>
        )}
        {isReportOpen && <AppraisalReportModal onClose={() => setIsReportOpen(false)} />}
        {isNewLoanOpen && (
          <NewLoanModal
            onClose={() => setIsNewLoanOpen(false)}
            onSubmitLoan={(loan) => setLoans((currentLoans) => [loan, ...currentLoans])}
          />
        )}
      </main>
    </div>
  );
}

export default App;
