require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  pathPrefix: "/gatsby-plugin-translate-urls",
  siteMetadata: {
    siteTitle: "gatsby-plugin-translate-urls",
    siteTitleAlt: "gatsby-plugin-translate-urls - Gatsby Plugin",
    author: "Cédric Delpoux",
  },
  plugins: [
    "@lekoarts/gatsby-theme-minimal-blog",
    {
      // gatsby-plugin-translate-urls
      resolve: require.resolve(`..`),
      options: {
        translations: {
          // import JS or JSON files
          en: require("./src/translations/en.js"),
          fr: require("./src/translations/fr.json"),
        },
        prefix: "urls.",
      },
    },
    {
      resolve: "gatsby-plugin-client-side-redirect",
      options: {
        pathPrefix: "/gatsby-plugin-translate-urls",
      },
    },
  ],
}
