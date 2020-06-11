import React, {useContext} from "react"

import {Link} from "gatsby"
import {TranslateUrlsContext} from "../../../../../index.js"

export default ({nav}) => {
  const intl = useContext(TranslateUrlsContext)
  return (
    <nav>
      {intl.locales.map(locale => {
        return (
          <Link
            key={locale}
            to={intl.translateUrl(intl.originalUrl, locale)}
            style={{marginLeft: 10}}
          >
            {locale}
          </Link>
        )
      })}
    </nav>
  )
}
