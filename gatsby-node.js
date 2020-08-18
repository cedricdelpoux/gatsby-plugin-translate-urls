const {getPathLocale} = require("./utils/get-path-locale")
const {translateUrl} = require("./utils/translate-url")

exports.onCreatePage = ({page, actions: {createPage, deletePage}}, options) => {
  const locales = Object.keys(options.translations)
  const pathLocale = getPathLocale(page.path)

  if (pathLocale) {
    deletePage(page)
    const newPage = {
      ...page,
      path: translateUrl({
        path: page.path,
        locale: pathLocale,
        ...options,
      }),
      context: {
        ...page.context,
        locale: pathLocale,
        originalUrl: page.path,
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
    force: true,
    redirectInBrowser: process.env.NODE_ENV === "development",
  })
}

exports.onCreateNode = ({node, actions: {createNodeField}}, options) => {
  if (node.fields && node.fields.slug) {
    const pathLocale = getPathLocale(node.fields.slug)

    node.fields.slug = translateUrl({
      path: node.fields.slug,
      locale: pathLocale,
      ...options,
    })

    createNodeField({
      name: `locale`,
      node,
      value: getPathLocale(node.fields.slug),
    })
  }
}
