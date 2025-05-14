"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getTodos, saveTodo } from "@/gateways/todos";
import { ITodo } from "@/interfaces/todos";
import { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const createPage = () => {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newTodo: ITodo = {
        id: uuidv4(),
        title,
        status: "En cours",
      };
      const todos = getTodos();
      todos.push(newTodo);

      saveTodo(todos);
      console.log(newTodo);
      setTitle("");
    }
  };

  return (
    <main className="max-w-lg mx-auto mt-20">
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Creation de tâche</CardTitle>
          <Button variant="outline" onClick={() => router.push("/tasks")}>
            <ArrowLeft />
            <span>Retour</span>
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              type="submit"
              onClick={() => router.push("/tasks")}
              className="bg-cyan-500 hover:bg-cyan-700"
            >
              Ajouter
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default createPage;
