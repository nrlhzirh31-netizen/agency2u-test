import { SHARED_LOADING, SHARED_UNLOADING, SHARED_SHOW_DIALOG, SHARED_CLOSE_DIALOG } from '@/store/shared.module'
import { sharedHelper } from '@/utils'
import { ansuranReportService } from '@/services'
import moment from 'moment'

//define module name
const MODULE_NAME = 'ansuranReport/'

//define actions name
const A_ANSURAN_SALES_LIST = 'getAnsuranReportSalesListing'

//define dispatch action
export const ANSURAN_REPORT_SALES_TRANSACTION = MODULE_NAME + A_ANSURAN_SALES_LIST

//define mutations name
const M_ANSURAN_REPORT_SALES_LIST = 'setAnsuranReportSalesListing'

//init app state
const state = {
  ansuranSaleslist: {
    data: []
  }
}

//to retrieve data from store state (called by component)
const getters = {}

const actions = {
  [A_ANSURAN_SALES_LIST]({ dispatch, commit }, { filter }) {
    dispatch(`${SHARED_LOADING}`, {}, { root: true })
    ansuranReportService.getAnsuranTransactionReports(filter).then(
      (result) => {
        commit(M_ANSURAN_REPORT_SALES_LIST, result)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
      },
      (error) => {
        let closeAction = () => {
          dispatch(`${SHARED_CLOSE_DIALOG}`, messageDialog, { root: true })
        }
        let messageDialog = sharedHelper.getErrorMessageDialog(error, closeAction)
        dispatch(`${SHARED_UNLOADING}`, {}, { root: true })
        dispatch(`${SHARED_SHOW_DIALOG}`, messageDialog, { root: true })
      }
    )
  }
}

const mutations = {
  [M_ANSURAN_REPORT_SALES_LIST](state, data) {
    let d = data
    state.ansuranSaleslist.data = []

    //process details
    for (let i = 0; i < d.length; i++) {
      let r = {
        transactionDate: moment(d[i].transactionDate).format('DD-MM-YYYY'),
        invoiceNumber: d[i].invoiceNumber,
        ansuranStatus: d[i].ansuranStatus,
        productModel: d[i].productModel,
        creditPrice: d[i].creditPrice,
        pco: d[i].pco,
        applicationId: d[i].applicationId
      }

      state.ansuranSaleslist.data.push(r)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
