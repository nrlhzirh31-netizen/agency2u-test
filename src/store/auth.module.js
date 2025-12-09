import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { SESSION } from '@/constants'
import { sharedHelper } from '@/utils'
import { userService, authService } from '@/services'
import jwt_decode from 'jwt-decode'

//define module name
const MODULE_NAME = 'auth/'

//define actions name
const A_LOGIN_TOKEN = 'getLoginToken'
const A_LOGOUT = 'logout'
const A_RESET_LOGIN_STORE = 'resetLoginStore'
const A_LOGIN_REFRESH = 'getRefreshToken'

//define dispatch action
export const AUTH_LOGIN_TOKEN = MODULE_NAME + A_LOGIN_TOKEN
export const AUTH_LOGOUT = MODULE_NAME + A_LOGOUT
export const AUTH_RESET_LOGIN_STORE = MODULE_NAME + A_RESET_LOGIN_STORE
export const AUTH_LOGIN_REFRESH = MODULE_NAME + A_LOGIN_REFRESH //Refresh Bearer token

//define mutations name
const M_LOGIN_TOKEN = 'setLoginToken'
const M_LOGOUT = 'setLogout'
const M_RESET_LOGIN_STORE = 'resetLoginStore'
const M_LOGIN_REFRESH = 'setRefreshToken'
const M_INFO = 'setUserIdentity'
const M_ROLE_PERMISSIONS = 'setRolePermissions'

//init app state
const state = {
  loginResult: {
    complete: false,
    success: false
  }
}

//to retrieve data from store state (called by component)
const getters = {}

//to perform some actions related with updating state (called by component)
const actions = {
  async [A_LOGIN_TOKEN]({ dispatch, commit }, { loginObj }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await userService
      .getUserToken(loginObj)
      .then(
        (result) => {
          commit(M_LOGIN_TOKEN, result)
          var decoded = jwt_decode(result.access_token)
          userService.getUserInfo(decoded.sub).then(
            (result) => {
              commit(M_INFO, result)
              authService.getRolePermissions(result.role.id).then(
                (result) => {
                  commit(M_ROLE_PERMISSIONS, result)
                },
                (error) => {
                  commit(M_ROLE_PERMISSIONS, error)
                }
              )
            },
            (error) => {
              commit(M_INFO, error)
            }
          )
          dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
        },
        (error) => {
          let closeAction = () => {
            dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          }
          let messageDialog = sharedHelper.getErrorMessageDialog(error, closeAction)
          //commit(M_LOGIN_TOKEN, error)
          dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
          dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
        }
      )
      .finally(() => {
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      })
  },
  [A_LOGOUT]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    userService
      .clearUserToken()
      .then(
        (result) => {
          commit(M_LOGOUT, result)
          dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
        },
        (error) => {
          let closeAction = () => {
            dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          }
          let messageDialog = sharedHelper.getErrorMessageDialog(error, closeAction)
          commit(M_LOGOUT, error)
          dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
          dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
        }
      )
      .finally(() => {
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      })
  },
  [A_RESET_LOGIN_STORE]({ dispatch, commit }) {
    commit(M_RESET_LOGIN_STORE)
  },
  async [A_LOGIN_REFRESH]({ dispatch, commit }) {
    //Trigger in background
    await userService.getUserRefreshToken().then(
      (result) => {
        commit(M_LOGIN_REFRESH, result)
      },
      (error) => {
        commit(M_LOGIN_REFRESH, error)
      }
    )
  }
}

//to update state values (called by actions)
const mutations = {
  [M_LOGIN_TOKEN](state, result) {
    state.loginResult = {
      complete: true,
      success: true
    }

    var decoded = jwt_decode(result.access_token)

    localStorage.setItem(SESSION.USERID, decoded.sub)
    // localStorage.setItem(SESSION.EMAIL, decoded.email)
    localStorage.setItem(SESSION.JWT_TOKEN, result.access_token)
    localStorage.setItem(SESSION.JWT_TOKEN_REFRESH, result.refresh_token)
    localStorage.setItem(SESSION.TOKEN_EXPIRY_TIME, decoded.exp)
  },
  [M_LOGOUT](state, result) {
    sharedHelper.clearAllClientStorageRedirect()
  },
  [M_RESET_LOGIN_STORE](state) {
    state.loginResult.complete = false
    state.loginResult.success = false
  },
  [M_LOGIN_REFRESH](state, result) {
    var decoded = jwt_decode(result.access_token)

    localStorage.setItem(SESSION.USERID, decoded.sub)
    // localStorage.setItem(SESSION.EMAIL, decoded.email)
    localStorage.setItem(SESSION.JWT_TOKEN, result.access_token)
    localStorage.setItem(SESSION.JWT_TOKEN_REFRESH, result.refresh_token)
    localStorage.setItem(SESSION.TOKEN_EXPIRY_TIME, decoded.exp)
  },
  [M_INFO](state, result) {
    const userInfo = {
      name: result.name,
      role: {
        name: result.role?.name,
        code: result.role?.code
      }
    }
    localStorage.setItem(SESSION.CURRENT_USER_INFO, JSON.stringify(userInfo))
    localStorage.setItem(SESSION.ROLE_ID, result.role.id)
  },
  [M_ROLE_PERMISSIONS](state, result) {
    localStorage.setItem(SESSION.ROLE_PERMISSIONS, JSON.stringify(result.permissions))
    location.reload()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
