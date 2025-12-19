import Country from "./Country"

const Countries = ({ countries, showCountry }) => {
  return countries.map((country) => <Country key={country.name.common} country={country} showCountry={showCountry} />)
}

export default Countries