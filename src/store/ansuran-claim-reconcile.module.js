import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { ansuranClaimService, ansuranApplicationService } from '@/services'
import moment from 'moment'
import router from '@/router'
import { ROUTE_NAME } from '@/constants'
import { moneyFormat } from '@/utils/filters.helper'
import { AnsuranClaimReconcileDetails } from '@/constants'

//define module name
const MODULE_NAME = 'ansuranClaimReconcile/'

//define actions name
const A_LIST = 'getAnsuranClaimReconcileListing'
const A_DETAILS = 'getAnsuranClaimReconcileDetails'
const A_APPLICATION_LIST = 'getAnsuranApplicationListing'
const A_EDIT = 'editAnsuranClaimReconcile'
const A_UPDATE = 'updateAnsuranClaimReconcile'

//define dispatch action
export const ANSURAN_CLAIM_RECONCILE_LIST = MODULE_NAME + A_LIST
export const ANSURAN_CLAIM_RECONCILE_DETAILS = MODULE_NAME + A_DETAILS
export const ANSURAN_CLAIM_APPLICATION_LISTING = MODULE_NAME + A_APPLICATION_LIST
export const ANSURAN_CLAIM_APPLICATION_EDIT = MODULE_NAME + A_EDIT
export const ANSURAN_CLAIM_APPLICATION_UPDATE = MODULE_NAME + A_UPDATE

//define mutations name
const M_LIST = 'setAnsuranClaimHistoryListing'
const M_APPLICATION_LIST = 'setAnsuranApplicationListing'
const M_DETAILS = 'setAnsuranClaimHistoryDetails'
const M_DETAILS_RESET = 'resetAnsuranClaimSubmissionDetails'

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
  details: new AnsuranClaimReconcileDetails()
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranClaimService.getAllAnsuranClaimReconcile(filter).then(
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
  [A_DETAILS]({ commit, dispatch }, { id }) {
    commit(M_DETAILS_RESET)
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranClaimService.getAnsuranClaimReconcile(id).then(
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
    ansuranApplicationService.editAnsuranClaimReconcile(id, data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.ANSURAN_CLAIM_RECONCILE_LIST })
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
    ansuranApplicationService.editAnsuranClaimReconcile(id, data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.ANSURAN_CLAIM_RECONCILE_LIST })
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
        reconcileNumber: d[i].ansuranInvoiceNumber ?? '',
        customerName: d[i].customerName,
        claimStatus: d[i].ansuranPayouts[0]?.ansuranPayoutStatus?.name,
        reconcileStatus: d[i].reconcileStatus ? d[i].reconcileStatus.name : null,
        creditPrice: d[i].creditPrice ? moneyFormat(d[i].creditPrice) : null,
        pco: d[i].pco ? moneyFormat(d[i].pco) : null,
        amount: d[i].staffClaimAmount ? moneyFormat(d[i].staffClaimAmount) : null,
        ansuranApplicationFirm: d[i].ansuranApplicationFirm ? d[i].ansuranApplicationFirm.name : null
      }
      state.list.data.push(r)
    }
  },
  [M_DETAILS](state, data) {
    let d = data

    state.details = {
      id: d.id,
      code: d.code,
      referenceNumber: d.referenceNumber,
      applicationDate: d.applicationDate,
      ansuranStatus: d.ansuranStatus?.id,
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
      pco: d.pco ? Number(d.pco) : null,
      staffClaimAmount: d.staffClaimAmount,
      invoiceNumber: d.invoiceNumber,
      warrantyStartDate: d.warrantyStartDate,
      warrantyEndDate: d.warrantyEndDate,
      pcoCategory: d.pcoCategory ? d.pcoCategory.id : null,
      payouts: d.ansuranPayouts.map((item) => {
        return {
          payoutId: item.id,
          code: item.code,
          paymentVoucherNumber: item.ansuranPaymentVoucher ? item.ansuranPaymentVoucher.paymentVoucherNumber : '',
          claimDate: d.claimDate ? moment(d.claimDate).format('DD-MM-YYYY') : '',
          payoutDate: item.ansuranPaymentVoucher?.payoutDate ? moment(item.ansuranPaymentVoucher?.payoutDate).format('DD-MM-YYYY') : '',
          staffClaimAmount: d.staffClaimAmount,
          commissionAmount: item.ansuranPaymentVoucher?.commissionAmount,
          payoutStatus: item.ansuranPayoutStatus ? item.ansuranPayoutStatus?.name : ''
        }
      }),
      pcoCategory: d.pcoCategory ? d.pcoCategory.id : null,
      agent: {
        name: d.user?.name,
        nric: d.user?.nric,
        code: d.user?.code,
        phone: d.user?.phone,
        email: d.user?.email,
        bankAcc: d.user?.bankAccountNumber,
        bankName: d.user?.bank?.name
      },
      commissionTier: d.ansuranPayouts[0] ? d.ansuranPayouts[0].commissionTier : null,
      payoutCommissionAmount: d.ansuranPayouts[0]?.ansuranPaymentVoucher?.commissionAmount,
      reconcileRemark: d.reconcileRemark,
      reconcileStatus: d.reconcileStatus ? d.reconcileStatus.id : null,
      ansuranInvoiceNumber: d.ansuranInvoiceNumber,
      closingDate: d.closingDate,
      ansuranApplicationFirm: d.ansuranApplicationFirm ? d.ansuranApplicationFirm.id : null
    }
  },
  [M_DETAILS_RESET](state) {
    state.details = new AnsuranClaimReconcileDetails()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
