import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { expect, type Page } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';

export const authenticatedStatePath = 'e2e/.auth/user.json';
const authenticatedSessionStoragePath = 'e2e/.auth/session-storage.json';

const username = process.env['DAMAP_E2E_USERNAME'] ?? 'admin';
const password = process.env['DAMAP_E2E_PASSWORD'] ?? 'admin';

export async function loginWithKeycloak(page: Page): Promise<void> {
  await expect
    .poll(
      async () => {
        if (/localhost:8087\/realms\/damap/.test(page.url())) {
          return 'keycloak';
        }

        const serverDownMessage = page.getByText(/servers-down|Failed to establish connection/i);
        if (await serverDownMessage.isVisible()) {
          return 'server-down';
        }

        return page.url();
      },
      {
        message: 'Expected DAMAP to redirect to Keycloak after opening an authenticated route.',
      },
    )
    .toBe('keycloak');

  await page.getByLabel(/username|email/i).fill(username);
  await page.getByLabel(/^password$/i).fill(password);
  await page.getByRole('button', { name: /sign in|log in/i }).click();

  await expect(page).toHaveURL(/\/dashboard(?:[/?#]|$)/);
}

export async function acceptConsentDialogIfPresent(page: Page): Promise<void> {
  const dialog = page.getByRole('dialog', {
    name: /Data Protection Declaration of Consent DAMAP/i,
  });

  const isDialogVisible = await dialog
    .waitFor({ state: 'visible', timeout: 5_000 })
    .then(() => true)
    .catch(() => false);

  if (!isDialogVisible) {
    return;
  }

  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().endsWith('/api/consent') && response.request().method() === 'POST',
    ),
    dialog.getByRole('button', { name: /^Accept$/i }).click(),
  ]);

  await expect(dialog).toBeHidden();
}

export async function saveAuthenticatedState(page: Page): Promise<void> {
  await mkdir(dirname(authenticatedStatePath), { recursive: true });
  await page.context().storageState({ path: authenticatedStatePath });

  const sessionStorageState = await page.evaluate(() =>
    Object.fromEntries(
      Array.from({ length: window.sessionStorage.length }, (_, index) => {
        const key = window.sessionStorage.key(index);
        return [key, key === null ? null : window.sessionStorage.getItem(key)];
      }).filter((entry): entry is [string, string] => entry[0] !== null && entry[1] !== null),
    ),
  );

  await writeFile(authenticatedSessionStoragePath, JSON.stringify(sessionStorageState), 'utf-8');
}

export async function restoreAuthenticatedSession(page: Page): Promise<void> {
  const sessionStorageState = JSON.parse(
    await readFile(authenticatedSessionStoragePath, 'utf-8'),
  ) as Record<string, string>;

  await page.addInitScript((state: Record<string, string>) => {
    for (const [key, value] of Object.entries(state)) {
      window.sessionStorage.setItem(key, value);
    }
  }, sessionStorageState);
}
