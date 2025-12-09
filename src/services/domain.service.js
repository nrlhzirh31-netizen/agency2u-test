import { apiHelper } from '@/utils'

//API endpoints
const DOMAIN = {
  DOMAIN: 'domains'
}

export function getAllDomain(filter) {
  const requestOptions = {
    params: {
      companyId: filter.domainId
    }
  }

  return apiHelper().get(`/${DOMAIN.DOMAIN}`)
}

export function deleteDomain(domainId) {
  return apiHelper().delete(`/${DOMAIN.DOMAIN}/${domainId}`)
}

export function createDomain(data) {
  const requestOptions = {
    name: data.name,
    description: data.description
  }

  return apiHelper().post(`/${DOMAIN.DOMAIN}`, requestOptions)
}

export function editDomain(id, data) {
  const requestOptions = {
    name: data.name,
    description: data.description
  }

  return apiHelper().patch(`/${DOMAIN.DOMAIN}/${id}`, requestOptions)
}

export function getDomain(id) {
  return apiHelper().get(`/${DOMAIN.DOMAIN}/${id}`)
}
