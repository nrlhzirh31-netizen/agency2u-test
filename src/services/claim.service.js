import { apiHelper } from '@/utils'

//API endpoints
const CLAIM = {
  CLAIM: 'claim',
  SUBMISSION: 'submission',
  PAYOUT: 'payout',
  HISTORY: 'history',
  RECONCILE: 'reconcile',
  REJECT: 'reject',
  CANCEL: 'cancel'
}

export function getAllClaimSubmission(filter) {
  const requestOptions = {
    params: {}
  }

  if (filter) {
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
      requestOptions.params.userCode = filter.agentCode
    }
    if (filter.orderNumber) {
      requestOptions.params.orderNumber = filter.orderNumber
    }
    if (filter.applicationID) {
      requestOptions.params.applicationCode = filter.applicationID
    }
  }

  return apiHelper().get(`/${CLAIM.CLAIM}/${CLAIM.SUBMISSION}`, requestOptions)
}

export function getClaimSubmission(id) {
  return apiHelper().get(`/${CLAIM.CLAIM}/${CLAIM.SUBMISSION}/${id}`)
}

export function editClaimSubmission(data) {
  return apiHelper().patch(`/${CLAIM.CLAIM}`, data)
}

export function getAllClaimPayout(filter) {
  const requestOptions = {
    params: {}
  }

  if (filter) {
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
      requestOptions.params.userCode = filter.agentCode
    }
    if (filter.orderNumber) {
      requestOptions.params.orderNumber = filter.orderNumber
    }
    if (filter.applicationID) {
      requestOptions.params.applicationCode = filter.applicationID
    }
  }

  return apiHelper().get(`/${CLAIM.CLAIM}/${CLAIM.PAYOUT}`, requestOptions)
}

export function getClaimPayout(id) {
  return apiHelper().get(`/${CLAIM.CLAIM}/${CLAIM.PAYOUT}/${id}`)
}

export function editClaimPayout(c) {
  return apiHelper().patch(`/${CLAIM.CLAIM}`, c)
}

export function getAllClaimHistory(filter) {
  const requestOptions = {
    params: {}
  }

  if (filter) {
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
      requestOptions.params.userCode = filter.agentCode
    }
    if (filter.orderNumber) {
      requestOptions.params.orderNumber = filter.orderNumber
    }
    if (filter.applicationID) {
      requestOptions.params.applicationCode = filter.applicationID
    }
  }

  return apiHelper().get(`/${CLAIM.CLAIM}/${CLAIM.HISTORY}`, requestOptions)
}

export function getClaimHistory(id) {
  return apiHelper().get(`/${CLAIM.CLAIM}/${CLAIM.HISTORY}/${id}`)
}

export function getClaimPayoutHistory(id) {
  return apiHelper().get(`/${CLAIM.CLAIM}/${CLAIM.PAYOUT}/${id}`)
}

export function getAllClaimReconcile(filter) {
  const requestOptions = {
    params: {}
  }
  if (filter) {
    if (filter.fromDate) {
      requestOptions.params.fromDate = filter.fromDate
    }
    if (filter.endDate) {
      requestOptions.params.endDate = filter.endDate
    }
    if (filter.agentCode) {
      requestOptions.params.userCode = filter.agentCode
    }
  }
  return apiHelper().get(`/${CLAIM.CLAIM}/${CLAIM.RECONCILE}`, requestOptions)
}

export function cancelClaimPayout(data) {
  return apiHelper().patch(`/${CLAIM.CLAIM}/${CLAIM.CANCEL}`, data)
}

export function rejectClaimSubmission(payload) {
  return apiHelper().patch(`/${CLAIM.CLAIM}/${CLAIM.SUBMISSION}/${CLAIM.REJECT}`, payload)
}
