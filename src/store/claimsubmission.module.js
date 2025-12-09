import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { claimService } from '@/services'
import router from '@/router'
import { ROUTE_NAME } from '@/constants'

//define module name
const MODULE_NAME = 'claimsubmission/'

//define actions name
const A_LIST = 'getClaimSubmissionListing'
const A_LIST_RESET = 'resetClaimSubmissionListing'
const A_DETAILS = 'getClaimSubmissionDetails'
const A_EDIT = 'editClaimSubmission'
const A_REJECT = 'rejectClaimSubmission'
const A_SHOW_CLAIM_SUBMISSION_REJECT = 'showClaimSubmissionRejectDialog'
const A_CLOSE_CLAIM_SUBMISSION_REJECT = 'closeClaimSubmissionRejectDialog'

//define dispatch action
export const CLAIM_SUBMISSION_LIST = MODULE_NAME + A_LIST
export const CLAIM_SUBMISSION_LIST_RESET = MODULE_NAME + A_LIST_RESET
export const CLAIM_SUBMISSION_DETAILS = MODULE_NAME + A_DETAILS
export const CLAIM_SUBMISSION_EDIT = MODULE_NAME + A_EDIT
export const CLAIM_SUBMISSION_REJECT = MODULE_NAME + A_REJECT
export const SHOW_CLAIM_SUBMISSION_REJECT = MODULE_NAME + A_SHOW_CLAIM_SUBMISSION_REJECT
export const CLOSE_CLAIM_SUBMISSION_REJECT = MODULE_NAME + A_CLOSE_CLAIM_SUBMISSION_REJECT

//define mutations name
const M_LIST = 'setClaimSubmissionListing'
const M_LIST_RESET = 'resetClaimSubmissionListingData'
const M_DETAILS = 'setClaimSubmissionDetails'
const M_DETAILS_RESET = 'resetClaimSubmissionDetails'
const M_REJECT = 'setClaimSubmissionReject'
const M_SHOW_CLAIM_SUBMISSION_REJECT = 'setClaimSubmissionRejectDialog'
const M_CLOSE_CLAIM_SUBMISSION_REJECT = 'clearClaimSubmissionRejectDialog'

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
    payoutId: [],
    companyBankAcc: '',
    companyBankName: '',
    claimAmount: '',
    agentID: '',
    rejectedReason: ''
  },
  claimSubmissionRejectDialogDisplay: false
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    claimService.getAllClaimSubmission(filter).then(
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
  async [A_EDIT]({ commit, dispatch }, { data, fromListing }) {
    try {
      dispatch(`${SHARED_LOADING}`, {}, { root: true })
      await claimService.editClaimSubmission(data)
      let successAction = async () => {
        await dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
        if (!fromListing) {
          router.push({ name: ROUTE_NAME.CLAIM_SUBMISSION_LIST })
        }
      }

      let messageDialog = sharedHelper.getRecordUpdatedDialog(successAction)

      await dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      await dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })

      return Promise.resolve(true)
    } catch (error) {
      let closeAction = async () => {
        await dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
      }

      let messageDialog = sharedHelper.getErrorMessageDialog(error, closeAction)

      await dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      await dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })

      return Promise.reject(false)
    }
  },
  [A_DETAILS]({ commit, dispatch }, { id }) {
    commit(M_DETAILS_RESET)
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    claimService.getClaimSubmission(id).then(
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
  [A_SHOW_CLAIM_SUBMISSION_REJECT]({ commit }) {
    commit(M_SHOW_CLAIM_SUBMISSION_REJECT)
  },
  [A_CLOSE_CLAIM_SUBMISSION_REJECT]({ commit }) {
    commit(M_CLOSE_CLAIM_SUBMISSION_REJECT)
  },
  [A_REJECT]({ commit, dispatch }, { data }) {
    commit(M_REJECT)
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    claimService.rejectClaimSubmission(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.CLAIM_SUBMISSION_LIST })
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
    const record = d.map((item) => {
      let sumTotalPayout = item.payouts.reduce((a, b) => {
        if (!b.totalPayout) return
        return a + b.totalPayout
      }, 0)
      return {
        id: item.id,
        claimID: item.code,
        agentID: item.user ? item.user.code : '',
        productPackage: item.product ? item.product.name : null,
        orderNo: item.orderNumber,
        productPrice: item.product ? parseFloat(item.product.price).toFixed(2) : null,
        applicationStatus: item.applicationStatus.name,
        amount: sumTotalPayout ? parseFloat(sumTotalPayout).toFixed(2) : 0,
        payoutId: item.payouts.map((payoutId) => {
          return { Id: payoutId.id }
        })
      }
    })
    state.list.data = [...state.list.data, ...record]
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
      applicationStatus: d.applicationStatus.id,
      applicationID: d.code,
      activatedDate: d.activatedDate,
      orderNo: d.orderNumber,
      eFormNo: d.eFormNumber,
      packageName: d.product.name,
      packagePrice: parseFloat(d.product.price).toFixed(2),
      applicationType: d.product.applicationType.id,
      agentClaimDate: d.submittedDate,
      payouts: d.payouts.map((item) => {
        return { agentName: item.user.name, agentID: item.user.code, role: item.user.role.name, totalPayout: item.totalPayout }
      }),
      rejectedReason: d.rejectedReason
    }

    let p = d.payouts
    let pyData = []

    if (!p) return
    for (let i = 0; i < p.length; i++) {
      pyData.push(p[i].id)
      state.details = {
        ...state.details,
        claimID: p[i].code,
        claimStatus: p[i].payoutStatus.id,
        commissionRate: `${parseFloat(p[i].commissionRate.amount).toFixed(2)} (${p[i].commissionRate.amountType.name})`,
        claimAmount: parseFloat(p[i].totalPayout).toFixed(2)
      }

      // if (p[i].company != '' && p[i].company != 'undefined' && p[i].company != null) {
      //   state.details.companyName = p[i].company.name
      //   state.details.businessRegNo = p[i].company.businessRegNo
      //   state.details.companyBankAcc = p[i].company.companyBankAcc
      //   state.details.companyBankName = p[i].company.companyBankName
      // }
    }

    state.details = { ...state.details, payoutId: pyData }
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
      payoutId: [],
      agentID: '',
      rejectedReason: ''
    }
  },
  [M_REJECT](state) {
    state.details = {
      ...state.details,
      payoutId: state.details.payoutId
    }
  },
  [M_SHOW_CLAIM_SUBMISSION_REJECT](state) {
    state.claimSubmissionRejectDialogDisplay = true
  },
  [M_CLOSE_CLAIM_SUBMISSION_REJECT](state) {
    state.claimSubmissionRejectDialogDisplay = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
