/**
 * Sidebar.jsx — Left Navigation Sidebar
 * ----------------------------------------
 * Renders the dark fixed sidebar that appears on the left of every page
 * in the Fowgate HR portal.
 */

import { Fragment } from 'react';

// Component-scoped styles — sidebar shape, colours, menu item layout
import './Sidebar.css';

// ── Icon Assets ────────────────────────────────────────────────────────────
import fowgateLogo from '../../assets/Fowgate Folder/fowgate logo.png';
import dashboardIcon from '../../assets/Fowgate Folder/category.svg';
import userIcon from '../../assets/Fowgate Folder/user.svg';
import messageIcon from '../../assets/Fowgate Folder/Frame.svg';
import briefcaseIcon from '../../assets/Fowgate Folder/briefcase-01.svg';
import checkCircleIcon from '../../assets/Fowgate Folder/Frame-1.svg';
import calendarIcon from '../../assets/Fowgate Folder/calendar-03.svg';
import searchUserIcon from '../../assets/Fowgate Folder/user-star-02.svg';
import usersIcon from '../../assets/Fowgate Folder/user-group.svg';
import payrollIcon from '../../assets/Fowgate Folder/calculator-01.svg';
import shieldIcon from '../../assets/Fowgate Folder/Frame-2.svg';
import chartIcon from '../../assets/Fowgate Folder/Frame-3.svg';
import reportIcon from '../../assets/Fowgate Folder/pie-chart.svg';
import buildingIcon from '../../assets/Fowgate Folder/document-attachment.svg';
import settingsIcon from '../../assets/Fowgate Folder/Settings.svg';

const icons = {
  dashboard: dashboardIcon,
  user: userIcon,
  message: messageIcon,
  briefcase: briefcaseIcon,
  checkCircle: checkCircleIcon,
  calendar: calendarIcon,
  searchUser: searchUserIcon,
  users: usersIcon,
  payroll: payrollIcon,
  shield: shieldIcon,
  chart: chartIcon,
  building: buildingIcon,
  report: reportIcon,
  settings: settingsIcon,
};

function SidebarIcon({ type, altText }) {
  const src = icons[type];
  if (!src) return null;
  return <img src={src} alt={altText} className="sidebar-icon-img" />;
}

export default function Sidebar({ activeItem = 'My Account', onNavChange }) {
  const navGroups = [
    {
      title: 'General',
      items: [
        { name: 'Dashboard', icon: 'dashboard' },
        { name: 'My Account', icon: 'user' },
      ],
    },
    {
      title: 'Collaboration',
      items: [
        { name: 'Messages', icon: 'message' },
        { name: 'Projects', icon: 'briefcase' },
        { name: 'Approvals', icon: 'checkCircle' },
        { name: 'Calendar', icon: 'calendar' },
      ],
    },
    {
      title: 'HRM',
      items: [
        { name: 'ATS', icon: 'searchUser' },
        { name: 'Teams', icon: 'users' },
        { name: 'Payroll', icon: 'payroll' },
        { name: 'Compliance Management', icon: 'shield' },
        { name: 'Analysis & Reporting', icon: 'chart' },
        { name: 'Company Calendar', icon: 'calendar' },
        { name: 'Settings', icon: 'settings' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { name: 'Business Entities', icon: 'building' },
        { name: 'Reports', icon: 'report' },
      ],
    },
  ];

  return (
    <aside className="fowgate-sidebar">
      <div className="sidebar-logo-container">
        <img src={fowgateLogo} alt="Fowgate" className="sidebar-logo-img" />
      </div>

      <div className="sidebar-divider"></div>

      {navGroups.map((group, groupIdx) => (
        <Fragment key={groupIdx}>
          <div className="sidebar-nav-group">
            <div className="group-header">{group.title}</div>
            <ul className="sidebar-menu-list">
              {group.items.map((item, itemIdx) => {
                const isSelected = item.name === activeItem;

                return (
                  <li
                    key={itemIdx}
                    className={`sidebar-menu-item ${isSelected ? 'active' : ''}`}
                  >
                    <a
                      href={`#${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="menu-item-link"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavChange) {
                          onNavChange(item.name);
                        }
                      }}
                    >
                      <SidebarIcon type={item.icon} altText={item.name} />
                      <span>{item.name}</span>
                    </a>
                  </li>
                );
              })}

            </ul>
          </div>

          {groupIdx < navGroups.length - 1 && (
            <div className="sidebar-divider"></div>
          )}
        </Fragment>
      ))}
    </aside>
  );
}
