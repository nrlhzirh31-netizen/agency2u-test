export function storeSearch(name, value) {
  let str = typeof value === 'string' ? value : JSON.stringify(value)
  sessionStorage.setItem(name, str)
}

export function retrieveSearch(name) {
  let f = sessionStorage.getItem(name)
  let result = f != undefined && f != null && f != '' ? JSON.parse(f) : ''

  return result
}

export function clearSearch(name) {
  sessionStorage.removeItem(name)
}

export function hasSearchCriteria(name) {
  let f = sessionStorage.getItem(name)
  return f != undefined && f != null && f != ''
}
