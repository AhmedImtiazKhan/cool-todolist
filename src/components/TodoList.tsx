import TodoCard from "./TodoCard";

export default function TodoList(props: any) {
  const { todos } = props;

  return (
    <ul>
      {todos.map((todo: any, index: any) => {
        return (
          <TodoCard {...props} key={index} index={index}>
            <p>{todo}</p>
          </TodoCard>
        );
      })}
    </ul>
  );
}
