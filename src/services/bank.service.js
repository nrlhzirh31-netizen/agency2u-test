import { apiHelper } from '@/utils'

//API endpoints
const BANK = {
  BANK: 'bank'
}

export function getAllBank(filter) {
  const requestOptions = {
    params: {
      companyId: filter.bankId
    }
  }

  return apiHelper().get(`/${BANK.BANK}`)
}

export function deleteBank(bankId) {
  return apiHelper().delete(`/${BANK.BANK}/${bankId}`)
}

export function createBank(data) {
  const requestOptions = {
    code: data.code,
    name: data.name,
    description: data.description
  }

  return apiHelper().post(`/${BANK.BANK}`, requestOptions)
}

export function editBank(id, data) {
  const requestOptions = {
    code: data.code,
    name: data.name,
    description: data.description
  }

  return apiHelper().patch(`/${BANK.BANK}/${id}`, requestOptions)
}

export function getBank(id) {
  return apiHelper().get(`/${BANK.BANK}/${id}`)
}
