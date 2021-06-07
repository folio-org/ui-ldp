describe('ui-ldp: query builder', () => {
  before('logs in and navigates to LDP', () => {
    cy.login('diku_admin', 'admin')
    cy.get('#app-list-item-clickable-ldp-module').click()
  })

  describe('schema/table selection and record retrieval', () => {
    it('cannot initially add a filter', () => {
      cy.get('[data-cy="tables[0].addFilter"]').should('have.attr', 'disabled')
    })
    it('selects schema and table', () => {
      // For some reason, the data-cy attributes are not in the DOM, hence the use of name
      cy.get('[name="tables[0].schema"]').click()
      cy.contains('div[data-test-selection-option-segment="true"]', 'public').click()
      cy.get('[name="tables[0].tableName"]').click()
      // I don't understand by the "user_users" entry here is invisible, but it is
      cy.contains('div[data-test-selection-option-segment="true"]', 'user_users').click({force: true})
    })
    it('can now add a filter', () => {
      cy.get('[data-cy="tables[0].addFilter"]').should('not.have.attr', 'disabled')
    })
    it('can search for up to 10 users', () => {
      cy.get('[data-cy="tables[0].limit"]').select('10');
      cy.get('[data-cy="tables[0].submit"]').click()
      cy.contains('[data-cy="tables[0].message"]', /Found more than [0-9]+ records/);
    })
    it('can increase the number of records to 1000', () => {
      cy.get('[data-cy="tables[0].limit"]').select('1000');
      cy.get('[data-cy="tables[0].submit"]').click()
      cy.contains('[data-cy="tables[0].message"]', /Found [0-9]+ records/);
    })
  })
})
