import { sharedHelper } from '@/utils'
import { SHARED_CLOSE_DIALOG, SHARED_LOADING, SHARED_SHOW_DIALOG, SHARED_UNLOADING } from './shared.module'
import { customerApplicationService } from '@/services'
import router from '@/router'
import { ROUTE_NAME } from '@/constants'
import moment from 'moment'

//define module name
const MODULE_NAME = 'customerapplication/'

//define actions name
const A_LIST = 'getCustomerApplicationListing'
const A_LIST_RESET = 'resetCustomerApplicationListing'
const A_HISTORY = 'getApplicationHistory'
const A_CREATE = 'createCustomerApplication'
const A_DETAILS = 'getCustomerApplicationDetails'
const A_HISTORY_DETAILS = 'getApplicationHistoryDetails'
const A_EDIT = 'editCustomerApplication'

//define dispatch action
export const CUSTOMER_APPLICATION_LIST = MODULE_NAME + A_LIST
export const CUSTOMER_APPLICATION_LIST_RESET = MODULE_NAME + A_LIST_RESET
export const APPLICATION_HISTORY = MODULE_NAME + A_HISTORY
export const APPLICATION_HISTORY_DETAILS = MODULE_NAME + A_HISTORY_DETAILS
export const CUSTOMER_APPLICATION_CREATE = MODULE_NAME + A_CREATE
export const CUSTOMER_APPLICATION_DETAILS = MODULE_NAME + A_DETAILS
export const CUSTOMER_APPLICATION_EDIT = MODULE_NAME + A_EDIT

//define mutations name
const M_LIST = 'setCustomerApplicationListing'
const M_LIST_RESET = 'resetCustomerApplicationListingData'
const M_HISTORY = 'setApplicationHistory'
const M_DETAILS = 'setCustomerApplicationDetails'
const M_DETAILS_RESET = 'resetCustomerApplicationDetails'
const M_HISTORY_DETAILS = 'setApplicationHistoryDetails'
const M_HISTORY_DETAILS_RESET = 'resetApplicationHistoryDetails'

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
  history: {
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
    name: '',
    nric: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    postcode: '',
    state: '',
    country: '',
    orderNumber: '',
    eFormNumber: '',
    product: '',
    productPrice: '',
    applicationType: '',
    applicationStatus: '',
    user: '',
    applicationDate: '',
    activatedDate: '',
    gpsLongitude: '',
    gpsLatitude: '',
    ociNumber: '',
    documentCompleted: '',
    remarks: '',
    attachments: '',
    sporaNumber: '',
    processingId: ''
  },
  historydetails: {
    id: '',
    code: '',
    name: '',
    nric: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    postcode: '',
    state: '',
    country: '',
    orderNumber: '',
    eFormNumber: '',
    product: '',
    productPrice: '',
    applicationType: '',
    applicationStatus: '',
    user: '',
    applicationDate: '',
    activatedDate: '',
    gpsLongitude: '',
    gpsLatitude: '',
    ociNumber: '',
    documentCompleted: '',
    remarks: '',
    attachments: '',
    sporaNumber: '',
    processingId: ''
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    customerApplicationService.getAllCustomerApplications(filter).then(
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
    customerApplicationService.getAllCustomerApplications(filter).then(
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
    customerApplicationService.createCustomerApplication(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.CUSTOMER_APPLICATION_LIST })
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
    customerApplicationService.getCustomerApplication(id).then(
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
    customerApplicationService.getCustomerApplication(id).then(
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
    customerApplicationService.editCustomerApplication(id, data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.CUSTOMER_APPLICATION_LIST })
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
        name: e[i].name,
        orderNumber: e[i].orderNumber,
        product: e[i].product ? e[i].product.name : null,
        documentCompleted: e[i].documentCompleted,
        applicationStatus: e[i].applicationStatus.name,
        processingId: e[i].processingId
      }

      if (r.applicationStatus != 'Completed') {
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
        name: item.name,
        orderNumber: item.orderNumber,
        product: item.product ? item.product.name : null,
        documentCompleted: item.documentCompleted,
        applicationStatus: item.applicationStatus.name,
        processingId: item.processingId
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
      applicationID: d.code,
      name: d.name,
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
      orderNumber: d.orderNumber,
      eFormNumber: d.eFormNumber,
      product: d.product ? d.product.id : null,
      productPrice: d.product ? parseFloat(d.product.price).toFixed(2) : null,
      applicationType: d.product ? d.product.applicationType.id : null,
      applicationStatus: d.applicationStatus.id,
      user: d.user ? d.user.id : null,
      applicationDate: d.applicationDate,
      activatedDate: d.activatedDate,
      gpsLongitude: d.gpsLongitude,
      gpsLatitude: d.gpsLatitude,
      ociNumber: d.ociNumber,
      documentCompleted: d.documentCompleted,
      remarks: d.remarks,
      attachments: d.attachments,
      sporaNumber: d.sporaNumber,
      processingId: d.processingId,
      rejectedReason: d.rejectedReason
    }
  },
  [M_DETAILS_RESET](state) {
    state.details = {
      ...state.details,
      id: '',
      code: '',
      name: '',
      nric: '',
      phone: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      postcode: '',
      state: '',
      country: '',
      orderNumber: '',
      eFormNumber: '',
      product: '',
      productPrice: '',
      applicationType: '',
      applicationStatus: '',
      user: '',
      applicationDate: '',
      activatedDate: '',
      gpsLongitude: '',
      gpsLatitude: '',
      ociNumber: '',
      documentCompleted: '',
      remarks: '',
      attachments: '',
      sporaNumber: ''
    }
  },
  [M_HISTORY_DETAILS](state, data) {
    let d = data

    state.historydetails = {
      ...state.historydetails,
      id: d.id,
      applicationID: d.code,
      name: d.name,
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
      orderNumber: d.orderNumber,
      eFormNumber: d.eFormNumber,
      product: d.product ? d.product.id : null,
      productPrice: d.product ? parseFloat(d.product.price).toFixed(2) : null,
      applicationType: d.product ? d.product.applicationType.id : null,
      applicationStatus: d.applicationStatus.id,
      user: d.user ? d.user.id : null,
      applicationDate: d.applicationDate,
      activatedDate: d.activatedDate,
      gpsLongitude: d.gpsLongitude,
      gpsLatitude: d.gpsLatitude,
      ociNumber: d.ociNumber,
      documentCompleted: d.documentCompleted,
      remarks: d.remarks,
      attachments: d.attachments,
      sporaNumber: d.sporaNumber,
      processingId: d.processingId
    }
  },
  [M_HISTORY_DETAILS_RESET](state) {
    state.historydetails = {
      id: '',
      code: '',
      name: '',
      nric: '',
      phone: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      addressLine3: '',
      city: '',
      postcode: '',
      state: '',
      country: '',
      orderNumber: '',
      eFormNumber: '',
      product: '',
      productPrice: '',
      applicationType: '',
      applicationStatus: '',
      user: '',
      applicationDate: '',
      activatedDate: '',
      gpsLongitude: '',
      gpsLatitude: '',
      ociNumber: '',
      documentCompleted: '',
      remarks: '',
      attachments: '',
      sporaNumber: ''
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
