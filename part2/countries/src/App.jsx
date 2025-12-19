import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'
import countryService from './services/countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(countries => {
        setCountries(countries)
      })
    
    if (filteredCountries.length > 10) {
      setAlert('Too many matches, specify another filter')
    } else {
      setAlert(null)
    }
  }, [filter])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <Filter onFilterChange={setFilter} />
      {alert}
      {filteredCountries.length <= 10
        && filteredCountries.length > 1
        && <Countries countries={filteredCountries} />}
      {filteredCountries.length === 1 && <Country country={filteredCountries[0]} />}
    </div>
  )
}

export default App
