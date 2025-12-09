import { localizationHelper } from '@/utils'
import { SHARED, SESSION } from '@/constants'
import { DIALOG_TYPE } from '@/constants/enums'

export function setLocalStorage(key, value, ttl) {
  const now = new Date()

  const item = {
    value: value,
    expiry: now.getTime() + ttl * 60000
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export function getErrorMessageDialog(error, closeAction) {
  if (error.code == SHARED.ERROR_CODE_DUPLICATE_LOGIN || error.code == SHARED.ERROR_CODE_INACTIVE_USER) {
    //When API call hit this error, directly throw error msg
    localStorage.setItem(SESSION.ERROR_CODE, error.code) //To trigger clearInterval() in AppLayout

    let buttonAction = () => {
      clearAllClientStorageLogout()
    }
    let msg = error.code == SHARED.ERROR_CODE_DUPLICATE_LOGIN ? localizationHelper.getMessage(`error.duplicateLogin`) : localizationHelper.getMessage(`error.inactiveUser`)

    return getErrorReloadPageDialog(localizationHelper.getMessage(`label.error`), msg, 'ok', buttonAction)
  } else {
    let errorCode = error ? error.message : '9999'
    let errorLabel = error.error ? `${localizationHelper.getMessage(`label.error`)}: ${error.error}` : ''
    let messageDialog = {
      messageTitle: localizationHelper.getMessage(`label.error`),
      messages: [`${localizationHelper.getMessage(`label.errorCode`)}: ${error.statusCode}`, `${errorLabel}`, `${localizationHelper.getMessage(`label.message`)}: ${errorCode}`],
      buttons: [
        {
          title: localizationHelper.getMessage(`button.close`),
          action: closeAction
        }
      ],
      type: DIALOG_TYPE.ERROR
    }

    return messageDialog
  }
}

export function getErrorReloadPageDialog(title, errorMessage, buttonText, buttonAction = null) {
  let messageDialog = {
    messageTitle: title,
    messages: [`${errorMessage}`],
    buttons: [
      {
        title: localizationHelper.getMessage(`button.${buttonText}`),
        action:
          buttonAction == null
            ? () => {
                location.reload()
              }
            : buttonAction
      }
    ],
    type: DIALOG_TYPE.ERROR
  }

  return messageDialog
}

export function hasAuthToken() {
  let result = false

  if (localStorage.getItem(SESSION.JWT_TOKEN) && localStorage.getItem(SESSION.JWT_TOKEN_REFRESH)) {
    result = true
  }

  return result
}

export function clearAllClientStorageRedirect() {
  clearAllClientStorage()
  window.location.reload()
}

export function clearAllClientStorage() {
  clearAllCookies()
  localStorage.clear()
  sessionStorage.clear()
}

export function isActiveUser() {
  let result = false
  let lastActivityTime = localStorage.getItem(SESSION.LAST_ACTIVITY_TIME)

  if (lastActivityTime) {
    result = new Date().getTime() - parseInt(lastActivityTime) < SHARED.USER_IDLE_TIME
  }

  return result
}

export function isTokenExpired() {
  let result = true
  let tokenExpiry = localStorage.getItem(SESSION.TOKEN_EXPIRY_TIME)

  if (tokenExpiry && !isNaN(tokenExpiry)) {
    let currentTime = getAllowedDateTime(new Date(), 3) //Refresh token 3min before token expired
    tokenExpiry = new Date(tokenExpiry)
    result = tokenExpiry <= currentTime
  }

  return result
}

export function hasHitError() {
  let result = false
  let errorCode = localStorage.getItem(SESSION.ERROR_CODE)

  if (errorCode) {
    result = errorCode == SHARED.ERROR_CODE_DUPLICATE_LOGIN || errorCode == SHARED.ERROR_CODE_INACTIVE_USER
  }

  return result
}

export function getUserToken() {
  return localStorage.getItem(SESSION.JWT_TOKEN)
}

export function getLocalStorage(key) {
  const itemStr = localStorage.getItem(key)
  if (!itemStr) {
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }
  return item.value
}

export function clearAllCookies() {
  var allCookies = document.cookie.split(';')

  // The "expire" attribute of every cookie is
  // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
  for (var i = 0; i < allCookies.length; i++) {
    document.cookie = allCookies[i] + '=;expires=' + new Date(0).toUTCString()
  }
}

export function getAllowedDateTime(dateTime, allowedTimeFrame) {
  let d = new Date(JSON.parse(JSON.stringify(dateTime))) //Deep clone
  return new Date(d.setMinutes(d.getMinutes() + allowedTimeFrame))
}

export function getRecordCreatedDialog(successAction) {
  let messageDialog = {
    messageTitle: localizationHelper.getMessage(`label.success`),
    messages: [localizationHelper.getMessage(`message.recordCreatedSuccessfully`)],
    buttons: [
      {
        title: localizationHelper.getMessage(`button.ok`),
        action: successAction
      }
    ],
    type: DIALOG_TYPE.SUCCESS
  }

  return messageDialog
}

export function getRecordUpdatedDialog(successAction) {
  let messageDialog = {
    messageTitle: localizationHelper.getMessage(`label.success`),
    messages: [localizationHelper.getMessage(`message.recordUpdatedSuccessfully`)],
    buttons: [
      {
        title: localizationHelper.getMessage(`button.ok`),
        action: successAction
      }
    ],
    type: DIALOG_TYPE.SUCCESS
  }

  return messageDialog
}

export function getRecordDeletedDialog(successAction) {
  let messageDialog = {
    messageTitle: localizationHelper.getMessage(`label.success`),
    messages: [localizationHelper.getMessage(`message.recordDeletedSuccessfully`)],
    buttons: [
      {
        title: localizationHelper.getMessage(`button.ok`),
        action: successAction
      }
    ],
    type: DIALOG_TYPE.SUCCESS
  }

  return messageDialog
}

export function getClientSidePagination(pageSize, pageNumber, tableRowsCount) {
  return {
    pageNumber: pageNumber,
    pageSize: pageSize,
    lastPage: Math.ceil(tableRowsCount / pageSize),
    tableRowsCount: tableRowsCount
  }
}

/* Message Dialog */
export function getValidationErrorMessageDialog(errorMessage, closeAction) {
  let messageDialog = {
    messageTitle: localizationHelper.getMessage(`label.error`),
    messages: [`${errorMessage}`],
    buttons: [
      {
        title: localizationHelper.getMessage(`button.close`),
        action: closeAction
      }
    ],
    type: DIALOG_TYPE.ERROR
  }

  return messageDialog
}

export function getResetPasswordDialog(successAction) {
  let messageDialog = {
    messageTitle: localizationHelper.getMessage(`label.success`),
    messages: [localizationHelper.getMessage(`message.resetPasswordSuccessfully`)],
    buttons: [
      {
        title: localizationHelper.getMessage(`button.ok`),
        action: successAction
      }
    ],
    type: DIALOG_TYPE.SUCCESS
  }

  return messageDialog
}

export function getForgotPasswordDialog(successAction) {
  let messageDialog = {
    messageTitle: localizationHelper.getMessage(`label.success`),
    messages: [localizationHelper.getMessage(`message.emailSent`)],
    buttons: [
      {
        title: localizationHelper.getMessage(`button.ok`),
        action: successAction
      }
    ],
    type: DIALOG_TYPE.SUCCESS
  }

  return messageDialog
}
