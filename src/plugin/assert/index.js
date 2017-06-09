export function assert (condition, message) {
  if (!condition) {
    throw new Error(`[vue-$http] ${message}`)
  }
}

export function warn (condition, message) {
  if (!condition) {
    typeof console !== 'undefined' && console.warn(`[vue-$http] ${message}`)
  }
}
