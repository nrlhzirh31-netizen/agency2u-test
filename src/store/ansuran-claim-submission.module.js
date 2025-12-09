import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { ansuranClaimService } from '@/services'
import router from '@/router'
import { ROUTE_NAME, AnsuranClaimSubmission } from '@/constants'
import { moneyFormat } from '@/utils/filters.helper'
import { del } from 'vue'

//define module name
const MODULE_NAME = 'ansuranClaimSubmission/'

//define actions name
const A_LIST = 'getAnsuranClaimSubmissionListing'
const A_LIST_RESET = 'resetAnsuranClaimSubmissionListing'
const A_DETAILS = 'getAnsuranClaimSubmissionDetails'
const A_EDIT = 'editAnsuranClaimSubmission'
const A_REJECT = 'rejectAnsuranClaimSubmission'
const A_SHOW_ANSURAN_CLAIM_SUBMISSION_REJECT = 'showAnsuranClaimSubmissionRejectDialog'
const A_CLOSE_ANSURAN_CLAIM_SUBMISSION_REJECT = 'closeAnsuranClaimSubmissionRejectDialog'

//define dispatch action
export const ANSURAN_CLAIM_SUBMISSION_LIST = MODULE_NAME + A_LIST
export const ANSURAN_CLAIM_SUBMISSION_LIST_RESET = MODULE_NAME + A_LIST_RESET
export const ANSURAN_CLAIM_SUBMISSION_DETAILS = MODULE_NAME + A_DETAILS
export const ANSURAN_CLAIM_SUBMISSION_EDIT = MODULE_NAME + A_EDIT
export const ANSURAN_CLAIM_SUBMISSION_REJECT = MODULE_NAME + A_REJECT
export const SHOW_ANSURAN_CLAIM_SUBMISSION_REJECT = MODULE_NAME + A_SHOW_ANSURAN_CLAIM_SUBMISSION_REJECT
export const CLOSE_ANSURAN_CLAIM_SUBMISSION_REJECT = MODULE_NAME + A_CLOSE_ANSURAN_CLAIM_SUBMISSION_REJECT

//define mutations name
const M_LIST = 'setAnsuranClaimSubmissionListing'
const M_LIST_RESET = 'resetAnsuranClaimSubmissionListingData'
const M_DETAILS = 'setAnsuranClaimSubmissionDetails'
const M_DETAILS_RESET = 'resetAnsuranClaimSubmissionDetails'
const M_REJECT = 'setAnsuranClaimSubmissionReject'
const M_SHOW_ANSURAN_CLAIM_SUBMISSION_REJECT = 'setAnsuranClaimSubmissionRejectDialog'
const M_CLOSE_ANSURAN_CLAIM_SUBMISSION_REJECT = 'clearAnsuranClaimSubmissionRejectDialog'

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
  details: new AnsuranClaimSubmission(),
  claimSubmissionRejectDialogDisplay: false
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranClaimService.getAllAnsuranClaimSubmission(filter).then(
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
  [A_EDIT]({ commit, dispatch }, { data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    let page = ''
    // const { page, ...rest } = data
    console.log('the rest and data', data)
    // loop through data and remove object key pages
    data.forEach((item) => {
      page = item.page
      delete item.page
    })
    console.log('page and data', page, data)
    ansuranClaimService.editAnsuranClaimSubmission(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          if (page === 'detail') {
            router.push({ name: ROUTE_NAME.ANSURAN_CLAIM_SUBMISSION_LIST })
          } else {
            router.go(0)
          }
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
    ansuranClaimService.getAnsuranClaimSubmission(id).then(
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
  [A_SHOW_ANSURAN_CLAIM_SUBMISSION_REJECT]({ commit }) {
    commit(M_SHOW_ANSURAN_CLAIM_SUBMISSION_REJECT)
  },
  [A_CLOSE_ANSURAN_CLAIM_SUBMISSION_REJECT]({ commit }) {
    commit(M_CLOSE_ANSURAN_CLAIM_SUBMISSION_REJECT)
  },
  [A_REJECT]({ commit, dispatch }, { data }) {
    commit(M_REJECT)
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranClaimService.rejectAnsuranClaimSubmission(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.ANSURAN_CLAIM_SUBMISSION_LIST })
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
      return {
        id: item.id,
        code: item.code,
        agentID: item.user?.code,
        productName: item.productName,
        productSerialNumber: item.productSerialNumber,
        creditAccountNumber: item.creditAccountNumber,
        creditPrice: item.creditPrice,
        staffClaimAmount: item.staffClaimAmount,
        ansuranStatus: item.ansuranStatus.name,
        ansuranPayouts: item.ansuranPayouts,
        ansuranApplicationFirm: item.ansuranApplicationFirm?.name
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
      consignmentNumber: d.consignmentNumber,
      firstMonthPayment: d.firstMonthPayment,
      initialPayment: d.initialPayment,
      documentConsignmentNumber: d.documentConsignmentNumber,
      remarks: d.remarks,
      creditPrice: d.creditPrice,
      installmentTerm: d.installmentTerm,
      pco: d.pco ? Number(d.pco) : null,
      staffClaimAmount: d.staffClaimAmount,
      invoiceNumber: d.invoiceNumber,
      warrantyStartDate: d.warrantyStartDate,
      warrantyEndDate: d.warrantyEndDate,
      pcoCategory: d.pcoCategory ? d.pcoCategory.id : null,
      deliveryOrderNumber: d.deliveryOrderNumber,
      payouts: d.ansuranPayouts.map((item) => {
        return { agentName: item.user.name, agentID: item.user.code, role: item.user.role.name, totalPayout: d.staffClaimAmount, payoutId: item.id }
      }),
      ansuranApplicationFirm: d.ansuranApplicationFirm ? d.ansuranApplicationFirm.id : null
    }
  },
  [M_DETAILS_RESET](state) {
    state.details = { ...state.details, ...new AnsuranClaimSubmission() }
  },
  [M_REJECT](state) {
    state.details = {
      ...state.details,
      payoutId: state.details.payoutId
    }
  },
  [M_SHOW_ANSURAN_CLAIM_SUBMISSION_REJECT](state) {
    state.claimSubmissionRejectDialogDisplay = true
  },
  [M_CLOSE_ANSURAN_CLAIM_SUBMISSION_REJECT](state) {
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
