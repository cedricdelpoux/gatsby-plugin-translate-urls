const {locales} = require("./locales")

const getPathLocale = (path) => {
  const regexLocaleInPath = new RegExp(`^/(${locales.join("|")})(?:/.*)?$`)
  const matchLocaleInPath = path.match(regexLocaleInPath)

  if (matchLocaleInPath) {
    return matchLocaleInPath[1] // 0=Full match, 1=First group
  }

  return null
}

module.exports = {
  getPathLocale,
}
