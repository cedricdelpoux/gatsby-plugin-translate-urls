import {FormattedMessage} from "react-intl"
import React from "react"
import {TranslatedLink} from "../../../../index.js" // gatsby-plugin-translate-urls

export const NavPages = () => {
  return (
    <nav>
      <TranslatedLink to="/" style={{marginRight: 10}}>
        <FormattedMessage id="pages.home.title" />
      </TranslatedLink>
      <TranslatedLink to="/posts" style={{marginRight: 10}}>
        <FormattedMessage id="pages.posts.title" />
      </TranslatedLink>
      <TranslatedLink to="/about">
        <FormattedMessage id="pages.about.title" />
      </TranslatedLink>
    </nav>
  )
}
