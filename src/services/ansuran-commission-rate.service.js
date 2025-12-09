import { AnsuranCommissionRate } from '@/constants/class/ansuran-commission-rate'
import { apiHelper } from '@/utils'

//API endpoints
const ANSURAN_COMMISSION_RATE = {
  ANSURAN_COMMISSION_RATE: 'ansuran-commission-rate'
}

export function getAllAnsuranCommissionRate(filter) {
  const requestOptions = {
    params: {}
  }
  if (filter.role) {
    requestOptions.params.role = filter.role
  }

  return apiHelper().get(`/${ANSURAN_COMMISSION_RATE.ANSURAN_COMMISSION_RATE}`, requestOptions)
}

export function deleteAnsuranCommissionRate(commissionRateId) {
  return apiHelper().delete(`/${ANSURAN_COMMISSION_RATE.ANSURAN_COMMISSION_RATE}/${commissionRateId}`)
}

export function createAnsuranCommissionRate(data) {
  const requestOptions = new AnsuranCommissionRate(data)
  const { id, ...rest } = requestOptions

  return apiHelper().post(`/${ANSURAN_COMMISSION_RATE.ANSURAN_COMMISSION_RATE}`, rest)
}

export function editAnsuranCommissionRate(id, data) {
  const requestOptions = new AnsuranCommissionRate(data)

  return apiHelper().patch(`/${ANSURAN_COMMISSION_RATE.ANSURAN_COMMISSION_RATE}/${id}`, requestOptions)
}

export function getAnsuranCommissionRate(id) {
  return apiHelper().get(`/${ANSURAN_COMMISSION_RATE.ANSURAN_COMMISSION_RATE}/${id}`)
}
