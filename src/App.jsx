/**
 * App.jsx — Root Application Shell
 * ----------------------------------
 * This is the top-level component that every page in the Fowgate HR portal
 * passes through. It composes the three major layout regions side-by-side:
 *
 *   ┌──────────────┬─────────────────────────────────────┐
 *   │              │  Header (My Account + tab nav)       │
 *   │   Sidebar    ├─────────────────────────────────────┤
 *   │  (250 px)    │  Page Content                        │
 *   │              │  (ExpenseClaimsPage in this build)   │
 *   └──────────────┴─────────────────────────────────────┘
 *
 * Layout rules:
 *   • The Sidebar is fixed-position (defined in Sidebar.css) and always 250 px
 *     wide. The main area compensates with margin-left: 250px in index.css.
 *   • The Header is sticky at the top of the main column.
 *   • page-content-wrapper adds bottom padding so the last section is never
 *     flush against the edge of the viewport.
 *
 * Props passed down:
 *   • Sidebar  → activeItem="My Account"    highlights the correct nav link
 *   • Header   → activeTab="Expense Claims" underlines the correct tab
 */

// Layout components — each lives in its own file inside /components
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// The main feature page rendered in this prototype
import ExpenseClaimsPage from './components/ExpenseClaimsPage';

// App-level CSS (currently just a comment; global styles live in index.css)
import './App.css';

function App() {
  return (
    /**
     * dashboard-container
     * A full-width flex row defined in index.css.
     * The Sidebar sits on the left; the main area grows to fill the rest.
     */
    <div className="dashboard-container">

      {/* ── Left Sidebar ──────────────────────────────────────────────────
          Fixed column, always visible. activeItem controls which link
          is highlighted with the white left-border indicator.          */}
      <Sidebar activeItem="My Account" />

      {/* ── Main Content Column ───────────────────────────────────────────
          Grows to fill the remaining width after the 250 px sidebar.
          Stacks the Header on top and the page content below it.       */}
      <main className="dashboard-main-area">

        {/* Header — "My Account" title, search bar, bell, profile, and
            the horizontal tab row. activeTab keeps "Expense Claims"
            underlined in blue.                                          */}
        <Header activeTab="Expense Claims" />

        {/* Scrollable page body — wraps the Expense Claims feature page.
            The page-content-wrapper class adds 40 px bottom padding so
            content is never flush against the bottom of the viewport.  */}
        <div className="page-content-wrapper">
          <ExpenseClaimsPage />
        </div>

      </main>
    </div>
  );
}

export default App;
