export class AnsuranCommissionRate {
  id = ''
  code = ''
  description = ''
  role = ''
  amountType = ''
  fromAmount = ''
  toAmount = ''
  commissionAmount = ''

  constructor({ id = '', code = '', description = '', role = '', amountType = '', fromAmount = null, toAmount = null, commissionAmount = null } = {}) {
    console.log('obj assign', fromAmount)
    this.id = id
    this.code = code
    this.description = description
    this.role = role
    this.amountType = amountType
    this.fromAmount = fromAmount !== null ? Number(parseFloat(fromAmount).toFixed(2)) : null
    this.toAmount = toAmount !== null ? Number(parseFloat(toAmount).toFixed(2)) : null
    this.commissionAmount = commissionAmount !== null ? Number(parseFloat(commissionAmount).toFixed(2)) : null
  }
}

export const testCreateCommissionRateData = {
  code: 'APART',
  description: 'Ansuran Partner',
  role: 19,
  amountType: 2,
  fromAmount: 0,
  toAmount: 900,
  commissionAmount: 5
}
