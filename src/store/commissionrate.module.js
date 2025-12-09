import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { commissionRateService } from '@/services'
import router from '@/router'
import { ROUTE_NAME } from '@/constants'

//define module name
const MODULE_NAME = 'commissionrate/'

//define actions name
const A_LIST = 'getCommissionRateListing'
const A_DELETE = 'deleteCommissionRate'
const A_CREATE = 'createCommissionRate'
const A_DETAILS = 'getCommissionRateDetails'
const A_EDIT = 'editCommissionRate'

//define dispatch action
export const COMMISSION_RATE_LIST = MODULE_NAME + A_LIST
export const COMMISSION_RATE_DELETE = MODULE_NAME + A_DELETE
export const COMMISSION_RATE_CREATE = MODULE_NAME + A_CREATE
export const COMMISSION_RATE_DETAILS = MODULE_NAME + A_DETAILS
export const COMMISSION_RATE_EDIT = MODULE_NAME + A_EDIT

//define mutations name
const M_LIST = 'setCommissionRateListing'
const M_DETAILS = 'setCommissionRateDetails'
const M_DETAILS_RESET = 'resetCommissionRateDetails'

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
    code: '',
    description: '',
    product: '',
    role: '',
    amountType: '',
    amount: ''
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    commissionRateService.getAllCommissionRate(filter).then(
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
    commissionRateService.deleteCommissionRate(id).then(
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
    commissionRateService.createCommissionRate(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.COMMISSION_RATE_LIST })
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
    commissionRateService.editCommissionRate(id, data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.COMMISSION_RATE_LIST })
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
    commissionRateService.getCommissionRate(id).then(
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
        description: e[i].description,
        product: e[i].product ? e[i].product.name : null,
        role: e[i].role.name,
        amountType: e[i].amountType.name,
        amount: e[i].amount
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
      product: d.product ? d.product.id : null,
      role: d.role.id,
      amountType: d.amountType.id,
      amount: d.amount
    }
  },
  [M_DETAILS_RESET](state) {
    state.details = {
      id: '',
      code: '',
      description: '',
      product: '',
      role: '',
      amountType: '',
      amount: ''
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
