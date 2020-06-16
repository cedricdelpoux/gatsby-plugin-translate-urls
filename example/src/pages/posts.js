import {FormattedMessage} from "react-intl"
import Layout from "../components/layout"
import {Link} from "gatsby"
import React from "react"
import {graphql} from "gatsby"

export default ({data}) => {
  return (
    <Layout>
      <h1>
        <FormattedMessage id="pages.posts.title" />
      </h1>
      {data.allMarkdownRemark.nodes.length > 0 ? (
        <>
          <FormattedMessage id="pages.posts.list" />
          <ul>
            {data.allMarkdownRemark.nodes.map(({frontmatter, fields}) => (
              <li key={fields.slug}>
                <Link to={fields.slug}>{frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <FormattedMessage id="pages.posts.empty" />
      )}
    </Layout>
  )
}

export const query = graphql`
  query Posts($locale: String!) {
    allMarkdownRemark(
      filter: {fields: {locale: {eq: $locale}}}
      sort: {fields: frontmatter___date, order: DESC}
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "Do MMMM YYYY", locale: $locale)
        }
        fields {
          slug
        }
      }
    }
  }
`
