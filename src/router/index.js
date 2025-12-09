import Vue from 'vue'
import VueRouter from 'vue-router'
import { ROUTE_NAME, SHARED } from '@/constants'
import { permissionHelper } from '@/utils'

Vue.use(VueRouter)

const authMeta = { layout: SHARED.DEFAULT_LAYOUT, requiresAuth: false }
const publicMeta = { layout: SHARED.PUBLIC_LAYOUT, requiresAuth: false }
const toUnauthorizedPage = { name: ROUTE_NAME.HOME }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '',
      alias: '/login',
      name: ROUTE_NAME.LOGIN,
      meta: publicMeta,
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/forgotpassword',
      name: ROUTE_NAME.FORGOT_PASSWORD,
      meta: publicMeta,
      component: () => import('@/views/ForgotPassword.vue')
    },
    {
      path: '/home',
      name: ROUTE_NAME.HOME,
      meta: authMeta,
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/dashboard',
      name: ROUTE_NAME.DASHBOARD,
      meta: authMeta,
      component: () => import('@/views/Dashboard.vue')
    },
    {
      path: '/ansuran-dashboard',
      name: ROUTE_NAME.ANSURAN_DASHBOARD,
      meta: authMeta,
      component: () => import('@/views/AnsuranDashboard.vue')
    },
    {
      path: '',
      alias: '/logout',
      name: ROUTE_NAME.LOGOUT,
      meta: authMeta,
      component: () => import('@/views/Logout.vue')
    },
    {
      path: '/reset-password/:token(.*)',
      component: () => import('@/views/password/Password.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.RESET_PASSWORD,
          meta: publicMeta,
          component: () => import('@/views/password/ResetPassword.vue')
          // alias: ['/:token', '']
        }
      ]
    },
    {
      path: '/agent',
      component: () => import('@/views/agent/Agent.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.AGENT_LIST,
          meta: authMeta,
          component: () => import('@/views/agent/AgentListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.AGENT_CREATE,
          meta: authMeta,
          component: () => import('@/views/agent/AgentCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.AGENT_DETAILS,
          meta: authMeta,
          component: () => import('@/views/agent/AgentDetails.vue')
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/views/user/User.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.USER_LIST,
          meta: authMeta,
          component: () => import('@/views/user/UserListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.USER_CREATE,
          meta: authMeta,
          component: () => import('@/views/user/UserCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.USER_DETAILS,
          meta: authMeta,
          component: () => import('@/views/user/UserDetails.vue')
        },
        {
          path: 'reset-password',
          name: ROUTE_NAME.USER_RESET_PASSWORD,
          meta: authMeta,
          component: () => import('@/views/user/UserResetPassword.vue')
        }
      ]
    },
    {
      path: '/role',
      component: () => import('@/views/role/Role.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.ROLE_LIST,
          meta: authMeta,
          component: () => import('@/views/role/RoleListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.ROLE_CREATE,
          meta: authMeta,
          component: () => import('@/views/role/RoleCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.ROLE_DETAILS,
          meta: authMeta,
          component: () => import('@/views/role/RoleDetails.vue')
        }
      ]
    },
    {
      path: '/domain',
      component: () => import('@/views/domain/Domain.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.DOMAIN_LIST,
          meta: authMeta,
          component: () => import('@/views/domain/DomainListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.DOMAIN_CREATE,
          meta: authMeta,
          component: () => import('@/views/domain/DomainCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.DOMAIN_DETAILS,
          meta: authMeta,
          component: () => import('@/views/domain/DomainDetails.vue')
        }
      ]
    },
    {
      path: '/product',
      component: () => import('@/views/product/Product.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.PRODUCT_LIST,
          meta: authMeta,
          component: () => import('@/views/product/ProductListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.PRODUCT_CREATE,
          meta: authMeta,
          component: () => import('@/views/product/ProductCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.PRODUCT_DETAILS,
          meta: authMeta,
          component: () => import('@/views/product/ProductDetails.vue')
        }
      ]
    },
    {
      path: '/applicationtype',
      component: () => import('@/views/applicationtype/ApplicationType.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.APPLICATION_TYPE_LIST,
          meta: authMeta,
          component: () => import('@/views/applicationtype/ApplicationTypeListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.APPLICATION_TYPE_CREATE,
          meta: authMeta,
          component: () => import('@/views/applicationtype/ApplicationTypeCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.APPLICATION_TYPE_DETAILS,
          meta: authMeta,
          component: () => import('@/views/applicationtype/ApplicationTypeDetails.vue')
        }
      ]
    },
    {
      path: '/company',
      component: () => import('@/views/company/Company.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.COMPANY_LIST,
          meta: authMeta,
          component: () => import('@/views/company/CompanyListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.COMPANY_CREATE,
          meta: authMeta,
          component: () => import('@/views/company/CompanyCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.COMPANY_DETAILS,
          meta: authMeta,
          component: () => import('@/views/company/CompanyDetails.vue')
        }
      ]
    },
    {
      path: '/bank',
      component: () => import('@/views/bank/Bank.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.BANK_LIST,
          meta: authMeta,
          component: () => import('@/views/bank/BankListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.BANK_CREATE,
          meta: authMeta,
          component: () => import('@/views/bank/BankCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.BANK_DETAILS,
          meta: authMeta,
          component: () => import('@/views/bank/BankDetails.vue')
        }
      ]
    },
    {
      path: '/commissionrate',
      component: () => import('@/views/commissionrate/CommissionRate.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.COMMISSION_RATE_LIST,
          meta: authMeta,
          component: () => import('@/views/commissionrate/CommissionRateListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.COMMISSION_RATE_CREATE,
          meta: authMeta,
          component: () => import('@/views/commissionrate/CommissionRateCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.COMMISSION_RATE_DETAILS,
          meta: authMeta,
          component: () => import('@/views/commissionrate/CommissionRateDetails.vue')
        }
      ]
    },
    {
      path: '/ansuran-commission-rate',
      component: () => import('@/views/ansuran-commission-rate/AnsuranCommissionRate.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.ANSURAN_COMMISSION_RATE_LIST,
          meta: authMeta,
          component: () => import('@/views/ansuran-commission-rate/AnsuranCommissionRateListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.ANSURAN_COMMISSION_RATE_CREATE,
          meta: authMeta,
          component: () => import('@/views/ansuran-commission-rate/AnsuranCommissionRateCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.ANSURAN_COMMISSION_RATE_DETAILS,
          meta: authMeta,
          component: () => import('@/views/ansuran-commission-rate/AnsuranCommissionRateDetails.vue')
        }
      ]
    },
    {
      path: '/customerapplication',
      component: () => import('@/views/customerapplication/CustomerApplication.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.CUSTOMER_APPLICATION_LIST,
          meta: authMeta,
          component: () => import('@/views/customerapplication/CustomerApplicationListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.CUSTOMER_APPLICATION_CREATE,
          meta: authMeta,
          component: () => import('@/views/customerapplication/CustomerApplicationCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.CUSTOMER_APPLICATION_DETAILS,
          meta: authMeta,
          component: () => import('@/views/customerapplication/CustomerApplicationDetails.vue')
        },
        {
          path: 'history',
          name: ROUTE_NAME.APPLICATION_HISTORY,
          meta: authMeta,
          component: () => import('@/views/customerapplication/ApplicationHistory.vue')
        },
        {
          path: 'history-details',
          name: ROUTE_NAME.APPLICATION_HISTORY_DETAILS,
          meta: authMeta,
          component: () => import('@/views/customerapplication/ApplicationHistoryDetails.vue')
        }
      ]
    },
    {
      path: '/claim-submission',
      component: () => import('@/views/claimsubmission/ClaimSubmission.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.CLAIM_SUBMISSION_LIST,
          meta: authMeta,
          component: () => import('@/views/claimsubmission/ClaimSubmissionListing.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.CLAIM_SUBMISSION_DETAILS,
          meta: authMeta,
          component: () => import('@/views/claimsubmission/ClaimSubmissionDetails.vue')
        }
      ]
    },
    {
      path: '/claim-payout',
      component: () => import('@/views/claimpayout/ClaimPayout.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.CLAIM_PAYOUT_LIST,
          meta: authMeta,
          component: () => import('@/views/claimpayout/ClaimPayoutListing.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.CLAIM_PAYOUT_DETAILS,
          meta: authMeta,
          component: () => import('@/views/claimpayout/ClaimPayoutDetails.vue')
        }
      ]
    },
    {
      path: '/claim-history',
      component: () => import('@/views/claimhistory/ClaimHistory.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.CLAIM_HISTORY_LIST,
          meta: authMeta,
          component: () => import('@/views/claimhistory/ClaimHistoryListing.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.CLAIM_HISTORY_DETAILS,
          meta: authMeta,
          component: () => import('@/views/claimhistory/ClaimHistoryDetails.vue')
        }
      ]
    },
    {
      path: '/claim-reconcile',
      component: () => import('@/views/claimreconcile/ClaimReconcile.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.CLAIM_RECONCILE_LIST,
          meta: authMeta,
          component: () => import('@/views/claimreconcile/ClaimReconcileListing.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.CLAIM_RECONCILE_DETAILS,
          meta: authMeta,
          component: () => import('@/views/claimreconcile/ClaimReconcileDetails.vue')
        }
      ]
    },
    {
      path: '/ansuran-application',
      component: () => import('@/views/ansuran-application/AnsuranApplication.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.ANSURAN_APPLICATION_LIST,
          meta: authMeta,
          component: () => import('@/views/ansuran-application/AnsuranApplicationListing.vue')
        },
        {
          path: 'create',
          name: ROUTE_NAME.ANSURAN_APPLICATION_CREATE,
          meta: authMeta,
          component: () => import('@/views/ansuran-application/AnsuranApplicationCreate.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.ANSURAN_APPLICATION_DETAILS,
          meta: authMeta,
          component: () => import('@/views/ansuran-application/AnsuranApplicationDetails.vue')
        },
        {
          path: 'history',
          name: ROUTE_NAME.ANSURAN_APPLICATION_HISTORY,
          meta: authMeta,
          component: () => import('@/views/ansuran-application/AnsuranApplicationHistory.vue')
        },
        {
          path: 'history-details',
          name: ROUTE_NAME.ANSURAN_APPLICATION_HISTORY_DETAILS,
          meta: authMeta,
          component: () => import('@/views/ansuran-application/AnsuranApplicationHistoryDetails.vue')
        }
      ]
    },
    {
      path: '/ansuran-claim-submission',
      component: () => import('@/views/ansuran-claim-submission/AnsuranClaimSubmission.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.ANSURAN_CLAIM_SUBMISSION_LIST,
          meta: authMeta,
          component: () => import('@/views/ansuran-claim-submission/AnsuranClaimSubmissionListing.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.ANSURAN_CLAIM_SUBMISSION_DETAILS,
          meta: authMeta,
          component: () => import('@/views/ansuran-claim-submission/AnsuranClaimSubmissionDetails.vue')
        }
      ]
    },
    {
      path: '/ansuran-claim-payout',
      component: () => import('@/views/ansuran-claim-payout/AnsuranClaimPayout.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.ANSURAN_CLAIM_PAYOUT_LIST,
          meta: authMeta,
          component: () => import('@/views/ansuran-claim-payout/AnsuranClaimPayoutListing.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.ANSURAN_CLAIM_PAYOUT_DETAILS,
          meta: authMeta,
          component: () => import('@/views/ansuran-claim-payout/AnsuranClaimPayoutDetails.vue')
        }
      ]
    },
    {
      path: '/ansuran-claim-history',
      component: () => import('@/views/ansuran-claim-history/AnsuranClaimHistory.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.ANSURAN_CLAIM_HISTORY_LIST,
          meta: authMeta,
          component: () => import('@/views/ansuran-claim-history/AnsuranClaimHistoryListing.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.ANSURAN_CLAIM_HISTORY_DETAILS,
          meta: authMeta,
          component: () => import('@/views/ansuran-claim-history/AnsuranClaimHistoryDetails.vue')
        }
      ]
    },
    {
      path: '/ansuran-claim-reconcile',
      component: () => import('@/views/ansuran-claim-reconcile/AnsuranClaimReconcile.vue'),
      children: [
        {
          path: '',
          name: ROUTE_NAME.ANSURAN_CLAIM_RECONCILE_LIST,
          meta: authMeta,
          component: () => import('@/views/ansuran-claim-reconcile/AnsuranClaimReconcileListing.vue')
        },
        {
          path: 'details',
          name: ROUTE_NAME.ANSURAN_CLAIM_RECONCILE_DETAILS,
          meta: authMeta,
          component: () => import('@/views/ansuran-claim-reconcile/AnsuranClaimReconcileDetails.vue')
        }
      ]
    },
    {
      path: '/ansura-report',
      component: () => import('@/views/ansuran-report/AnsuranReport.vue'),
      children: [
        {
          path: 'ansuran-sales-transaction',
          name: ROUTE_NAME.ANSURAN_REPORT_SALES_TRANSACTION,
          meta: authMeta,
          component: () => import('@/views/ansuran-report/AnsuranReportSalesTransaction.vue')
        }
      ]
    },
    {
      path: '/report',
      component: () => import('@/views/report/Report.vue'),
      children: [
        {
          path: 'claim-submission',
          name: ROUTE_NAME.REPORT_CLAIM_SUBMISSION,
          meta: authMeta,
          component: () => import('@/views/report/ReportClaimSubmission.vue')
        },
        {
          path: 'claim-payout',
          name: ROUTE_NAME.REPORT_CLAIM_PAYOUT,
          meta: authMeta,
          component: () => import('@/views/report/ReportClaimPayout.vue')
        },
        {
          path: 'sales-transaction',
          name: ROUTE_NAME.REPORT_SALES_TRANSACTION,
          meta: authMeta,
          component: () => import('@/views/report/ReportSalesTransaction.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name == ROUTE_NAME.LOGIN && permissionHelper.isAuthenticated()) {
    next({ name: ROUTE_NAME.HOME })
  } else if (to.meta.requiresAuth && !permissionHelper.isAuthenticated()) {
    next({ name: ROUTE_NAME.LOGIN })
  } else {
    next()
  }
})

export default router
