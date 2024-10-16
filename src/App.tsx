import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

// Define the type for a todo item (string for simplicity)
type Todo = string;

function App() {
  // Explicitly define the type for the todos array as an array of strings
  const [todos, setTodos] = useState<Todo[]>([]); // Empty array initially
  const [todoValue, setTodoValue] = useState(""); // Empty string initially

  // Function to add new todos
  function handleAddTodos(newTodo: any) {
    const newTodoList = [...todos, newTodo];
    setTodos(newTodoList);
  }

  // Function to delete a todo by index
  function handleDeleteTodos(index: any) {
    const newTodoList = todos.filter((_, todoIndex) => todoIndex !== index);
    setTodos(newTodoList);
  }

  function handleEditTodos(index: any) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodos(index);
  }

  return (
    <>
      <main>
        <TodoInput
          handleAddTodos={handleAddTodos}
          todoValue={todoValue}
          setTodoValue={setTodoValue}
        />
        <TodoList
          handleEditTodos={handleEditTodos}
          handleDeleteTodos={handleDeleteTodos}
          todos={todos}
        />
      </main>
    </>
  );
}

export default App;
