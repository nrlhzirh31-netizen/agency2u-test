export class AnsuranClaimReconcileDetails {
  id = ''
  code = ''
  referenceNumber = ''
  applicationDate = ''
  ansuranStatus = ''
  productName = ''
  productModel = ''
  productSerialNumber = ''
  eMandate = ''
  creditAccountNumber = ''
  deliveryOrderNumber = ''
  firstMonthPayment = ''
  initialPayment = ''
  documentConsignmentNumber = ''
  remarks = ''
  creditPrice = ''
  installmentTerm = ''
  pco = ''
  staffClaimAmount = ''
  customerName = ''
  agent = ''
  pcoCategory = ''
  commissionTier = ''
  reconcileRemark = ''
  reconcileStatus = ''
  ansuranInvoiceNumber = ''
  closingDate = ''

  constructor({
    id = null,
    code = null,
    referenceNumber = null,
    applicationDate = null,
    ansuranStatus = null,
    agent = {
      name: null,
      nric: null,
      code: null,
      phone: null,
      email: null,
      bankAcc: null,
      bankName: null
    },
    productName = null,
    productModel = null,
    productSerialNumber = null,
    eMandate = null,
    creditAccountNumber = null,
    deliveryOrderNumber = null,
    firstMonthPayment = null,
    initialPayment = null,
    documentConsignmentNumber = null,
    remarks = null,
    creditPrice = null,
    installmentTerm = null,
    pco = null,
    pcoCategory = null,
    commissionTier = null,
    reconcileRemark = null,
    reconcileStatus = null,
    ansuranInvoiceNumber = null,
    closingDate = null
  } = {}) {
    this.id = id
    this.code = code
    this.referenceNumber = referenceNumber
    this.applicationDate = applicationDate
    this.ansuranStatus = ansuranStatus
    this.agent = agent
    this.productName = productName
    this.productModel = productModel
    this.productSerialNumber = productSerialNumber
    this.eMandate = eMandate
    this.creditAccountNumber = creditAccountNumber
    this.deliveryOrderNumber = deliveryOrderNumber
    this.firstMonthPayment = firstMonthPayment
    this.initialPayment = initialPayment
    this.documentConsignmentNumber = documentConsignmentNumber
    this.remarks = remarks
    this.creditPrice = creditPrice
    this.installmentTerm = installmentTerm
    this.pco = pco
    this.pcoCategory = pcoCategory
    this.commissionTier = commissionTier
    this.reconcileRemark = reconcileRemark
    this.reconcileStatus = reconcileStatus
    this.ansuranInvoiceNumber = ansuranInvoiceNumber
    this.closingDate = closingDate
  }
}
