import { apiHelper } from '@/utils'

//API endpoints
const COMMISSION_RATE = {
  COMMISSION_RATE: 'commission-rate'
}

export function getAllCommissionRate(filter) {
  const requestOptions = {
    params: {}
  }
  if (filter.productCode) {
    requestOptions.params.name = filter.productCode
  }
  if (filter.role) {
    requestOptions.params.role = filter.role
  }

  return apiHelper().get(`/${COMMISSION_RATE.COMMISSION_RATE}`, requestOptions)
}

export function deleteCommissionRate(commissionRateId) {
  return apiHelper().delete(`/${COMMISSION_RATE.COMMISSION_RATE}/${commissionRateId}`)
}

export function createCommissionRate(data) {
  const requestOptions = {
    code: data.code,
    description: data.description,
    product: data.product,
    role: data.role,
    amountType: data.amountType,
    amount: data.amount
  }

  return apiHelper().post(`/${COMMISSION_RATE.COMMISSION_RATE}`, requestOptions)
}

export function editCommissionRate(id, data) {
  const requestOptions = {
    code: data.code,
    description: data.description,
    product: data.product,
    role: data.role,
    amountType: data.amountType,
    amount: parseInt(data.amount)
  }

  return apiHelper().patch(`/${COMMISSION_RATE.COMMISSION_RATE}/${id}`, requestOptions)
}

export function getCommissionRate(id) {
  return apiHelper().get(`/${COMMISSION_RATE.COMMISSION_RATE}/${id}`)
}
