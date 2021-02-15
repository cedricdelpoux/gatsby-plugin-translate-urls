const util = require("./translate-url")

const fixtureTranslations = {
  en: {
    "urls.about": "about",
    "urls.posts": "posts",
    "urls.code": "code",
    "pages.404.title": "Unknown page",
    "pages.404.content":
      "This page does not exist. You should try an other url",
    "pages.home.title": "Home",
    "pages.home.content": "Home content",
    "pages.about.title": "About",
    "pages.about.content": "About page content",
    "pages.posts.title": "Posts",
    "pages.posts.list": "Posts list",
    "pages.posts.empty": "No post found",
  },
  fr: {
    "urls.about": "a-propos",
    "urls.posts": "articles",
    "urls.code": "programmation",
    "pages.404.title": "Page inconnue",
    "pages.404.content": "Cette page n'existe pas. Essayez une autre url",
    "pages.home.title": "Accueil",
    "pages.home.content": "Contenu",
    "pages.about.title": "À propos",
    "pages.about.content": "Contenu",
    "pages.posts.title": "Articles",
    "pages.posts.list": "Liste d'articles",
    "pages.posts.empty": "Aucun articles",
  },
}
const fixturePrefix = "urls."
const fixtureParams = {
  translations: fixtureTranslations,
  prefix: fixturePrefix,
}

// structure: [path, locale, expected]
const callsNoDefaultLocale = [
  // markdown (remark)
  ["/fr/post-fr-2", "fr", "/fr/post-fr-2"],
  ["/en/post-en-1", "en", "/en/post-en-1"],
  ["/fr/code/test", "fr", "/fr/programmation/test"],
  ["/en/post-en-2", "en", "/en/post-en-2"],
  ["/fr/post-fr-1", "fr", "/fr/post-fr-1"],
  ["/en/code/test", "en", "/en/code/test"],
  // pages
  ["/dev-404-page/", "en", "/dev-404-page/"],
  ["/dev-404-page/", "fr", "/dev-404-page/"],
  ["/404/", "en", "/en/404"],
  ["/404/", "fr", "/fr/404"],
  ["/about/", "en", "/en/about"],
  ["/about/", "fr", "/fr/a-propos"],
  ["/", "en", "/en"],
  ["/", "fr", "/fr"],
  ["/posts/", "en", "/en/posts"],
  ["/posts/", "fr", "/fr/articles"],
  ["/404.html", "en", "/en/404.html"],
  ["/404.html", "fr", "/fr/404.html"],
  // single locales
  ["/en/post-en-1", "en", "/en/post-en-1"],
  ["/en/post-en-1", "fr", "/fr"],
  ["/fr/post-fr-2", "en", "/en"],
  ["/fr/post-fr-2", "fr", "/fr/post-fr-2"],
]

// structure: [path, locale, expected]
const callsDefaultLocaleEn = [
  // markdown (remark)
  ["/fr/post-fr-2", "fr", "/fr/post-fr-2"],
  ["/en/post-en-1", "en", "/post-en-1"],
  ["/fr/code/test", "fr", "/fr/programmation/test"],
  ["/en/post-en-2", "en", "/post-en-2"],
  ["/fr/post-fr-1", "fr", "/fr/post-fr-1"],
  ["/en/code/test", "en", "/code/test"],
  // pages
  ["/dev-404-page/", "en", "/dev-404-page/"],
  ["/dev-404-page/", "fr", "/dev-404-page/"],
  ["/404/", "en", "/404"],
  ["/404/", "fr", "/fr/404"],
  ["/about/", "en", "/about"],
  ["/about/", "fr", "/fr/a-propos"],
  ["/", "en", "/"],
  ["/", "fr", "/fr"],
  ["/posts/", "en", "/posts"],
  ["/posts/", "fr", "/fr/articles"],
  ["/404.html", "en", "/404.html"],
  ["/404.html", "fr", "/fr/404.html"],
  // single locales
  ["/en/post-en-1", "en", "/post-en-1"],
  ["/en/post-en-1", "fr", "/fr"],
  ["/fr/post-fr-2", "en", "/"],
  ["/fr/post-fr-2", "fr", "/fr/post-fr-2"],
]

// structure: [path, locale, expected]
const callsDefaultLocaleFr = [
  // markdown (remark)
  ["/fr/post-fr-2", "fr", "/post-fr-2"],
  ["/en/post-en-1", "en", "/en/post-en-1"],
  ["/fr/code/test", "fr", "/programmation/test"],
  ["/en/post-en-2", "en", "/en/post-en-2"],
  ["/fr/post-fr-1", "fr", "/post-fr-1"],
  ["/en/code/test", "en", "/en/code/test"],
  // pages
  ["/dev-404-page/", "en", "/dev-404-page/"],
  ["/dev-404-page/", "fr", "/dev-404-page/"],
  ["/404/", "en", "/en/404"],
  ["/404/", "fr", "/404"],
  ["/about/", "en", "/en/about"],
  ["/about/", "fr", "/a-propos"],
  ["/", "en", "/en"],
  ["/", "fr", "/"],
  ["/posts/", "en", "/en/posts"],
  ["/posts/", "fr", "/articles"],
  ["/404.html", "en", "/en/404.html"],
  ["/404.html", "fr", "/404.html"],
  // single locales
  ["/en/post-en-1", "en", "/en/post-en-1"],
  ["/en/post-en-1", "fr", "/"],
  ["/fr/post-fr-2", "en", "/en"],
  ["/fr/post-fr-2", "fr", "/post-fr-2"],
]

describe("translateUrl", () => {
  test("should process input which is invalid or has to be ignored", () => {
    expect(util.translateUrl({})).toBe("/")
    expect(util.translateUrl({locale: "fr"})).toBe("/fr")
    expect(util.translateUrl({path: "/test"})).toBe("/test")
    expect(util.translateUrl({path: "/test", locale: "fr"})).toBe("/test")
    expect(
      util.translateUrl({
        path: "/test",
        locale: "fr",
        translations: {},
      })
    ).toBe("/test")
    expect(
      util.translateUrl({
        path: "/dev-404-page/foo-bar",
        locale: "fr",
        translations: {fr: {}},
      })
    ).toBe("/dev-404-page/foo-bar")
  })

  describe("no `defaultLocale`", () => {
    test.each(callsNoDefaultLocale)(
      '"%s" for "%s" should be "%s")',
      (path, locale, expected) => {
        expect(
          util.translateUrl({
            ...fixtureParams,
            path,
            locale,
            defaultLocale: undefined,
          })
        ).toBe(expected)
      }
    )
  })

  describe('`defaultLocale` = "en"', () => {
    test.each(callsDefaultLocaleEn)(
      '"%s" for "%s" should be "%s")',
      (path, locale, expected) => {
        expect(
          util.translateUrl({
            ...fixtureParams,
            path,
            locale,
            defaultLocale: "en",
          })
        ).toBe(expected)
      }
    )
  })

  describe('`defaultLocale` = "fr"', () => {
    test.each(callsDefaultLocaleFr)(
      '"%s" for "%s" should be "%s")',
      (path, locale, expected) => {
        expect(
          util.translateUrl({
            ...fixtureParams,
            path,
            locale,
            defaultLocale: "fr",
          })
        ).toBe(expected)
      }
    )
  })
})
