export default function TodoInput(props: any) {
  const { handleAddTodos, todoValue, setTodoValue } = props;
  // const [todoValue, setTodoValue] = useState('')  // Add useState for input value

  function handleAdd() {
    if (todoValue.trim()) {
      // Make sure the input is not empty or just spaces
      handleAddTodos(todoValue);
      setTodoValue(""); // Clear the input after adding
    }
  }

  function handleKeyPress(e: any) {
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
        onChange={(e) => setTodoValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter your task"
      />
      <button onClick={handleAdd}>Add</button>
    </header>
  );
}
