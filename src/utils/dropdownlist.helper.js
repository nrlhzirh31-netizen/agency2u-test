import { localizationHelper } from '@/utils'
import { SHARED } from '@/constants'
import { ACTIVATION_STATUS, GENDER_STATUS, DOCUMENT_STATUS, ORDER_TYPE } from '@/constants/enums'

export function getOptionAll(isStringVal = false) {
  return {
    title: localizationHelper.getMessage('label.all'),
    text: localizationHelper.getMessage('label.all'),
    value: isStringVal ? SHARED.DEFAULT_ALL_VALUE_STR : SHARED.DEFAULT_ALL_VALUE
  }
}

export function getActivationStatus(hasOptionAll, isBoolValue = false) {
  let ddl = []

  if (hasOptionAll) {
    ddl.push(getOptionAll())
  }

  ddl.push({
    text: localizationHelper.getMessage(`enumActivationStatus[0].${ACTIVATION_STATUS.ACTIVE}`),
    value: isBoolValue ? Boolean(ACTIVATION_STATUS.ACTIVE) : ACTIVATION_STATUS.ACTIVE
  })
  ddl.push({
    text: localizationHelper.getMessage(`enumActivationStatus[0].${ACTIVATION_STATUS.INACTIVE}`),
    value: isBoolValue ? Boolean(ACTIVATION_STATUS.INACTIVE) : ACTIVATION_STATUS.INACTIVE
  })
  return ddl
}

export function getGenderStatus(hasOptionAll, isBoolValue = false) {
  let ddl = []

  if (hasOptionAll) {
    ddl.push(getOptionAll())
  }

  ddl.push({
    text: localizationHelper.getMessage(`enumGenderStatus[0].${GENDER_STATUS.FEMALE}`),
    value: isBoolValue ? Boolean(GENDER_STATUS.FEMALE) : GENDER_STATUS.FEMALE
  })
  ddl.push({
    text: localizationHelper.getMessage(`enumGenderStatus[0].${GENDER_STATUS.MALE}`),
    value: isBoolValue ? Boolean(GENDER_STATUS.MALE) : GENDER_STATUS.MALE
  })

  return ddl
}

export function getDocumentStatus(hasOptionAll, isBoolValue = false) {
  const ddl = []

  if (hasOptionAll) {
    ddl.push(getOptionAll())
  }

  // Tukar text sahaja, value ikut API
  ddl.push({
    text: 'No',
    value: isBoolValue ? Boolean(DOCUMENT_STATUS.FALSE) : DOCUMENT_STATUS.FALSE
  })

  ddl.push({
    text: 'Yes',
    value: isBoolValue ? Boolean(DOCUMENT_STATUS.TRUE) : DOCUMENT_STATUS.TRUE
  })

  return ddl
}

export function getOrderType(hasOptionAll, isBoolValue = false) {
  let ddl = []

  if (hasOptionAll) {
    ddl.push(getOptionAll())
  }

  ddl.push({
    text: localizationHelper.getMessage(`enumOrderType[2].${ORDER_TYPE.ASC}`),
    value: isBoolValue ? Boolean(ORDER_TYPE.ASC) : ORDER_TYPE.ASC
  })
  ddl.push({
    text: localizationHelper.getMessage(`enumOrderType[2].${ORDER_TYPE.DESC}`),
    value: isBoolValue ? Boolean(ORDER_TYPE.DESC) : ORDER_TYPE.DESC
  })

  return ddl
}
