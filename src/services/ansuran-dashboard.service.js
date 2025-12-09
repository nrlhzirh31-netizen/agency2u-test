import { apiHelper } from '@/utils'

//API endpoints
export const ANSURAN_DASHBOARD = {
  DASHBOARD: 'ansuran-dashboard',
  APPLICATION: 'ansuran-application',
  BESTSELLER: 'best-seller',
  USERACTIVITY: 'user-activity',
  SALES: 'sales',
  COMMISSION: 'commissions'
}

export function getAnsuranDashboardApplication() {
  return apiHelper().get(`/${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.APPLICATION}`)
}

export function getBestSeller() {
  return apiHelper().get(`/${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.BESTSELLER}`)
}

export function getAnsuranUserActivity() {
  return apiHelper().get(`/${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.USERACTIVITY}`)
}

export function getAnsuranSales() {
  return apiHelper().get(`/${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.SALES}`)
}

export function getAnsuranCommission() {
  return apiHelper().get(`/${ANSURAN_DASHBOARD.DASHBOARD}/${ANSURAN_DASHBOARD.COMMISSION}`)
}
