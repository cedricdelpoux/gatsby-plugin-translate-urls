import React, {useContext} from "react"

import Layout from "../components/layout"
import {Link} from "gatsby"
import {TranslateUrlsContext} from "../../../../index.js" // gatsby-plugin-translate-urls
import {graphql} from "gatsby"

export default ({data: {post}}) => {
  const intl = useContext(TranslateUrlsContext)
  return (
    <Layout title={post.frontmatter.title}>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{__html: post.html}} />
      <hr />
      <Link to={intl.translateUrl("/posts")}>
        <span role="img" aria-label="back">
          ⏪
        </span>
      </Link>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Post($locale: String!, $slug: String!) {
    post: markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      timeToRead
      excerpt
      tableOfContents(maxDepth: 2)
      frontmatter {
        title
        date(formatString: "Do MMMM YYYY", locale: $locale)
      }
      fields {
        slug
      }
    }
  }
`
