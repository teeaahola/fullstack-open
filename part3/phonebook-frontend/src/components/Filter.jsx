import { useState } from 'react'

const Filter = ({ onFilterChange }) => {
  const [filter, setFilter] = useState('')

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    onFilterChange(event.target.value)
  }

  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter