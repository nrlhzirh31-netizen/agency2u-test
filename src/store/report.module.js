import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { reportService } from '@/services'
import moment from 'moment'

//define module name
const MODULE_NAME = 'report/'

//define actions name
const A_SUBMISSION_LIST = 'getReportSubmissionListing'
const A_PAYOUT_LIST = 'getReportPayoutListing'
const A_SALES_LIST = 'getReportSalesListing'

//define dispatch action
export const REPORT_SUBMISSION = MODULE_NAME + A_SUBMISSION_LIST
export const REPORT_PAYOUT = MODULE_NAME + A_PAYOUT_LIST
export const REPORT_SALES_TRANSACTION = MODULE_NAME + A_SALES_LIST

//define mutations name
const M_REPORT_SUBMISSION_LIST = 'setReportSubmissionListing'
const M_REPORT_PAYOUT_LIST = 'setReportPayoutListing'
const M_REPORT_SALES_LIST = 'setReportSalesListing'

//init app state
const state = {
  submmissionlist: {
    data: []
  },
  payoutlist: {
    data: []
  },
  saleslist: {
    data: []
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_SUBMISSION_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    reportService.getSubmissionReports(filter).then(
      (result) => {
        commit(M_REPORT_SUBMISSION_LIST, result)
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
  [A_PAYOUT_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    reportService.getPayoutReports(filter).then(
      (result) => {
        commit(M_REPORT_PAYOUT_LIST, result)
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
  [A_SALES_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    reportService.getTransactionReports(filter).then(
      (result) => {
        commit(M_REPORT_SALES_LIST, result)
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
  }
}

const mutations = {
  [M_REPORT_SUBMISSION_LIST](state, data) {
    let d = data
    state.submmissionlist.data = []

    //process details
    for (let i = 0; i < d.length; i++) {
      let r = {
        applicationDate: moment(d[i].applicationDate).format('DD-MM-YYYY'),
        applicationID: d[i].applicationCode,
        applicationType: d[i].applicationType,
        agentID: d[i].userCode,
        agentName: d[i].userName,
        eFormNumber: d[i].eFormNumber,
        orderNo: d[i].orderNumber,
        productPackage: d[i].product,
        productPrice: d[i].price,
        commission: d[i].commission,
        claimDate: d[i].claimDate ? moment(d[i].claimDate).format('DD-MM-YYYY') : ''
      }

      state.submmissionlist.data.push(r)
    }
  },
  [M_REPORT_PAYOUT_LIST](state, data) {
    let d = data
    state.payoutlist.data = []

    //process details
    for (let i = 0; i < d.length; i++) {
      let r = {
        agentID: d[i].userCode,
        agentName: d[i].userName,
        bank: d[i].bankName,
        bankAccNo: d[i].bankAccountNumber,
        email: d[i].email,
        totalApplication: d[i].totalApplication,
        totalAmountClaim: d[i].totalAmountClaim
      }

      state.payoutlist.data.push(r)
    }
  },
  [M_REPORT_SALES_LIST](state, data) {
    let d = data
    state.saleslist.data = []

    //process details
    for (let i = 0; i < d.length; i++) {
      let r = {
        applicationDate: moment(d[i].applicationDate).format('DD-MM-YYYY'),
        applicationID: d[i].applicationCode,
        applicationType: d[i].applicationType,
        agentID: d[i].userCode,
        agentName: d[i].userName,
        eFormNumber: d[i].eFormNumber,
        orderNo: d[i].orderNumber,
        productPackage: d[i].product,
        productPrice: d[i].price,
        phone: d[i].phone,
        address: d[i].address
      }

      state.saleslist.data.push(r)
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
