const util = require("./get-path-locale")

describe("getPathLocale", () => {
  test("should return `null` if there is no locale in the path", () => {
    expect(util.getPathLocale("/")).toBeNull()
    expect(util.getPathLocale("/fr-FR")).toBeNull()
  })

  test("should return locale if existing", () => {
    expect(util.getPathLocale("/fr")).toBe("fr")
    expect(util.getPathLocale("/fr/")).toBe("fr")
    expect(util.getPathLocale("/fr/something")).toBe("fr")
  })
})
