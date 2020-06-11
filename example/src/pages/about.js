import React, {useContext} from "react"

import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import {Link} from "gatsby"
import {TranslateUrlsContext} from "../../../index.js"

export default ({pageContext}) => {
  const intl = useContext(TranslateUrlsContext)
  return (
    <Layout>
      <h1>About | {pageContext.locale}</h1>
      <Link to={intl.translateUrl("/")}>Go to Home</Link>
    </Layout>
  )
}
