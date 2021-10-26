const {getPathLocale} = require("./get-path-locale")
const {removeLocaleFromPath} = require("./remove-locale-from-path")
const {removeTrailingSlash: removeSlash} = require("./remove-trailing-slash")

const translateUrl = ({
  path,
  locale,
  translations,
  prefix,
  defaultLocale,
  preserveTrailingSlash,
}) => {
  function removeTrailingSlash(path) {
    return preserveTrailingSlash ? path : removeSlash(path)
  }

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

  // for auto generated pages which are not existing in other locales
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

// We don't want to have /404.html/ directory with index.html inside. 404.html should stay as it is.
const defaultExcludedPaths = [`/404.html`]

const translateUrlWithSlashValidator = ({
  forceTrailingSlash,
  trailingSlashExcludedPaths = defaultExcludedPaths,
  ...rest
}) => {
  let url = translateUrl(rest)
  if (
    forceTrailingSlash &&
    !trailingSlashExcludedPaths.includes(url) &&
    url[url.length - 1] !== "/"
  ) {
    // Remove the hash to prevent /route/#/ or /route#/
    if (url[url.length - 1] === "#") {
      url = url.substring(0, url.length - 1)
    }
    url += "/"
  }
  return url
}

module.exports = {
  translateUrl: translateUrlWithSlashValidator,
}
