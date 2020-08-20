const {getPathLocale} = require("./utils/get-path-locale")
const {translateUrl} = require("./utils/translate-url")

exports.onCreatePage = ({page, actions: {createPage, deletePage}}, options) => {
  const locales = Object.keys(options.translations)
  const pathLocale = getPathLocale(page.path)
  const contextLocale = page.context.locale

  if (pathLocale || contextLocale) {
    const locale = pathLocale || contextLocale
    deletePage(page)
    const newPage = {
      ...page,
      path: translateUrl({
        path: page.path,
        locale,
        ...options,
      }),
      context: {
        ...page.context,
        locale,
        originalUrl: page.path,
      },
    }

    createPage(newPage)

    return
  }

  const isPage404 = page.path.match(/^\/?404\/?$/)

  if (isPage404) {
    if (options.defaultLocale) {
      // 404 page already exist by default
      return
    }
    page.matchPath = `/*`
  } else {
    deletePage(page)
  }

  locales.forEach((locale) => {
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
      },
    })
  })
}

exports.createPages = ({actions: {createRedirect}}, options) => {
  if (!options.defaultLocale) {
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
}

exports.onCreateNode = ({node, actions: {createNodeField}}, options) => {
  if (node.fields && node.fields.slug) {
    const pathLocale = getPathLocale(node.fields.slug)
    const path = node.fields.slug

    node.fields.slug = translateUrl({
      path,
      locale: pathLocale,
      ...options,
    })

    createNodeField({
      name: `path`,
      node,
      value: path,
    })

    createNodeField({
      name: `locale`,
      node,
      value: pathLocale || options.defaultLocale,
    })
  }
}
