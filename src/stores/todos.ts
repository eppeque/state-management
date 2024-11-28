import { create } from "zustand";
import { Todo } from "../models/todo";

interface TodosStoreState {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (todo: Todo) => void;
}

export const useTodosStore = create<TodosStoreState>()((set, get) => ({
  todos: [],
  addTodo: (text) =>
    set((state) => ({
      todos: [...state.todos, { id: crypto.randomUUID(), text, done: false }],
    })),
  deleteTodo: (id) =>
    set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
  updateTodo(todo) {
    const todos = get().todos;
    const found = todos.find((t) => t.id === todo.id);

    if (!found) return;

    found.text = todo.text;
    found.done = todo.done;
    set({ todos: [...todos] });
  },
}));
