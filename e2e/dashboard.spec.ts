import { expect, test } from '@playwright/test';
import { restoreAuthenticatedSession } from './support/auth';

test('shows the authenticated dashboard', async ({ page }) => {
  await restoreAuthenticatedSession(page);
  await page.goto('/dashboard');

  await expect(page).toHaveURL(/^http:\/\/localhost:4200\/dashboard(?:[/?#]|$)/);
  await expect(page.locator('mat-nav-list a[href="/dashboard"]')).toBeVisible();
  await expect(page.locator('mat-nav-list a[href="/plans"]')).toBeVisible();
  await expect(page.locator('app-dashboard app-flip-card')).toHaveCount(4);
});
