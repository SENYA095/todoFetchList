"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");

  
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);


  const handleAdd = async () => {
    if (!newTitle.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      title: newTitle,
      completed: false,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setNewTitle("");


    try {
      await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
    } catch (error) {
      console.error("Помилка при додаванні todo:", error);
    }
  };

  // Видалення todo
  const handleDelete = async (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    } catch (error) {
      console.error("Помилка при видаленні todo:", error);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">📝 Todo List</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Нове завдання..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Додати
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-3 border rounded bg-white shadow"
          >
            <span>{todo.title}</span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
