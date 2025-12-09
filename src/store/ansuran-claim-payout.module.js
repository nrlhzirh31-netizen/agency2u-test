import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { ansuranClaimService } from '@/services'
import router from '@/router'
import { ROUTE_NAME } from '@/constants'
import moment from 'moment'

//define module name
const MODULE_NAME = 'ansuranClaimPayout/'

//define actions name
const A_LIST = 'getAnsuranClaimPayoutListing'
const A_LIST_RESET = 'resetAnsuranClaimPayoutListing'
const A_APPLICATION_LIST = 'getAnsuranApplicationListing'
const A_DETAILS = 'getAnsuranClaimPayoutDetails'
const A_EDIT = 'editAnsuranClaimPayout'
const A_CANCEL = 'cancelAnsuranClaimPayout'
const A_DETAILS_RESET = 'resetAnsuranClaimPayoutDetails'

//define dispatch action
export const ANSURAN_CLAIM_PAYOUT_LIST = MODULE_NAME + A_LIST
export const ANSURAN_CLAIM_PAYOUT_LIST_RESET = MODULE_NAME + A_LIST_RESET
export const ANSURAN_CLAIM_PAYOUT_DETAILS = MODULE_NAME + A_DETAILS
export const CLAIM_APPLICATION_LISTING = MODULE_NAME + A_APPLICATION_LIST
export const ANSURAN_CLAIM_PAYOUT_EDIT = MODULE_NAME + A_EDIT
export const ANSURAN_CLAIM_PAYOUT_CANCEL = MODULE_NAME + A_CANCEL
export const ANSURAN_CLAIM_PAYOUT_DETAILS_RESET = MODULE_NAME + A_DETAILS_RESET

//define mutations name
const M_LIST = 'setAnsuranClaimPayoutListing'
const M_LIST_RESET = 'resetAnsuranClaimPayoutListingData'
const M_APPLICATION_LIST = 'setApplicationListing'
const M_DETAILS = 'setAnsuranClaimPayoutDetails'
const M_DETAILS_RESET = 'resetAnsuranClaimPayoutDetails'
const M_HISTORY = 'setAnsuranClaimPayoutHistory'
const M_CANCEL_ANSURAN_CLAIM_PAYOUT = 'setCancelAnsuranClaimPayout'

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
    agentId: '',
    code: '',
    agentName: '',
    nric: '',
    email: '',
    phone: '',
    bankAcc: '',
    bankName: '',
    companyName: '',
    businessRegNo: '',
    companyBankAcc: '',
    companyBankName: '',
    ansuranApplications: [],
    totalStaffClaimAmount: 0,
    role: '',
    ansuranApplicationFirm: ''
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranClaimService.getAllAnsuranClaimPayout(filter).then(
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
    ansuranClaimService.getAnsuranClaimPayout(id).then(
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
    ansuranClaimService.editAnsuranClaimPayout(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.ANSURAN_CLAIM_PAYOUT_LIST })
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
    ansuranClaimService.getAnsuranClaimPayout(id).then(
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
    ansuranClaimService.cancelAnsuranClaimPayout(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.ANSURAN_CLAIM_PAYOUT_LIST })
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
  [A_DETAILS_RESET]({ dispatch, commit }) {
    commit(M_DETAILS_RESET)
  }
}

const mutations = {
  [M_LIST](state, data) {
    let d = data.data
    // state.list.data = []

    state.list.data = d.map((item) => {
      return {
        id: item.id,
        agentID: item.code,
        totalApplication: item.totalApplication,
        totalClaim: item.totalStaffClaimAmount
      }
    })
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
        claimDate: c[i].customerApplication.claimDate ? moment(c[i].customerApplication.claimDate).format('DD-MM-YYYY') : '',
        claimID: c[i].code,
        claimAmount: c[i].staffClaimAmount,
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
    let c = d.ansuranPayouts
    const applications = c.map((item) => {
      return {
        payoutId: item.id,
        payoutCode: item.code,
        applicationID: item.ansuranApplication.id,
        code: item.ansuranApplication.code,
        referenceNumber: item.ansuranApplication.referenceNumber,
        productName: item.ansuranApplication.productName,
        productModel: item.ansuranApplication.productModel,
        productSerialNumber: item.ansuranApplication.productSerialNumber,
        eMandate: item.ansuranApplication.eMandate,
        creditPrice: item.ansuranApplication.creditPrice,
        installmentTerm: item.ansuranApplication.installmentTerm,
        staffClaimAmount: item.ansuranApplication.staffClaimAmount,
        customerName: item.ansuranApplication.customerName,
        payoutDate: item.payoutDate ? moment(item.payoutDate).format('DD-MM-YYYY') : 'N/A',
        ansuranApplicationFirm: item.ansuranApplication.ansuranApplicationFirm?.name
      }
    })
    state.details = {
      agentId: d.id,
      code: d.code,
      agentName: d.name,
      nric: d.nric,
      email: d.email,
      phone: d.phone,
      bankAcc: d.bankAccountNumber,
      bankName: d.bank.name,
      companyName: d.company ? d.company.name : '',
      businessRegNo: d.company ? d.company.registrationNumber : '',
      companyBankAcc: d.company ? d.company.bankAccountNumber : '',
      companyBankName: d.company ? d.company.bank.name : '',
      ansuranApplications: applications,
      totalStaffClaimAmount: d.totalStaffClaimAmount,
      role: d.role
    }
  },
  [M_DETAILS_RESET](state) {
    // loop through state.details and reset all value to empty
    for (let key in state.details) {
      state.details[key] = ''
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
