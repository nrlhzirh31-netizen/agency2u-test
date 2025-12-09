import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { authService } from '@/services'
import { ROUTE_NAME } from '@/constants'
import router from '@/router'

//define module name
const MODULE_NAME = 'role/'

//define actions name
const A_LIST = 'getRoleListing'
const A_CREATE = 'createRole'
const A_DETAILS = 'getRoleDetails'
const A_EDIT = 'editRole'

//define dispatch action
export const ROLE_LIST = MODULE_NAME + A_LIST
export const ROLE_CREATE = MODULE_NAME + A_CREATE
export const ROLE_DETAILS = MODULE_NAME + A_DETAILS
export const ROLE_EDIT = MODULE_NAME + A_EDIT

//define mutations name
const M_LIST = 'setRoleListing'
const M_DETAILS = 'setRoleDetails'
const M_DETAILS_RESET = 'resetRoleDetails'

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
    roleName: '',
    description: '',
    permissions: []
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    authService.getAllRoles().then(
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
  [A_CREATE]({ dispatch }, { data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    authService.createRole(data).then(
      (result) => {
        authService.createPermissions(result, data).then(() => {
          let successAction = () => {
            dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
            router.push({ name: ROUTE_NAME.ROLE_LIST })
          }

          let messageDialog = sharedHelper.getRecordCreatedDialog(successAction)

          dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
          dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
        })
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
    authService.getRole(id).then(
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
  [A_EDIT]({ dispatch }, { data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    authService.editRole(data).then(
      () => {
        authService.editPermissions(data).then(
          () => {
            let successAction = () => {
              dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
              router.push({ name: ROUTE_NAME.ROLE_LIST })
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
        description: d[i].description
      }

      state.list.data.push(r)
    }
  },
  [M_DETAILS](state, data) {
    let d = data

    state.details = {
      id: d.id,
      roleName: d.name,
      description: d.name,
      permissions: d.permissions
    }
  },
  [M_DETAILS_RESET](state) {
    state.details = {
      id: '',
      roleName: '',
      description: '',
      permissions: []
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
