import DeployMenu from '../pages/deploy-menu.page'
import DevicesListPage from '../pages/devices-list.page'
import FilterModal from '../pages/filter-modal'
import DeviceInfo from '../utils/device-info'

const devicesListPage = new DevicesListPage()
const filterModal = new FilterModal()
describe('filter', () => {
  let deviceInfo: DeviceInfo

  before(() => {
    cy.loginAsTestUser()
  })

  beforeEach(() => {
    cy.loginAsTestUser()
    devicesListPage.load()
    cy.resetDemoData()
  })

  it('Can create a filter', () => {
    devicesListPage.openFilterModal()
    filterModal.fillTextFilter('0', 'Device', 'Name', 'contains', 'empty')
    filterModal.applyFilter()
    devicesListPage.selectAll()
    cy.get('.MuiBox-root.css-0')
      .invoke('text')
      .then((text) => {
        expect(text).to.contain('1')
      })
    cy.contains('[data-field="name"] a', 'Dummy Data empty memory')
      .invoke('text')
      .then((text) => {
        expect(text).to.contain('empty')
      })

    cy.get('[data-field="name"] a')
      .invoke('text')
      .then((text) => {
        expect(text).to.contain('empty')
      })
  })

  it('Can save a group', () => {
    let groupName = 'Name contains empty'
    devicesListPage.openFilterModal()
    filterModal.fillTextFilter('0', 'Device', 'Name', 'contains', 'empty')
    filterModal.saveGroup(groupName)
    devicesListPage.getGroupTab(groupName).click()
    devicesListPage.selectAll()
    cy.get('.MuiBox-root.css-0')
      .invoke('text')
      .then((text) => {
        expect(text).to.contain('1')
      })
    devicesListPage
      .getGroupTabCount(groupName)
      .invoke('text')
      .then((text) => {
        expect(text).to.contain('1')
      })
    cy.get('[data-field="name"] a')
      .invoke('text')
      .then((text) => {
        expect(text).to.contain('empty')
      })
  })
})
