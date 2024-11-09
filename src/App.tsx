import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

// Define the type for a todo item (string for simplicity)
type Todo = string;

function App() {
  // Explicitly define the type for the todos array as an array of strings
  const [todos, setTodos] = useState<Todo[]>([]); // Empty array initially
  const [todoValue, setTodoValue] = useState(""); // Empty string initially

  function persistData(newList: [...string[], any]) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }
  // Function to add new todos 
  function handleAddTodos(newTodo: any) {
    const newTodoList: [...string[], any] = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  // Function to delete a todo through index
  function handleDeleteTodos(index: any) {
    const newTodoList: any = todos.filter(
      (_, todoIndex) => todoIndex !== index
    );
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodos(index: any) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodos(index);
  }

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    let localTodos: any = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, []);

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
