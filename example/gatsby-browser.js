import {IntlProvider} from "react-intl"
import React from "react"
import messagesEn from "./translations/en.json"
import messagesFr from "./translations/fr.json"

const messages = {
  fr: messagesFr,
  en: messagesEn,
}

export const wrapPageElement = ({element, props}) => {
  return (
    <IntlProvider
      locale={props.pageContext.locale}
      messages={messages[props.pageContext.locale]}
    >
      {element}
    </IntlProvider>
  )
}
