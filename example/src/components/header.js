import {NavLocales} from "./nav-locales"
import {NavPages} from "./nav-pages"
import React from "react"
import {TranslatedLink} from "../../../index.js"

const Header = ({siteTitle}) => {
  return (
    <header>
      <h1>
        <TranslatedLink to="/">{siteTitle}</TranslatedLink>
      </h1>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <NavPages />
        <NavLocales />
      </div>
      <br />
      <hr />
    </header>
  )
}

export default Header
