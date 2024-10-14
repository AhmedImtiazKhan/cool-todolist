import React from 'react'
import TodoCard from './TodoCard'

export default function TodoList() {
  let todos=[
    'Task 1',
    'Task 2',
    'Task 3'
  ]
  return (
    <ul>
      {todos.map((todo, index) => {
        return (
          <TodoCard key={index}  >
           <p>{todo}</p> 
          </TodoCard>
        )
      })}
    </ul>
  )
}