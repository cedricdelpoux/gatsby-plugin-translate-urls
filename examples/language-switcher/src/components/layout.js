import "./layout.css"

import {graphql, useStaticQuery} from "gatsby"
import {TranslateUrlsContext} from "../../../../index.js" // gatsby-plugin-translate-urls
import {Helmet} from "react-helmet"

import Header from "./header"
import PropTypes from "prop-types"
import React, {useContext} from "react"

const Layout = ({children, title}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const {locales, originalUrl, translateUrl} = useContext(TranslateUrlsContext)

  return (
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0 1.0875rem 1.45rem`,
      }}
    >
      <Helmet title={title}>
        {/* Localized versions, see https://developers.google.com/search/docs/advanced/crawling/localized-versions */}
        {locales.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={translateUrl(originalUrl, locale)}
          />
        ))}
      </Helmet>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
