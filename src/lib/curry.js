module.exports = {
  first: fn => {
    fn.curry = fn.length > 2
      ? n => (...args) => fn(n, ...args)
      : n => arg => fn(n, arg)
    return fn
  }
}
