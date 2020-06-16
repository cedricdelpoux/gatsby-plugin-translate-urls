const {getPathLocale} = require("./get-path-locale")

const translateUrl = ({path, locale, translations, prefix}) => {
  if (!path) {
    return "/" + locale || ""
  }

  if (!locale || !translations[locale] || path.startsWith("/dev-404-page")) {
    return path
  }

  const pathLocale = getPathLocale(path)

  if (pathLocale && pathLocale !== locale) {
    return "/" + locale
  }
  //
  // if (pathLocale) {
  //   if (pathLocale === locale) {
  //     return path
  //   } else {
  //     return "/" + locale
  //   }
  // }

  const translatedPath = path
    .split("/")
    .map(key => translations[locale][prefix + key] || key)
    .join("/")
    // Remove trailing slash
    .replace(/\/$/, ``)

  if (pathLocale) {
    return translatedPath
  }

  const localizedPath = `/${locale}${translatedPath}`
  return localizedPath
}

module.exports = {
  translateUrl,
}
