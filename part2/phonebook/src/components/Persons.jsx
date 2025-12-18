const Person = ({ person, onDelete }) => {
  return (
    <div>
      {person.name}: {person.number}
      <button onClick={() => onDelete(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({ persons, onDelete }) => {
  return persons.map((person) => <Person person={person} key={person.id} onDelete={onDelete} />)
}

export default Persons