const util = require("./remove-trailing-slash")

describe("removeTrailingSlash", () => {
  test("should remove trailing slash if existing", () => {
    expect(util.removeTrailingSlash("/")).toBe("/")
    expect(util.removeTrailingSlash("/fr/")).toBe("/fr")
    expect(util.removeTrailingSlash("/fr/something/")).toBe("/fr/something")
  })
})
