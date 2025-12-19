const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      Capital {country.capital.join(", ")}<br />
      Area {country.area}
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

export default CountryData