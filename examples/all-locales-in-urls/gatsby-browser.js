import {IntlProvider} from "react-intl"
import React from "react"
import messagesEn from "./translations/en.json"
import messagesFr from "./translations/fr.json"

const messages = {
  en: messagesEn,
  fr: messagesFr,
}

export const wrapPageElement = ({element, props}) => {
  const {locale: currentLocale} = props.pageContext
  const fallbackLocale = "en"

  return (
    <IntlProvider
      locale={currentLocale || fallbackLocale}
      messages={messages[currentLocale] || messages[fallbackLocale]}
    >
      {element}
    </IntlProvider>
  )
}
