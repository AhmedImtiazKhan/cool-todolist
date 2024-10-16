import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);  // Empty array initially

  // Function to add new todos
  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    setTodos(newTodoList);
  }

  // Function to delete a todo by index
    function handleDeleteTodos(index) {
      const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
      setTodos(newTodoList);
    }

  return (
    <>
      <main>
        <TodoInput handleAddTodos={handleAddTodos} />
        <TodoList handleDeleteTodos={handleDeleteTodos} todos={todos} />
      </main>
    </>
  );
}

export default App;
