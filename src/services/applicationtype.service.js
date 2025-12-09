import { apiHelper } from '@/utils'

//API endpoints
const APPLICATIONTYPE = {
  APPLICATIONTYPE: 'application-type'
}

export function getAllApplicationTypes(filter) {
  const requestOptions = {
    params: {
      applicationTypeId: filter.applicationTypeId
    }
  }

  return apiHelper().get(`/${APPLICATIONTYPE.APPLICATIONTYPE}`)
}

export function deleteApplicationType(applicationTypeId) {
  return apiHelper().delete(`/${APPLICATIONTYPE.APPLICATIONTYPE}/${applicationTypeId}`)
}

export function createApplicationType(data) {
  const requestOptions = {
    name: data.name
  }

  return apiHelper().post(`/${APPLICATIONTYPE.APPLICATIONTYPE}`, requestOptions)
}

export function editApplicationType(id, data) {
  const requestOptions = {
    name: data.name
  }

  return apiHelper().patch(`/${APPLICATIONTYPE.APPLICATIONTYPE}/${id}`, requestOptions)
}

export function getApplicationType(id) {
  return apiHelper().get(`/${APPLICATIONTYPE.APPLICATIONTYPE}/${id}`)
}
