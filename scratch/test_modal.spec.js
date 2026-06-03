import { test, expect } from '@playwright/test';

test('verify add and edit modals', async ({ page }) => {
  // Set viewport size
  await page.setViewportSize({ width: 1280, height: 800 });

  // Navigate to dev server
  console.log('Navigating to http://localhost:5175/...');
  await page.goto('http://localhost:5175/');
  await page.waitForLoadState('networkidle');

  // 1. ADD FLOW
  console.log('Opening Add Claim modal...');
  await page.click('button.add-claim-button');
  
  // Fill description
  await page.fill('.add-edit-textarea-wrap textarea', 'Business lunch with partners');
  
  // Open date picker and select a date
  await page.click('.add-edit-date-input');
  // Select first day that is not empty
  const dayButton = await page.locator('.add-edit-calendar-days button:not(.is-selected)').first();
  await dayButton.click();

  // Click Next
  await page.click('button[type="submit"]'); // Submit/Next
  
  // Fill category details
  await page.selectOption('.add-edit-category-body select', 'Food');
  await page.fill('.add-edit-category-body input[type="number"]', '12500');
  await page.fill('.add-edit-category-body textarea', 'Team lunch at local restaurant');

  // Click Submit (transitions to confirm state)
  await page.click('button[type="submit"]');
  await page.waitForSelector('.claim-status-modal');

  // Log Add Modal details
  const addTitle = await page.locator('.claim-status-modal .claim-modal-title').textContent();
  const addClose = await page.locator('.claim-status-modal .claim-modal-close').textContent();
  const addCopy = await page.locator('.claim-status-modal .claim-status-copy').innerHTML();
  const addCancelStyle = await page.evaluate(() => {
    const btn = document.querySelector('.claim-status-modal .modal-btn-cancel');
    const style = window.getComputedStyle(btn);
    return {
      border: style.border,
      background: style.backgroundColor,
      boxShadow: style.boxShadow,
      color: style.color,
    };
  });

  console.log('--- ADD FLOW CONFIRM MODAL ---');
  console.log('Title:', addTitle.trim().replace(/\s+/g, ' '));
  console.log('Close button text:', JSON.stringify(addClose));
  console.log('Copy (HTML):', addCopy.trim().replace(/\s+/g, ' '));
  console.log('Cancel Button Style:', addCancelStyle);

  // Confirm claim submission
  await page.click('.claim-status-modal .claim-status-confirm-button');
  
  // Success modal
  await page.waitForSelector('.claim-success-modal');
  await page.click('.claim-success-modal .modal-btn-primary'); // Click Okay

  // 2. EDIT FLOW
  console.log('Opening Edit Claim modal...');
  // Click three dots action cell
  await page.click('.claims-action-cell .claims-action-trigger');
  
  // Click Edit
  await page.click('text=Edit');
  await page.waitForSelector('.add-edit-form');

  // Click Next on Step 1
  await page.click('button[type="submit"]');

  // Click Submit on Step 2 (transitions to confirm state)
  await page.click('button[type="submit"]');
  await page.waitForSelector('.claim-status-modal');

  // Log Edit Modal details
  const editTitle = await page.locator('.claim-status-modal .claim-modal-title').textContent();
  const editClose = await page.locator('.claim-status-modal .claim-modal-close').textContent();
  const editCopy = await page.locator('.claim-status-modal .claim-status-copy').innerHTML();
  const editModalClasses = await page.evaluate(() => {
    return document.querySelector('.claim-status-modal').className;
  });
  const editCancelStyle = await page.evaluate(() => {
    const btn = document.querySelector('.claim-status-modal .modal-btn-cancel');
    const style = window.getComputedStyle(btn);
    return {
      border: style.border,
      background: style.backgroundColor,
      boxShadow: style.boxShadow,
      color: style.color,
    };
  });

  console.log('--- EDIT FLOW CONFIRM MODAL ---');
  console.log('Modal classes:', editModalClasses);
  console.log('Title:', editTitle.trim().replace(/\s+/g, ' '));
  console.log('Close button text:', JSON.stringify(editClose));
  console.log('Copy (HTML):', editCopy.trim().replace(/\s+/g, ' '));
  console.log('Cancel Button Style:', editCancelStyle);
});
