const util = require("./translate-url")

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
})
