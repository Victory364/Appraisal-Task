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
  CalendarDays,
  Settings,
  Users,
  Plus,
  X,
  FileText,
} from 'lucide-react';
import alfredBeckettAvatar from './Access/Fowgate Folder/alfred_beckett.png';

function DashboardIcon({ className }) {
  return (
    <span className={`dashboard-sidebar-icon ${className || ''}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function MyAccountSidebarIcon({ className }) {
  return (
    <svg className={`my-account-sidebar-icon ${className || ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5.48113 12.9007C4.30215 13.6027 1.21095 15.0361 3.0937 16.8299C4.01341 17.706 5.03773 18.3327 6.32554 18.3327H13.6741C14.9619 18.3327 15.9862 17.706 16.9059 16.8299C18.7887 15.0361 15.6975 13.6027 14.5185 12.9007C11.7538 11.2545 8.24581 11.2545 5.48113 12.9007Z" />
      <path d="M13.7498 5.41602C13.7498 7.48708 12.0709 9.16602 9.99982 9.16602C7.92875 9.16602 6.24982 7.48708 6.24982 5.41602C6.24982 3.34495 7.92875 1.66602 9.99982 1.66602C12.0709 1.66602 13.7498 3.34495 13.7498 5.41602Z" />
    </svg>
  );
}

function SidebarMessageIcon({ className }) {
  return (
    <svg className={`sidebar-message-icon ${className || ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5.5h14v10H10.6L7.4 18.5v-3H5v-10Z" />
      <path d="M8.5 10.5h7" />
    </svg>
  );
}

function ProjectsSidebarIcon({ className }) {
  return (
    <svg className={`projects-sidebar-icon ${className || ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M8.33398 11.1111C8.33398 10.8527 8.33398 10.7236 8.3624 10.6177C8.4394 10.3301 8.66407 10.1054 8.95165 10.0284C9.05757 10 9.18673 10 9.44507 10H10.5562C10.8146 10 10.9437 10 11.0497 10.0284C11.3372 10.1054 11.5619 10.3301 11.6389 10.6177C11.6673 10.7236 11.6673 10.8527 11.6673 11.1111V11.6667C11.6673 12.5872 10.9212 13.3333 10.0007 13.3333C9.08015 13.3333 8.33398 12.5872 8.33398 11.6667V11.1111Z" />
      <path d="M11.584 11.2493H12.5695C13.6396 11.2493 14.1747 11.2493 14.6303 11.1528C15.949 10.8735 17.0248 10.0166 17.4956 8.8706C17.6582 8.47468 17.7246 7.99562 17.8573 7.03743C17.9071 6.67772 17.9321 6.49787 17.9081 6.35076C17.8383 5.9223 17.495 5.57133 17.0324 5.45572C16.8736 5.41602 16.6727 5.41602 16.271 5.41602H3.73033C3.32857 5.41602 3.12769 5.41602 2.96887 5.45572C2.50633 5.57133 2.16296 5.9223 2.09318 6.35076C2.06922 6.49787 2.09414 6.67772 2.14397 7.03743C2.27672 7.99562 2.34308 8.47468 2.50572 8.8706C2.97648 10.0166 4.0523 10.8735 5.37095 11.1528C5.82652 11.2493 6.36163 11.2493 7.43184 11.2493H8.41732" />
      <path d="M2.91602 9.58301V11.2497C2.91602 14.3923 2.91602 15.9638 3.83809 16.94C4.76016 17.9163 6.24421 17.9163 9.21235 17.9163H10.7863C13.7545 17.9163 15.2385 17.9163 16.1606 16.94C17.0827 15.9638 17.0827 14.3923 17.0827 11.2497V9.58301" />
      <path d="M12.9173 5.41732L12.8529 5.12298C12.5321 3.65626 12.3717 2.92291 11.9897 2.50344C11.6078 2.08398 11.1006 2.08398 10.0859 2.08398H9.9154C8.90073 2.08398 8.39348 2.08398 8.01156 2.50344C7.62963 2.92291 7.46922 3.65626 7.14838 5.12298L7.08398 5.41732" />
    </svg>
  );
}

function OperationsReportIcon({ className }) {
  return (
    <svg className={`operations-report-icon ${className || ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 4.5a7.5 7.5 0 1 0 7.5 7.5H11V4.5Z" />
      <path d="M13.5 3.5a7 7 0 0 1 7 7h-7v-7Z" />
    </svg>
  );
}

function BusinessEntitiesIcon({ className }) {
  return (
    <svg className={`business-entities-icon ${className || ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.2 2.8h8.6c.8 0 1.5.7 1.5 1.5v8.1" />
      <path d="M4.2 2.8c-.8 0-1.5.7-1.5 1.5v11.4c0 .8.7 1.5 1.5 1.5h5.7" />
      <path d="M6 6.5h6.2" />
      <path d="M6 9.1h4.7" />
      <path d="M11.2 12.1h4.1c1.1 0 2 .9 2 2v3.1h-4.1c-1.1 0-2-.9-2-2v-3.1Z" />
      <path d="M13.1 14.7h2.3" />
    </svg>
  );
}

function TeamsSidebarIcon({ className }) {
  return (
    <svg className={`teams-sidebar-icon ${className || ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M17.3118 14.9999C17.9362 14.9999 18.4329 14.607 18.8788 14.0575C19.7917 12.9327 18.2929 12.0339 17.7212 11.5937C17.1402 11.1462 16.4913 10.8927 15.8335 10.8332M15.0002 9.16654C16.1507 9.16654 17.0835 8.2338 17.0835 7.08321C17.0835 5.93262 16.1507 4.99988 15.0002 4.99988" />
      <path d="M2.68847 14.9999C2.06404 14.9999 1.56739 14.607 1.12145 14.0575C0.208572 12.9327 1.70739 12.0339 2.27903 11.5937C2.86014 11.1462 3.50898 10.8927 4.16683 10.8332M4.5835 9.16654C3.43291 9.16654 2.50017 8.2338 2.50017 7.08321C2.50017 5.93262 3.43291 4.99988 4.5835 4.99988" />
      <path d="M6.73667 12.592C5.88518 13.1185 3.65265 14.1936 5.01242 15.5388C5.67665 16.196 6.41643 16.666 7.34652 16.666H12.6538C13.5839 16.666 14.3237 16.196 14.9879 15.5388C16.3477 14.1936 14.1152 13.1185 13.2637 12.592C11.2669 11.3573 8.73335 11.3573 6.73667 12.592Z" />
      <path d="M12.9168 6.25065C12.9168 7.86148 11.611 9.16732 10.0002 9.16732C8.38935 9.16732 7.0835 7.86148 7.0835 6.25065C7.0835 4.63982 8.38935 3.33398 10.0002 3.33398C11.611 3.33398 12.9168 4.63982 12.9168 6.25065Z" />
    </svg>
  );
}

function ApprovalSidebarIcon({ className }) {
  return (
    <svg className={`approval-sidebar-icon ${className || ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.8 12.1l2 2 4.4-4.4" />
    </svg>
  );
}

function ComplianceSidebarIcon({ className }) {
  return (
    <svg className={`compliance-sidebar-icon ${className || ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 19 6v5.2c0 4.4-2.8 7.6-7 9.3-4.2-1.7-7-4.9-7-9.3V6l7-2.5Z" />
      <path d="M14.8 10.1 11.4 13.5 9.2 11.3" />
    </svg>
  );
}

function AnalysisSidebarIcon({ className }) {
  return (
    <svg className={`analysis-sidebar-icon ${className || ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 19.5h15" />
      <path d="M6 19.5v-5.2c0-.7.6-1.3 1.3-1.3h1.4c.7 0 1.3.6 1.3 1.3v5.2" />
      <path d="M10.5 19.5v-8c0-.7.6-1.3 1.3-1.3h1.4c.7 0 1.3.6 1.3 1.3v8" />
      <path d="M15 19.5V7.3c0-.7.6-1.3 1.3-1.3h1.4c.7 0 1.3.6 1.3 1.3v12.2" />
    </svg>
  );
}

function AtsSidebarIcon({ className }) {
  return (
    <svg className={`ats-sidebar-icon ${className || ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.31674 12.7463C3.26876 13.3606 0.52103 14.6148 2.19459 16.1843C3.0121 16.951 3.9226 17.4993 5.06733 17.4993H11.5994C12.7441 17.4993 13.6546 16.951 14.4721 16.1843C16.1457 14.6148 13.3979 13.3606 12.3499 12.7463C9.89244 11.3059 6.77424 11.3059 4.31674 12.7463Z" />
      <path d="M11.6667 5.83333C11.6667 7.67428 10.1742 9.16667 8.33333 9.16667C6.49238 9.16667 5 7.67428 5 5.83333C5 3.99238 6.49238 2.5 8.33333 2.5C10.1742 2.5 11.6667 3.99238 11.6667 5.83333Z" />
      <path d="M16.2652 2.86104L16.7052 3.74822C16.7652 3.87172 16.9252 3.99018 17.0602 4.01286L17.8576 4.14644C18.3675 4.23214 18.4875 4.60515 18.12 4.97313L17.5001 5.59818C17.3951 5.70404 17.3376 5.90819 17.3701 6.05437L17.5476 6.82813C17.6876 7.44058 17.3651 7.67749 16.8277 7.35741L16.0802 6.9113C15.9452 6.83064 15.7228 6.83064 15.5853 6.9113L14.8379 7.35741C14.303 7.67749 13.978 7.43806 14.118 6.82813L14.2955 6.05437C14.3279 5.90819 14.2705 5.70404 14.1655 5.59818L13.5456 4.97313C13.1806 4.60515 13.2981 4.23214 13.808 4.14644L14.6054 4.01286C14.7379 3.99018 14.8979 3.87172 14.9579 3.74822L15.3978 2.86104C15.6378 2.37965 16.0277 2.37965 16.2652 2.86104Z" />
    </svg>
  );
}

function PayrollSidebarIcon({ className }) {
  return (
    <svg className={`payroll-sidebar-icon ${className || ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2.49992 8.33337H17.4999" />
      <path d="M12.4999 5H14.1666" />
      <path d="M17.4999 10.8334V9.16675C17.4999 5.63121 17.4999 3.86345 16.4016 2.7651C15.3032 1.66675 13.5354 1.66675 9.99992 1.66675C6.46438 1.66675 4.69662 1.66675 3.59827 2.7651C2.49992 3.86345 2.49992 5.63121 2.49992 9.16675V10.8334C2.49992 14.3689 2.49992 16.1367 3.59827 17.2351C4.69662 18.3334 6.46438 18.3334 9.99992 18.3334C13.5354 18.3334 15.3032 18.3334 16.4016 17.2351C17.4999 16.1367 17.4999 14.3689 17.4999 10.8334Z" />
      <path d="M5.83325 11.6667H6.27185M9.78059 11.6667H10.2193M13.728 11.6667H14.1666" />
      <path d="M5.83325 15H6.27185M9.78059 15H10.2193M13.728 15H14.1666" />
    </svg>
  );
}

function LoanEmptyIcon() {
  return (
    <svg className="loan-empty-illustration" viewBox="0 0 160 174" fill="none" aria-hidden="true">
      <path
        d="M28 55L97 48C101 47.6 104.6 50.5 105 54.5L116.7 154.7C117.2 158.7 114.3 162.3 110.3 162.8L36.7 171.4C32.7 171.8 29.1 168.9 28.6 165L16.9 64.8C16.5 60.8 19.4 56.9 23.4 56.5L28 55Z"
        fill="#ffffff"
        stroke="#a7a7a7"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M61 3H122L152 33V131C152 134.3 149.3 137 146 137H61C57.7 137 55 134.3 55 131V9C55 5.7 57.7 3 61 3Z"
        fill="#ffffff"
        stroke="#a7a7a7"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path
        d="M122 3V31C122 34.3 124.7 37 128 37H152"
        stroke="#a7a7a7"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <path d="M78 38H111" stroke="#b8b8b8" strokeWidth="4" strokeLinecap="round" />
      <path d="M78 61H128" stroke="#b8b8b8" strokeWidth="4" strokeLinecap="round" />
      <path d="M78 84H128" stroke="#b8b8b8" strokeWidth="4" strokeLinecap="round" />
      <path d="M78 107H128" stroke="#b8b8b8" strokeWidth="4" strokeLinecap="round" />
      <path d="M78 130H112" stroke="#b8b8b8" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function LoanHeaderIcon() {
  return (
    <svg className="loan-header-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5.2 2.6h6.4l3.2 3.2v11.6H5.2V2.6Z" fill="#ffffff" />
      <path d="M11.6 2.6v3.2h3.2" stroke="#2563c7" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M10 8.1v5" stroke="#2563c7" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.5 10.6h5" stroke="#2563c7" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function LoanDetailsHeaderIcon() {
  return (
    <svg className="loan-header-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5.2 2.6h6.4l3.2 3.2v11.6H5.2V2.6Z" fill="#ffffff" />
      <path d="M11.6 2.6v3.2h3.2" stroke="#2563c7" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6.8 8.1h6.4" stroke="#2563c7" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.8 11.1h6.4" stroke="#2563c7" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.8 14.1h4" stroke="#2563c7" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const navSections = [
  {
    title: 'GENERAL',
    items: [
      { label: 'Dashboard', icon: DashboardIcon },
      { label: 'My Account', icon: MyAccountSidebarIcon, active: true },
    ],
  },
  {
    title: 'COLLABORATION',
    items: [
      { label: 'Messages', icon: SidebarMessageIcon },
      { label: 'Projects', icon: ProjectsSidebarIcon },
      { label: 'Approvals', icon: ApprovalSidebarIcon },
      { label: 'Calendar', icon: CalendarDays },
    ],
  },
  {
    title: 'HCM',
    items: [
      { label: 'ATS', icon: AtsSidebarIcon },
      { label: 'Teams', icon: TeamsSidebarIcon },
      { label: 'Payroll', icon: PayrollSidebarIcon },
      { label: 'Company Calendar', icon: CalendarDays },
      { label: 'Compliance Management', icon: ComplianceSidebarIcon },
      { label: 'Analysis & Reporting', icon: AnalysisSidebarIcon },
      { label: 'Settings', icon: Settings },
    ],
  },
  {
    title: 'OPERATIONS',
    items: [
      { label: 'Business Entities', icon: BusinessEntitiesIcon },
      { label: 'Reports', icon: OperationsReportIcon },
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

const loanStats = [
  { label: 'Total Amount of Loans', value: '₦0.00' },
  { label: 'Total Loan Repaid', value: '₦0.00' },
  { label: 'Outstanding Loan Balance', value: '₦0.00' },
  { label: 'Total Loans', value: '0' },
];

const loanPurposes = [
  'Medical Loan',
  'Education Loan',
  'Personal Loan',
  'Buying Assets Loan',
  'Business And Investment Loan',
  'Debt consolidation Loan',
  'Build Credit History Loan',
];

const currencyOptions = [
  { country: 'Nigeria', countryCode: 'NG', code: 'NGN', symbol: '₦', flag: '🇳🇬' },
];

function formatMoney(amount, currency) {
  return `${currency.symbol}${Number(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatMoneyNoDecimals(amount, currency) {
  return `${currency.symbol}${Number(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

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

function NewLoanModal({ initialLoan = null, onClose, onSubmitLoan }) {
  const isEditing = Boolean(initialLoan);
  const modalTitle = isEditing ? 'Edit Loan Details' : 'New Loan';
  const [selectedPurpose, setSelectedPurpose] = useState(initialLoan?.purpose || '');
  const [selectedCurrency, setSelectedCurrency] = useState(initialLoan?.currency || currencyOptions[0]);
  const [loanAmount, setLoanAmount] = useState(initialLoan?.amount ? String(initialLoan.amount) : '');
  const [loanDuration, setLoanDuration] = useState(initialLoan?.duration ? String(initialLoan.duration) : '');
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formattedLoanAmount = formatMoney(loanAmount, selectedCurrency);
  const finalPurpose = selectedPurpose || 'selected purpose';

  function handleFinishLoan() {
    const nextAmount = Number(loanAmount || 0);

    onSubmitLoan({
      ...(initialLoan || {}),
      id: initialLoan?.id || Date.now(),
      dateTaken: initialLoan?.dateTaken || '25 May, 2026',
      amount: nextAmount,
      currency: selectedCurrency,
      duration: loanDuration || '0',
      purpose: finalPurpose,
      balance: nextAmount,
      status: initialLoan?.status || 'Pending',
    });
    onClose();
  }

  if (isSubmitted) {
    return (
      <div className="loan-modal-overlay success-overlay" role="presentation" onClick={handleFinishLoan}>
        <div className={`request-submitted-modal ${isEditing ? 'changes-saved-modal' : ''}`} role="dialog" aria-modal="true" aria-labelledby="request-submitted-title" onClick={(event) => event.stopPropagation()}>
          <div className={isEditing ? 'changes-saved-icon' : 'success-dot'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="success-copy">
            <h2 id="request-submitted-title">{isEditing ? 'Changes Saved!' : 'Request Submitted!'}</h2>
            <p>{isEditing ? 'The loan application has been updated to reflect the latest change' : 'The loan has been successfully submitted and the HR has been notified'}</p>
          </div>
          <button className="success-okay-button" type="button" onClick={handleFinishLoan}>Okay</button>
        </div>
      </div>
    );
  }

  if (isConfirming) {
    return (
      <div className="loan-modal-overlay confirm-overlay" role="presentation" onClick={onClose}>
        <div className="confirm-action-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-action-title" onClick={(event) => event.stopPropagation()}>
          <div className="confirm-action-header">
            <div className="confirm-action-title">
              <Info size={18} />
              <h2 id="confirm-action-title">Confirm Action</h2>
            </div>
            <button className="new-loan-close" type="button" aria-label="Close confirmation" onClick={() => setIsConfirming(false)}>
              <X />
            </button>
          </div>

          <div className="confirm-action-body">
            {isEditing ? (
              <p>Are you sure you want to save the changes made to this loan application? Ensure all details are correct before proceeding</p>
            ) : (
              <p>
                Are you sure you want to proceed with the process of creating a loan of{' '}
                <strong>{formattedLoanAmount}</strong> for <strong>{finalPurpose}</strong>?
              </p>
            )}
          </div>

          <div className="confirm-action-footer">
            <button className="cancel-loan-button" type="button" onClick={() => setIsConfirming(false)}>Cancel</button>
            <button className="submit-loan-button" type="button" onClick={() => setIsSubmitted(true)}>Yes, I'm sure</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="loan-modal-overlay" role="presentation" onClick={onClose}>
      <div className="new-loan-modal" role="dialog" aria-modal="true" aria-labelledby="new-loan-title" onClick={(event) => event.stopPropagation()}>
        <div className="new-loan-header">
          <div className="new-loan-title">
            <LoanHeaderIcon />
            <h2 id="new-loan-title">{modalTitle}</h2>
          </div>
          <button className="new-loan-close" type="button" aria-label={`Close ${modalTitle.toLowerCase()} form`} onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="new-loan-body">
          <div className="loan-type-switch">
            <button className="active" type="button">Loan</button>
            <button type="button">Advances</button>
          </div>

          <div className="loan-form-fields">
            <label className="form-field">
              <span>Employee</span>
              <input value="Alfred Beckett" readOnly />
            </label>

            <label className="form-field">
              <span>Purpose of the Loan</span>
              <select className="native-select" value={selectedPurpose} onChange={(event) => setSelectedPurpose(event.target.value)}>
                <option value="">Select</option>
                {loanPurposes.map((purpose) => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
            </label>

            <label className="form-field">
              <span>Amount</span>
              <div className="amount-input amount-country-input">
                <input
                  inputMode="decimal"
                  placeholder="Enter amount"
                  value={loanAmount}
                  onChange={(event) => setLoanAmount(event.target.value)}
                />
                <div className="amount-country-button" aria-label={`Currency ${selectedCurrency.code}`}>
                  <span className="nigeria-flag" aria-hidden="true" />
                  {selectedCurrency.code}
                </div>
              </div>
            </label>

            <label className="form-field">
              <span>Duration of the loan</span>
              <div className="amount-input">
                <input
                  inputMode="numeric"
                  placeholder="Enter number of month"
                  value={loanDuration}
                  onChange={(event) => setLoanDuration(event.target.value)}
                />
                <div className="input-addon">Months</div>
              </div>
            </label>
          </div>
        </div>

        <div className="new-loan-footer">
          <button className="cancel-loan-button" type="button" onClick={onClose}>Cancel</button>
          <button className="submit-loan-button" type="button" onClick={() => setIsConfirming(true)}>Submit</button>
        </div>
      </div>
    </div>
  );
}

function JaneSmithAvatar({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ borderRadius: '50%', flexShrink: 0 }}
    >
      <circle cx="16" cy="16" r="16" fill="#e0f2fe" />
      {/* Hair back */}
      <path d="M9 16.5c0-4.5 3-7.5 7-7.5s7 3 7 7.5v2h-14v-2z" fill="#1e293b" />
      {/* Face */}
      <circle cx="16" cy="17" r="7" fill="#fed7aa" />
      {/* Eyes */}
      <circle cx="14" cy="16" r="1" fill="#1e293b" />
      <circle cx="18" cy="16" r="1" fill="#1e293b" />
      {/* Mask */}
      <path d="M12.5 18.5c0-1 1-1.5 3.5-1.5s3.5.5 3.5 1.5v2c0 1-1 2-3.5 2s-3.5-1-3.5-2v-2z" fill="#0f172a" />
      {/* Straps */}
      <path d="M12.5 19L10 18" stroke="#0f172a" strokeWidth="0.8" />
      <path d="M19.5 19L22 18" stroke="#0f172a" strokeWidth="0.8" />
    </svg>
  );
}

function parseDateTaken(dateStr) {
  const monthsMap = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };
  let startMonth = 4; // May
  let startYear = 2026;
  if (dateStr) {
    const parts = dateStr.split(/[\s,]+/);
    for (const part of parts) {
      const clean = part.toLowerCase().substring(0, 3);
      if (monthsMap[clean] !== undefined) {
        startMonth = monthsMap[clean];
      } else if (/^\d{4}$/.test(part)) {
        startYear = parseInt(part, 10);
      }
    }
  }
  return { startMonth, startYear };
}

function addDaysToDateString(dateStr, daysToAdd) {
  const monthsMap = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  };
  const monthsArr = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  let startDay = 1;
  let startMonth = 4; // May
  let startYear = 2026;
  
  if (dateStr) {
    const parts = dateStr.split(/[\s,]+/);
    for (const part of parts) {
      const clean = part.toLowerCase().substring(0, 3);
      if (monthsMap[clean] !== undefined) {
        startMonth = monthsMap[clean];
      } else if (/^\d{4}$/.test(part)) {
        startYear = parseInt(part, 10);
      } else if (/^\d{1,2}$/.test(part)) {
        startDay = parseInt(part, 10);
      }
    }
  }

  const date = new Date(startYear, startMonth, startDay);
  date.setDate(date.getDate() + daysToAdd);
  
  const mName = monthsArr[date.getMonth()];
  return `${date.getDate()} ${mName}, ${date.getFullYear()}`;
}

function LoanDetailsModal({ loan, onClose }) {
  const [openSections, setOpenSections] = useState({
    approval: true,
    loanTerms: true,
  });
  const duration = Math.max(Number(loan.duration || 1), 1);
  const monthlyAmount = loan.amount / duration;
  const repaymentTotal = monthlyAmount * duration;
  const isApproved = loan.status === 'Ongoing' || loan.status === 'Completed';

  // Generate payment rows with correct last-day-of-month due dates
  const { startMonth, startYear } = parseDateTaken(loan.dateTaken);
  const paymentRows = Array.from({ length: Math.min(duration, 12) }, (_, index) => {
    const date = new Date(startYear, startMonth + index, 1);
    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const monthLabel = `${monthName} ${year}`;
    // Last day of month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const dueDate = `${monthName} ${lastDay}, ${year}`;
    return { month: monthLabel, dueDate, amount: monthlyAmount, rawDate: date };
  });

  function toggleSection(section) {
    setOpenSections((currentSections) => ({
      ...currentSections,
      [section]: !currentSections[section],
    }));
  }

  return (
    <div className="loan-modal-overlay details-overlay" role="presentation" onClick={onClose}>
      <div className="loan-details-modal" role="dialog" aria-modal="true" aria-labelledby="loan-details-title" onClick={(event) => event.stopPropagation()}>
        <div className="loan-details-header">
          <div className="loan-details-title">
            <LoanDetailsHeaderIcon />
            <h2 id="loan-details-title">Loan Details</h2>
          </div>
          <button className="new-loan-close" type="button" aria-label="Close loan details" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="loan-details-body">
          <div className="borrower-row">
            <img className="borrower-avatar-img" src={alfredBeckettAvatar} alt="Alfred Beckett" />
            <div>
              <strong>Alfred Beckett</strong>
              <span>Audit Manager</span>
            </div>
            <span className={`active-pill ${loan.status.toLowerCase()}`}>
              {loan.status === 'Ongoing' ? '• Ongoing' : (loan.status === 'Completed' || loan.status === 'Rejected' ? `• ${loan.status}` : loan.status)}
            </span>
          </div>

          <div className="loan-detail-summary">
            <div>
              <strong>{formatMoneyNoDecimals(loan.amount, loan.currency)}</strong>
              <span>LOAN AMOUNT</span>
            </div>
            <div>
              <strong>{loan.duration} MONTHS</strong>
              <span>LOAN DURATION</span>
            </div>
            <div>
              <strong>{loan.purpose.replace(' Loan', '')}</strong>
              <span>LOAN PURPOSE</span>
            </div>
          </div>

          <div className="approval-info-panel">
            <button
              className="details-section-title"
              type="button"
              aria-expanded={openSections.approval}
              onClick={() => toggleSection('approval')}
            >
              <strong>Approval Info</strong>
              <ChevronDown className={openSections.approval ? 'section-chevron open' : 'section-chevron'} size={16} />
            </button>
            {openSections.approval && (
              <div className="approval-info-grid">
                <div>
                  <span>Approve Loan Amount</span>
                  <strong>-</strong>
                </div>
                <div>
                  <span>Approve Loan Duration</span>
                  <strong>-</strong>
                </div>
                <div>
                  <span>Approved By</span>
                  <strong>-</strong>
                </div>
                <div>
                  <span>Repayment Method</span>
                  <strong>-</strong>
                </div>
                <div>
                  <span>Approval Date</span>
                  <strong>-</strong>
                </div>
                <div>
                  <span>Loan Disbursal Date</span>
                  <strong>-</strong>
                </div>
              </div>
            )}
          </div>

          <h3>Payment Breakdown</h3>
          <table className="payment-breakdown-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Due Date</th>
                <th>Amount Paid</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentRows.map((row) => {
                let statusText = 'Paid';
                let statusClass = 'paid-pill';
                let displayedAmount = row.amount;

                if (loan.status === 'Rejected') {
                  displayedAmount = 0;
                  statusText = 'Rejected';
                  statusClass = 'rejected-pill';
                } else if (loan.status === 'Cancelled') {
                  displayedAmount = 0;
                  statusText = 'Unpaid';
                  statusClass = 'unpaid-pill';
                } else if (loan.status === 'Pending') {
                  displayedAmount = 0;
                  statusText = 'Pending';
                  statusClass = 'pending-pill';
                } else if (loan.status === 'Completed') {
                  displayedAmount = row.amount;
                  statusText = 'Paid';
                  statusClass = 'paid-pill';
                } else if (loan.status === 'Ongoing') {
                  // Compare row due date with June 11, 2026
                  const today = new Date(2026, 5, 11);
                  const endOfMonth = new Date(row.rawDate.getFullYear(), row.rawDate.getMonth() + 1, 0);
                  const isPast = endOfMonth < today;

                  if (isPast) {
                    displayedAmount = row.amount;
                    statusText = 'Paid';
                    statusClass = 'paid-pill';
                  } else {
                    displayedAmount = 0;
                    statusText = 'Pending';
                    statusClass = 'pending-pill';
                  }
                }

                return (
                  <tr key={row.month}>
                    <td className="breakdown-month">{row.month}</td>
                    <td className="breakdown-due-date">{row.dueDate}</td>
                    <td className="breakdown-amount-paid">{formatMoney(displayedAmount, loan.currency)}</td>
                    <td><span className={statusClass}>{statusText}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="loan-terms-panel">
            <button
              className="details-section-title"
              type="button"
              aria-expanded={openSections.loanTerms}
              onClick={() => toggleSection('loanTerms')}
            >
              <strong>Loan Terms &amp; Payment Schedule</strong>
              <ChevronDown className={openSections.loanTerms ? 'section-chevron open' : 'section-chevron'} size={16} />
            </button>
            {openSections.loanTerms && (
              <div className="loan-terms-grid">
                <div>
                  <span>Monthly Payment</span>
                  <strong>{formatMoney(monthlyAmount, loan.currency)}</strong>
                </div>
                <div>
                  <span>Total Repayment</span>
                  <strong>{formatMoney(repaymentTotal, loan.currency)}</strong>
                </div>
                <div className="loan-terms-full-row">
                  <span>Outstanding Balance</span>
                  <strong className="green-balance">
                    {formatMoney(
                      loan.status === 'Ongoing' || loan.status === 'Pending' ? loan.balance : 0,
                      loan.currency
                    )}
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="loan-details-footer">
          <button className="report-close-button" type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}


function CancelLoanModal({ onClose, onConfirm }) {
  const [isCancelled, setIsCancelled] = useState(false);

  if (isCancelled) {
    return (
      <div className="loan-modal-overlay success-overlay" role="presentation" onClick={onConfirm}>
        <div className="application-cancelled-modal" role="dialog" aria-modal="true" aria-labelledby="application-cancelled-title" onClick={(event) => event.stopPropagation()}>
          <div className="cancel-success-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="success-copy">
            <h2 id="application-cancelled-title">Application Cancelled!</h2>
            <p>Your loan application has been cancelled successfully.</p>
          </div>
          <button className="success-okay-button" type="button" onClick={onConfirm}>Okay</button>
        </div>
      </div>
    );
  }

  return (
    <div className="loan-modal-overlay confirm-overlay" role="presentation" onClick={onClose}>
      <div className="confirm-action-modal" role="dialog" aria-modal="true" aria-labelledby="cancel-loan-title" onClick={(event) => event.stopPropagation()}>
        <div className="confirm-action-header">
          <div className="confirm-action-title">
            <Info size={18} />
            <h2 id="cancel-loan-title">Confirm Action</h2>
          </div>
          <button className="new-loan-close" type="button" aria-label="Close cancel confirmation" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="confirm-action-body">
          <p>Are you sure you want to proceed with canceling this loan application?</p>
        </div>

        <div className="confirm-action-footer">
          <button className="cancel-loan-button" type="button" onClick={onClose}>Cancel</button>
          <button className="submit-loan-button" type="button" onClick={() => setIsCancelled(true)}>Yes, I'm sure</button>
        </div>
      </div>
    </div>
  );
}

function LoanManagement({ onNewLoan, loans, onCancelLoan, onEditLoan }) {
  const displayCurrency = loans[0]?.currency || currencyOptions[0];
  const totalAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalBalance = loans.reduce((sum, loan) => sum + loan.balance, 0);
  const [openActionLoanId, setOpenActionLoanId] = useState(null);
  const [detailsLoan, setDetailsLoan] = useState(null);
  const [editLoan, setEditLoan] = useState(null);
  const [cancelLoan, setCancelLoan] = useState(null);
  const dynamicLoanStats = [
    { label: 'Total Amount of Loans', value: formatMoney(totalAmount, displayCurrency) },
    { label: 'Total Loan Repaid', value: formatMoney(0, displayCurrency) },
    { label: 'Outstanding Loan Balance', value: formatMoney(totalBalance, displayCurrency) },
    { label: 'Total Loans', value: String(loans.length) },
  ];

  return (
    <section className="loan-workspace">
      <div className="loan-header">
        <h2>Loan Management</h2>
        <div className="loan-filter">
          <span>Filter by:</span>
          <button type="button">
            MAY 2026
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="loan-stats-grid">
        {dynamicLoanStats.map((stat) => (
          <div key={stat.label} className="loan-stat-card">
            <div className="loan-stat-label">
              <Users size={14} />
              <span>{stat.label}</span>
            </div>
            <div className="loan-stat-value-row">
              <strong>{stat.value}</strong>
              <span>↗ 0.00</span>
            </div>
          </div>
        ))}
      </div>

      <div className="loan-history-bar">
        <h3>Loan History</h3>
        <div className="loan-history-search">
          <input placeholder="Search purpose, etc..." />
          <Search size={18} />
        </div>
        <button className="loan-status-button" type="button">
          All Status
          <ChevronDown size={15} />
        </button>
        <button className="new-loan-button" type="button" onClick={onNewLoan}>
          <Plus size={16} />
          New Loan
        </button>
      </div>

      {loans.length === 0 ? (
        <div className="loan-empty-state">
          <div className="loan-empty-icon">
            <LoanEmptyIcon />
          </div>
          <strong>No loan report</strong>
          <p>Use the "Add New" button</p>
        </div>
      ) : (
        <div className="loan-table-wrap">
          <table className="loan-history-table">
            <thead>
              <tr>
                <th>Date Taken</th>
                <th>Loan Amount</th>
                <th>Loan Duration</th>
                <th>Balance</th>
                <th>Loan Purpose</th>
                <th>Repayment Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.dateTaken}</td>
                  <td>{formatMoney(loan.amount, loan.currency)}</td>
                  <td>{loan.duration} months</td>
                  <td>{formatMoney(loan.balance, loan.currency)}</td>
                  <td>{loan.purpose}</td>
                  <td><span className={`repayment-status ${loan.status === 'Cancelled' ? 'cancelled' : ''}`}>{loan.status}</span></td>
                  <td className="loan-action-cell">
                    <button
                      className="loan-action-button"
                      type="button"
                      aria-label="Loan actions"
                      onClick={() => setOpenActionLoanId((currentId) => (currentId === loan.id ? null : loan.id))}
                    >
                      <span /><span /><span />
                    </button>
                    {openActionLoanId === loan.id && (
                      <div className="loan-action-menu">
                        <button
                          type="button"
                          onClick={() => {
                            setDetailsLoan(loan);
                            setOpenActionLoanId(null);
                          }}
                        >
                          <span className="action-icon document-icon" />
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditLoan(loan);
                            setOpenActionLoanId(null);
                          }}
                        >
                          <span className="action-icon edit-icon" />
                          Edit
                        </button>
                        <button
                          className="danger-action"
                          type="button"
                          onClick={() => {
                            setCancelLoan(loan);
                            setOpenActionLoanId(null);
                          }}
                        >
                          <span className="action-icon cancel-icon" />
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {detailsLoan && <LoanDetailsModal loan={detailsLoan} onClose={() => setDetailsLoan(null)} />}
      {editLoan && (
        <NewLoanModal
          initialLoan={editLoan}
          onClose={() => setEditLoan(null)}
          onSubmitLoan={(updatedLoan) => {
            onEditLoan(updatedLoan);
            setEditLoan(null);
          }}
        />
      )}
      {cancelLoan && (
        <CancelLoanModal
          loan={cancelLoan}
          onClose={() => setCancelLoan(null)}
          onConfirm={() => {
            onCancelLoan(cancelLoan.id);
            setCancelLoan(null);
          }}
        />
      )}
    </section>
  );
}

function App() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isNewLoanOpen, setIsNewLoanOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Appraisals');
  const [loans, setLoans] = useState([]);
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
            <button className="icon-button notification-button" type="button" aria-label="Notifications">
              <Bell />
              <span />
            </button>
            <button className="avatar-button">
              <div className="avatar-badge">JS</div>
              <ChevronDown />
            </button>
          </div>
        </header>

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
