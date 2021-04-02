import React, {useContext} from "react"
import {FormattedMessage, useIntl} from "react-intl"

import Layout from "../components/layout"
import {Link} from "gatsby"
import {TranslateUrlsContext} from "../../../../index.js" // gatsby-plugin-translate-urls

export default () => {
  const {formatMessage: f} = useIntl()
  const intl = useContext(TranslateUrlsContext)
  return (
    <Layout title={f({id: "trousers"})}>
      <h1>
        <FormattedMessage id="trousers" />
      </h1>
      <hr />
      <Link to={intl.translateUrl("/products")}>
        <span role="img" aria-label="back">
          ⏪
        </span>
      </Link>
    </Layout>
  )
}
