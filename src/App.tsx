import React, { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import AISuggestions from "./components/AISuggestions";

// Define the type for a todo item (string for simplicity)
type Todo = string;

function App(): React.ReactElement {
  // Explicitly define the type for the todos array as an array of strings
  const [todos, setTodos] = useState<Todo[]>([]); // Empty array initially
  const [todoValue, setTodoValue] = useState(""); // Empty string initially

  function persistData(newList: Todo[]) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }

  // Function to add new todos 
  function handleAddTodos(newTodo: string) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  // Function to delete a todo through index
  function handleDeleteTodos(index: number) {
    const newTodoList = todos.filter(
      (_: string, todoIndex: number) => todoIndex !== index
    );
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodos(index: number) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodos(index);
  }

  function handleSuggestionClick(suggestion: string) {
    handleAddTodos(suggestion);
  }

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    const localTodos = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }
    const parsedTodos = JSON.parse(localTodos).todos as Todo[];
    setTodos(parsedTodos);
  }, []);

  return (
    <React.Fragment>
      <main>
        <TodoInput
          handleAddTodos={handleAddTodos}
          todoValue={todoValue}
          setTodoValue={setTodoValue}
        />
        <AISuggestions
          todos={todos}
          onSuggestionClick={handleSuggestionClick}
        />
        <TodoList
          handleEditTodos={handleEditTodos}
          handleDeleteTodos={handleDeleteTodos}
          todos={todos}
        />
      </main>
    </React.Fragment>
  );
}

export default App;
