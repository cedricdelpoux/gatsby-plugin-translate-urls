const util = require("./remove-locale-from-path")

describe("removeLocaleFromPath", () => {
  test("should remove any existing locale", () => {
    expect(util.removeLocaleFromPath("/fr", "fr")).toBe("/")
    expect(util.removeLocaleFromPath("/fr/", "fr")).toBe("/")
    expect(util.removeLocaleFromPath("/fr/something", "fr")).toBe("/something")
    expect(util.removeLocaleFromPath("/en", "fr")).toBe("/en")
  })
})
