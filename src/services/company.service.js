import { apiHelper } from '@/utils'

//API endpoints
const COMPANY = {
  COMPANY: 'company',
  ADDRESS_BOOK: 'address-book'
}

export function getAllCompany(filter) {
  const requestOptions = {
    params: {}
  }

  if (filter.companyCode) {
    requestOptions.params.name = filter.companyCode
  }

  return apiHelper().get(`/${COMPANY.COMPANY}`, requestOptions)
}

export function deleteCompany(companyId) {
  return apiHelper().delete(`/${COMPANY.COMPANY}/${companyId}`)
}

export function createCompany(data) {
  const requestOptions = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    registrationNumber: data.registrationNumber,
    bank: data.companyBank,
    bankAccountNumber: data.companyBankAccountNo
  }

  return apiHelper().post(`/${COMPANY.COMPANY}`, requestOptions)
}

export function editCompany(id, data) {
  const requestOptions = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    registrationNumber: data.registrationNumber,
    bank: data.companyBank,
    bankAccountNumber: data.companyBankAcc
  }

  return apiHelper().patch(`/${COMPANY.COMPANY}/${id}`, requestOptions)
}

export function getCompany(id) {
  return apiHelper().get(`/${COMPANY.COMPANY}/${id}`)
}

export function createCompanyAddress(result, data) {
  const requestOptions = [
    {
      label: 'Company Address',
      addressLine1: data.companyAddress1,
      addressLine2: data.companyAddress2,
      addressLine3: data.companyAddress3,
      city: data.companyCity,
      postcode: data.companyPostalCode,
      state: data.companyState,
      country: data.companyCountry
    }
  ]

  return apiHelper().post(`/${COMPANY.ADDRESS_BOOK}?id=${result.identifiers[0].id}&type=COMPANY`, requestOptions)
}

export function editCompanyAddress(data) {
  const requestOptions = [
    {
      label: 'Company Address',
      addressLine1: data.companyAddress1,
      addressLine2: data.companyAddress2,
      addressLine3: data.companyAddress3,
      city: data.companyCity,
      postcode: data.companyPostalCode,
      state: data.companyState,
      country: data.companyCountry
    }
  ]

  return apiHelper().post(`/${COMPANY.ADDRESS_BOOK}?id=${data.id}&type=COMPANY`, requestOptions)
}
