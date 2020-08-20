const removeLocaleFromPath = (path, locale) => {
  const regexPathWithLocale = new RegExp(`(/)(${locale}/?)(.*)`)
  const newPath = path.replace(regexPathWithLocale, "$1$3")
  return newPath
}

module.exports = {
  removeLocaleFromPath,
}
