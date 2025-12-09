import { sharedHelper } from '@/utils'
import { SHARED_CLOSE_DIALOG, SHARED_LOADING, SHARED_SHOW_DIALOG, SHARED_UNLOADING } from './shared.module'
import { ansuranApplicationService } from '@/services'
import router from '@/router'
import { ROUTE_NAME, Pagination, AnsuranDetails } from '@/constants'
import moment from 'moment'

//define module name
const MODULE_NAME = 'ansuranApplication/'

//define actions name
const A_LIST = 'getAnsuranApplicationListing'
const A_LIST_RESET = 'resetAnsuranApplicationListing'
const A_HISTORY = 'getAnsuranApplicationHistory'
const A_CREATE = 'createAnsuranApplication'
const A_DETAILS = 'getAnsuranApplicationDetails'
const A_HISTORY_DETAILS = 'getAnsuranApplicationHistoryDetails'
const A_EDIT = 'editAnsuranApplication'
const A_DETAILS_RESET = 'resetAnsuranApplicationDetails'

//define dispatch action
export const ANSURAN_APPLICATION_LIST = MODULE_NAME + A_LIST
export const ANSURAN_APPLICATION_LIST_RESET = MODULE_NAME + A_LIST_RESET
export const ANSURAN_APPLICATION_HISTORY = MODULE_NAME + A_HISTORY
export const ANSURAN_APPLICATION_HISTORY_DETAILS = MODULE_NAME + A_HISTORY_DETAILS
export const ANSURAN_APPLICATION_CREATE = MODULE_NAME + A_CREATE
export const ANSURAN_APPLICATION_DETAILS = MODULE_NAME + A_DETAILS
export const ANSURAN_APPLICATION_EDIT = MODULE_NAME + A_EDIT
export const ANSURAN_APPLICATION_DETAILS_RESET = MODULE_NAME + A_DETAILS_RESET

//define mutations name
const M_LIST = 'setAnsuranApplicationListing'
const M_LIST_RESET = 'resetAnsuranApplicationListingData'
const M_HISTORY = 'setAnsuranApplicationHistory'
const M_DETAILS = 'setAnsuranApplicationDetails'
const M_DETAILS_RESET = 'resetAnsuranApplicationDetails'
const M_HISTORY_DETAILS = 'setAnsuranApplicationHistoryDetails'
const M_HISTORY_DETAILS_RESET = 'resetAnsuranApplicationHistoryDetails'

//init app state
const state = {
  list: {
    data: [],
    total: 0,
    pagination: new Pagination()
  },
  history: {
    data: [],
    total: 0,
    pagination: new Pagination()
  },
  details: new AnsuranDetails(),
  historydetails: {}
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranApplicationService.getAllAnsuranApplications(filter).then(
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
  [A_HISTORY]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranApplicationService.getAllAnsuranApplications(filter).then(
      (result) => {
        commit(M_HISTORY, result)
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
  [A_CREATE]({ commit, dispatch }, { data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranApplicationService.createAnsuranApplication(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.ANSURAN_APPLICATION_LIST })
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
  [A_DETAILS]({ commit, dispatch }, { id }) {
    commit(M_DETAILS_RESET)
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranApplicationService.getAnsuranApplication(id).then(
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
  [A_HISTORY_DETAILS]({ commit, dispatch }, { id }) {
    commit(M_HISTORY_DETAILS_RESET)
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranApplicationService.getAnsuranApplication(id).then(
      (result) => {
        commit(M_HISTORY_DETAILS, result)
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
  [A_EDIT]({ commit, dispatch }, { id, data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranApplicationService.editAnsuranApplication(id, data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.ANSURAN_APPLICATION_LIST })
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
  [A_LIST_RESET]({ dispatch, commit }) {
    commit(M_LIST_RESET)
  },
  [A_DETAILS_RESET]({ dispatch, commit }) {
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
        applicationDate: moment(e[i].applicationDate).format('DD-MM-YYYY'),
        user: e[i].user ? e[i].user.code : '',
        name: e[i].customerName,
        productName: e[i].productName,
        productSerialNumber: e[i].productSerialNumber,
        firstMonthPayment: e[i].firstMonthPayment,
        ansuranStatus: e[i].ansuranStatus.name,
        ansuranApplicationFirm: e[i].ansuranApplicationFirm ? e[i].ansuranApplicationFirm.name : ''
      }

      if (r.ansuranStatus != 'Completed') {
        state.list.data.push(r)
      }
    }
  },
  [M_HISTORY](state, data) {
    let d = data
    state.history.data = []

    //process details
    const history = d.data.map((item) => {
      return {
        id: item.id,
        applicationDate: moment(item.applicationDate).format('DD-MM-YYYY'),
        user: item.user ? item.user.code : '',
        customerName: item.customerName,
        productName: item.productName,
        productSerialNumber: item.productSerialNumber,
        firstMonthPayment: item.firstMonthPayment,
        ansuranStatus: item.ansuranStatus.name,
        ansuranApplicationFirm: item.ansuranApplicationFirm ? item.ansuranApplicationFirm.name : ''
      }
    })

    state.history.data = [...state.history.data, ...history]
  },
  [M_LIST_RESET](state) {
    state.list = {
      data: [],
      total: 0,
      pagination: {
        pageNumber: 0,
        pageSize: 0,
        lastPage: 0,
        tableRowsCount: 0
      }
    }
  },
  [M_DETAILS](state, data) {
    let d = data

    state.details = {
      ...state.details,
      id: d.id,
      code: d.code,
      referenceNumber: d.referenceNumber,
      applicationDate: d.applicationDate,
      ansuranStatus: d.ansuranStatus.id,
      user: d.user ? d.user.id : null,
      productName: d.productName,
      productModel: d.productModel,
      productSerialNumber: d.productSerialNumber,
      eMandate: d.eMandate,
      creditAccountNumber: d.creditAccountNumber,
      deliveryOrderNumber: d.deliveryOrderNumber,
      firstMonthPayment: d.firstMonthPayment,
      initialPayment: d.initialPayment,
      documentConsignmentNumber: d.documentConsignmentNumber,
      remarks: d.remarks,
      creditPrice: d.creditPrice,
      installmentTerm: d.installmentTerm,
      pco: d.pco,
      staffClaimAmount: d.staffClaimAmount,
      customerName: d.customerName,
      nric: d.nric,
      phone: d.phone,
      email: d.email,
      addressLine1: d.addressLine1,
      addressLine2: d.addressLine2,
      addressLine3: d.addressLine3,
      city: d.city,
      postcode: d.postcode,
      state: d.state.id,
      country: d.country.id,
      invoiceNumber: d.invoiceNumber,
      warrantyStartDate: d.warrantyStartDate,
      warrantyEndDate: d.warrantyEndDate,
      pcoCategory: d.pcoCategory ? d.pcoCategory.id : null,
      rejectedReason: d.rejectedReason,
      remarks: d.remarks,
      ansuranApplicationFirm: d.ansuranApplicationFirm ? d.ansuranApplicationFirm.id : null
    }
  },
  [M_DETAILS_RESET](state) {
    // loop through state.details and reset all values to empty
    state.details = { ...state.details, ...new AnsuranDetails() }
  },
  [M_HISTORY_DETAILS](state, data) {
    let d = data

    state.historydetails = {
      ...state.historydetails,
      id: d.id,
      code: d.code,
      referenceNumber: d.referenceNumber,
      applicationDate: d.applicationDate,
      ansuranStatus: d.ansuranStatus.id,
      user: d.user ? d.user.id : null,
      productName: d.productName,
      productModel: d.productModel,
      productSerialNumber: d.productSerialNumber,
      eMandate: d.eMandate,
      creditAccountNumber: d.creditAccountNumber,
      deliveryOrderNumber: d.deliveryOrderNumber,
      firstMonthPayment: d.firstMonthPayment,
      initialPayment: d.initialPayment,
      documentConsignmentNumber: d.documentConsignmentNumber,
      remarks: d.remarks,
      creditPrice: d.creditPrice,
      installmentTerm: d.installmentTerm,
      pco: d.pco,
      staffClaimAmount: d.staffClaimAmount,
      customerName: d.customerName,
      nric: d.nric,
      phone: d.phone,
      email: d.email,
      addressLine1: d.addressLine1,
      addressLine2: d.addressLine2,
      addressLine3: d.addressLine3,
      city: d.city,
      postcode: d.postcode,
      state: d.state.id,
      country: d.country.id,
      invoiceNumber: d.invoiceNumber,
      warrantyStartDate: d.warrantyStartDate,
      warrantyEndDate: d.warrantyEndDate,
      pcoCategory: d.pcoCategory ? d.pcoCategory.id : null,
      ansuranApplicationFirm: d.ansuranApplicationFirm ? d.ansuranApplicationFirm.id : null
    }
  },
  [M_HISTORY_DETAILS_RESET](state) {
    state.historydetails = { ...state.historydetails, ...new AnsuranDetails() }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
