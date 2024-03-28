class DevicesListPage {
  load() {
    Cypress.log({
      name: 'loadDevicesListPage',
      // shorter name for the Command Log
      displayName: 'load',
      message: `Loading devices list page`
    })
    cy.visit('/', { log: false })
    cy.contains('All devices', { timeout: 10000, log: false })
  }

  selectAll() {
    //check that a row has loaded to verify we can press select all
    cy.wait(5000)
    this.getRow(0)
    cy.get('[aria-label="Select all rows"]').click({ force: true })
  }

  clearSelection() {
    cy.get('[aria-label="Unselect all rows"]').click()
  }

  openDeployMenu() {
    cy.get('[data-test-id="deploy-button"]').click()
  }

  getRow(i: number) {
    return cy.get(`[data-rowindex=${i}]`, { timeout: 20000 })
  }

  selectRow(i: number) {
    return this.getRow(i).within(() => {
      cy.get('[aria-label="Select row"]').click()
    })
  }

  getNameFromRow(row: Cypress.Chainable<JQuery<HTMLElement>>) {
    return row.find('[data-field="name"] a').then((a) => {
      return a.text()
    })
  }

  openDeviceInfo(deviceName: string) {
    cy.contains(deviceName.trim()).click()
    cy.url().should('include', 'info')
  }

  openFilterModal() {
    cy.contains('Filter').click()
  }

  getGroupTab(groupName: string) {
    return cy.get(`[data-testid="${groupName}-group-tab"]`)
  }

  getGroupTabCount(groupName: string) {
    return cy.get(`[data-testid="${groupName}-group-tab-count"]`)
  }
}

export default DevicesListPage
