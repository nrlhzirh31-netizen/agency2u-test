import { apiHelper } from '@/utils'

//API endpoints
const CLAIM = {
  ANSURAN_PAYOUT: 'ansuran-payout',
  CLAIM: 'claim',
  SUBMISSION: 'submission',
  PAYOUT: 'payout',
  HISTORY: 'history',
  RECONCILE: 'reconcile',
  REJECT: 'reject',
  CANCEL: 'cancel'
}

export function getAllAnsuranClaimSubmission(filter) {
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
    if (filter.code) {
      requestOptions.params.code = filter.code
    }
  }

  return apiHelper().get(`/${CLAIM.ANSURAN_PAYOUT}/${CLAIM.SUBMISSION}`, requestOptions)
}

export function getAnsuranClaimSubmission(id) {
  return apiHelper().get(`/${CLAIM.ANSURAN_PAYOUT}/${CLAIM.SUBMISSION}/${id}`)
}

export function editAnsuranClaimSubmission(data) {
  return apiHelper().patch(`/${CLAIM.ANSURAN_PAYOUT}`, data)
}

export function getAllAnsuranClaimPayout(filter) {
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
    if (filter.agentCode) {
      requestOptions.params.userCode = filter.agentCode
    }
  }

  return apiHelper().get(`/${CLAIM.ANSURAN_PAYOUT}/${CLAIM.PAYOUT}`, requestOptions)
}

export function getAnsuranClaimPayout(id) {
  return apiHelper().get(`/${CLAIM.ANSURAN_PAYOUT}/${CLAIM.PAYOUT}/${id}`)
}

export function editAnsuranClaimPayout(c) {
  return apiHelper().patch(`/${CLAIM.ANSURAN_PAYOUT}`, c)
}

export function getAllAnsuranClaimHistory(filter) {
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
    if (filter.code) {
      requestOptions.params.code = filter.code
    }
    if (filter.applicationID) {
      requestOptions.params.applicationCode = filter.applicationID
    }
  }

  return apiHelper().get(`/${CLAIM.ANSURAN_PAYOUT}/${CLAIM.HISTORY}`, requestOptions)
}

export function getAnsuranClaimHistory(id) {
  return apiHelper().get(`/${CLAIM.ANSURAN_PAYOUT}/${CLAIM.HISTORY}/${id}`)
}

// export function getClaimPayoutHistory(id) {
//   return apiHelper().get(`/${CLAIM.CLAIM}/${CLAIM.PAYOUT}/${id}`)
// }

export function getAllAnsuranClaimReconcile(filter) {
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
    if (filter.productSerialNumber) {
      requestOptions.params.productSerialNumber = filter.productSerialNumber
    }
    if (filter.agentCode) {
      requestOptions.params.userCode = filter.agentCode
    }
    if (filter.ansuranReconcileStatus) {
      requestOptions.params.ansuranReconcileStatus = filter.ansuranReconcileStatus
    }
  }
  return apiHelper().get(`/${CLAIM.ANSURAN_PAYOUT}/${CLAIM.RECONCILE}`, requestOptions)
}

export function getAnsuranClaimReconcile(id) {
  return apiHelper().get(`/${CLAIM.ANSURAN_PAYOUT}/${CLAIM.RECONCILE}/${id}`)
}

export function cancelAnsuranClaimPayout(data) {
  return apiHelper().patch(`/${CLAIM.ANSURAN_PAYOUT}/${CLAIM.CANCEL}`, data)
}

export function rejectAnsuranClaimSubmission(payload) {
  return apiHelper().patch(`/${CLAIM.ANSURAN_PAYOUT}/${CLAIM.SUBMISSION}/${CLAIM.REJECT}`, payload)
}
