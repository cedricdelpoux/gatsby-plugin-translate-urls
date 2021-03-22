const React = require("react")
const {TranslateUrlsContext} = require("./translate-urls-context")
const {translateUrl} = require("./translate-url")

exports.wrapPageElement = ({element, props}, options) => {
  const {
    locale: currentLocale,
    originalUrl,
    alternates = {},
  } = props.pageContext
  const locales = Object.keys(options.translations)
  const fallbackLocale = locales[0]

  /**
   * Either checks for a matching alternate in page context or calls
   * default `translateUrl` method
   * @param {String} path
   * @param {String} locale
   * @returns {String}
   */
  const translateUrlWithAlternates = (path, locale) => {
    let pathMatchesAlternates = Object.values(alternates).some(
      (alternate) => path === alternate
    )
    if (pathMatchesAlternates && alternates[locale]) {
      return `/${locale}${alternates[locale]}`
    }
    return translateUrl({
      path,
      locale: locale || currentLocale || fallbackLocale,
      ...options,
    })
  }

  return (
    <TranslateUrlsContext.Provider
      value={{
        alternates,
        locales,
        locale: currentLocale || fallbackLocale,
        originalUrl,
        translateUrl: translateUrlWithAlternates,
      }}
    >
      {element}
    </TranslateUrlsContext.Provider>
  )
}
