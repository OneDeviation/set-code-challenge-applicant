import CreatePackagePage from '../pages/create-package-page'
import DeployMenu from '../pages/deploy-menu.page'
import DeviceDetailsPage from '../pages/device-details.page'
import DevicesListPage from '../pages/devices-list.page'
import NavBar from '../pages/nav-bar.page'
import PackagesPage from '../pages/packages-page'
import DeviceInfo from '../utils/device-info'
import { Connect } from 'support'

const connect = new Connect()

describe('Custom package install', () => {
  const customPackageName = 'test package installer 12345'
  const customPackageDescription = 'test package made in cypress tests'
  const customPackageVersion = '12'
  const customPackageTimeout = '1'
  before(() => {
    cy.loginAsTestUser()
  })

  beforeEach(() => {
    cy.loginAsTestUser()
    cy.visit('/')
  })

  after(() => {
    cy.log('Cleaning up after all tests')
    connect.navBar.openPackages()
    connect.packagesPage.packagesGrid.contains(customPackageName).click()
    cy.get('[data-testid="MoreVertIcon"]').click()
    cy.contains('#package-menu ul li', 'Delete package').click()
    cy.contains('button', 'Delete').click()
  })

  it('Can create a custom package', () => {
    // create custom package
    connect.navBar.openPackages()
    connect.packagesPage.createPackageButton.click()
    connect.createPackagePage.fillPackageInfo(
      customPackageName,
      customPackageDescription,
      customPackageVersion,
      customPackageTimeout
    )
    connect.createPackagePage.createPackageStep(
      './cypress/resources/hello.exe',
      '420',
      '/S'
    )
    connect.createPackagePage.saveButton.click()
    connect.packagesPage.searchBox.click().type(customPackageName)
    connect.packagesPage.packagesGrid.contains(customPackageName).click()
  })

  it('Custom package saved correctly', () => {
    connect.navBar.openPackages()
    connect.packagesPage.packagesGrid.contains(customPackageName).click()
    connect.createPackagePage.versionEntry
      .find('input')
      .invoke('val')
      .should('eq', customPackageVersion)
    connect.createPackagePage.timeoutEntry
      .find('input')
      .invoke('val')
      .should('eq', customPackageTimeout)
    connect.createPackagePage.nameEntry
      .find('input')
      .invoke('val')
      .should('eq', customPackageName)
    connect.createPackagePage.descriptionEntry
      .find('textarea')
      .invoke('val')
      .should('eq', customPackageDescription)
  })

  it('Can create a package with multiple steps', () => {
    connect.navBar.openPackages()
    connect.packagesPage.packagesGrid.contains(customPackageName).click()
    connect.createPackagePage.createPackageStep(
      './cypress/resources/hello.exe',
      '42',
      '/S'
    )
    connect.createPackagePage.saveButton.click()
    connect.packagesPage.searchBox.click().type(customPackageName)
    connect.packagesPage.packagesGrid
      .contains(customPackageName)
      .should('be.visible')
  })
})
