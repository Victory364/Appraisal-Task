/**
 * Sidebar.jsx — Left Navigation Sidebar
 * ----------------------------------------
 * Renders the dark fixed sidebar that appears on the left of every page
 * in the Fowgate HR portal.
 *
 * Visual structure:
 *   ┌──────────────────┐
 *   │  [Fowgate Logo]  │  ← sidebar-logo-container
 *   │ ─────────────── │  ← sidebar-divider
 *   │  GENERAL         │  ← group-header (uppercased section label)
 *   │    Dashboard     │  ← sidebar-menu-item
 *   │  ● My Account    │  ← sidebar-menu-item.active (highlighted)
 *   │ ─────────────── │
 *   │  COLLABORATION   │
 *   │    Messages      │
 *   │    ...           │
 *   └──────────────────┘
 *
 * Props:
 *   activeItem {string} — Name of the nav item that should appear selected
 *                         (white left-border + bold text). Default: 'My Account'
 *
 * How the active state works:
 *   Each <li> compares item.name === activeItem.  If true it receives the
 *   'active' CSS class which applies the white left-border indicator and
 *   bold white text (see Sidebar.css for the rules).
 *
 * Icon system:
 *   All sidebar icons are SVG files bundled via Vite's asset pipeline.
 *   They are collected into the `icons` lookup object so the navGroups
 *   data can reference them by a short string key (e.g. 'dashboard')
 *   instead of importing each icon individually in the data structure.
 *   The <SidebarIcon> helper component does the icon → <img> conversion.
 */

import { Fragment } from 'react';

// Component-scoped styles — sidebar shape, colours, menu item layout
import './Sidebar.css';

// ── Icon Assets ────────────────────────────────────────────────────────────
// Each icon is an SVG imported as a URL string by Vite.
// They are rendered white by CSS filter: brightness(0) invert(1) in Sidebar.css.
import fowgateLogo    from '../../assets/Fowgate Folder/fowgate logo.png';
import dashboardIcon  from '../../assets/Fowgate Folder/category.svg';
import userIcon       from '../../assets/Fowgate Folder/user.svg';
import messageIcon    from '../../assets/Fowgate Folder/Frame.svg';
import briefcaseIcon  from '../../assets/Fowgate Folder/briefcase-01.svg';
import checkCircleIcon from '../../assets/Fowgate Folder/Frame-1.svg';
import calendarIcon   from '../../assets/Fowgate Folder/calendar-03.svg';
import searchUserIcon from '../../assets/Fowgate Folder/user-star-02.svg';
import usersIcon      from '../../assets/Fowgate Folder/user-group.svg';
import payrollIcon    from '../../assets/Fowgate Folder/calculator-01.svg';
import shieldIcon     from '../../assets/Fowgate Folder/Frame-2.svg';
import chartIcon      from '../../assets/Fowgate Folder/Frame-3.svg';
import reportIcon     from '../../assets/Fowgate Folder/pie-chart.svg';
import buildingIcon   from '../../assets/Fowgate Folder/document-attachment.svg';
import settingsIcon   from '../../assets/Fowgate Folder/Settings.svg';


// ── Icon Lookup Map ────────────────────────────────────────────────────────
/**
 * Maps each short string key used in navGroups.items to the actual imported
 * icon URL. This keeps the data structure below clean and readable.
 * To add a new icon: import it above, then add a key here.
 */
const icons = {
  dashboard:   dashboardIcon,
  user:        userIcon,
  message:     messageIcon,
  briefcase:   briefcaseIcon,
  checkCircle: checkCircleIcon,
  calendar:    calendarIcon,
  searchUser:  searchUserIcon,
  users:       usersIcon,
  payroll:     payrollIcon,
  shield:      shieldIcon,
  chart:       chartIcon,
  building:    buildingIcon,
  report:      reportIcon,
  settings:    settingsIcon,
};


// ── SidebarIcon Helper ─────────────────────────────────────────────────────
/**
 * A tiny presentational component that resolves an icon key to an <img> tag.
 *
 * Props:
 *   type    {string} — key from the icons map above (e.g. 'dashboard')
 *   altText {string} — accessible alt text (usually the nav item name)
 *
 * Returns null if the key does not exist, so missing icons don't crash the app.
 */
function SidebarIcon({ type, altText }) {
  const src = icons[type];
  if (!src) return null; // fail gracefully — renders nothing for unknown keys
  return <img src={src} alt={altText} className="sidebar-icon-img" />;
}


// ── Sidebar Component ──────────────────────────────────────────────────────
export default function Sidebar({ activeItem = 'My Account', onNavChange }) {

  /**
   * navGroups — the full navigation data structure
   * ------------------------------------------------
   * Each group has a title (the grey uppercase label) and an array of items.
   * Each item has:
   *   name {string} — display label AND the value compared to `activeItem`
   *   icon {string} — key into the `icons` map above
   *
   * Groups are separated by a .sidebar-divider line automatically — see the
   * rendering logic below which adds a divider after every group except last.
   */
  const navGroups = [
    {
      title: 'General',
      items: [
        { name: 'Dashboard',    icon: 'dashboard' },
        { name: 'My Account',   icon: 'user' },
      ],
    },
    {
      title: 'Collaboration',
      items: [
        { name: 'Messages',  icon: 'message' },
        { name: 'Projects',  icon: 'briefcase' },
        { name: 'Approvals', icon: 'checkCircle' },
        { name: 'Calendar',  icon: 'calendar' },
      ],
    },
    {
      title: 'HCM',
      // Human Capital Management — people, payroll, compliance tools
      items: [
        { name: 'ATS',                    icon: 'searchUser' }, // Applicant Tracking
        { name: 'Teams',                  icon: 'users' },
        { name: 'Payroll',                icon: 'payroll' },
        { name: 'Company Calendar',       icon: 'calendar' },
        { name: 'Compliance Management',  icon: 'shield' },
        { name: 'Analysis & Reporting',   icon: 'chart' },
        { name: 'Settings',               icon: 'settings' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { name: 'Business Entities', icon: 'building' },
        { name: 'Reports',           icon: 'report' },
      ],
    },
  ];

  return (
    /**
     * <aside> is the correct semantic HTML5 element for a navigation sidebar.
     * fowgate-sidebar applies the dark gradient background, fixed positioning,
     * and scroll behaviour defined in Sidebar.css.
     */
    <aside className="fowgate-sidebar">

      {/* ── Logo ──────────────────────────────────────────────────────────
          The Fowgate wordmark/logo image at the very top of the sidebar.
          The ::after pseudo-element on sidebar-logo-container draws the
          subtle fading gradient divider line below the logo.            */}
      <div className="sidebar-logo-container">
        <img src={fowgateLogo} alt="Fowgate" className="sidebar-logo-img" />
      </div>

      {/* Standalone divider rule between the logo and the first nav group */}
      <div className="sidebar-divider"></div>

      {/* ── Navigation Groups ─────────────────────────────────────────────
          Each group is wrapped in <Fragment> so we can conditionally
          render the divider after it (all except the very last group)
          without adding extra DOM wrappers that would break spacing.    */}
      {navGroups.map((group, groupIdx) => (
        <Fragment key={groupIdx}>

          <div className="sidebar-nav-group">
            {/* Section label — e.g. "GENERAL", "COLLABORATION" */}
            <div className="group-header">{group.title}</div>

            {/* List of nav items in this group */}
            <ul className="sidebar-menu-list">
              {group.items.map((item, itemIdx) => {
                // Compare this item's name to the activeItem prop to decide
                // whether to apply the 'active' CSS class
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
                        if (item.tab && onNavChange) {
                          e.preventDefault();
                          onNavChange(item.tab);
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

          {/* Render a divider after each group EXCEPT the very last one */}
          {groupIdx < navGroups.length - 1 && (
            <div className="sidebar-divider"></div>
          )}

        </Fragment>
      ))}

    </aside>
  );
}
