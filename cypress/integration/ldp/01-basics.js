import localforage from 'localforage'


describe('Sanity test', () => {
  it('checks one and one is two', () => {
    expect(1 + 1).to.equal(2)
  })
})


describe('ui-ldp: application exists', () => {
  describe('Login > navigate to app > verify tabs work', () => {
    // These first two steps are the same as cy.login()

    it('logs out if already logged in', () => {
      // We use a behind-the-scenes method of ensuring we are logged
      // out, rather than using the UI, in accordance with the Best
      // Practices guidance at
      // https://docs.cypress.io/guides/references/best-practices.html#Organizing-Tests-Logging-In-Controlling-State
      localforage.removeItem('okapiSess')
    })

    it('logs in', () => {
      // But it's not feasible to log in to Stipes using a similar
      // behind-the-scenes approach, so we have to use the UI.
      // Looong timeout since we have to wait for the Stripes bundle to build
      cy.visit('', { timeout: 120000 })
      cy.contains('Log in')
      cy.get('#input-username').type('diku_admin')
      cy.get('#input-password').type('admin')
      cy.get('#clickable-login').click()
      // Login can be too slow for the default 4-second timeout
      cy.contains('Welcome', { timeout: 120000 })
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000) // Otherwise sometimes the app button becomes detached from the DOM
    })

    it('should open app and see selected Query Builder tab', () => {
      cy.get('#app-list-item-clickable-ldp-module').click()
      cy.url().should('contain', '/ldp')
      cy.contains('[data-cy=nav-queryBuilder]', /^Query builder$/)
    })
  })
})
