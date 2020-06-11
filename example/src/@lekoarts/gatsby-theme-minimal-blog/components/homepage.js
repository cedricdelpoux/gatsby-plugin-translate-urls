import React, {useContext} from "react"

import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import {TranslateUrlsContext} from "../../../../../index.js"

export default () => {
  const intl = useContext(TranslateUrlsContext)
  return (
    <Layout>
      <h1>Home | {intl.locale}</h1>
    </Layout>
  )
}
