import { ITodo } from "@/interfaces/todos";

const STORAGE_KEY = "todos";

export function getTodos(): ITodo[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveTodo(todos: ITodo[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function deleteTodo(id: string): void {
  console.log(id);
  const todos = getTodos();
  const updateTodo = todos.filter((todo) => todo.id !== id);
  saveTodo(updateTodo);
}
