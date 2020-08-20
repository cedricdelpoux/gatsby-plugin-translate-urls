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
}
