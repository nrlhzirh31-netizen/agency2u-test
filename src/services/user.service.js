import { apiHelper } from '@/utils'

//API endpoints
const USER = {
  USER: 'users',
  LOCAL: 'local',
  SIGNIN: 'signin',
  DOMAINS: 'domains',
  REFRESHTOKEN: 'refresh-token',
  LOGOUT: 'logout',
  FORGOT_PASSWORD: 'forget-password/request',
  ADDRESS_BOOK: 'address-book',
  RESET_PASSWORD: 'forget-password/update'
}

export function getUserToken(loginObj) {
  const requestOptions = {
    ...loginObj
  }

  return apiHelper(true).post(`/${USER.USER}/${USER.LOCAL}/${USER.SIGNIN}`, requestOptions)
}

export function clearUserToken() {
  return apiHelper().post(`/${USER.USER}/${USER.LOGOUT}`)
}

export function getDomains() {
  return apiHelper().get(`/${USER.DOMAINS}`)
}

export function getUserRefreshToken() {
  return apiHelper(true, true).post(`/${USER.USER}/${USER.REFRESHTOKEN}`)
}

export function getAllUsers(filter) {
  const requestOptions = {
    params: {}
  }

  if (filter.agentCode) {
    requestOptions.params.name = filter.agentCode
  }

  return apiHelper().get(`/${USER.USER}`, requestOptions)
}

export function getUser(id) {
  return apiHelper().get(`/${USER.USER}/${id}`)
}

export function editUser(id, data) {
  const requestOptions = {
    name: data.name,
    phone: data.phone,
    password: data.password,
    passwordConfirm: data.passwordConfirm,
    nric: data.nric,
    userAccountStatus: data.userAccountStatus,
    company: data.company,
    bank: data.bank,
    bankAccountNumber: data.bankAccountNumber,
    referredBy: data.referredBy,
    gender: data.gender,
    role: data.roles
  }

  return apiHelper().patch(`/${USER.USER}/${id}`, requestOptions)
}

export function createUser(data) {
  const requestOptions = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    // password: data.password,
    // passwordConfirm: data.passwordConfirm,
    nric: data.nric,
    userAccountStatus: true,
    company: data.company,
    bank: data.bank,
    bankAccountNumber: data.bankAccountNumber,
    referredBy: data.referredBy,
    gender: data.gender,
    role: data.roles
  }

  return apiHelper().post(`/${USER.USER}`, requestOptions)
}

export function getUserInfo(userId) {
  return apiHelper().get(`/${USER.USER}/${userId}`)
}

export function deleteUser(userId) {
  return apiHelper().delete(`/${USER.USER}/${userId}`)
}

export function forgotPassword(forgotPasswordObj) {
  return apiHelper().get(`/${USER.USER}/${USER.FORGOT_PASSWORD}?email=${forgotPasswordObj.username}`)
}

export function updatePassword(updatePasswordObj) {
  return apiHelper().patch(`/${USER.USER}/${updatePasswordObj.id}/update-password`, updatePasswordObj)
}

export function createAddress(result, data) {
  const requestOptions = [
    {
      label: 'Home Address',
      addressLine1: data.address1,
      addressLine2: data.address2,
      addressLine3: data.address3,
      city: data.city,
      postcode: data.postalCode,
      state: data.state,
      country: data.country
    }
  ]

  return apiHelper().post(`/${USER.ADDRESS_BOOK}?id=${result.identifiers[0].id}&type=USER`, requestOptions)
}

export function editAddress(data) {
  const requestOptions = {
    label: 'Home Address',
    addressLine1: data.address1,
    addressLine2: data.address2,
    addressLine3: data.address3,
    city: data.city,
    postcode: data.postalCode,
    state: data.state,
    country: data.country
  }

  return apiHelper().patch(`/${USER.ADDRESS_BOOK}/${data.addressBookId}`, requestOptions)
}

export function resetPassword(resetPasswordObj) {
  return apiHelper().post(`/${USER.USER}/${USER.RESET_PASSWORD}`, resetPasswordObj)
}
