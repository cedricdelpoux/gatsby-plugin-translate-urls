const removeTrailingSlash = (path) => {
  const regexPathWithTrailingSlash = /(\/.+)\/$/
  return path.replace(regexPathWithTrailingSlash, "$1")
}

module.exports = {
  removeTrailingSlash,
}
