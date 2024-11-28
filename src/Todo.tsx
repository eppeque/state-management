import { Todo as TodoModel } from "./models/todo";
import { useTodosStore } from "./stores/todos";

interface TodoProps {
  todo: TodoModel;
}

function Todo({ todo }: TodoProps) {
  const updateTodo = useTodosStore((state) => state.updateTodo);
  const deleteTodo = useTodosStore((state) => state.deleteTodo);

  return (
    <li
      className="p-10 bg-gray-200 rounded-lg flex justify-between items-center"
      key={todo.id}
    >
      <section className="flex items-center">
        <input
          type="checkbox"
          className="mr-4"
          checked={todo.done}
          onChange={(e) =>
            updateTodo({ ...todo, done: e.currentTarget.checked })
          }
        />
        <span className={`text-xl ${todo.done ? "line-through" : ""}`}>
          {todo.text}
        </span>
      </section>
      <button
        className="py-2 px-4 bg-red-500 text-white rounded-md shadow-sm font-semibold"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default Todo;
