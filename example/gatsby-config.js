module.exports = {
  siteMetadata: {
    title: `gatsby-plugin-translate-urls example`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-slug",
    {
      //resolve: "gatsby-plugin-translate-urls"
      resolve: require.resolve(`..`),
      options: {
        translations: {
          // import JS or JSON files
          en: require(`${__dirname}/translations/en.json`),
          fr: require(`${__dirname}/translations/fr.json`),
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
