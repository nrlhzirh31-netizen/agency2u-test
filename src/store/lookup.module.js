import { SHARED_LOADING, SHARED_UNLOADING } from '@/store/shared.module'
import { ddlHelper } from '@/utils'
import { authService } from '@/services'
import { localizationHelper } from '@/utils'

//define module name
const MODULE_NAME = 'lookup/'

//define actions name
const A_ROLE_DDL = 'getRoleDdl'
const A_PERMISSION_LIST = 'getPermissionList'
const A_BANK_DDL = 'getBankDdl'
const A_COMPANY_DDL = 'getCompanyDdl'
const A_APPLICATION_TYPE_DDL = 'getApplicationTypeDdl'
const A_COUNTRY_DDL = 'getCountryDdl'
const A_STATES_DDL = 'getStateDdl'
const A_AMOUNT_TYPE_DDL = 'getAmountTypeDdl'
const A_PRODUCTS_DDL = 'getProductsDdl'
const A_APPLICATION_STATUS_DDL = 'getApplicationStatusDdl'
const A_USER_DDL = 'getUserDdl'
const A_USERCODE_DDL = 'getUserCodeDdl'
const A_PAYOUT_DDL = 'getPayoutDdl'
const A_RECONCILE_DDL = 'getReconcileDdl'
const A_PROCESSING_ID_DDL = 'getProcessingIdDdl'
const A_REASON_TEMPLATE_DDL = 'getReasonTemplateDdl'
const A_ANSURAN_STATUS_DDL = 'getAnsuranStatusDdl'
const A_PCO_CATEGORY_DDL = 'getPcoCategoryDdl'
const A_ANSURAN_APPLICATION_FIRM_DDL = 'getAnsuranApplicationFirmDdl'

//define dispatch action
export const LOOKUP_ROLE_DDL = MODULE_NAME + A_ROLE_DDL
export const LOOKUP_PERMISSION_LIST = MODULE_NAME + A_PERMISSION_LIST
export const LOOKUP_BANK_DDL = MODULE_NAME + A_BANK_DDL
export const LOOKUP_COMPANY_DDL = MODULE_NAME + A_COMPANY_DDL
export const LOOKUP_APPLICATION_TYPE_DDL = MODULE_NAME + A_APPLICATION_TYPE_DDL
export const LOOKUP_COUNTRY_DDL = MODULE_NAME + A_COUNTRY_DDL
export const LOOKUP_STATES_DDL = MODULE_NAME + A_STATES_DDL
export const LOOKUP_AMOUNT_TYPE_DDL = MODULE_NAME + A_AMOUNT_TYPE_DDL
export const LOOKUP_PRODUCTS_DDL = MODULE_NAME + A_PRODUCTS_DDL
export const LOOKUP_APPLICATION_STATUS_DDL = MODULE_NAME + A_APPLICATION_STATUS_DDL
export const LOOKUP_USER_DDL = MODULE_NAME + A_USER_DDL
export const LOOKUP_USERCODE_DDL = MODULE_NAME + A_USERCODE_DDL
export const LOOKUP_PAYOUT_DDL = MODULE_NAME + A_PAYOUT_DDL
export const LOOKUP_RECONCILE_DDL = MODULE_NAME + A_RECONCILE_DDL
export const LOOKUP_PROCESSING_ID_DDL = MODULE_NAME + A_PROCESSING_ID_DDL
export const LOOKUP_REASON_TEMPLATE_DDL = MODULE_NAME + A_REASON_TEMPLATE_DDL
export const LOOKUP_ANSURAN_STATUS_DDL = MODULE_NAME + A_ANSURAN_STATUS_DDL
export const LOOKUP_PCO_CATEGORY_DDL = MODULE_NAME + A_PCO_CATEGORY_DDL
export const LOOKUP_ANSURAN_APPLICATION_FIRM_DDL = MODULE_NAME + A_ANSURAN_APPLICATION_FIRM_DDL

//define mutations name
const M_ROLE_DDL = 'setRoleDdl'
const M_PERMISSION_LIST = 'setPermissionList'
const M_BANK_DDL = 'setBankDdl'
const M_COMPANY_DDL = 'setCompanyDdl'
const M_APPLICATION_TYPE_DDL = 'setApplicationTypeDdl'
const M_COUNTRY_DDL = 'setCountryDdl'
const M_STATES_DDL = 'setStateDdl'
const M_AMOUNT_TYPE_DDL = 'setAmountTypeDdl'
const M_PRODUCTS_DDL = 'setProductsDdl'
const M_APPLICATION_STATUS_DDL = 'setApplicationStatusDdl'
const M_USER_DDL = 'setUserDdl'
const M_USERCODE_DDL = 'setUserCodeDdl'
const M_PAYOUT_DDL = 'setPayoutDdl'
const M_RECONCILE_DDL = 'setReconcileDdl'
const M_PROCESSING_ID_DDL = 'setProcessingIdDdl'
const M_REASON_TEMPLATE_DDL = 'setReasonTemplateDdl'
const M_ANSURAN_STATUS_DDL = 'setAnsuranStatusDdl'
const M_PCO_CATEGORY_DDL = 'setPcoCategoryDdl'
const M_ANSURAN_APPLICATION_FIRM_DDL = 'setAnsuranApplicationFirmDdl'

//init app state
const state = {
  roleDdl: [],
  permissionList: [],
  bankDdl: [],
  companyDdl: [],
  applicationTypeDdl: [],
  countryDdl: [],
  statesDdl: [],
  amountTypeDdl: [],
  productsDdl: [],
  applicationStatusDdl: [],
  userDdl: [],
  payoutDdl: [],
  reconcileStatusDdl: [],
  processingIdDdl: [],
  reasonTemplateDdl: [],
  ansuranStatusDdl: [],
  pcoCategoryDdl: [],
  ansuranApplicationFirmDdl: []
}

//to retrieve data from store state (called by component)
const getters = {}

//to perform some actions related with updating state (called by component)
const actions = {
  async [A_ROLE_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE, strValue = false }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getRolesLookup(isActive).then(
      (data) => {
        commit(M_ROLE_DDL, { data, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_ROLE_DDL, { error, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  [A_PERMISSION_LIST]({ commit, dispatch }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    authService.getAllSubModules().then(
      (data) => {
        commit(M_PERMISSION_LIST, { data })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_PERMISSION_LIST, { error })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_BANK_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getBanksLookup(isActive).then(
      (data) => {
        commit(M_BANK_DDL, { data, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_BANK_DDL, { error, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_COMPANY_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getCompanyLookup(isActive).then(
      (data) => {
        commit(M_COMPANY_DDL, { data, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_COMPANY_DDL, { error, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_APPLICATION_TYPE_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE, strValue = false }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getApplicationTypeLookup(isActive).then(
      (data) => {
        commit(M_APPLICATION_TYPE_DDL, { data, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_APPLICATION_TYPE_DDL, { error, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_COUNTRY_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getCountryLookup(isActive).then(
      (data) => {
        commit(M_COUNTRY_DDL, { data, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_COUNTRY_DDL, { error, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_STATES_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getStatesLookup(isActive).then(
      (data) => {
        commit(M_STATES_DDL, { data, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_STATES_DDL, { error, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_AMOUNT_TYPE_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getAmountTypeLookup(isActive).then(
      (data) => {
        commit(M_AMOUNT_TYPE_DDL, { data, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_AMOUNT_TYPE_DDL, { error, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_PRODUCTS_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getProductsLookup(isActive).then(
      (data) => {
        commit(M_PRODUCTS_DDL, { data, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_PRODUCTS_DDL, { error, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_APPLICATION_STATUS_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE, strValue = false }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getApplicationStatusLookup(isActive).then(
      (data) => {
        commit(M_APPLICATION_STATUS_DDL, { data, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_APPLICATION_STATUS_DDL, { error, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_USER_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE, product }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getUserLookup(isActive, product).then(
      (data) => {
        commit(M_USER_DDL, { data, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_USER_DDL, { error, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_USERCODE_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getUserLookup(isActive).then(
      (data) => {
        commit(M_USERCODE_DDL, { data, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_USERCODE_DDL, { error, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_PAYOUT_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getPayoutLookup(isActive).then(
      (data) => {
        commit(M_PAYOUT_DDL, { data, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_PAYOUT_DDL, { error, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_RECONCILE_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE, raw }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getReconcileLookup(isActive).then(
      (data) => {
        commit(M_RECONCILE_DDL, { data, hasOptionAll, raw })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_RECONCILE_DDL, { error, hasOptionAll })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_PROCESSING_ID_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE, strValue = false }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getProcessingIdLookup(isActive).then(
      (data) => {
        commit(M_PROCESSING_ID_DDL, { data, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_PROCESSING_ID_DDL, { error, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_REASON_TEMPLATE_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE, strValue = false }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getReasonTemplateLookup(isActive).then(
      (data) => {
        commit(M_REASON_TEMPLATE_DDL, { data, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_REASON_TEMPLATE_DDL, { error, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_ANSURAN_STATUS_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE, strValue = false }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getAnsuranStatusLookup(isActive).then(
      (data) => {
        commit(M_ANSURAN_STATUS_DDL, { data, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_ANSURAN_STATUS_DDL, { error, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_PCO_CATEGORY_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE, strValue = false }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getPcoCategoryLookup(isActive).then(
      (data) => {
        commit(M_PCO_CATEGORY_DDL, { data, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_PCO_CATEGORY_DDL, { error, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  async [A_ANSURAN_APPLICATION_FIRM_DDL]({ commit, dispatch }, { hasOptionAll, isActive = SHARED.DEFAULT_ALL_VALUE, strValue = false }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    await authService.getAnsuranApplicationFirmLookup(isActive).then(
      (data) => {
        commit(M_ANSURAN_APPLICATION_FIRM_DDL, { data, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        commit(M_ANSURAN_APPLICATION_FIRM_DDL, { error, hasOptionAll, strValue })
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  }
}

const mutations = {
  [M_ROLE_DDL](state, { data, hasOptionAll, strValue }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      p.push({
        text: d[i].name,
        value: strValue ? d[i].code : d[i].id
      })
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.roleDdl = ddlList
  },
  [M_PERMISSION_LIST](state, { data }) {
    let d = data
    let processedList = []
    //let menuGrp = Object.values(MENU_GROUP)

    state.permissionList = []
    for (let a = 0; a < d.length; a++) {
      //Group permissions by side menu
      state.permissionList.push([])
    }

    for (let i = 0; i < d.length; i++) {
      //get module info
      let m = {
        id: d[i].id,
        moduleName: localizationHelper.getMessage(`enumModules[0].${d[i].code}`),
        permissions: [],
        allPermissions: ''
      }

      //get module permissions
      let mp = d[i].permissions
      for (let j = 0; j < mp.length; j++) {
        let p = {
          text: localizationHelper.getMessage(`enumPermissions[0].${mp[j].action}`),
          value: mp[j].id
        }

        m.permissions.push(p)
        m.allPermissions = m.allPermissions + ',' + p.value
      }
      m.allPermissions = m.allPermissions.slice(1)

      processedList.push(m)
    }

    state.permissionList = processedList
  },
  [M_BANK_DDL](state, { data, hasOptionAll }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      p.push({
        text: d[i].name,
        value: d[i].id
      })
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.bankDdl = ddlList
  },
  [M_COMPANY_DDL](state, { data, hasOptionAll }) {
    let d = data.data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      p.push({
        text: d[i].name,
        value: d[i].id
      })
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.companyDdl = ddlList
  },
  [M_APPLICATION_TYPE_DDL](state, { data, hasOptionAll, strValue }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      p.push({
        text: d[i].name,
        value: strValue ? d[i].code : d[i].id
      })
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.applicationTypeDdl = ddlList
  },
  [M_COUNTRY_DDL](state, { data, hasOptionAll }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      p.push({
        text: d[i].name,
        value: d[i].id
      })
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.countryDdl = ddlList
  },
  [M_STATES_DDL](state, { data, hasOptionAll }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      p.push({
        text: d[i].name,
        value: d[i].id
      })
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.statesDdl = ddlList
  },
  [M_AMOUNT_TYPE_DDL](state, { data, hasOptionAll }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      p.push({
        text: d[i].name,
        value: d[i].id
      })
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.amountTypeDdl = ddlList
  },
  [M_PRODUCTS_DDL](state, { data, hasOptionAll }) {
    let d = data.data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      let applicationTypeName = d[i].applicationType ? d[i].applicationType.name : ''

      p.push({
        text: d[i].name + ' (' + applicationTypeName + ')',
        value: d[i].id
      })
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.productsDdl = ddlList
  },
  [M_APPLICATION_STATUS_DDL](state, { data, hasOptionAll, strValue }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      if (strValue) {
        if (d[i].name != 'Completed') {
          p.push({
            text: d[i].name,
            value: d[i].code
          })
        }
      } else {
        p.push({
          text: d[i].name,
          value: d[i].id
        })
      }
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.applicationStatusDdl = ddlList
  },
  [M_USER_DDL](state, { data, hasOptionAll }) {
    let d = data?.data || []
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []
    if (d.length == 0 || d == null) {
      d.push({
        text: 'No Ansuran User Found',
        value: 0
      })
      return (state.userDdl = d)
    }
    for (let i = 0; i < d.length; i++) {
      p.push({
        text: d[i].name + ' (' + d[i].code + ')',
        value: d[i].id
      })
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.userDdl = ddlList
  },
  [M_USERCODE_DDL](state, { data, hasOptionAll }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      p.push({
        text: d[i].name + ' (' + d[i].code + ')',
        value: d[i].code
      })
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.userDdl = ddlList
  },
  [M_PAYOUT_DDL](state, { data, hasOptionAll }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      p.push({
        text: d[i].name,
        value: d[i].id
      })
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.payoutDdl = ddlList
  },
  [M_RECONCILE_DDL](state, { data, hasOptionAll, raw }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      if (!raw) {
        p.push({
          text: d[i].name,
          value: d[i].id
        })
      } else {
        p.push({
          text: d[i].name,
          value: d[i].code,
          ...d[i]
        })
      }
    }
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.reconcileStatusDdl = ddlList
  },
  [M_PROCESSING_ID_DDL](state, { data, hasOptionAll, strValue }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    p = d.map((item) => {
      return { text: item.name, value: item.id }
    })
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.processingIdDdl = ddlList
  },
  [M_REASON_TEMPLATE_DDL](state, { data, hasOptionAll, strValue }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    p = d.map((item) => {
      return { text: item.name, value: item.id }
    })
    let sp = p.sort((a, b) => (a.text > b.text ? 1 : -1))

    ddlList.push.apply(ddlList, sp)
    state.reasonTemplateDdl = ddlList
  },
  [M_ANSURAN_STATUS_DDL](state, { data, hasOptionAll, strValue }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    for (let i = 0; i < d.length; i++) {
      if (strValue) {
        if (d[i].name != 'Completed') {
          p.push({
            text: d[i].name,
            value: d[i].code
          })
        }
      } else {
        p.push({
          text: d[i].name,
          value: d[i].id
        })
      }
    }
    ddlList.push.apply(ddlList, p)
    state.ansuranStatusDdl = ddlList
  },
  [M_PCO_CATEGORY_DDL](state, { data, hasOptionAll, strValue }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    p = d.map((item) => {
      return { text: item.name, value: item.id, percentage: item.percentage }
    })

    ddlList.push.apply(ddlList, p)
    state.pcoCategoryDdl = ddlList
  },
  [M_ANSURAN_APPLICATION_FIRM_DDL](state, { data, hasOptionAll, strValue }) {
    let d = data
    let p = []
    let ddlList = hasOptionAll ? [ddlHelper.getOptionAll()] : []

    p = d.map((item) => {
      return { text: item.name, value: item.id }
    })

    ddlList.push.apply(ddlList, p)
    state.ansuranApplicationFirmDdl = ddlList
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
