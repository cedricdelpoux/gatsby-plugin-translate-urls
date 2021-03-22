const {resolve} = require("path")

exports.createPages = async ({graphql, actions: {createPage}, reporter}) => {
  const result = await graphql(
    `
      {
        allMarkdownRemark {
          nodes {
            fields {
              slug
              path
              locale
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panic(result.errors)
  }

  const {allMarkdownRemark} = result.data

  if (allMarkdownRemark) {
    allMarkdownRemark.nodes.forEach(({fields: {path, slug, locale}}) => {
      createPage({
        path,
        component: resolve("src/templates/post.js"),
        context: {
          slug,
          locale,
        },
      })
    })
  }

  // localized product pages, which can be originated from a source plugin
  createPage({
    path: "/product/trousers",
    component: resolve("src/templates/product.js"),
    context: {
      slug: "trousers",
      locale: "en",
      alternates: {
        en: "/product/trousers",
        fr: "/produit/pantalons",
      },
    },
  })
  createPage({
    path: "/produit/pantalons",
    component: resolve("src/templates/product.js"),
    context: {
      slug: "trousers",
      locale: "fr",
      alternates: {
        en: "/product/trousers",
        fr: "/produit/pantalons",
      },
    },
  })
}
