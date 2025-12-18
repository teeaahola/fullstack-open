const Total = (props) => {
  const total = props.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return <p>total of {total} exercises</p>
}

export default Total