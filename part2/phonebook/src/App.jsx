import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'
import peopleService from './services/people'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterValue, setFilterValue] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    peopleService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const addPerson = (newName, newNumber) => {
    if (persons.some(person => person.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = persons.find(person => person.name === newName)
        const updatedPerson = {
          ...changedPerson,
          number: newNumber
        }
        
        peopleService
          .update(changedPerson.id, updatedPerson)
          .then(() => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : updatedPerson))

            setNotification(`Changed ${newName}'s number`)
            setTimeout(() => {
              setNotification(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== changedPerson.id))
          })
      }
      // exit the function to avoid adding a duplicate
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

        setNotification(`Added ${newName}`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
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
      <Notification message={notification} />
      <Error message={errorMessage} />
      <Filter onFilterChange={setFilterValue} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  )
}

export default App