const AUTH_STORAGE_KEY = 'prosoft-authenticated'
const LEGACY_AUTH_STORAGE_KEY = 'prosoft-authenticated'

function clearLegacyLocalAuth() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(LEGACY_AUTH_STORAGE_KEY)
}

export function isAuthenticated() {
  if (typeof window === 'undefined') {
    return false
  }

  clearLegacyLocalAuth()
  return window.sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export function setAuthenticated(value) {
  if (typeof window === 'undefined') {
    return
  }

  clearLegacyLocalAuth()

  if (value) {
    window.sessionStorage.setItem(AUTH_STORAGE_KEY, 'true')
    return
  }

  window.sessionStorage.removeItem(AUTH_STORAGE_KEY)
}
