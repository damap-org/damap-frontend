describe('dmp', () => {
  before(() => {
    cy.fixture('users').then(users => cy.login(users.username, users.password));
  });

  beforeEach(() => {
    cy.visit('/');
  });

  after(() => cy.logout());

  it('should create and autosave dmp', () => {
    cy.intercept('PUT', '/api/dmps/*').as('updateDmp');
    cy.intercept('POST', '/api/fits/examine').as('examineFile');
    // Create new dmp
    cy.get('div.button-row-left > button').last().click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(100);

    // Get stepper headers
    cy.get(
      'app-dmp mat-vertical-stepper mat-step-header > div.mat-step-label > div',
    ).as('steps');

    // Create new project
    cy.get('app-dmp-project mat-tab-group div.mat-mdc-tab-labels > div')
      .last()
      .click();
    cy.get('app-dmp-project app-manual-project-input app-input-wrapper input')
      .first()
      .type('Test Project');
    cy.get('app-dmp-project mat-datepicker-toggle').click();
    cy.get('button.mat-calendar-body-active').first().click();
    cy.get(
      'div.cdk-overlay-container mat-calendar button.mat-calendar-body-active',
    )
      .last()
      .click();
    cy.get(
      'app-dmp-project app-manual-project-input app-textarea-wrapper textarea',
    )
      .first()
      .type('Test Description');
    cy.get('app-dmp-project app-manual-project-input > form > button').click();

    // Add contributor via search
    cy.get('@steps').contains('People').click();
    cy.get('app-person-search input').first().type('Test', { force: true });
    cy.get('.search-result mat-option').first().click();

    // Add new data
    cy.get('@steps').contains('Specify').click();
    cy.wait('@updateDmp'); // Wait for DMP being saved. Otherwise, radio button might become unselected again.
    cy.get('app-created-data app-data-mc mat-radio-group').scrollIntoView();
    cy.get('app-created-data app-data-mc mat-radio-group [type=radio]')
      .last()
      .click();

    // Use file upload
    cy.get('app-created-data mat-tab-group div.mat-mdc-tab-labels > div')
      .last()
      .click();
    cy.get('app-created-data app-file-upload .dropzone').scrollIntoView();
    cy.get('app-created-data app-file-upload .dropzone').selectFile(
      {
        contents: Cypress.Buffer.from('file contents'),
        fileName: 'file.txt',
        mimeType: 'text/plain',
        lastModified: Date.now(),
      },
      { action: 'drag-drop' },
    );
    cy.wait('@examineFile');
    cy.get('app-created-data app-dataset-table table tbody tr')
      .last()
      .contains('file.txt');
    cy.get('app-save-status > div').contains('You have unsaved changes.');

    // Check autosave
    cy.get('@steps').contains('Documentation').scrollIntoView();
    cy.get('@steps').contains('Documentation').click();
    cy.get('app-save-status > div').contains('All changes have been saved.');

    // Search for repository
    cy.get('@steps').contains('repositories').click();
    cy.get('app-dmp-repo h2').scrollIntoView();
    cy.get('app-dmp-repo mat-tab-group div.mat-mdc-tab-labels > div')
      .last()
      .click();
    cy.get('app-dmp-repo app-repo-filter').first().click();
    cy.get('app-tree-select-form-field input').first().type('Education');
    cy.get('mat-tree-node > button').first().click();
    cy.get('mat-tree-node > button').then(items => items[2].click());
    cy.get('mat-tree mat-tree-node > mat-checkbox')
      .contains('Education')
      .click();
    cy.get('filter-dialog > mat-dialog-actions > button').last().click();
    cy.get('app-dmp-repo app-tag').should('exist');

    // Go back to plans
    cy.get('@steps').contains('Summary').scrollIntoView();
    cy.get('@steps').contains('Summary').click();
    cy.get('mat-nav-list > a').contains('DMPs').click();

    // Check if dmp shows in list
    cy.get('app-dmp-table table')
      .first()
      .get('tr > td > a > h3')
      .contains('Test Project');
  });
});
