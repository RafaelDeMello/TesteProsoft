const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/g
const TAG_CHARS_REGEX = /[<>`]/g

export function sanitizeBasic(value) {
  return String(value ?? '').replace(CONTROL_CHARS_REGEX, '').replace(TAG_CHARS_REGEX, '')
}

export function limitLength(value, maxLength) {
  const normalized = String(value ?? '')
  if (!Number.isFinite(maxLength) || maxLength <= 0) {
    return normalized
  }

  return normalized.length > maxLength ? normalized.slice(0, maxLength) : normalized
}

export function applyInputRule(value, { maxLength, transform }) {
  const base = sanitizeBasic(value)
  const transformed = typeof transform === 'function' ? transform(base) : base

  return limitLength(transformed, maxLength)
}
