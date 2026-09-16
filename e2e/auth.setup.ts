import { expect, test } from '@playwright/test';
import {
  acceptConsentDialogIfPresent,
  loginWithKeycloak,
  saveAuthenticatedState,
} from './support/auth';
import { verifyBackendPrerequisites } from './support/preflight';

test('authenticate DAMAP user', async ({ page }) => {
  await verifyBackendPrerequisites();

  await page.goto('/dashboard');
  await loginWithKeycloak(page);
  await acceptConsentDialogIfPresent(page);

  await expect(page).toHaveURL(/\/dashboard(?:[/?#]|$)/);
  await expect(page.locator('mat-sidenav')).toBeVisible();
  await expect(page.locator('mat-nav-list a[href="/dashboard"]')).toBeVisible();
  await saveAuthenticatedState(page);
});
