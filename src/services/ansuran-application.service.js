import { AnsuranDetails } from '@/constants'
import { apiHelper } from '@/utils'

//API endpoints
const ANSURAN_APPLICATION = {
  ANSURAN_APPLICATION: 'ansuran-application'
}

export function getAllAnsuranApplications(filter) {
  const requestOptions = {
    params: {}
  }

  requestOptions.params.order = 'DESC'

  if (filter != '' && filter != 'undefined' && filter != null) {
    if (filter.ansuranStatus) {
      requestOptions.params.ansuranStatus = filter.ansuranStatus
    }
    if (filter.fromDate) {
      requestOptions.params.fromDate = filter.fromDate
    }
    if (filter.endDate) {
      requestOptions.params.toDate = filter.endDate
    }
    if (filter.nric) {
      requestOptions.params.nric = filter.nric
    }
    if (filter.agentCode) {
      requestOptions.params.name = filter.agentCode
    }
    if (filter.address) {
      requestOptions.params.address = filter.address
    }
    if (filter.ansuranApplicationFirm) {
      requestOptions.params.ansuranApplicationFirm = filter.ansuranApplicationFirm
    }
  }

  return apiHelper().get(`/${ANSURAN_APPLICATION.ANSURAN_APPLICATION}`, requestOptions)
}

export function createAnsuranApplication(data) {
  const requestOptions = data

  return apiHelper().post(`/${ANSURAN_APPLICATION.ANSURAN_APPLICATION}`, requestOptions)
}

export function getAnsuranApplication(id) {
  return apiHelper().get(`/${ANSURAN_APPLICATION.ANSURAN_APPLICATION}/${id}`)
}

export function editAnsuranApplication(id, data) {
  const requestOptions = data

  return apiHelper().patch(`/${ANSURAN_APPLICATION.ANSURAN_APPLICATION}/${id}`, requestOptions)
}

export function editAnsuranClaimReconcile(id, data) {
  return apiHelper().patch(`/${ANSURAN_APPLICATION.ANSURAN_APPLICATION}/${id}/reconcile`, data)
}
