import { apiHelper } from '@/utils'
import { SHARED } from '@/constants'

//API endpoints
const MODULE = {
  ROLES: 'roles',
  PERMISSIONS: 'permissions',
  MODULES: 'domains',
  BANKS: 'bank',
  COMPANY: 'company',
  APPLICATION_TYPE: 'application-type',
  COUNTRY: 'country',
  STATES: 'states',
  AMOUNT_TYPE: 'amount-type',
  PRODUCTS: 'products',
  APPLICATION_STATUS: 'customer-application-status',
  USER: 'users',
  PAYOUT: 'payout-status',
  RECONCILE: 'reconcile-status',
  PROCESSING_ID: 'processing-id',
  REASON_TEMPLATE: 'reason-template',
  ANSURAN_STATUS: 'ansuran-status',
  PCO_CATEGORY: 'pco-category',
  ANSURAN_APPLICATION_FIRM: 'ansuran-application-firm'
}

export function getAllRoles() {
  return apiHelper().get(`/${MODULE.ROLES}`)
}

export function getRolesLookup(isActive) {
  const requestOptions = {
    params: {
      isActive: isActive == SHARED.DEFAULT_ALL_VALUE ? isActive : isActive ? 1 : 0
    }
  }

  return apiHelper().get(`/${MODULE.ROLES}`)
}

export function createRole(data) {
  const requestOptions = {
    name: data.name,
    description: data.description
  }

  return apiHelper().post(`/${MODULE.ROLES}`, requestOptions)
}

export function getRolePermissions(roleId) {
  return apiHelper().get(`/${MODULE.ROLES}/${roleId}/${MODULE.PERMISSIONS}`)
}

export function getModules() {
  return apiHelper().get(`/${MODULE.MODULES}/`)
}

export function getAllSubModules() {
  return apiHelper().get(`/${MODULE.MODULES}/`)
}

export function getRole(roleId) {
  return apiHelper().get(`/${MODULE.ROLES}/${roleId}/${MODULE.PERMISSIONS}`)
}

export function editRole(data) {
  const requestOptions = {
    name: data.name,
    description: data.description
  }
  return apiHelper().patch(`/${MODULE.ROLES}/${data.id}`, requestOptions)
}

export function editPermissions(data) {
  return apiHelper().post(`/${MODULE.ROLES}/${data.id}/${MODULE.PERMISSIONS}`, data.permissions)
}

export function createPermissions(result, data) {
  return apiHelper().post(`/${MODULE.ROLES}/${result.id}/${MODULE.PERMISSIONS}`, data.permissions)
}

export function getBanksLookup(isActive) {
  return apiHelper().get(`/${MODULE.BANKS}`)
}

export function getCompanyLookup(isActive) {
  return apiHelper().get(`/${MODULE.COMPANY}`)
}

export function getApplicationTypeLookup(isActive) {
  return apiHelper().get(`/${MODULE.APPLICATION_TYPE}`)
}

export function getCountryLookup(isActive) {
  return apiHelper().get(`/${MODULE.COUNTRY}`)
}

export function getStatesLookup(isActive) {
  return apiHelper().get(`/${MODULE.STATES}`)
}

export function getAmountTypeLookup(isActive) {
  return apiHelper().get(`/${MODULE.AMOUNT_TYPE}`)
}

export function getProductsLookup(isActive) {
  return apiHelper().get(`/${MODULE.PRODUCTS}`)
}

export function getApplicationStatusLookup(isActive) {
  return apiHelper().get(`/${MODULE.APPLICATION_STATUS}`)
}

export function getUserLookup(isActive, product) {
  const urlQuery = product ? `?product=${product}` : ''
  return apiHelper().get(`/${MODULE.USER}${urlQuery}`)
}

export function getPayoutLookup(isActive) {
  return apiHelper().get(`/${MODULE.PAYOUT}`)
}

export function getReconcileLookup(isActive) {
  return apiHelper().get(`/${MODULE.RECONCILE}`)
}

export function getProcessingIdLookup(isActive) {
  return apiHelper().get(`/${MODULE.PROCESSING_ID}`)
}

export function getReasonTemplateLookup(isActive) {
  return apiHelper().get(`/${MODULE.REASON_TEMPLATE}`)
}

export function getAnsuranStatusLookup() {
  return apiHelper().get(`/${MODULE.ANSURAN_STATUS}`)
}

export function getPcoCategoryLookup() {
  return apiHelper().get(`/${MODULE.PCO_CATEGORY}`)
}

export function getAnsuranApplicationFirmLookup() {
  return apiHelper().get(`/${MODULE.ANSURAN_APPLICATION_FIRM}`)
}
