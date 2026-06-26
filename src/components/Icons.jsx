import React from 'react';

export function DashboardIcon({ className }) {
  return (
    <span className={`dashboard-sidebar-icon ${className || ''}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export function MyAccountSidebarIcon({ className }) {
  return (
    <svg className={`my-account-sidebar-icon ${className || ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5.48113 12.9007C4.30215 13.6027 1.21095 15.0361 3.0937 16.8299C4.01341 17.706 5.03773 18.3327 6.32554 18.3327H13.6741C14.9619 18.3327 15.9862 17.706 16.9059 16.8299C18.7887 15.0361 15.6975 13.6027 14.5185 12.9007C11.7538 11.2545 8.24581 11.2545 5.48113 12.9007Z" />
      <path d="M13.7498 5.41602C13.7498 7.48708 12.0709 9.16602 9.99982 9.16602C7.92875 9.16602 6.24982 7.48708 6.24982 5.41602C6.24982 3.34495 7.92875 1.66602 9.99982 1.66602C12.0709 1.66602 13.7498 3.34495 13.7498 5.41602Z" />
    </svg>
  );
}

export function SidebarMessageIcon({ className }) {
  return (
    <svg className={`sidebar-message-icon ${className || ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5.5h14v10H10.6L7.4 18.5v-3H5v-10Z" />
      <path d="M8.5 10.5h7" />
    </svg>
  );
}

export function ProjectsSidebarIcon({ className }) {
  return (
    <svg className={`projects-sidebar-icon ${className || ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M8.33398 11.1111C8.33398 10.8527 8.33398 10.7236 8.3624 10.6177C8.4394 10.3301 8.66407 10.1054 8.95165 10.0284C9.05757 10 9.18673 10 9.44507 10H10.5562C10.8146 10 10.9437 10 11.0497 10.0284C11.3372 10.1054 11.5619 10.3301 11.6389 10.6177C11.6673 10.7236 11.6673 10.8527 11.6673 11.1111V11.6667C11.6673 12.5872 10.9212 13.3333 10.0007 13.3333C9.08015 13.3333 8.33398 12.5872 8.33398 11.6667V11.1111Z" />
      <path d="M11.584 11.2493H12.5695C13.6396 11.2493 14.1747 11.2493 14.6303 11.1528C15.949 10.8735 17.0248 10.0166 17.4956 8.8706C17.6582 8.47468 17.7246 7.99562 17.8573 7.03743C17.9071 6.67772 17.9321 6.49787 17.9081 6.35076C17.8383 5.9223 17.495 5.57133 17.0324 5.45572C16.8736 5.41602 16.6727 5.41602 16.271 5.41602H3.73033C3.32857 5.41602 3.12769 5.41602 2.96887 5.45572C2.50633 5.57133 2.16296 5.9223 2.09318 6.35076C2.06922 6.49787 2.09414 6.67772 2.14397 7.03743C2.27672 7.99562 2.34308 8.47468 2.50572 8.8706C2.97648 10.0166 4.0523 10.8735 5.37095 11.1528C5.82652 11.2493 6.36163 11.2493 7.43184 11.2493H8.41732" />
      <path d="M2.91602 9.58301V11.2497C2.91602 14.3923 2.91602 15.9638 3.83809 16.94C4.76016 17.9163 6.24421 17.9163 9.21235 17.9163H10.7863C13.7545 17.9163 15.2385 17.9163 16.1606 16.94C17.0827 15.9638 17.0827 14.3923 17.0827 11.2497V9.58301" />
      <path d="M12.9173 5.41732L12.8529 5.12298C12.5321 3.65626 12.3717 2.92291 11.9897 2.50344C11.6078 2.08398 11.1006 2.08398 10.0859 2.08398H9.9154C8.90073 2.08398 8.39348 2.08398 8.01156 2.50344C7.62963 2.92291 7.46922 3.65626 7.14838 5.12298L7.08398 5.41732" />
    </svg>
  );
}

export function OperationsReportIcon({ className }) {
  return (
    <svg className={`operations-report-icon ${className || ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M11 4.5a7.5 7.5 0 1 0 7.5 7.5H11V4.5Z" />
      <path d="M13.5 3.5a7 7 0 0 1 7 7h-7v-7Z" />
    </svg>
  );
}

export function BusinessEntitiesIcon({ className }) {
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

export function TeamsSidebarIcon({ className }) {
  return (
    <svg className={`teams-sidebar-icon ${className || ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M17.3118 14.9999C17.9362 14.9999 18.4329 14.607 18.8788 14.0575C19.7917 12.9327 18.2929 12.0339 17.7212 11.5937C17.1402 11.1462 16.4913 10.8927 15.8335 10.8332M15.0002 9.16654C16.1507 9.16654 17.0835 8.2338 17.0835 7.08321C17.0835 5.93262 16.1507 4.99988 15.0002 4.99988" />
      <path d="M2.68847 14.9999C2.06404 14.9999 1.56739 14.607 1.12145 14.0575C0.208572 12.9327 1.70739 12.0339 2.27903 11.5937C2.86014 11.1462 3.50898 10.8927 4.16683 10.8332M4.5835 9.16654C3.43291 9.16654 2.50017 8.2338 2.50017 7.08321C2.50017 5.93262 3.43291 4.99988 4.5835 4.99988" />
      <path d="M6.73667 12.592C5.88518 13.1185 3.65265 14.1936 5.01242 15.5388C5.67665 16.196 6.41643 16.666 7.34652 16.666H12.6538C13.5839 16.666 14.3237 16.196 14.9879 15.5388C16.3477 14.1936 14.1152 13.1185 13.2637 12.592Z" />
      <path d="M12.9168 6.25065C12.9168 7.86148 11.611 9.16732 10.0002 9.16732C8.38935 9.16732 7.0835 7.86148 7.0835 6.25065C7.0835 4.63982 8.38935 3.33398 10.0002 3.33398C11.611 3.33398 12.9168 4.63982 12.9168 6.25065Z" />
    </svg>
  );
}

export function ApprovalSidebarIcon({ className }) {
  return (
    <svg className={`approval-sidebar-icon ${className || ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.8 12.1l2 2 4.4-4.4" />
    </svg>
  );
}

export function ComplianceSidebarIcon({ className }) {
  return (
    <svg className={`compliance-sidebar-icon ${className || ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5 19 6v5.2c0 4.4-2.8 7.6-7 9.3-4.2-1.7-7-4.9-7-9.3V6l7-2.5Z" />
      <path d="M14.8 10.1 11.4 13.5 9.2 11.3" />
    </svg>
  );
}

export function AnalysisSidebarIcon({ className }) {
  return (
    <svg className={`analysis-sidebar-icon ${className || ''}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 19.5h15" />
      <path d="M6 19.5v-5.2c0-.7.6-1.3 1.3-1.3h1.4c.7 0 1.3.6 1.3 1.3v5.2" />
      <path d="M10.5 19.5v-8c0-.7.6-1.3 1.3-1.3h1.4c.7 0 1.3.6 1.3 1.3v8" />
      <path d="M15 19.5V7.3c0-.7.6-1.3 1.3-1.3h1.4c.7 0 1.3.6 1.3 1.3v12.2" />
    </svg>
  );
}

export function AtsSidebarIcon({ className }) {
  return (
    <svg className={`ats-sidebar-icon ${className || ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.31674 12.7463C3.26876 13.3606 0.52103 14.6148 2.19459 16.1843C3.0121 16.951 3.9226 17.4993 5.06733 17.4993H11.5994C12.7441 17.4993 13.6546 16.951 14.4721 16.1843C16.1457 14.6148 13.3979 13.3606 12.3499 12.7463C9.89244 11.3059 6.77424 11.3059 4.31674 12.7463Z" />
      <path d="M11.6667 5.83333C11.6667 7.67428 10.1742 9.16667 8.33333 9.16667C6.49238 9.16667 5 7.67428 5 5.83333C5 3.99238 6.49238 2.5 8.33333 2.5C10.1742 2.5 11.6667 3.99238 11.6667 5.83333Z" />
      <path d="M16.2652 2.86104L16.7052 3.74822C16.7652 3.87172 16.9252 3.99018 17.0602 4.01286L17.8576 4.14644C18.3675 4.23214 18.4875 4.60515 18.12 4.97313L17.5001 5.59818C17.3951 5.70404 17.3376 5.90819 17.3701 6.05437L17.5476 6.82813C17.6876 7.44058 17.3651 7.67749 16.8277 7.35741L16.0802 6.9113C15.9452 6.83064 15.7228 6.83064 15.5853 6.9113L14.8379 7.35741C14.303 7.67749 13.978 7.43806 14.118 6.82813L14.2955 6.05437C14.3279 5.90819 14.2705 5.70404 14.1655 5.59818L13.5456 4.97313C13.1806 4.60515 13.2981 4.23214 13.808 4.14644L14.6054 4.01286C14.7379 3.99018 14.8979 3.87172 14.9579 3.74822L15.3978 2.86104C15.6378 2.37965 16.0277 2.37965 16.2652 2.86104Z" />
    </svg>
  );
}

export function PayrollSidebarIcon({ className }) {
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

export function LoanEmptyIcon() {
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

export function LoanHeaderIcon({ className, ...props }) {
  return (
    <svg className={className || "loan-header-icon"} viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M5.2 2.6h6.4l3.2 3.2v11.6H5.2V2.6Z" fill="#ffffff" />
      <path d="M11.6 2.6v3.2h3.2" stroke="#2563c7" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M10 8.1v5" stroke="#2563c7" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.5 10.6h5" stroke="#2563c7" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function LoanDetailsHeaderIcon({ className, ...props }) {
  return (
    <svg className={className || "loan-header-icon"} viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path d="M4 2.5C4 2.22386 4.22386 2 4.5 2H12L16 6V17.5C16 17.7761 15.7761 18 15.5 18H4.5C4.22386 18 4 17.7761 4 17.5V2.5Z" fill="#ffffff" />
      <path d="M12 2V6H16L12 2Z" fill="#dbeafe" />
      <rect x="6.5" y="9.5" width="5" height="2" rx="0.5" fill="#2563c7" />
      <rect x="6.5" y="13.5" width="7.5" height="2" rx="0.5" fill="#2563c7" />
    </svg>
  );
}

export function JaneSmithAvatar({ size = 20 }) {
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
