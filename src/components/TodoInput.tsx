import React from 'react';

interface TodoInputProps {
  handleAddTodos: (todo: string) => void;
  todoValue: string;
  setTodoValue: (value: string) => void;
}

export default function TodoInput({ handleAddTodos, todoValue, setTodoValue }: TodoInputProps): React.ReactElement {
  // const [todoValue, setTodoValue] = useState('')  // Add useState for input value

  function handleAdd() {
    if (todoValue.trim()) {
      // Make sure the input is not empty or just spaces
      handleAddTodos(todoValue);
      setTodoValue(""); // Clear the input after adding
    }
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (todoValue.trim() !== "") {
        handleAdd();
      } else {
        alert("Please enter a task");
      }
    }
  }

  return (
    <header>
      <input
        value={todoValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTodoValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter your task"
      />
      <button onClick={handleAdd}>Add</button>
    </header>
  );
}
