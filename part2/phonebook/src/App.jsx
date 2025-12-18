import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import peopleService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (newName, newNumber) => {
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    peopleService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
      })
  }

  const deletePerson = (id) => {
    if (confirm(`Delete ${persons.find(person => person.id === id)?.name} ?`)) {
      peopleService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={setFilterValue} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App