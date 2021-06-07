describe('ui-ldp: settings pages', () => {
  before('logs in and navigates to LDP settings', () => {
    cy.login('diku_admin', 'admin')
    cy.get('#app-list-item-clickable-settings').click()
    cy.get('[href="/settings/ldp"]').click()
  })

  describe('set record limits', () => {
    it('can set initial values', () => {
      cy.contains('Record limits').click()
      cy.url().should('contain', '/settings/ldp/limits')
      cy.get('#defaultShow').select('1')
      cy.get('#maxShow').select('10')
      cy.get('#maxExport').select('1000')
    })
    it('can verify the values it set', () => {
      cy.get('#defaultShow').should('have.value', '1')
      cy.get('#maxShow').should('have.value', '10')
      cy.get('#maxExport').should('have.value', '1000')
    })
    it('can save the changed values', () => {
      // Sometimes it may happen that the existing settings were
      // already those we are trying to set it to. In this case the
      // Save button will be disabled, but we can force-press it anyway.
      // eslint-disable-next-line cypress/no-force
      cy.get('button').contains('Save').click({ force: true })
      // We can't make this check in general, because we don't get the
      // toast in the case that the Save button was disabled
      // cy.contains('was successfully updated')
    })
    it('can navigate away and return, and see the saved values', () => {
      cy.contains('Software versions').click()
      cy.url().should('contain', '/settings/about')
      cy.get('[href="/settings/ldp"]').click()
      cy.contains('Record limits').click()
      cy.url().should('contain', '/settings/ldp/limits')
      cy.get('#defaultShow').should('have.value', '1')
      cy.get('#maxShow').should('have.value', '10')
      cy.get('#maxExport').should('have.value', '1000')
    })
    it('can set different, more sensible, values', () => {
      cy.get('#defaultShow').select('100')
      cy.get('#maxShow').select('1000')
      cy.get('#maxExport').select('10000')
    })
    it('can verify the new values it set', () => {
      cy.get('#defaultShow').contains('100')
      cy.get('#maxShow').should('have.value', '1000')
      cy.get('#maxExport').should('have.value', '10000')
    })
    it('can save the sensible values', () => {
      cy.get('button').contains('Save').click()
    })
  })

  describe('set table availability', () => {
    const fields = [
      'folio_reporting-users_groups',
      'folio_reporting-users_addresses',
      'folio_reporting-requests_items',
    ]

    it('can set values', () => {
      cy.contains('Table availability').click()
      cy.url().should('contain', '/settings/ldp/tables')
      fields.forEach(field => {
        cy.get(`[data-cy="${field}"]`).should('have.value', '')
        cy.get(`[data-cy="${field}"]`).click()
        cy.get(`[data-cy="${field}"]`).should('have.value', 'true')
      })
      cy.get('button').contains('Save').click()
    })

    it('can navigate away and return, and see the saved values', () => {
      cy.contains('Software versions').click()
      cy.url().should('contain', '/settings/about')
      cy.get('[href="/settings/ldp"]').click()
      cy.contains('Table availability').click()
      cy.url().should('contain', '/settings/ldp/tables')
      fields.forEach(field => {
        cy.get(`[data-cy="${field}"]`).should('have.value', 'true')
      })
    })

    it('can reset values', () => {
      fields.forEach(field => {
        cy.get(`[data-cy="${field}"]`).should('have.value', 'true')
        cy.get(`[data-cy="${field}"]`).click()
        // Annoyingly, checkboxes have three possible values; '', 'true', 'false'
        cy.get(`[data-cy="${field}"]`).should('have.value', 'false')
      })
      cy.get('button').contains('Save').click()
    })

    it('can navigate away and return, and see the reset values', () => {
      cy.contains('Software versions').click()
      cy.url().should('contain', '/settings/about')
      cy.get('[href="/settings/ldp"]').click()
      cy.contains('Table availability').click()
      cy.url().should('contain', '/settings/ldp/tables')
      fields.forEach(field => {
        cy.get(`[data-cy="${field}"]`).should('have.value', '')
      })
    })
  })
})
