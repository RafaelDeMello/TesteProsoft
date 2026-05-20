const AUTH_STORAGE_KEY = 'prosoft-authenticated'

export function isAuthenticated() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export function setAuthenticated(value) {
  if (typeof window === 'undefined') {
    return
  }

  if (value) {
    window.sessionStorage.setItem(AUTH_STORAGE_KEY, 'true')
    return
  }

  window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
}
