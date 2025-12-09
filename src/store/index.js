import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.module'
import shared from './shared.module'
import role from './role.module'
import user from './user.module'
import lookup from './lookup.module'
import product from './product.module'
import applicationtype from './applicationtype.module'
import company from './company.module'
import bank from './bank.module'
import commissionrate from './commissionrate.module'
import domain from './domain.module'
import customerapplication from './customerapplication.module'
import claimsubmission from './claimsubmission.module'
import claimpayout from './claimpayout.module'
import claimhistory from './claimhistory.module'
import claimreconcile from './claimreconcile.module'
import report from './report.module'
import dashboard from './dashboard.module'
import ansuranApplication from './ansuran-application.module'
import ansuranCommissionRate from './ansuran-commission-rate.module'
import ansuranClaimSubmission from './ansuran-claim-submission.module'
import ansuranClaimPayout from './ansuran-claim-payout.module'
import ansuranClaimHistory from './ansuran-claim-history.module'
import ansuranClaimReconcile from './ansuran-claim-reconcile.module'
import ansuranDashboard from './ansuran-dashboard.module'
import ansuranReport from './ansuran-report.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    shared,
    role,
    user,
    lookup,
    product,
    applicationtype,
    company,
    bank,
    commissionrate,
    domain,
    customerapplication,
    claimsubmission,
    claimpayout,
    claimhistory,
    claimreconcile,
    report,
    dashboard,
    ansuranApplication,
    ansuranCommissionRate,
    ansuranClaimSubmission,
    ansuranClaimPayout,
    ansuranClaimHistory,
    ansuranClaimReconcile,
    ansuranDashboard,
    ansuranReport
  }
})
