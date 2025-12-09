import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SET_ERROR_MESSAGE } from '@/store/shared.module'
import { ansuranDashboardService } from '@/services'
import { localizationHelper } from '@/utils'
import { ANSURAN_DASHBOARD } from '@/services/ansuran-dashboard.service'

//define module name
const MODULE_NAME = 'ansuranDashboard/'

//define actions name
const A_ANSURAN_APPLICATION = 'getAnsuranDashboardApplication'
const A_BEST_SELLER = 'getBestSeller'
const A_ANSURAN_USER_ACTIVITY = 'getAnsuranUserActivity'
const A_ANSURAN_SALES = 'getAnsuranSales'
const A_ANSURAN_COMMISSION = 'getAnsuranCommission'

//define dispatch action
export const ANSURAN_DASHBOARD_APPLICATION = MODULE_NAME + A_ANSURAN_APPLICATION
export const ANSURAN_BEST_SELLER = MODULE_NAME + A_BEST_SELLER
export const ANSURAN_USER_ACTIVITY = MODULE_NAME + A_ANSURAN_USER_ACTIVITY
export const ANSURAN_SALES = MODULE_NAME + A_ANSURAN_SALES
export const ANSURAN_COMMISSION = MODULE_NAME + A_ANSURAN_COMMISSION

//define mutations name
const M_ANSURAN_APPLICATION = 'setAnsuranDashboardApplication'
const M_BEST_SELLER = 'setBestSeller'
const M_ANSURAN_USER_ACTIVITY = 'setAnsuranUserActivity'
const M_ANSURAN_SALES = 'setAnsuranSales'
const M_ANSURAN_COMMISSION = 'setAnsuranCommission'

//init app state
const state = {
  ansuranApplication: {
    data: []
  },
  bestSeller: {
    data: []
  },
  ansuranUserActivity: {
    data: []
  },
  ansuranSales: {
    chartData: {
      labels: [],
      datasets: []
    },
    pastSalesOverTime: 0,
    currentSalesOverTime: 0,
    percentSinceLastMonth: 0
  },
  ansuranCommission: {
    totalCommission: 0,
    downlineCommission: []
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_ANSURAN_APPLICATION]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranDashboardService.getAnsuranDashboardApplication().then(
      (result) => {
        commit(M_ANSURAN_APPLICATION, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        if (error.statusCode === 403) {
          dispatch(`${SHARED_SET_ERROR_MESSAGE}`, { route: `${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.APPLICATION}` }, { root: true })
        }
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  [A_BEST_SELLER]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranDashboardService.getBestSeller().then(
      (result) => {
        commit(M_BEST_SELLER, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        if (error.statusCode === 403) {
          dispatch(`${SHARED_SET_ERROR_MESSAGE}`, { route: `${DASHBOARD.DASHBOARD}/${DASHBOARD.BESTSELLER}` }, { root: true })
        }
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  [A_ANSURAN_USER_ACTIVITY]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranDashboardService.getAnsuranUserActivity().then(
      (result) => {
        commit(M_ANSURAN_USER_ACTIVITY, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        if (error.statusCode === 403) {
          dispatch(`${SHARED_SET_ERROR_MESSAGE}`, { route: `${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.USERACTIVITY}` }, { root: true })
        }
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  [A_ANSURAN_SALES]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranDashboardService.getAnsuranSales().then(
      (result) => {
        commit(M_ANSURAN_SALES, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        if (error.statusCode === 403) {
          dispatch(`${SHARED_SET_ERROR_MESSAGE}`, { route: `${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.SALES}` }, { root: true })
        }
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  [A_ANSURAN_COMMISSION]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranDashboardService.getAnsuranCommission().then(
      (result) => {
        commit(M_ANSURAN_COMMISSION, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        if (error.statusCode === 403) {
          dispatch(`${SHARED_SET_ERROR_MESSAGE}`, { route: `${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.COMMISSION}` }, { root: true })
        }
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  }
}

const mutations = {
  [M_ANSURAN_APPLICATION](state, data) {
    let d = data
    state.ansuranApplication.data = []

    for (const [key, value] of Object.entries(d)) {
      let r = {
        moduleName: localizationHelper.getMessage(`enumDashboard[0].${key}`),
        value: value ? value : ''
      }
      state.ansuranApplication.data.push(r)
    }
  },
  [M_BEST_SELLER](state, data) {
    let d = data
    state.bestSeller.data = []

    for (let i = 0; i < d.length; i++) {
      let r = {
        product: d[i].product,
        totalAmount: d[i].totalAmount
      }

      state.bestSeller.data.push(r)
    }
  },
  [M_ANSURAN_USER_ACTIVITY](state, data) {
    let d = data
    state.ansuranUserActivity.data = []

    for (let i = 0; i < d.length; i++) {
      let r = {
        user_code: d[i].user_code,
        user_name: d[i].user_name,
        role_name: d[i].role_name,
        totalApplications: d[i].totalApplications
      }

      state.ansuranUserActivity.data.push(r)
    }
  },
  [M_ANSURAN_SALES](state, data) {
    let d = data
    state.ansuranSales.chartData.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    state.ansuranSales.chartData.datasets = []
    let firstData = []
    let secondData = []

    for (let i = 0; i < d.applications.length; i++) {
      firstData.push(d.applications[i].pastSalesAmount)
      secondData.push(d.applications[i].currentSalesAmount)
    }

    let firstDataSet = {
      label: 'Last Year Sales Amount',
      backgroundColor: '#555555',
      data: firstData
    }

    let secondDataSet = {
      label: 'Current Sales Amount',
      backgroundColor: '#009bdd',
      data: secondData
    }

    state.ansuranSales = { ...state.ansuranSales, pastSalesOverTime: d.pastSalesOverTime, currentSalesOverTime: d.currentSalesOverTime, percentSinceLastMonth: d.percentSinceLastMonth }
    state.ansuranSales.chartData.datasets = [...state.ansuranSales.chartData.datasets, firstDataSet, secondDataSet]
  },
  [M_ANSURAN_COMMISSION](state, data) {
    let d = data

    for (let i = 0; i < d.length; i++) {
      state.ansuranCommission.totalCommission = state.ansuranCommission.totalCommission + d[i].totalCommission

      let r = {
        userId: d[i].userId,
        userCode: d[i].userCode,
        userName: d[i].userName,
        totalCommission: parseFloat(d[i].totalCommission).toFixed(2)
      }

      state.ansuranCommission.downlineCommission.push(r)
    }

    state.ansuranCommission.totalCommission = parseFloat(state.ansuranCommission.totalCommission).toFixed(2)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
