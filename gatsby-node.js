const {getLocaleInPath, translateUrl} = require("./index.js")

exports.onCreatePage = ({page, actions: {createPage, deletePage}}, options) => {
  const locales = Object.keys(options.translations)
  const localeInPath = getLocaleInPath({path: page.path, locales})

  if (localeInPath) {
    deletePage(page)
    const newPage = {
      ...page,
      context: {
        ...page.context,
        locale: localeInPath,
        originalUrl: page.path,
        localeRegex: new RegExp(`^/(${localeInPath})/`),
      },
    }
    createPage(newPage)

    return
  }

  const isPage404 = page.path.match(/^\/?404\/?$/)

  if (isPage404) {
    page.matchPath = `/*`
  } else {
    deletePage(page)
  }

  locales.forEach(locale => {
    const translatedPath = translateUrl({
      path: page.path,
      locale,
      ...options,
    })

    const newPage = {
      ...page,
      path: translatedPath,
      // 404 localized page should math all pages from the same locale
      matchPath: isPage404 ? `/${locale}/*` : page.path.matchPath,
    }

    createPage({
      ...newPage,
      context: {
        ...newPage.context,
        locale,
        originalUrl: page.path,
        localeRegex: `^/(${locale})/`,
      },
    })
  })
}

exports.createPages = ({actions: {createRedirect}}, options) => {
  const locales = Object.keys(options.translations)
  const fallbackLocale = locales[0]

  createRedirect({
    fromPath: "/",
    toPath: `/${fallbackLocale}`,
    Language: fallbackLocale,
    isPermanent: true,
    exactPath: true,
    redirectInBrowser: process.env.NODE_ENV === "development",
    statusCode: 301,
  })
}
