import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import Listing from "@lekoarts/gatsby-theme-minimal-blog/src/components/listing"
import React from "react"
import {graphql} from "gatsby"

export default ({pageContext, data}) => {
  return (
    <Layout>
      <h1>Posts | {pageContext.locale}</h1>
      {data.allPost.nodes.length > 0 ? (
        <Listing posts={data.allPost.nodes} showTags={false} />
      ) : (
        "No posts in " + pageContext.locale
      )}
    </Layout>
  )
}

export const query = graphql`
  query Posts($localeRegex: String!) {
    allPost(
      sort: {fields: date, order: DESC}
      filter: {slug: {regex: $localeRegex}}
    ) {
      nodes {
        slug
        title
        date(formatString: "MMMM Do, YYYY")
        excerpt
        timeToRead
        description
        tags {
          name
          slug
        }
      }
    }
  }
`
