const path = require("path")

exports.createPages = async ({graphql, actions: {createPage}, reporter}) => {
  const result = await graphql(
    `
      {
        allMarkdownRemark {
          nodes {
            fields {
              slug
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
    allMarkdownRemark.nodes.forEach(({fields: {slug, locale}}) => {
      createPage({
        path: slug,
        component: path.resolve("src/templates/post.js"),
        context: {
          slug,
          locale,
        },
      })
    })
  }
}
