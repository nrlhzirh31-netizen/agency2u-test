import i18n from '@/plugins/i18n'

export function getMessage(key, dynamicValue = null) {
  return dynamicValue == null ? i18n.t(key) : i18n.t(key, dynamicValue)
}

export function getArrayMessage(key, array) {
  let result = []

  for (let i = 0; i < array.length; i++) {
    result.push(i18n.t(`${key}.${array[i].toLowerCase()}`))
  }

  return result.join(', ')
}
