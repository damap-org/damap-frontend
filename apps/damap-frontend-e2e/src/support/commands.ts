// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare namespace Cypress {
  interface Chainable<Subject> {
    login(email: string, password: string): void;
    logout(): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('login', (user, password) => {
  cy.intercept('GET', '/api/consent').as('consent');
  cy.visit('/');
  // For Keycloak login mask
  cy.get('input#username').type(user);
  cy.get('input#password').type(password);
  cy.get('input#kc-login').click();
  cy.get('a#damap-logo').contains('DAMAP');
  // Check if consent popup is shown
  cy.wait('@consent').then(interception => {
    if (interception.response.body.consentGiven !== true) {
      cy.get('app-consent button').click();
    }
  });
});
//

Cypress.Commands.add('logout', () => {
  cy.get('button#logout').click();
  cy.get('div#kc-header-wrapper').contains('damap');
});
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
