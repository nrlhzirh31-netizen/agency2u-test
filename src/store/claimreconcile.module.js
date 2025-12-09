import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { claimService, customerApplicationService } from '@/services'
import moment from 'moment'
import router from '@/router'
import { ROUTE_NAME } from '@/constants'

//define module name
const MODULE_NAME = 'claimreconcile/'

//define actions name
const A_LIST = 'getClaimReconcileListing'
const A_DETAILS = 'getClaimReconcileDetails'
const A_APPLICATION_LIST = 'getApplicationListing'
const A_EDIT = 'editClaimReconcile'
const A_UPDATE = 'updateClaimReconcile'

//define dispatch action
export const CLAIM_RECONCILE_LIST = MODULE_NAME + A_LIST
export const CLAIM_RECONCILE_DETAILS = MODULE_NAME + A_DETAILS
export const CLAIM_APPLICATION_LISTING = MODULE_NAME + A_APPLICATION_LIST
export const CLAIM_APPLICATION_EDIT = MODULE_NAME + A_EDIT
export const CLAIM_APPLICATION_UPDATE = MODULE_NAME + A_UPDATE

//define mutations name
const M_LIST = 'setClaimHistoryListing'
const M_APPLICATION_LIST = 'setApplicationListing'
const M_DETAILS = 'setClaimHistoryDetails'
const M_DETAILS_RESET = 'resetClaimSubmissionDetails'

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
  applicationList: {
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
    claimID: '',
    claimStatus: '',
    orderStatus: '',
    applicationID: '',
    activatedDate: '',
    agentID: '',
    agentClaimDate: '',
    orderNo: '',
    eFormNo: '',
    packageName: '',
    packagePrice: '',
    applicationType: '',
    commissionRate: '',
    agentName: '',
    nric: '',
    phone: '',
    email: '',
    companyName: '',
    businessRegNo: '',
    bankAcc: '',
    bankName: '',
    payoutId: '',
    companyBankAcc: '',
    companyBankName: '',
    claimAmount: '',
    agentID: '',
    tmInvoiceNumber: '',
    reconcileRemark: '',
    reconcileStatus: ''
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    claimService.getAllClaimReconcile(filter).then(
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
  [A_APPLICATION_LIST]({ dispatch, commit }, { id }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    claimService.getClaimHistory(id).then(
      (result) => {
        commit(M_APPLICATION_LIST, result)
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
  [A_DETAILS]({ commit, dispatch }, { id }) {
    commit(M_DETAILS_RESET)
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    claimService.getClaimHistory(id).then(
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
  [A_EDIT]({ commit, dispatch }, { id, data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    customerApplicationService.editCustomerApplication(id, data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.CLAIM_RECONCILE_LIST })
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
  [A_UPDATE]({ commit, dispatch }, { id, data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    customerApplicationService.editClaimReconcile(id, data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.CLAIM_RECONCILE_LIST })
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
  }
}

const mutations = {
  [M_LIST](state, data) {
    let d = data.data
    state.list.data = []

    //process details
    for (let i = 0; i < d.length; i++) {
      let r = {
        id: d[i].id,
        applicationID: d[i].code,
        agentID: d[i].user.code,
        productPackage: d[i].product ? d[i].product.name : null,
        customerName: d[i].name,
        orderNo: d[i].orderNumber,
        productPrice: d[i].product ? parseFloat(d[i].product.price).toFixed(2) : null,
        applicationType: d[i].product ? d[i].product.applicationType.code : null,
        claimStatus: d[i].payouts[0].payoutStatus.name,
        reconcileStatus: d[i].reconcileStatus ? d[i].reconcileStatus.name : null
      }

      let p = d[i].payouts

      if (p != '' && p != 'undefined' && p != null) {
        for (let i = 0; i < p.length; i++) {
          r.payoutId = p[i].id
          r.amount = parseFloat(p[i].totalPayout).toFixed(2)
        }
      }

      state.list.data.push(r)
    }
  },
  [M_APPLICATION_LIST](state, data) {
    let d = data
    state.applicationList.data = []
    let c = d.payouts

    //process details
    for (let i = 0; i < c.length; i++) {
      let r = {
        claimID: c[i].code,
        applicationID: d.code,
        claimAmount: parseFloat(c[i].totalPayout).toFixed(2),
        downlineAgentID: c[i].user.code,
        claimStatus: c[i].payoutStatus.name,
        claimDate: d.claimDate ? moment(d.claimDate).format('DD-MM-YYYY') : '',
        payoutDate: c[i].payoutDate ? moment(c[i].payoutDate).format('DD-MM-YYYY') : '',
        paymentVoucherNumber: c[i].paymentVoucherNumber
      }
      state.applicationList.data.push(r)
    }
  },
  [M_DETAILS](state, data) {
    let d = data

    state.details = {
      id: d.id,
      applicationStatus: 7,
      applicationID: d.code,
      activatedDate: d.activatedDate,
      agentID: d.user.code,
      orderNo: d.orderNumber,
      eFormNo: d.eFormNumber,
      packageName: d.product.name,
      packagePrice: parseFloat(d.product.price).toFixed(2),
      applicationType: d.product.applicationType.id,
      agentClaimDate: d.submittedDate,
      agentName: d.user.name,
      nric: d.user.nric,
      phone: d.user.phone,
      email: d.user.email,
      bankAcc: d.user.bankAccountNumber,
      bankName: d.user.bank.name,
      companyName: d.user.company ? d.user.company.name : '',
      businessRegNo: d.user.company ? d.user.company.registrationNumber : '',
      companyBankAcc: d.user.company ? d.user.company.bankAccountNumber : '',
      companyBankName: d.user.company ? d.user.company.bank.name : '',
      tmInvoiceNumber: d.tmInvoiceNumber,
      reconcileRemark: d.reconcileRemark,
      reconcileStatus: d.reconcileStatus ? d.reconcileStatus.id : ''
    }

    let p = d.payouts

    if (p != '' && p != 'undefined' && p != null) {
      for (let i = 0; i < p.length; i++) {
        state.details.payoutId = p[i].id
        state.details.claimID = p[i].code
        state.details.claimStatus = p[i].payoutStatus.id
        state.details.commissionRate = parseFloat(p[i].commissionRate.amount).toFixed(2)
        state.details.claimAmount = parseFloat(p[i].totalPayout).toFixed(2)

        if (p[i].company != '' && p[i].company != 'undefined' && p[i].company != null) {
          state.details.companyName = p[i].company.name
          state.details.businessRegNo = p[i].company.businessRegNo
          state.details.companyBankAcc = p[i].company.companyBankAcc
          state.details.companyBankName = p[i].company.companyBankName
        }
      }
    }
  },
  [M_DETAILS_RESET](state) {
    state.details = {
      id: '',
      claimID: '',
      claimStatus: '',
      orderStatus: '',
      applicationID: '',
      activatedDate: '',
      agentID: '',
      agentClaimDate: '',
      orderNo: '',
      eFormNo: '',
      packageName: '',
      packagePrice: '',
      applicationType: '',
      commissionRate: '',
      agentName: '',
      nric: '',
      phone: '',
      email: '',
      companyName: '',
      businessRegNo: '',
      bankAcc: '',
      bankName: '',
      companyBankAcc: '',
      companyBankName: '',
      claimAmount: '',
      payoutId: '',
      agentID: '',
      tmInvoiceNumber: '',
      reconcileRemark: '',
      reconcileStatus: ''
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
