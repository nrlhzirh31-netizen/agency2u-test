import { sharedHelper, localizationHelper } from '@/utils'

//define module name
const MODULE_NAME = 'shared/'

//define actions name
const A_LOADING = 'loading'
const A_UNLOADING = 'unloading'
const A_SHOW_DIALOG = 'showDialog'
const A_CLOSE_DIALOG = 'closeDialog'
const A_SESSION_EXPIRED = 'sessionExpired'
const A_API_TIMEOUT = 'apiTimeout'
const A_SHOW_CREATE_COMPANY_DIALOG = 'showCreateCompanyDialog'
const A_CLOSE_CREATE_COMPANY_DIALOG = 'closeCreateCompanyDialog'
const A_SET_ERROR_MESSAGE = 'setErrorMessage'
const A_SHOW_PAYOUT_NO_PAYMENT = 'showPayoutNoPaymentDialog'
const A_CLOSE_PAYOUT_NO_PAYMENT = 'closePayoutNoPaymentDialog'

//define dispatch action
export const SHARED_LOADING = MODULE_NAME + A_LOADING
export const SHARED_UNLOADING = MODULE_NAME + A_UNLOADING
export const SHARED_SHOW_DIALOG = MODULE_NAME + A_SHOW_DIALOG
export const SHARED_CLOSE_DIALOG = MODULE_NAME + A_CLOSE_DIALOG
export const SHARED_SESSION_EXPIRED = MODULE_NAME + A_SESSION_EXPIRED
export const SHARED_API_TIMEOUT = MODULE_NAME + A_API_TIMEOUT
export const SHARED_SHOW_CREATE_COMPANY_DIALOG = MODULE_NAME + A_SHOW_CREATE_COMPANY_DIALOG
export const SHARED_CLOSE_CREATE_COMPANY_DIALOG = MODULE_NAME + A_CLOSE_CREATE_COMPANY_DIALOG
export const SHARED_SET_ERROR_MESSAGE = MODULE_NAME + A_SET_ERROR_MESSAGE
export const SHARED_SHOW_PAYOUT_NO_PAYMENT = MODULE_NAME + A_SHOW_PAYOUT_NO_PAYMENT
export const SHARED_CLOSE_PAYOUT_NO_PAYMENT = MODULE_NAME + A_CLOSE_PAYOUT_NO_PAYMENT

//define mutations name
const M_LOADING = 'setLoading'
const M_UNLOADING = 'setUnloading'
const M_SHOW_DIALOG = 'setDialog'
const M_CLOSE_DIALOG = 'clearDialog'
const M_SHOW_CREATE_COMPANY_DIALOG = 'setCreateCompanyDialog'
const M_CLOSE_CREATE_COMPANY_DIALOG = 'clearCreateCompanyDialog'
const M_SET_ERROR_MESSAGE = 'setErrorMessage'
const M_SHOW_PAYOUT_NO_PAYMENT = 'setPayoutNoPaymentDialog'
const M_CLOSE_PAYOUT_NO_PAYMENT = 'clearPayoutNoPaymentDialog'

//init app state
const state = {
  loadingIndex: 0,
  messageDialogDisplay: false,
  messageDialog: {
    messageTitle: '',
    messages: [],
    buttons: [],
    type: ''
  },
  createCompanyDialogDisplay: false,
  errorMessage: {},
  payoutNoPaymentDialogDisplay: false
}

//to retrieve data from store state (called by component)
const getters = {}

//to perform some actions related with updating state (called by component)
const actions = {
  [A_LOADING]({ commit }) {
    commit(M_LOADING)
  },
  [A_UNLOADING]({ commit }) {
    commit(M_UNLOADING)
  },
  [A_SHOW_DIALOG]({ commit }, messageDialog) {
    commit(M_SHOW_DIALOG, messageDialog)
  },
  [A_CLOSE_DIALOG]({ commit }, messageDialog) {
    commit(M_CLOSE_DIALOG, messageDialog)
  },
  [A_SESSION_EXPIRED]({ commit }) {
    let messageDialog = sharedHelper.getErrorReloadPageDialog(localizationHelper.getMessage(`label.sessionExpired`), localeHelper.getMessage(`error.sessionExpired`), 'refresh')

    commit(M_SHOW_DIALOG, messageDialog)
  },
  [A_API_TIMEOUT]({ commit }) {
    let messageDialog = sharedHelper.getErrorReloadPageDialog(localizationHelper.getMessage(`label.apiTimeout`), localeHelper.getMessage(`error.apiTimeout`), 'refresh')

    commit(M_SHOW_DIALOG, messageDialog)
  },
  [A_SHOW_CREATE_COMPANY_DIALOG]({ commit }) {
    commit(M_SHOW_CREATE_COMPANY_DIALOG)
  },
  [A_CLOSE_CREATE_COMPANY_DIALOG]({ commit }) {
    commit(M_CLOSE_CREATE_COMPANY_DIALOG)
  },
  [A_SET_ERROR_MESSAGE]({ commit }, error) {
    commit(M_SET_ERROR_MESSAGE, error)
  },
  [A_SHOW_PAYOUT_NO_PAYMENT]({ commit }) {
    commit(M_SHOW_PAYOUT_NO_PAYMENT)
  },
  [A_CLOSE_PAYOUT_NO_PAYMENT]({ commit }) {
    commit(M_CLOSE_PAYOUT_NO_PAYMENT)
  }
}

//to update state values (called by actions)
const mutations = {
  [M_LOADING](state) {
    state.loadingIndex += 1
  },
  [M_UNLOADING](state) {
    state.loadingIndex -= 1
  },
  [M_SHOW_DIALOG](state, messageDialog) {
    state.messageDialogDisplay = true

    state.messageDialog.messageTitle = messageDialog.messageTitle
    state.messageDialog.messages = messageDialog.messages
    state.messageDialog.buttons = messageDialog.buttons
    state.messageDialog.type = messageDialog.type
  },
  [M_CLOSE_DIALOG](state, messageDialog) {
    state.messageDialogDisplay = false

    state.messageDialog.messageTitle = ''
    state.messageDialog.messages = []
    state.messageDialog.buttons = []
    state.messageDialog.type = ''
  },
  [M_SHOW_CREATE_COMPANY_DIALOG](state) {
    state.createCompanyDialogDisplay = true
  },
  [M_CLOSE_CREATE_COMPANY_DIALOG](state) {
    state.createCompanyDialogDisplay = false
  },
  [M_SET_ERROR_MESSAGE](state, error) {
    let { route, message = 'No permission to view this section' } = error
    state.errorMessage[route] = { message }
  },
  [M_SHOW_PAYOUT_NO_PAYMENT](state) {
    state.payoutNoPaymentDialogDisplay = true
  },
  [M_CLOSE_PAYOUT_NO_PAYMENT](state) {
    state.payoutNoPaymentDialogDisplay = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
