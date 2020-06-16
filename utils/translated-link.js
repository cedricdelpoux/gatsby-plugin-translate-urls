const {Link} = require("gatsby")
const React = require("react")
const {useContext} = require("react")

const {TranslateUrlsContext} = require("./translate-urls-context")

const TranslatedLink = ({children, to, locale, ...props}) => {
  const {translateUrl} = useContext(TranslateUrlsContext)
  return (
    <Link to={translateUrl(to, locale)} {...props}>
      {children}
    </Link>
  )
}

module.exports = {
  TranslatedLink,
}
