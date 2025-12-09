export class AnsuranDetails {
  id = ''
  code = ''
  applicationDate = ''
  ansuranStatus = ''
  user = ''
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
  nric = ''
  phone = ''
  email = ''
  addressLine1 = ''
  addressLine2 = ''
  addressLine3 = ''
  city = ''
  postcode = ''
  state = ''
  country = ''
  invoiceNumber = ''
  warrantyStartDate = ''
  warrantyEndDate = ''
  pcoCategory = ''
  ansuranApplicationFirm = ''

  constructor({
    id = null,
    code = null,
    applicationDate = null,
    ansuranStatus = null,
    user = null,
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
    staffClaimAmount = null,
    customerName = null,
    nric = null,
    phone = null,
    email = null,
    addressLine1 = null,
    addressLine2 = null,
    addressLine3 = null,
    city = null,
    postcode = null,
    state = null,
    country = null,
    invoiceNumber = null,
    warrantyStartDate = null,
    warrantyEndDate = null,
    pcoCategory = null,
    ansuranApplicationFirm = null
  } = {}) {
    // Set properties with default values
    this.id = id
    this.code = code
    this.applicationDate = applicationDate
    this.ansuranStatus = ansuranStatus
    this.user = user
    this.productName = productName
    this.productModel = productModel
    this.productSerialNumber = productSerialNumber
    this.eMandate = eMandate
    this.creditAccountNumber = creditAccountNumber //changed label as BC PO Number
    this.deliveryOrderNumber = deliveryOrderNumber
    this.firstMonthPayment = firstMonthPayment
    this.initialPayment = initialPayment
    this.documentConsignmentNumber = documentConsignmentNumber
    this.remarks = remarks
    this.creditPrice = creditPrice !== null ? Number(parseFloat(creditPrice).toFixed(2)) : null
    this.installmentTerm = installmentTerm !== null ? Number(installmentTerm) : null
    this.pco = pco && typeof pco === 'string' ? parseFloat(pco.replace(/,/g, '')) : null
    this.staffClaimAmount = staffClaimAmount !== null ? Number(parseFloat(staffClaimAmount).toFixed(2)) : null
    this.customerName = customerName
    this.nric = nric
    this.phone = phone
    this.email = email
    this.addressLine1 = addressLine1
    this.addressLine2 = addressLine2
    this.addressLine3 = addressLine3
    this.city = city
    this.postcode = postcode
    this.state = state
    this.country = country
    this.invoiceNumber = invoiceNumber
    this.warrantyStartDate = warrantyStartDate
    this.warrantyEndDate = warrantyEndDate
    this.pcoCategory = pcoCategory !== null ? Number(pcoCategory) : null
    this.ansuranApplicationFirm = ansuranApplicationFirm
  }
}

export const testCreateAnsuranData = new AnsuranDetails({
  applicationDate: '2023-11-13T04:00:43.774Z',
  ansuranStatus: 1,
  user: 23,
  productName: 'iPhone 15',
  productModel: 'Pro Max 256GB',
  productSerialNumber: 'SERIAL0000001',
  eMandate: 'EM0000001',
  creditAccountNumber: '553344556677',
  deliveryOrderNumber: 'DO0000001',
  firstMonthPayment: 'first month paymnet',
  initialPayment: 'initial payment',
  documentConsignmentNumber: 'DCSGN0000001',
  remarks: 'the shipping is on track',
  creditPrice: 7899.0,
  installmentTerm: 36,
  pco: 0,
  staffClaimAmount: 200,
  customerName: 'Bob Doe',
  nric: '801111102233',
  phone: '60123456789',
  email: 'user1@mail.com',
  addressLine1: '10, Jalan Cuba Test',
  addressLine2: 'Taman Sri Indah',
  addressLine3: 'U1/1a',
  city: 'Puchong Jaya',
  postcode: '52000',
  state: 1,
  country: 1,
  invoiceNumber: 'INV-0000001',
  warrantyStartDate: '2025-12-05T12:00:43.774Z',
  warrantyEndDate: '2025-12-25T04:00:00.774Z'
})
