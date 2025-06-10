describe('delete dmp', () => {
  before(() => {
    cy.fixture('users').then(users => cy.login(users.username, users.password));
  });

  beforeEach(() => {
    cy.visit('/plans');
  });

  after(() => cy.logout());

  it('should delete dmp', () => {
    cy.intercept('DELETE', '/api/dmps/*').as('deleteDmp');
    cy.get('app-dmp-table tr').first().get('td').last().click();
    cy.get('div.mat-mdc-menu-content button')
      .get('mat-icon')
      .contains('delete')
      .click();
    cy.get('damap-delete-warning-dialog > mat-dialog-actions > button')
      .last()
      .click();
    cy.wait('@deleteDmp');
  });
});
