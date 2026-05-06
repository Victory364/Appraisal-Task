import { useState } from 'react';
import {
  Bell,
  Mail,
  Search,
  Download,
  Info,
  MapPin,
  Star,
  ChevronDown,
  Home,
  MessageCircle,
  Layers,
  CalendarDays,
  Briefcase,
  Settings,
  ShieldCheck,
  BarChart3,
  Users,
  Folder,
  PackagePlus,
  Building2,
  Calculator,
  PieChart,
  Headphones,
  Contact,
  Globe2,
  X,
} from 'lucide-react';

const navSections = [
  {
    title: '',
    items: [
      { label: 'Messages', icon: MessageCircle },
      { label: 'Projects', icon: Briefcase },
      { label: 'Approvals', icon: ShieldCheck },
      { label: 'Calendar', icon: CalendarDays },
    ],
  },
  {
    title: 'HCM',
    items: [
      { label: 'ATS', icon: Contact },
      { label: 'Teams', icon: Users },
      { label: 'Payroll', icon: Calculator },
      { label: 'Company Calendar', icon: CalendarDays },
      { label: 'Compliance Management', icon: ShieldCheck },
      { label: 'Analysis & Reporting', icon: BarChart3 },
    ],
  },
  {
    title: '',
    items: [
      { label: 'Settings', icon: Settings },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Business Entities', icon: Briefcase },
      { label: 'Reports', icon: PieChart },
    ],
  },
  {
    title: 'FINANCIALS',
    items: [
      { label: 'Banking', icon: Building2 },
      { label: 'Accounts', icon: Calculator },
      { label: 'Customers', icon: Users },
      { label: 'Suppliers', icon: PackagePlus },
      { label: 'Expense Management', icon: Briefcase },
    ],
  },
  {
    title: '',
    items: [
      { label: 'Budget & Forecasting', icon: PieChart },
      { label: 'Inventory', icon: PackagePlus },
      { label: 'Fixed Asset', icon: Building2 },
      { label: 'Tax, VAT, GST', icon: Calculator },
      { label: 'Reports', icon: PieChart },
    ],
  },
  {
    title: 'CRM',
    items: [
      { label: 'Sales Management', icon: BarChart3 },
      { label: 'Marketing Automation', icon: Layers },
      { label: 'Customer Service', icon: Headphones },
      { label: 'Contact Management', icon: Contact },
      { label: 'Social CRM', icon: Globe2 },
    ],
  },
];

const tabs = [
  'My Profile',
  'Memo',
  'Calendar',
  'Leave Applications',
  'Paystub',
  'Timesheet',
  'Earnings',
  'Appraisals',
  'Expense Claims',
  'Loans & Advances',
  'Files',
  'Cases',
];

const selfAppraisal = {
  name: 'Jane Smith',
  role: 'Marketing Manager',
  rating: 4.5,
  avatar: 'JS',
  tone: 'blue',
  email: 'jane.smith@fowgate.com',
  department: 'Marketing',
  manager: 'Noah Jenkins',
  location: 'Lagos, Nigeria',
};

const teamMembers = [
  { name: 'Samuel Adeyemi', role: 'Chief Marketing Officer', rating: 4.1, avatar: 'SA', tone: 'gold', email: 'samuel.adeyemi@fowgate.com', department: 'Marketing', manager: 'Jane Smith', location: 'Lagos, Nigeria' },
  { name: 'Grace Nwosu', role: 'Marketing Manager', rating: 4.5, avatar: 'GN', tone: 'rose', email: 'grace.nwosu@fowgate.com', department: 'Marketing', manager: 'Noah Jenkins', location: 'Lagos, Nigeria' },
  { name: 'Scott Pippen', role: 'Marketing Director', rating: 4.5, avatar: 'SP', tone: 'stone', email: 'scott.pippen@fowgate.com', department: 'Marketing', manager: 'Noah Jenkins', location: 'Lagos, Nigeria' },
  { name: 'Mary Adkins', role: 'Brand Manager', rating: 4.5, avatar: 'MA', tone: 'pink', email: 'mary.adkins@fowgate.com', department: 'Brand', manager: 'Jane Smith', location: 'Lagos, Nigeria' },
  { name: 'Olawale Michael', role: 'Sales Marketer', rating: 3.5, avatar: 'OM', tone: 'teal', email: 'olawale.michael@fowgate.com', department: 'Sales', manager: 'Jane Smith', location: 'Lagos, Nigeria' },
];

const criteria = [
  'Improvement in certain areas',
  'Understanding of the role',
  'Professional growth and initiative',
  'Quality of communication',
];

const reportSections = [
  {
    title: 'Team Appraisal',
    rating: 4.0,
    rows: [
      { label: 'Takes responsibility of his actions', rating: 3.0 },
      { label: "Listens to colleagues and accepts other's ideas", rating: 4.0 },
      { label: 'Takes ownership of tasks', rating: 5.0 },
    ],
  },
  {
    title: "Line Manager's Appraisal",
    rating: 4.0,
    rows: [
      { label: 'Follows company rules, regulation and procedures', rating: 4.0 },
      { label: 'Communicates precisely and gets what is needed', rating: 3.0 },
      { label: 'Has good work ethics', rating: 4.0 },
      { label: 'Helps colleagues whenever needed', rating: 5.0 },
    ],
  },
  {
    title: 'Self Appraisal',
    rating: 4.5,
    rows: [
      { label: 'Improvement in certain areas', rating: 5.0 },
    ],
  },
];

function RatingStars({ value, compact = false }) {
  const fullStars = Math.floor(value);

  return (
    <div className={`rating-stars ${compact ? 'compact-rating' : ''}`}>
      {compact ? (
        <Star className="star-icon filled" />
      ) : (
        [1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`star-icon ${star <= fullStars ? 'filled' : ''}`} />
        ))
      )}
      <span>{value.toFixed(1)}</span>
    </div>
  );
}

function AppraisalReportModal({ onClose }) {
  return (
    <div className="report-modal-overlay" role="presentation" onClick={onClose}>
      <div className="report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title" onClick={(event) => event.stopPropagation()}>
        <div className="report-modal-header">
          <div className="report-modal-title">
            <div className="report-avatar">JS</div>
            <h2 id="report-title">My Appraisal Report</h2>
          </div>
          <button className="report-close-icon" type="button" aria-label="Close report" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="report-modal-body">
          <button className="report-date-select" type="button">
            24 Dec, 2024 - <span>Q3</span>
            <ChevronDown size={16} />
          </button>

          {reportSections.map((section) => (
            <div key={section.title} className="report-section">
              <div className="report-section-header">
                <strong>{section.title}</strong>
                <div className="report-rating">
                  <span>Rating</span>
                  <strong>{section.rating.toFixed(1)}</strong>
                </div>
              </div>

              <div className="report-row-list">
                {section.rows.map((row) => (
                  <div key={row.label} className="report-row">
                    <span>{row.label}</span>
                    <div className="report-row-score">
                      <Star className="report-row-star" />
                      <strong>{row.rating.toFixed(1)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="report-modal-footer">
          <button className="report-close-button" type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedEmployeeName, setSelectedEmployeeName] = useState(selfAppraisal.name);
  const selectedEmployee = [selfAppraisal, ...teamMembers].find((employee) => employee.name === selectedEmployeeName) || selfAppraisal;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">Fowgate</div>

        <div className="sidebar-groups">
          {navSections.map((section, sectionIndex) => (
            <div key={`${section.title}-${sectionIndex}`} className="sidebar-section">
              {section.title && <div className="sidebar-group-label">{section.title}</div>}
              <div className="sidebar-menu">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button key={item.label} className={`sidebar-item ${item.active ? 'active' : ''}`}>
                      <Icon className="sidebar-item-icon" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <h1>My Account</h1>
          </div>
          <div className="topbar-search">
            <div className="search-field">
              <Search className="search-icon" />
              <input placeholder="Search here" />
            </div>
          </div>
          <div className="topbar-actions">
            <button className="icon-button">
              <Bell />
            </button>
            <button className="avatar-button">
              <div className="avatar-badge">JS</div>
              <ChevronDown />
            </button>
          </div>
        </header>

        <section className="tab-row">
          {tabs.map((tab) => (
            <button key={tab} className={`tab-item ${tab === 'Appraisals' ? 'active-tab' : ''}`}>
              {tab}
            </button>
          ))}
        </section>

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
                  <button className="report-button">
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
                <button className="submit-button">Submit Appraisal</button>
              </div>
             </div>
          </div>
        </section>
        {isReportOpen && <AppraisalReportModal onClose={() => setIsReportOpen(false)} />}
      </main>
    </div>
  );
}

export default App;
