import { apiHelper } from '@/utils'

//API endpoints
const CUSTOMER_APPLICATION = {
  CUSTOMER_APPLICATION: 'customer-application'
}

export function getAllCustomerApplications(filter) {
  const requestOptions = {
    params: {}
  }

  requestOptions.params.order = 'DESC'

  if (filter != '' && filter != 'undefined' && filter != null) {
    if (filter.applicationStatus) {
      requestOptions.params.applicationStatus = filter.applicationStatus
    }
    if (filter.applicationType) {
      requestOptions.params.applicationType = filter.applicationType
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
    if (filter.orderNumber) {
      requestOptions.params.orderNumber = filter.orderNumber
    }
    if (filter.address) {
      requestOptions.params.address = filter.address
    }
    if (filter.processingId) {
      requestOptions.params.processingId = filter.processingId
    }
  }

  return apiHelper().get(`/${CUSTOMER_APPLICATION.CUSTOMER_APPLICATION}`, requestOptions)
}

export function createCustomerApplication(data) {
  const requestOptions = {
    name: data.name,
    nric: data.nric,
    phone: data.phone,
    email: data.email,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    addressLine3: data.addressLine3,
    city: data.city,
    postcode: data.postcode,
    state: data.state,
    country: data.country,
    orderNumber: data.orderNumber,
    eFormNumber: data.eFormNumber,
    product: data.product,
    applicationStatus: data.applicationStatus,
    user: data.user,
    applicationDate: data.applicationDate,
    activatedDate: data.activatedDate,
    gpsLongitude: data.gpsLongitude,
    gpsLatitude: data.gpsLatitude,
    ociNumber: data.ociNumber,
    documentCompleted: data.documentCompleted,
    remarks: data.remarks,
    attachments: data.attachments,
    sporaNumber: data.sporaNumber,
    processingId: data.processingId
  }

  return apiHelper().post(`/${CUSTOMER_APPLICATION.CUSTOMER_APPLICATION}`, requestOptions)
}

export function getCustomerApplication(id) {
  return apiHelper().get(`/${CUSTOMER_APPLICATION.CUSTOMER_APPLICATION}/${id}`)
}

export function editCustomerApplication(id, data) {
  const requestOptions = {
    name: data.name,
    nric: data.nric,
    phone: data.phone,
    email: data.email,
    addressLine1: data.addressLine1,
    addressLine2: data.addressLine2,
    addressLine3: data.addressLine3,
    city: data.city,
    postcode: data.postcode,
    state: data.state,
    country: data.country,
    orderNumber: data.orderNumber,
    eFormNumber: data.eFormNumber,
    product: data.product,
    applicationStatus: data.applicationStatus,
    user: data.user,
    applicationDate: data.applicationDate,
    activatedDate: data.activatedDate,
    gpsLongitude: data.gpsLongitude,
    gpsLatitude: data.gpsLatitude,
    ociNumber: data.ociNumber,
    documentCompleted: data.documentCompleted,
    remarks: data.remarks,
    attachments: data.attachments,
    sporaNumber: data.sporaNumber,
    tmInvoiceNumber: data.tmInvoiceNumber,
    reconcileRemark: data.reconcileRemark,
    reconcileStatus: data.reconcileStatus,
    processingId: data.processingId
  }

  return apiHelper().patch(`/${CUSTOMER_APPLICATION.CUSTOMER_APPLICATION}/${id}`, requestOptions)
}

export function editClaimReconcile(id, data) {
  const requestOptions = {
    tmInvoiceNumber: data.tmInvoiceNumber,
    reconcileRemark: data.reconcileRemark,
    reconcileStatus: data.reconcileStatus
  }

  return apiHelper().patch(`/${CUSTOMER_APPLICATION.CUSTOMER_APPLICATION}/${id}/reconcile`, requestOptions)
}
