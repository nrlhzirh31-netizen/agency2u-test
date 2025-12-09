import { apiHelper } from '@/utils'

//API endpoints
const ANSURAN_REPORT = {
  REPORT: 'ansuran-report',
  SALES_TRANSACTION: 'ansuran-sales-transaction'
}

export function getAnsuranTransactionReports(filter) {
  const requestOptions = {
    params: {}
  }

  if (filter != '' && filter != 'undefined' && filter != null) {
    if (filter.fromDate != '' && filter.fromDate != 'undefined' && filter.fromDate != null) {
      requestOptions.params.fromDate = filter.fromDate
    }
    if (filter.endDate != '' && filter.endDate != 'undefined' && filter.endDate != null) {
      requestOptions.params.endDate = filter.endDate
    }
  }

  return apiHelper().get(`/${ANSURAN_REPORT.REPORT}/${ANSURAN_REPORT.SALES_TRANSACTION}`, requestOptions)
}
