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
    filterModal.fillTextFilter('0', 'Software', 'Name', 'contains', 'edge')
    filterModal.applyFilter()
    //TODO validate filter only shows the correct devices
  })

  it('Can save a group', () => {
    let groupName = 'has edge'
    devicesListPage.openFilterModal()
    filterModal.fillTextFilter('0', 'Software', 'Name', 'contains', 'edge')
    filterModal.saveGroup(groupName)
    devicesListPage.getGroupTab(groupName)
    //TODO validate saved group only shows the correct devices
  })
})
