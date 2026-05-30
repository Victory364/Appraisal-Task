
/**
 * main.jsx — Application Entry Point
 * ------------------------------------
 * This is the very first JavaScript file that runs when the app starts.
 * It mounts the entire React component tree onto the <div id="root">
 * element that lives inside index.html.
 *
 * StrictMode is a React development helper. It does NOT affect the
 * production build — it only runs in dev mode to:
 *   • Detect components with side-effects in the wrong lifecycle stage
 *   • Warn about deprecated API usage
 *   • Double-invoke renders intentionally to surface bugs early
 *
 * index.css is imported here so its global reset rules and CSS variables
 * are applied to the whole page before any component renders.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Global styles — resets, CSS custom properties, and the root layout grid
import './index.css';

// The top-level App component that assembles Sidebar + Header + page content
import App from './App.jsx';

/**
 * createRoot() — React 18's way of mounting the app.
 * It targets the <div id="root"> in index.html and takes over all rendering
 * inside it.  render(<StrictMode>) wraps the whole tree so every component
 * gets the strict-mode checks for free.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
