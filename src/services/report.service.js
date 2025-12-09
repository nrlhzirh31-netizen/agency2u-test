import { apiHelper } from '@/utils'

//API endpoints
const REPORT = {
  REPORT: 'report',
  CLAIM_SUBMISSION: 'claim-submission',
  CLAIM_PAYOUT: 'claim-payout',
  SALES_TRANSACTION: 'sales-transaction'
}

export function getSubmissionReports(filter) {
  const requestOptions = {
    params: {}
  }

  if (filter != '' && filter != 'undefined' && filter != null) {
    if (filter.user != '' && filter.user != 'undefined' && filter.user != null) {
      requestOptions.params.userCode = filter.user
    }
    if (filter.fromDate != '' && filter.fromDate != 'undefined' && filter.fromDate != null) {
      requestOptions.params.fromDate = filter.fromDate
    }
    if (filter.endDate != '' && filter.endDate != 'undefined' && filter.endDate != null) {
      requestOptions.params.endDate = filter.endDate
    }
  }

  return apiHelper().get(`/${REPORT.REPORT}/${REPORT.CLAIM_SUBMISSION}`, requestOptions)
}

export function getPayoutReports(filter) {
  const requestOptions = {
    params: {}
  }

  if (filter != '' && filter != 'undefined' && filter != null) {
    if (filter.user != '' && filter.user != 'undefined' && filter.user != null) {
      requestOptions.params.userCode = filter.user
    }
    if (filter.fromDate != '' && filter.fromDate != 'undefined' && filter.fromDate != null) {
      requestOptions.params.fromDate = filter.fromDate
    }
    if (filter.endDate != '' && filter.endDate != 'undefined' && filter.endDate != null) {
      requestOptions.params.endDate = filter.endDate
    }
  }

  return apiHelper().get(`/${REPORT.REPORT}/${REPORT.CLAIM_PAYOUT}`, requestOptions)
}

export function getTransactionReports(filter) {
  const requestOptions = {
    params: {}
  }

  if (filter != '' && filter != 'undefined' && filter != null) {
    if (filter.user != '' && filter.user != 'undefined' && filter.user != null) {
      requestOptions.params.userCode = filter.user
    }
    if (filter.fromDate != '' && filter.fromDate != 'undefined' && filter.fromDate != null) {
      requestOptions.params.fromDate = filter.fromDate
    }
    if (filter.endDate != '' && filter.endDate != 'undefined' && filter.endDate != null) {
      requestOptions.params.endDate = filter.endDate
    }
  }

  return apiHelper().get(`/${REPORT.REPORT}/${REPORT.SALES_TRANSACTION}`, requestOptions)
}
