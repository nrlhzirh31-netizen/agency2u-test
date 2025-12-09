import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { ansuranCommissionRateService } from '@/services'
import router from '@/router'
import { ROUTE_NAME } from '@/constants'
import { AnsuranCommissionRate } from '@/constants/class/ansuran-commission-rate'

//define module name
const MODULE_NAME = 'ansuranCommissionRate/'

//define actions name
const A_LIST = 'getAnsuranCommissionRateListing'
const A_DELETE = 'deleteAnsuranCommissionRate'
const A_CREATE = 'createAnsuranCommissionRate'
const A_DETAILS = 'getAnsuranCommissionRateDetails'
const A_EDIT = 'editAnsuranCommissionRate'

//define dispatch action
export const ANSURAN_COMMISSION_RATE_LIST = MODULE_NAME + A_LIST
export const ANSURAN_COMMISSION_RATE_DELETE = MODULE_NAME + A_DELETE
export const ANSURAN_COMMISSION_RATE_CREATE = MODULE_NAME + A_CREATE
export const ANSURAN_COMMISSION_RATE_DETAILS = MODULE_NAME + A_DETAILS
export const ANSURAN_COMMISSION_RATE_EDIT = MODULE_NAME + A_EDIT

//define mutations name
const M_LIST = 'setAnsuranCommissionRateListing'
const M_DETAILS = 'setAnsuranCommissionRateDetails'
const M_DETAILS_RESET = 'resetAnsuranCommissionRateDetails'

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
  details: new AnsuranCommissionRate()
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranCommissionRateService.getAllAnsuranCommissionRate(filter).then(
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
  [A_DELETE]({ commit, dispatch }, { id, data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranCommissionRateService.deleteAnsuranCommissionRate(id).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          location.reload()
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
  [A_CREATE]({ commit, dispatch }, { data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranCommissionRateService.createAnsuranCommissionRate(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.ANSURAN_COMMISSION_RATE_LIST })
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
  [A_EDIT]({ commit, dispatch }, { id, data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranCommissionRateService.editAnsuranCommissionRate(id, data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.ANSURAN_COMMISSION_RATE_LIST })
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
    ansuranCommissionRateService.getAnsuranCommissionRate(id).then(
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
        code: e[i].code,
        role: e[i].role.name,
        fromAmount: e[i].fromAmount,
        toAmount: e[i].toAmount,
        commissionAmount: e[i].commissionAmount,
        amountType: e[i].amountType.name,
        roleObj: e[i].role,
        description: e[i].description
      }

      state.list.data.push(r)
    }
  },
  [M_DETAILS](state, data) {
    let d = data

    state.details = {
      id: d.id,
      code: d.code,
      description: d.description,
      role: d.role.id,
      amountType: d.amountType.id,
      commissionAmount: d.commissionAmount,
      fromAmount: d.fromAmount,
      toAmount: d.toAmount
    }
  },
  [M_DETAILS_RESET](state) {
    state.details = new AnsuranCommissionRate()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
