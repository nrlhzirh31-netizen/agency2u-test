import { apiHelper } from '@/utils'

//API endpoints
const PRODUCT = {
  PRODUCT: 'products'
}

export function getAllProducts(filter) {
  const requestOptions = {
    params: {
      productId: filter.productId
    }
  }

  return apiHelper().get(`/${PRODUCT.PRODUCT}`)
}

export function deleteProduct(productId) {
  return apiHelper().delete(`/${PRODUCT.PRODUCT}/${productId}`)
}

export function createProduct(data) {
  const requestOptions = {
    code: data.code,
    name: data.name,
    description: data.description,
    price: data.price,
    applicationType: data.applicationType
  }

  return apiHelper().post(`/${PRODUCT.PRODUCT}`, requestOptions)
}

export function editProduct(id, data) {
  const requestOptions = {
    code: data.code,
    name: data.name,
    description: data.description,
    price: data.price,
    applicationType: data.applicationType
  }

  return apiHelper().patch(`/${PRODUCT.PRODUCT}/${id}`, requestOptions)
}

export function getProduct(id) {
  return apiHelper().get(`/${PRODUCT.PRODUCT}/${id}`)
}
