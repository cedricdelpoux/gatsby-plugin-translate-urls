const React = require("react")
const {TranslateUrlsContext, translateUrl} = require("./index.js")

exports.wrapPageElement = ({element, props}, options) => {
  const {locale: currentLocale, originalUrl} = props.pageContext
  const locales = Object.keys(options.translations)
  const fallbackLocale = locales[0]

  return (
    <TranslateUrlsContext.Provider
      value={{
        locales,
        locale: currentLocale,
        originalUrl,
        translateUrl: (path, locale) =>
          translateUrl({
            path,
            locale: locale || currentLocale || fallbackLocale,
            ...options,
          }),
      }}
    >
      {element}
    </TranslateUrlsContext.Provider>
  )
}
