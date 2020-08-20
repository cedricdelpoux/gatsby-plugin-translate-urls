import {FormattedMessage} from "react-intl"
import Layout from "../components/layout"
import React from "react"

export default () => {
  return (
    <Layout>
      <h1>
        <FormattedMessage id="pages.about.title" />
      </h1>
      <FormattedMessage id="pages.about.content" />
    </Layout>
  )
}
