import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { claimService } from '@/services'
import moment from 'moment'

//define module name
const MODULE_NAME = 'claimhistory/'

//define actions name
const A_LIST = 'getClaimHistoryListing'
const A_LIST_RESET = 'resetClaimHistoryListing'
const A_DETAILS = 'getClaimHistoryDetails'
const A_APPLICATION_LIST = 'getApplicationListing'

//define dispatch action
export const CLAIM_HISTORY_LIST = MODULE_NAME + A_LIST
export const CLAIM_HISTORY_LIST_RESET = MODULE_NAME + A_LIST_RESET
export const CLAIM_HISTORY_DETAILS = MODULE_NAME + A_DETAILS
export const CLAIM_APPLICATION_LISTING = MODULE_NAME + A_APPLICATION_LIST

//define mutations name
const M_LIST = 'setClaimHistoryListing'
const M_LIST_RESET = 'resetClaimHistoryListingData'
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
    reasonTemplate: '',
    reasonRemarks: ''
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    claimService.getAllClaimHistory(filter).then(
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
  [A_LIST_RESET]({ dispatch, commit }) {
    commit(M_LIST_RESET)
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
        claimStatus: d[i].payouts[0].payoutStatus.name
      }

      let p = d[i].payouts

      if (p) {
        for (let i = 0; i < p.length; i++) {
          r.payoutId = p[i].id
          r.amount = parseFloat(p[i].totalPayout).toFixed(2)
        }
      }
      state.list.data = [...state.list.data, r]
    }
  },
  [M_LIST_RESET](state) {
    state.list = {
      ...state.list,
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
        paymentVoucherNumber: c[i].paymentVoucherNumber,
        reasonTemplate: c[i].reasonTemplate ? c[i].reasonTemplate?.code + ' ' + c[i].reasonTemplate?.name : '',
        reasonRemarks: c[i].reasonRemarks ? c[i].reasonRemarks : ''
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
      companyBankName: d.user.company ? d.user.company.bank.name : ''
    }

    let p = d.payouts

    if (p != '' && p != 'undefined' && p != null) {
      for (let i = 0; i < p.length; i++) {
        state.details.payoutId = p[i].id
        state.details.claimID = p[i].code
        state.details.claimStatus = p[i].payoutStatus.id
        state.details.commissionRate = parseFloat(p[i].commissionRate.amount).toFixed(2)
        state.details.claimAmount = parseFloat(p[i].totalPayout).toFixed(2)
        state.details.reasonTemplate = p[i].reasonTemplate?.code + ' ' + p[i].reasonTemplate?.name
        state.details.reasonRemarks = p[i].reasonRemarks

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
      reasonTemplate: '',
      reasonRemarks: ''
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
