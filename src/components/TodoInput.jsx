import React, { useState } from 'react'

export default function TodoInput(props) {
  const { handleAddTodos } = props
  const [todoValue, setTodoValue] = useState('')  // Add useState for input value

  function handleAdd() {
    if (todoValue.trim()) { // Make sure the input is not empty or just spaces
      handleAddTodos(todoValue)
      setTodoValue('') // Clear the input after adding
    }
  }

  return (
    <header>
      <input
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
        placeholder="Enter your task"
      />
      <button onClick={handleAdd}>Add</button>
    </header>
  )
}
