import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG, SHARED_CLOSE_CREATE_COMPANY_DIALOG } from '@/store/shared.module'
import { userService, companyService } from '@/services'
import { ROUTE_NAME } from '@/constants'
import { sharedHelper } from '@/utils'
import router from '@/router'
import moment from 'moment'

//define module name
const MODULE_NAME = 'user/'

//define actions name
const A_LIST = 'getUserListing'
const A_DETAILS = 'getUserDetails'
const A_EDIT = 'editUser'
const A_CREATE = 'createUser'
const A_DELETE = 'deleteUser'
const A_FORGOT_PASSWORD = 'forgotPassword'
const A_UPDATE_PASSWORD = 'updatePassword'
const A_CREATE_COMPANY = 'createCompany'
const A_RESET_PASSWORD = 'resetPassword'

//define dispatch action
export const USER_LIST = MODULE_NAME + A_LIST
export const USER_DETAILS = MODULE_NAME + A_DETAILS
export const USER_EDIT = MODULE_NAME + A_EDIT
export const USER_CREATE = MODULE_NAME + A_CREATE
export const USER_DELETE = MODULE_NAME + A_DELETE
export const USER_FORGOT_PASSWORD = MODULE_NAME + A_FORGOT_PASSWORD
export const USER_UPDATE_PASSWORD = MODULE_NAME + A_UPDATE_PASSWORD
export const USER_RESET_PASSWORD = MODULE_NAME + A_RESET_PASSWORD
export const COMPANY_CREATE = MODULE_NAME + A_CREATE_COMPANY

//define mutations name
const M_LIST = 'setUserListing'
const M_DETAILS = 'setUserDetails'
const M_DETAILS_RESET = 'resetUserDetails'

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
    createdAt: '',
    code: '',
    name: '',
    phone: '',
    email: '',
    nric: '',
    bank: '',
    bankAccountNumber: '',
    referredBy: '',
    gender: '',
    roles: [],
    company: '',
    userAccountStatus: '',
    address1: '',
    address2: '',
    address3: '',
    city: '',
    postalCode: '',
    state: '',
    country: '',
    businessRegNo: '',
    companyAddress1: '',
    companyAddress2: '',
    companyAddress3: '',
    companyCity: '',
    companyPostalCode: '',
    companyState: '',
    companyCountry: '',
    companyData: ''
  },
  forgotPasswordResult: {
    complete: false,
    success: false,
    code: 0,
    data: null
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    userService.getAllUsers(filter).then(
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
    userService.getUser(id).then(
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
    userService.editUser(id, data).then(
      () => {
        console.log('editUser data', data)
        if (data.addressBookId) {
          userService.editAddress(data).then(
            () => {
              let successAction = () => {
                dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
                router.push({ name: ROUTE_NAME.USER_LIST })
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
        } else {
          userService.createAddress({ identifiers: [{ id: data.id }] }, data).then(
            () => {
              let successAction = () => {
                dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
                router.push({ name: ROUTE_NAME.USER_LIST })
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
    userService.createUser(data).then(
      (result) => {
        userService.createAddress(result, data).then(
          () => {
            let successAction = () => {
              dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
              router.push({ name: ROUTE_NAME.USER_LIST })
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
    userService.deleteUser(id).then(
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
  [A_FORGOT_PASSWORD]({ commit, dispatch }, { forgotPasswordObj }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    userService.forgotPassword(forgotPasswordObj).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          location.reload()
        }
        let messageDialog = sharedHelper.getForgotPasswordDialog(successAction)

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
  [A_UPDATE_PASSWORD]({ commit, dispatch }, { updatePasswordObj }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    userService.updatePassword(updatePasswordObj).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          location.reload()
        }
        let messageDialog = sharedHelper.getResetPasswordDialog(successAction)

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
  [A_CREATE_COMPANY]({ commit, dispatch }, { data }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    companyService.createCompany(data).then(
      (result) => {
        companyService.createCompanyAddress(result, data).then(
          () => {
            let successAction = () => {
              dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
              dispatch(`${SHARED_CLOSE_CREATE_COMPANY_DIALOG}`, {}, { root: true })
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
  [A_RESET_PASSWORD]({ commit, dispatch }, { resetPasswordObj }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    userService.resetPassword(resetPasswordObj).then(
      () => {
        let successAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
          router.push({ name: ROUTE_NAME.LOGIN })
        }
        let messageDialog = sharedHelper.getResetPasswordDialog(successAction)

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
    let d = data
    let e = d.data
    state.list.data = []

    //process details
    for (let i = 0; i < e.length; i++) {
      let r = {
        id: e[i].id,
        email: e[i].email,
        createdAt: e[i].createdAt ? moment(e[i].createdAt).format('DD-MM-YYYY') : '',
        code: e[i].code,
        name: e[i].name,
        phone: e[i].phone,
        role: e[i].role?.name ?? '',
        referredBy: e[i].referredBy
      }

      state.list.data.push(r)
    }
  },
  [M_DETAILS](state, data) {
    let d = data

    state.details = {
      id: d.id,
      createdAt: d.createdAt,
      code: d.code,
      name: d.name,
      mobileNo: d.phone,
      email: d.email,
      nric: d.nric,
      bank: d.bank?.id,
      bankAccountNumber: d.bankAccountNumber,
      referredBy: d.referredBy,
      gender: d.gender.id,
      roles: d.role.id,
      company: d.company ? d.company.id : '',
      userAccountStatus: d.userAccountStatus?.id,
      addressBookId: d.addressBook ? d.addressBook[0]?.id : '',
      address1: d.addressBook ? d.addressBook[0]?.addressLine1 : '',
      address2: d.addressBook ? d.addressBook[0]?.addressLine2 : '',
      address3: d.addressBook ? d.addressBook[0]?.addressLine3 : '',
      country: d.addressBook ? d.addressBook[0]?.country.id : '',
      region: d.addressBook ? d.addressBook[0]?.state.id : '',
      city: d.addressBook ? d.addressBook[0]?.city : '',
      postalCode: d.addressBook ? d.addressBook[0]?.postcode : '',
      companyData: {
        id: d.company ? d.company.id : '',
        businessRegNo: d.company ? d.company.registrationNumber : ''
        // companyAddressBookId: d.company ? d.company.addressBook[0].id : '',
        // companyAddress1: d.company ? d.company.addressBook[0].addressLine1 : '',
        // companyAddress2: d.company ? d.company.addressBook[0].addressLine2 : '',
        // companyAddress3: d.company ? d.company.addressBook[0].addressLine3 : '',
        // companyCountry: d.company ? d.company.addressBook[0].country.id : '',
        // companyRegion: d.company ? d.company.addressBook[0].state.id : '',
        // companyCity: d.company ? d.company.addressBook[0].city : '',
        // companyPostalCode: d.company ? d.company.addressBook[0].postcode : ''
      }
      // companyAddressBookId: d.addressBook[1] ? d.addressBook[1].id : '',
      // companyAddress1: d.addressBook[1] ? d.addressBook[1].addressLine1 : '',
      // companyAddress2: d.addressBook[1] ? d.addressBook[1].addressLine2 : '',
      // companyAddress3: d.addressBook[1] ? d.addressBook[1].addressLine3 : '',
      // companyCountry: d.addressBook[1] ? d.addressBook[1].country.id : '',
      // companyRegion: d.addressBook[1] ? d.addressBook[1].state.id : '',
      // companyCity: d.addressBook[1] ? d.addressBook[1].city : '',
      // companyPostalCode: d.addressBook[1] ? d.addressBook[1].postcode : ''
    }
    console.log(state.details)
  },
  [M_DETAILS_RESET](state) {
    state.details = {
      id: '',
      createdAt: '',
      code: '',
      name: '',
      mobileNo: '',
      email: '',
      nric: '',
      bank: '',
      bankAccountNumber: '',
      referredBy: '',
      gender: '',
      roles: '',
      company: '',
      userAccountStatus: '',
      addressBookId: '',
      address1: '',
      address2: '',
      address3: '',
      country: '',
      region: '',
      city: '',
      postalCode: '',
      companyAddressBookId: '',
      companyAddress1: '',
      companyAddress2: '',
      companyAddress3: '',
      companyCountry: '',
      companyRegion: '',
      companyCity: '',
      companyPostalCode: '',
      companyData: ''
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
