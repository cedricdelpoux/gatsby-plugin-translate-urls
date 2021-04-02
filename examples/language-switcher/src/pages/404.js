import {FormattedMessage, useIntl} from "react-intl"
import Layout from "../components/layout"
import React from "react"

export default () => {
  const {formatMessage: f} = useIntl()
  return (
    <Layout title={f({id: "pages.404.title"})}>
      <h1>
        <FormattedMessage id="pages.404.title" />
      </h1>
      <FormattedMessage id="pages.404.content" />
    </Layout>
  )
}
