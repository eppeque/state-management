import { KeyboardEvent, useEffect, useState } from "react";
import { useTodosStore } from "./stores/todos";
import Todo from "./Todo";

function App() {
  const todos = useTodosStore((state) => state.todos);
  const addTodo = useTodosStore((state) => state.addTodo);

  const [remaining, setRemaining] = useState(0);

  useEffect(() => setRemaining(todos.filter((t) => !t.done).length), [todos]);

  function onSubmit(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key !== "Enter") return;

    const text = e.currentTarget.value;
    e.currentTarget.value = "";

    if (text.trim().length === 0) return;

    addTodo(text);
  }

  return (
    <div className="px-10 md:px-20 lg:px-40 xl:px-80 py-10 font-lexend min-h-screen">
      <h1 className="py-2 text-5xl lg:text-6xl text-teal-600">Your todos</h1>
      <p>
        {remaining} todo{remaining !== 1 ? "s" : ""} remaining
      </p>

      <input
        placeholder="New todo"
        type="text"
        className="p-3 mt-8 outline-none border-2 border-gray-200 rounded-md w-full focus:border-teal-500"
        onKeyDown={onSubmit}
        autoFocus
      />

      <ul className="my-4 flex flex-col gap-4">
        {todos.map((t) => (
          <Todo todo={t} />
        ))}
      </ul>
    </div>
  );
}

export default App;
