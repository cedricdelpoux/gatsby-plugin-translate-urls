const {createContext} = require("react")

const TranslateUrlsContext = createContext({})

const getLocaleInPath = ({path, locales}) => {
  const regexLocaleInPath = new RegExp(`^/(${locales.join("|")})`)
  const matchLocaleInPath = path.match(regexLocaleInPath)

  if (matchLocaleInPath) {
    return matchLocaleInPath[1] // 0=Full match, 1= First group
  }

  return null
}

const translateUrl = ({path, locale, translations, prefix}) => {
  if (!path) {
    return "/" + locale || ""
  }

  if (!locale || !translations[locale] || path.startsWith("/dev-404-page")) {
    return path
  }

  const locales = Object.keys(translations)
  const localeInPath = getLocaleInPath({path, locales})

  if (localeInPath) {
    if (localeInPath === locale) {
      return path
    } else {
      return "/" + locale
    }
  }

  const translatedPath = path
    .split("/")
    .map(key => translations[locale][prefix + key] || key)
    .join("/")
    // Remove trailing slash
    .replace(/\/$/, ``)

  const localizedPath = `/${locale}${translatedPath}`
  return localizedPath
}

module.exports = {
  getLocaleInPath,
  TranslateUrlsContext,
  translateUrl,
}
