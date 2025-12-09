import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { companyService } from '@/services'
import router from '@/router'
import { ROUTE_NAME } from '@/constants'

//define module name
const MODULE_NAME = 'company/'

//define actions name
const A_LIST = 'getCompanyListing'
const A_DELETE = 'deleteCompany'
const A_CREATE = 'createCompany'
const A_DETAILS = 'getCompanyDetails'
const A_RESET_DETAILS = 'getEmptyCompanyDetails'
const A_EDIT = 'editCompany'

//define dispatch action
export const COMPANY_LIST = MODULE_NAME + A_LIST
export const COMPANY_DELETE = MODULE_NAME + A_DELETE
export const COMPANY_CREATE = MODULE_NAME + A_CREATE
export const COMPANY_DETAILS = MODULE_NAME + A_DETAILS
export const COMPANY_DETAILS_RESET = MODULE_NAME + A_RESET_DETAILS
export const COMPANY_EDIT = MODULE_NAME + A_EDIT

//define mutations name
const M_LIST = 'setCompanyListing'
const M_DETAILS = 'setCompanyDetails'
const M_DETAILS_RESET = 'resetCompanyDetails'

//init app state
const state = {
  list: {
    data: [],
    total: 0,
    pagination: {
      pageNumber: 0,
      pageSize: 0,
      lastPage: 0,
      tableRowsCount: 0
    }
  },
  details: {
    id: '',
    code: '',
    companyName: '',
    companyPhone: '',
    companyEmail: '',
    companyRegNumber: '',
    companyBankAcc: '',
    companyBank: '',
    companyAddressBookId: '',
    companyAddress1: '',
    companyAddress2: '',
    companyAddress3: '',
    companyCountry: '',
    companyRegion: '',
    companyCity: '',
    companyPostalCode: ''
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    companyService.getAllCompany(filter).then(
      (result) => {
        commit(M_LIST, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        let closeAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
        }
        let messageDialog = sharedHelper.getErrorMessageDialog(error, closeAction)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
        dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
      }
    )
  },
  [A_DELETE]({ commit, dispatch }, { id, data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    companyService.deleteCompany(id).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          location.reload()
        }
        let messageDialog = sharedHelper.getRecordUpdatedDialog(successAction)

        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
        dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
      },
      (error) => {
        let closeAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
        }
        let messageDialog = sharedHelper.getErrorMessageDialog(error, closeAction)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
        dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
      }
    )
  },
  [A_CREATE]({ commit, dispatch }, { data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    companyService.createCompany(data).then(
      (result) => {
        companyService.createCompanyAddress(result, data).then(
          () => {
            let successAction = () => {
              dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
              router.push({ name: ROUTE_NAME.COMPANY_LIST })
            }
            let messageDialog = sharedHelper.getRecordCreatedDialog(successAction)

            dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
            dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
          },
          (error) => {
            let closeAction = () => {
              dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
            }
            let messageDialog = sharedHelper.getErrorMessageDialog(error, closeAction)
            dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
            dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
          }
        )
      },
      (error) => {
        let closeAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
        }
        let messageDialog = sharedHelper.getErrorMessageDialog(error, closeAction)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
        dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
      }
    )
  },
  [A_EDIT]({ commit, dispatch }, { id, data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    companyService.editCompany(id, data).then(
      () => {
        companyService.editCompanyAddress(data).then(
          () => {
            let successAction = () => {
              dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
              router.push({ name: ROUTE_NAME.COMPANY_LIST })
            }
            let messageDialog = sharedHelper.getRecordUpdatedDialog(successAction)

            dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
            dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
          },
          (error) => {
            let closeAction = () => {
              dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
            }
            let messageDialog = sharedHelper.getErrorMessageDialog(error, closeAction)
            dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
            dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
          }
        )
      },
      (error) => {
        let closeAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
        }
        let messageDialog = sharedHelper.getErrorMessageDialog(error, closeAction)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
        dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
      }
    )
  },
  [A_DETAILS]({ commit, dispatch }, { id }) {
    //commit(M_DETAILS_RESET)
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    companyService.getCompany(id).then(
      (result) => {
        commit(M_DETAILS, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        let closeAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
        }
        let messageDialog = sharedHelper.getErrorMessageDialog(error, closeAction)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
        dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
      }
    )
  },
  [A_RESET_DETAILS]({ commit }) {
    commit(M_DETAILS_RESET)
  }
}

const mutations = {
  [M_LIST](state, data) {
    let d = data
    let e = d.data
    state.list.data = []

    //process details
    for (let i = 0; i < e.length; i++) {
      let r = {
        id: e[i].id,
        code: e[i].code,
        name: e[i].name,
        phone: e[i].phone,
        email: e[i].email
      }

      state.list.data.push(r)
    }
  },
  [M_DETAILS](state, data) {
    let d = data
    state.details = {
      id: d.id,
      code: d.code,
      companyName: d.name,
      companyPhone: d.phone,
      companyEmail: d.email,
      companyRegNumber: d.registrationNumber,
      companyBank: d.bank ? d.bank.id : '',
      companyBankAcc: d.bankAccountNumber,
      companyAddressBookId: d.addressBook[0] ? d.addressBook[0].id : '',
      companyAddress1: d.addressBook[0] ? d.addressBook[0].addressLine1 : '',
      companyAddress2: d.addressBook[0] ? d.addressBook[0].addressLine2 : '',
      companyAddress3: d.addressBook[0] ? d.addressBook[0].addressLine3 : '',
      companyCountry: d.addressBook[0] ? d.addressBook[0].country.id : '',
      companyRegion: d.addressBook[0] ? d.addressBook[0].state.id : '',
      companyCity: d.addressBook[0] ? d.addressBook[0].city : '',
      companyPostalCode: d.addressBook[0] ? d.addressBook[0].postcode : ''
    }
  },
  [M_DETAILS_RESET](state) {
    state.details = {
      id: '',
      code: '',
      companyName: '',
      companyPhone: '',
      companyEmail: '',
      companyRegNumber: '',
      companyBankAcc: '',
      companyBank: '',
      companyAddressBookId: '',
      companyAddress1: '',
      companyAddress2: '',
      companyAddress3: '',
      companyCountry: '',
      companyRegion: '',
      companyCity: '',
      companyPostalCode: ''
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
