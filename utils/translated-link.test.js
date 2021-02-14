const React = require("react")
const {Link} = require("gatsby")
const {configure, shallow} = require("enzyme")
const Adapter = require("enzyme-adapter-react-16")

configure({adapter: new Adapter()})

const contextValue = {
  translateUrl: () => "/fr/français",
}
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => contextValue,
}))

const {TranslatedLink} = require("./translated-link")

describe("TranslatedLink", () => {
  test("should render", () => {
    const wrapper = shallow(
      <TranslatedLink to="english" locale="fr">
        Français
      </TranslatedLink>
    )
    const link = <Link to="/fr/français">Français</Link>
    expect(wrapper.contains(link)).toEqual(true)
  })
})
