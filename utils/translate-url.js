const {getPathLocale} = require("./get-path-locale")
const {removeLocaleFromPath} = require("./remove-locale-from-path")
const {removeTrailingSlash} = require("./remove-trailing-slash")

const translateUrl = ({path, locale, translations, prefix, defaultLocale}) => {
  if (!path) {
    return "/" + (locale || "")
  }

  if (
    !locale ||
    !translations ||
    !translations[locale] ||
    path.startsWith("/dev-404-page")
  ) {
    return path
  }
  const isDefaultLocale = defaultLocale && defaultLocale === locale
  const pathLocale = getPathLocale(path)

  if (pathLocale && pathLocale !== locale) {
    const newPath = "/" + locale

    if (isDefaultLocale) {
      return removeLocaleFromPath(newPath, defaultLocale)
    }

    return newPath
  }

  let translatedPath = path
    .split("/")
    .map((key) => translations[locale][prefix + key] || key)
    .join("/")

  if (pathLocale) {
    if (isDefaultLocale) {
      translatedPath = removeLocaleFromPath(translatedPath, pathLocale)
    }

    return removeTrailingSlash(translatedPath)
  }

  if (isDefaultLocale) {
    return removeTrailingSlash(translatedPath)
  }

  const localizedPath = `/${locale}${translatedPath}`
  return removeTrailingSlash(localizedPath)
}

module.exports = {
  translateUrl,
}
