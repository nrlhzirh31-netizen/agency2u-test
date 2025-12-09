import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SET_ERROR_MESSAGE } from '@/store/shared.module'
import { dashboardService } from '@/services'
import { localizationHelper } from '@/utils'
import { DASHBOARD } from '@/services/dashboard.service'

//define module name
const MODULE_NAME = 'dashboard/'

//define actions name
const A_APPLICATION = 'getDashboardApplication'
const A_BEST_SELLER = 'getBestSeller'
const A_USER_ACTIVITY = 'getUserActivity'
const A_SALES = 'getSales'
const A_COMMISSION = 'getCommission'

//define dispatch action
export const DASHBOARD_APPLICATION = MODULE_NAME + A_APPLICATION
export const BEST_SELLER = MODULE_NAME + A_BEST_SELLER
export const USER_ACTIVITY = MODULE_NAME + A_USER_ACTIVITY
export const SALES = MODULE_NAME + A_SALES
export const COMMISSION = MODULE_NAME + A_COMMISSION

//define mutations name
const M_APPLICATION = 'setDashboardApplication'
const M_BEST_SELLER = 'setBestSeller'
const M_USER_ACTIVITY = 'setUserActivity'
const M_SALES = 'setSales'
const M_COMMISSION = 'setCommission'

//init app state
const state = {
  application: {
    data: []
  },
  bestSeller: {
    data: []
  },
  userActivity: {
    data: []
  },
  sales: {
    chartData: {
      labels: [],
      datasets: []
    },
    pastSalesOverTime: 0,
    currentSalesOverTime: 0,
    percentSinceLastMonth: 0
  },
  commission: {
    totalCommission: 0,
    downlineCommission: []
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_APPLICATION]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    dashboardService.getDashboardApplication().then(
      (result) => {
        commit(M_APPLICATION, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        if (error.statusCode === 403) {
          dispatch(`${SHARED_SET_ERROR_MESSAGE}`, { route: `${DASHBOARD.DASHBOARD}/${DASHBOARD.APPLICATION}` }, { root: true })
        }
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  [A_BEST_SELLER]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    dashboardService.getBestSeller().then(
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
  [A_USER_ACTIVITY]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    dashboardService.getUserActivity().then(
      (result) => {
        commit(M_USER_ACTIVITY, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        if (error.statusCode === 403) {
          dispatch(`${SHARED_SET_ERROR_MESSAGE}`, { route: `${DASHBOARD.DASHBOARD}/${DASHBOARD.USERACTIVITY}` }, { root: true })
        }
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  [A_SALES]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    dashboardService.getSales().then(
      (result) => {
        commit(M_SALES, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        if (error.statusCode === 403) {
          dispatch(`${SHARED_SET_ERROR_MESSAGE}`, { route: `${DASHBOARD.DASHBOARD}/${DASHBOARD.SALES}` }, { root: true })
        }
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  },
  [A_COMMISSION]({ dispatch, commit }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    dashboardService.getCommission().then(
      (result) => {
        commit(M_COMMISSION, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        if (error.statusCode === 403) {
          dispatch(`${SHARED_SET_ERROR_MESSAGE}`, { route: `${DASHBOARD.DASHBOARD}/${DASHBOARD.COMMISSION}` }, { root: true })
        }
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      }
    )
  }
}

const mutations = {
  [M_APPLICATION](state, data) {
    let d = data
    state.application.data = []

    for (const [key, value] of Object.entries(d)) {
      let r = {
        moduleName: localizationHelper.getMessage(`enumDashboard[0].${key}`),
        value: value ? value : ''
      }
      state.application.data.push(r)
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
  [M_USER_ACTIVITY](state, data) {
    let d = data
    state.userActivity.data = []

    for (let i = 0; i < d.length; i++) {
      let r = {
        user_code: d[i].user_code,
        user_name: d[i].user_name,
        role_name: d[i].role_name,
        totalApplications: d[i].totalApplications
      }

      state.userActivity.data.push(r)
    }
  },
  [M_SALES](state, data) {
    let d = data
    state.sales.chartData.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    state.sales.chartData.datasets = []
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

    state.sales = { ...state.sales, pastSalesOverTime: d.pastSalesOverTime, currentSalesOverTime: d.currentSalesOverTime, percentSinceLastMonth: d.percentSinceLastMonth }
    state.sales.chartData.datasets = [...state.sales.chartData.datasets, firstDataSet, secondDataSet]
  },
  [M_COMMISSION](state, data) {
    let d = data

    for (let i = 0; i < d.length; i++) {
      state.commission.totalCommission = state.commission.totalCommission + d[i].totalCommission

      let r = {
        userId: d[i].userId,
        userCode: d[i].userCode,
        userName: d[i].userName,
        totalCommission: parseFloat(d[i].totalCommission).toFixed(2)
      }

      state.commission.downlineCommission.push(r)
    }

    state.commission.totalCommission = parseFloat(state.commission.totalCommission).toFixed(2)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
