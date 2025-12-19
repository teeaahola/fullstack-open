const Country = ({ country, showCountry }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={() => showCountry(country.name.common)}>Show</button>
    </div>
  )
}

export default Country