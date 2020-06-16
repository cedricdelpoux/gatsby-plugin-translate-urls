import React, {useContext} from "react"

import {Link} from "gatsby"
import {TranslateUrlsContext} from "../../../index.js"

export const NavLocales = () => {
  const {translateUrl, locales, originalUrl} = useContext(TranslateUrlsContext)
  return (
    <nav>
      {locales.map(locale => {
        return (
          <Link
            key={locale}
            to={translateUrl(originalUrl, locale)}
            style={{marginLeft: 10}}
          >
            {locale}
          </Link>
        )
      })}
    </nav>
  )
}
