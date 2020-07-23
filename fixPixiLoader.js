module.exports = function(source) {
  return source.replace('function isWebGLSupported() {', 'function isWebGLSupported() { return true')
}
