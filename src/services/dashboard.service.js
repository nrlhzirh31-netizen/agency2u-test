import { apiHelper } from '@/utils'

//API endpoints
export const DASHBOARD = {
  DASHBOARD: 'dashboard',
  APPLICATION: 'application',
  BESTSELLER: 'best-seller',
  USERACTIVITY: 'user-activity',
  SALES: 'sales',
  COMMISSION: 'commissions'
}

export function getDashboardApplication() {
  return apiHelper().get(`/${DASHBOARD.DASHBOARD}/${DASHBOARD.APPLICATION}`)
}

export function getBestSeller() {
  return apiHelper().get(`/${DASHBOARD.DASHBOARD}/${DASHBOARD.BESTSELLER}`)
}

export function getUserActivity() {
  return apiHelper().get(`/${DASHBOARD.DASHBOARD}/${DASHBOARD.USERACTIVITY}`)
}

export function getSales() {
  return apiHelper().get(`/${DASHBOARD.DASHBOARD}/${DASHBOARD.SALES}`)
}

export function getCommission() {
  return apiHelper().get(`/${DASHBOARD.DASHBOARD}/${DASHBOARD.COMMISSION}`)
}
