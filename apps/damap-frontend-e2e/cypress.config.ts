import { defineConfig } from 'cypress';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    baseUrl: 'http://localhost:4200',
    specPattern: [
      '**/app.cy.ts',
      '**/dmp.cy.ts',
      '**/access.cy.ts',
      '**/delete-dmp.cy.ts',
      '**/*.cy.ts',
    ],
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
});
