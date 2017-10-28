const { first } = require('./curry')

module.exports = first((fn, o) => {
  const keys = Object.keys(o)
  const result = {}
  let k

  for (k of keys) {
    result[k] = fn(o[k], k, o)
  }
  return result
})
