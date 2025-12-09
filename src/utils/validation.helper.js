import { localizationHelper } from '@/utils'
import { REGEX } from '@/constants'

function requiredField(isCheckLength = false) {
  return (v) => (!checkValueIsNull(v) && (!isCheckLength || v.length > 0)) || localizationHelper.getMessage('error.requiredField')
}

function emailFormat() {
  return (v) => (!checkValueIsNull(v) && REGEX.EMAIL.test(v)) || localizationHelper.getMessage('error.invalidEmailFormat')
}

function notAllowMultipleSpace() {
  return (v) => (v && REGEX.NO_MULTIPLE_SPACES.test(v)) || localizationHelper.getMessage('error.multipleSpace')
}

function minMaxLength(min, max) {
  if (min == 0 && max == 0) {
    return true
  } else {
    return (v) => (v && v.length >= min && v.length <= max) || localizationHelper.getMessage('error.exceedMinMaxLength', [min, max])
  }
}

function passwordFormat() {
  return (v) => (!checkValueIsNull(v) && REGEX.PASSWORD.test(v)) || localizationHelper.getMessage('error.invalidPasswordFormat')
}

function comparePasswordValue(targetValue, value) {
  return () => targetValue === value || localizationHelper.getMessage('error.confirmPasswordNotMatch')
}

function invalidCharacters() {
  return (v) => checkValueIsNull(v) || REGEX.INVALID_CHARACTERS.test(v) || localizationHelper.getMessage('error.invalidCharacters')
}

function checkValueIsNull(value) {
  return value == null || value === ''
}

function phoneNumberFormat() {
  return (v) => (!checkValueIsNull(v) && REGEX.PHONE.test(v)) || localizationHelper.getMessage('error.invalidPhoneNumberFormat')
}

function nricFormat() {
  return (v) => (!checkValueIsNull(v) && REGEX.NRIC.test(v)) || localizationHelper.getMessage('error.invalidNricFormat')
}

function invalidCharactersExtended() {
  return (v) => checkValueIsNull(v) || REGEX.INVALID_CHARACTERS_EXTENDED.test(v) || localizationHelper.getMessage('error.invalidCharactersExtended')
}

export function requiredFields() {
  return [requiredField()]
}

export function requiredInputDdl() {
  return [requiredField()] //for drop down list multiple select
}

export function emailRules() {
  return [requiredField(), emailFormat(), notAllowMultipleSpace(), minMaxLength(1, 50)]
}

export function passwordRules() {
  return [requiredField(), minMaxLength(8, 25), passwordFormat(), invalidCharacters()]
}

export function confirmPasswordRules(targetValue, value) {
  return [minMaxLength(8, 25), passwordFormat(), invalidCharacters(), comparePasswordValue(targetValue, value)]
}

export function validCharacter() {
  return [requiredField(), invalidCharacters()]
}

export function phoneNumberRules() {
  return [requiredField(), phoneNumberFormat(), minMaxLength(6, 20)]
}

export function nricRules() {
  return [requiredField(), nricFormat(), minMaxLength(0, 12)]
}

export function requiredInput() {
  return [requiredField()]
}

export function requiredValidCharacterExtended() {
  return [requiredField(), invalidCharactersExtended()]
}

export function isEmpty(value) {
  return value === undefined || value === null || value === NaN || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length() === 0)
}
