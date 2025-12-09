export const SHARED = Object.freeze({
  DEFAULT_LAYOUT: 'app-layout',
  PUBLIC_LAYOUT: 'app-layout-public',
  DEFAULT_LANGUAGE: 'en',
  ERROR_CODE_DUPLICATE_LOGIN: '3.016',
  ERROR_CODE_INACTIVE_USER: '3.009',
  USER_IDLE_TIME: 30 * 60 * 1000, // 30 min
  DEFAULT_ALL_VALUE_STR: '',
  DEFAULT_ALL_VALUE: -1,
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE_NUMBER: 1
})

export const KEY = Object.freeze({
  RMBME_SECRET_KEY: '61fjgebcySZRyOAZ',
  UN_KEY: 'GNRGh',
  PW_KEY: 'hwvGC'
})

export const REGEX = Object.freeze({
  EMAIL: /^[A-Za-z0-9_+]([.-]?[A-Za-z0-9_+])*@[A-Za-z0-9_]([.-]?[A-Za-z0-9_])*(\.\w{2,})+$/,
  NO_MULTIPLE_SPACES: /^\S+(?: \S+)*$/,
  INVALID_CHARACTERS: /^[^;:<>=]+$/,
  PASSWORD: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,25}/,
  PHONE: /^\d{3}-?\d{3}-?\d{0,7}$/,
  NRIC: /^[0-9]+$/,
  INVALID_CHARACTERS_EXTENDED: /^[^;:：；<>《》=]+$/
})

export const SESSION = Object.freeze({
  LAST_ACTIVITY_TIME: 'lastActiveTime',
  ERROR_CODE: 'error',
  JWT_TOKEN: 'authToken',
  JWT_TOKEN_REFRESH: 'authRefreshToken',
  DISPLAY_NAME: 'displayName',
  LAST_LOGIN_DATETIME: 'lastLoginDateTime',
  ROLE_PERMISSIONS: 'rolePermissions',
  USERID: 'userId',
  TOKEN_EXPIRY_TIME: 'authTokenExpiryTime',
  ROLE_ID: 'roleId',
  MODULES: 'modules',
  //Search Criteria
  USER_SEARCH: 'userListSearchCriteria',
  ROLE_SEARCH: 'roleListSearchCriteria',
  PRODUCT_SEARCH: 'productListSearchCriteria',
  APPLICATION_TYPE_SEARCH: 'ApplicationTypeListSearchCriteria',
  COMPANY_SEARCH: 'CompanyListSearchCriteria',
  BANK_SEARCH: 'BankListSearchCriteria',
  COMMISSION_RATE_SEARCH: 'CommissionRateListSearchCriteria',
  DOMAIN_SEARCH: 'DomainListSearchCriteria',
  CUSTOMER_APPLICATION_SEARCH: 'CustomerApplicationListSearchCriteria',
  CLAIM_SUBMISSION_SEARCH: 'ClaimSubmissionListSearchCriteria',
  CLAIM_PAYOUT_SEARCH: 'ClaimPayoutListSearchCriteria',
  CLAIM_APPLICATION_SEARCH: 'ClaimApplicationListSearchCriteria',
  CLAIM_HISTORY_SEARCH: 'ClaimHistoryListSearchCriteria',
  CLAIM_PAYOUT_HISTORY_SEARCH: 'ClaimPayoutHistorySearchCriteria',
  CLAIM_RECONCILE_SEARCH: 'ClaimReconcileListSearchCriteria',
  APPLICATION_HISTORY_SEARCH: 'ApplicationHistorySearchCriteria',
  CLAIM_HISTORY_DETAILS_SEARCH: 'ClaimHistoryDetailsSearchCriteria',
  CLAIM_RECONCILE_DETAILS_SEARCH: 'ClaimReconcileDetailsSearchCriteria',
  SALES_LIST_SEARCH: 'salesListSearchCriteria',
  REPORT_CLAIM_SUBMISSION: 'reportClaimSubmission',
  REPORT_CLAIM_PAYOUT: 'reportClaimPayout',
  REPORT_SALES_TRANSACTION: 'reportSalesTransaction',
  CURRENT_USER_INFO: 'currentUserInfo',
  ANSURAN_APPLICATION_SEARCH: 'ansuranApplicationListSearchCriteria',
  ANSURAN_COMMISSION_RATE_SEARCH: 'ansuranCommissionRateListSearchCriteria',
  ANSURAN_CLAIM_PAYOUT_SEARCH: 'ansuranClaimPayoutListSearchCriteria',
  ANSURAN_APPLICATION_HISTORY_SEARCH: 'ansuranApplicationHistorySearchCriteria',
  ANSURAN_CLAIM_RECONCILE_SEARCH: 'ansuranClaimReconcileListSearchCriteria',
  ANSURAN_REPORT_SALES_TRANSACTION: 'ansuranReportSalesTransaction'
})

export const API = Object.freeze({
  BASE_URL: process.env.VUE_APP_API_BASE_URL
})

export const DATE = Object.freeze({
  DEFAULT_DATE: 'YYYY-MM-DD',
  SHORT: 'DD-MMM-YYYY',
  LONG: 'DD-MMM-YYYY HH:mm:ss',
  TIME: 'HH:mm:ss',
  DEFAULT_MONTH: 'YYYY-MM',
  MONTH: 'MMM-YYYY',
  LAST_LOGIN_DATE: 'ddd, DD MMM YYYY',
  LAST_LOGIN_TIME: 'hh.mmA,',
  DEFAULT_TIMEZONE_START: 'T00:00:00+0800',
  DEFAULT_TIMEZONE_END: 'T23:59:59+0800'
})

export const SYSTEM_PRODUCT = Object.freeze({
  TM: 'TM',
  ANSURAN: 'ANSURAN'
})
