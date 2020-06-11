import React, {useContext} from "react"

import {Link} from "gatsby"
import {TranslateUrlsContext} from "../../../../../index.js"

export default ({nav}) => {
  const intl = useContext(TranslateUrlsContext)
  return (
    <nav>
      <Link to={intl.translateUrl("/")} style={{marginRight: 10}}>
        Home | {intl.locale}
      </Link>
      <Link to={intl.translateUrl("/posts")} style={{marginRight: 10}}>
        Posts | {intl.locale}
      </Link>
      <Link to={intl.translateUrl("/about")}>About | {intl.locale}</Link>
    </nav>
  )
}
