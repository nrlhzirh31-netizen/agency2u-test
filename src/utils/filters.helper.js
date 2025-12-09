import { SHARED, DATE } from '@/constants'
import { CURRENCY } from '@/constants/enums/currency.enum'
import moment from 'moment'

export const paginateTableIndex = (value, pageNumber, pageSize = SHARED.DEFAULT_PAGE_SIZE) => {
  let result = ''

  if (typeof value === 'number') {
    result = value + 1 + (pageNumber - 1) * pageSize
  }

  return result < 10 ? '0' + result : result
}

export const getDateFormat = (value, isLastLogin = false) => {
  let desc = ''

  if (value != undefined && value != null && value != '') {
    //Date time format in ISO8601 format 'YYYY-MM-DDTHH:mm:ss.000000Z' mean date time in UTC
    //moment will auto convert it into client timezone
    let dateTimeGMT8 = new Date(value.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }))
    desc = moment(dateTimeGMT8).format(!isLastLogin ? DATE.SHORT : DATE.LAST_LOGIN_DATE)
  }

  return desc
}

export const getTimeFormat = (value, isLastLogin = false) => {
  let desc = ''

  if (value != undefined && value != null && value != '') {
    //Date time format in ISO8601 format 'YYYY-MM-DDTHH:mm:ss.000000Z' mean date time in UTC
    //moment will auto convert it into client timezone
    let dateTimeGMT8 = new Date(value.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }))
    desc = moment(dateTimeGMT8).format(!isLastLogin ? DATE.TIME : DATE.LAST_LOGIN_TIME)
  }

  return desc
}

export const getDateTimeRawString = (value) => {
  let desc = ''

  if (value != undefined && value != null && value != '') {
    //Date time format in ISO8601 format 'YYYY-MM-DDTHH:mm:ss.000000Z' mean date time in UTC
    //moment will auto convert it into client timezone
    let dateTimeGMT8 = new Date(value.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }))
    desc = moment(dateTimeGMT8).format()
  }

  return desc
}

export const getDateTimeFormat = (value) => {
  let desc = ''

  if (value != undefined && value != null && value != '') {
    //Date time format in ISO8601 format 'YYYY-MM-DDTHH:mm:ss.000000Z' mean date time in UTC
    //moment will auto convert it into client timezone
    let dateTimeGMT8 = new Date(value.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }))
    desc = moment(dateTimeGMT8).format(DATE.LONG)
  }

  return desc
}

export const moneyFormat = (value, currency = false) => {
  if (!value) return 0
  let amount = parseFloat(value).toFixed(2)
  amount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return currency ? `${CURRENCY.MYR} ${amount}` : amount
}
