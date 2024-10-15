import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import Todoinput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([    'Task 1',
    'Task 2',
    'Task 3'])

    function handleAddTodos(newTodo){
      const newTodoList = [...todos, newTodo]
      setTodos(newTodoList)
    }
  return (
<>
<main>
  <Todoinput handleAddTodos={handleAddTodos}/>
  <TodoList todos={todos}/>

  </main></>
  )
}

export default App
