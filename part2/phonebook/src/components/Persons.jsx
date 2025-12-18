const Person = ({ person}) => {
  return <div>{person.name}: {person.number}</div>
}

const Persons = ({ persons }) => {
  return persons.map((person) => <Person person={person} key={person.id} />)
}

export default Persons