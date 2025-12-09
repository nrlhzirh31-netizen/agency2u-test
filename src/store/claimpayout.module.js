import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { claimService } from '@/services'
import router from '@/router'
import { ROUTE_NAME } from '@/constants'
import moment from 'moment'

//define module name
const MODULE_NAME = 'claimpayout/'

//define actions name
const A_LIST = 'getClaimPayoutListing'
const A_LIST_RESET = 'resetClaimPayoutListing'
const A_APPLICATION_LIST = 'getApplicationListing'
const A_DETAILS = 'getClaimPayoutDetails'
const A_EDIT = 'editClaimPayout'
const A_CANCEL = 'cancelClaimPayout'

//define dispatch action
export const CLAIM_PAYOUT_LIST = MODULE_NAME + A_LIST
export const CLAIM_PAYOUT_LIST_RESET = MODULE_NAME + A_LIST_RESET
export const CLAIM_PAYOUT_DETAILS = MODULE_NAME + A_DETAILS
export const CLAIM_APPLICATION_LISTING = MODULE_NAME + A_APPLICATION_LIST
export const CLAIM_PAYOUT_EDIT = MODULE_NAME + A_EDIT
export const CLAIM_PAYOUT_CANCEL = MODULE_NAME + A_CANCEL

//define mutations name
const M_LIST = 'setClaimPayoutListing'
const M_LIST_RESET = 'resetClaimPayoutListingData'
const M_APPLICATION_LIST = 'setApplicationListing'
const M_DETAILS = 'setClaimPayoutDetails'
const M_DETAILS_RESET = 'resetClaimPayoutDetails'
const M_HISTORY = 'setClaimPayoutHistory'
const M_CANCEL_CLAIM_PAYOUT = 'setCancelClaimPayout'

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
    payoutDate: '',
    paymentVoucherNumber: '',
    reasonTemplateId: '',
    reasonRemarks: ''
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    claimService.getAllClaimPayout(filter).then(
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
    claimService.getClaimPayout(id).then(
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
  [A_EDIT]({ commit, dispatch }, { data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    claimService.editClaimPayout(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.CLAIM_PAYOUT_LIST })
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
  [A_DETAILS]({ commit, dispatch }, { id }) {
    commit(M_DETAILS_RESET)
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    claimService.getClaimPayout(id).then(
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
  },
  [A_CANCEL]({ commit, dispatch }, { data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    claimService.cancelClaimPayout(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.CLAIM_PAYOUT_LIST })
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
        agentID: d[i].code,
        totalApplication: d[i].payouts.length,
        customerApplications: d[i].payouts
      }

      let c = r.customerApplications
      r.totalClaim = 0

      for (let j = 0; j < c.length; j++) {
        r.totalClaim = r.totalClaim + c[j].totalPayout

        // for (let k = 0; k < p.length; k++) {
        //   r.totalClaim = r.totalClaim + p[k].totalPayout
        // }
      }

      r.totalClaim = parseFloat(r.totalClaim).toFixed(2)

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
        id: c[i].id,
        applicationID: c[i].customerApplication.code,
        productPackage: c[i].customerApplication.product.name,
        orderNo: c[i].customerApplication.orderNumber,
        customerName: c[i].customerApplication.name,
        claimDate: moment(c[i].customerApplication.claimDate).format('DD-MM-YYYY'),
        claimID: c[i].code,
        claimAmount: parseFloat(c[i].totalPayout).toFixed(2),
        downlineAgentID: c[i].user.code,
        payoutId: c[i].id
        // bankAcc: 'no find no sure API got pass or no'
      }

      state.applicationList.data.push(r)
    }
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
    let c = d.payouts

    for (let i = 0; i < c.length; i++) {
      state.details = {
        id: c[i].customerApplication.id,
        applicationID: c[i].customerApplication.code,
        activatedDate: c[i].customerApplication.activatedDate,
        orderNo: c[i].customerApplication.orderNumber,
        eFormNo: c[i].customerApplication.eFormNumber,
        packageName: c[i].customerApplication.product ? c[i].customerApplication.product.name : '',
        packagePrice: c[i].customerApplication.product ? parseFloat(c[i].customerApplication.product.price).toFixed(2) : '',
        applicationType: 'API no pass',
        agentClaimDate: c[i].customerApplication.submittedDate,
        agentName: d.name,
        nric: d.nric,
        phone: d.phone,
        email: d.email,
        bankAcc: d.bankAccountNumber,
        agentID: d.code,
        bankName: d.bank.name,
        companyName: d.company ? d.company.name : '',
        businessRegNo: d.company ? d.company.registrationNumber : '',
        companyBankAcc: d.company ? d.company.bankAccountNumber : '',
        companyBankName: d.company ? d.company.bank.name : '',
        payoutId: c[i].id,
        claimID: c[i].code,
        claimStatus: c[i].payoutStatus.id,
        claimAmount: parseFloat(c[i].totalPayout).toFixed(2),
        payoutDate: c[i].payoutDate,
        paymentVoucherNumber: c[i].paymentVoucherNumber,
        reasonTemplateId: c[i].reasonTemplateId,
        reasonRemark: c[i].reasonRemarks
      }

      // let p = c[i].payouts
      // for (let j = 0; j < p.length; j++) {
      //   state.details.payoutId = p[j].id
      //   state.details.claimID = p[j].code
      //   state.details.claimStatus = p[j].payoutStatus.id
      //   state.details.claimAmount = parseFloat(p[j].totalPayout).toFixed(2)
      // }
    }
  },
  [M_DETAILS_RESET](state) {
    state.details = {
      id: '',
      claimID: '',
      claimStatus: '',
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
      payoutDate: '',
      paymentVoucherNumber: ''
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
