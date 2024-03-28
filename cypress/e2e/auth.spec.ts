import DevicesListPage from '../pages/devices-list.page'

const devicesListPage = new DevicesListPage()
describe('Authorization', () => {
  it('requires authorizations', () => {
    cy.visit('/hyuperion_enterprises')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
  })

  it('logs in with test user', () => {
    cy.loginAsTestUser()
    devicesListPage.load()
  })

  it('log out affordance exists for users', () => {
    cy.loginAsTestUser()
    devicesListPage.load()
    cy.get('[href="/logout"]').should('be.visible')
  })

  it('logs out', () => {
    //Can't test Auth0 Pages https://docs.cypress.io/guides/testing-strategies/auth0-authentication#What-you-ll-learn
    cy.loginAsTestUser()
    devicesListPage.load()
    cy.get('[href="/logout"]').click()
    cy.get('input#username')
    cy.get('input#password')
    cy.contains('button', 'Log in').should('be.visible')
  })
})
