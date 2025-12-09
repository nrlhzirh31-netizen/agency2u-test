import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { applicationTypeService } from '@/services'

//define module name
const MODULE_NAME = 'applicationtype/'

//define actions name
const A_LIST = 'getApplicationTypeListing'
const A_DELETE = 'deleteApplicationType'
const A_CREATE = 'createApplicationType'
const A_DETAILS = 'getApplicationTypeDetails'
const A_EDIT = 'editApplicationType'

//define dispatch action
export const APPLICATION_TYPE_LIST = MODULE_NAME + A_LIST
export const APPLICATION_TYPE_DELETE = MODULE_NAME + A_DELETE
export const APPLICATION_TYPE_CREATE = MODULE_NAME + A_CREATE
export const APPLICATION_TYPE_DETAILS = MODULE_NAME + A_DETAILS
export const APPLICATION_TYPE_EDIT = MODULE_NAME + A_EDIT

//define mutations name
const M_LIST = 'setApplicationTypeListing'
const M_DETAILS = 'setApplicationTypeDetails'
const M_DETAILS_RESET = 'resetApplicationTypeDetails'

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
    name: '',
    description: '',
    price: '',
    applicationType: ''
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    applicationTypeService.getAllApplicationTypes(filter).then(
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
    applicationTypeService.deleteApplicationType(id).then(
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
    applicationTypeService.createApplicationType(data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.APPLICATION_TYPE_LIST })
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
    applicationTypeService.editApplicationType(id, data).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.APPLICATION_TYPE_LIST })
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
    applicationTypeService.getApplicationType(id).then(
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
    state.list.data = []

    //process details
    for (let i = 0; i < d.length; i++) {
      let r = {
        id: d[i].id,
        code: d[i].code,
        name: d[i].name,
        description: d[i].description,
        price: d[i].price,
        applicationType: d[i].applicationType
      }

      state.list.data.push(r)
    }
  },
  [M_DETAILS](state, data) {
    let d = data

    state.details = {
      id: d.id,
      code: d.code,
      name: d.name,
      description: d.description,
      price: d.price,
      applicationType: d.applicationType
    }
  },
  [M_DETAILS_RESET](state) {
    state.details = {
      id: '',
      code: '',
      name: '',
      description: '',
      price: '',
      applicationType: ''
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
