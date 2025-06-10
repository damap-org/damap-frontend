describe('access', () => {
  beforeEach(() => {
    cy.fixture('users').then(users => cy.login(users.username, users.password));
    cy.visit('/plans');
    cy.get('table').should('exist');
  });

  afterEach(() => cy.logout());

  it('should add dmp editor', () => {
    cy.intercept('POST', '/api/access').as('createAccess');
    cy.get('app-dmp-table tr').first().get('td').last().click();
    cy.get('div.mat-mdc-menu-content button')
      .get('mat-icon')
      .contains('admin_panel_settings')
      .click();
    cy.get('damap-person-card mat-checkbox').first().click();
    cy.wait('@createAccess');
  });

  it('should delete dmp editor', () => {
    cy.intercept('DELETE', '/api/access/*').as('deleteAccess');
    cy.get('app-dmp-table tr').first().get('td').last().click();
    cy.get('div.mat-mdc-menu-content button')
      .get('mat-icon')
      .contains('admin_panel_settings')
      .click();
    cy.get('damap-person-card mat-checkbox').first().click();
    cy.wait('@deleteAccess');
  });
});
