"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTodos, saveTodo } from "@/gateways/todos";
import { ITodo } from "@/interfaces/todos";
import { ArrowLeftToLine } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const UpdateTasksPage = () => {
  const [title, setTitle] = useState<string | undefined>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const tasks = getTodos();
    setTodos(tasks);
    const todo = tasks.find((t) => parseInt(t.id) === parseInt(id as string));
    setStatus(todo?.status);
    setTitle(todo?.title);
    setIsLoading(false);
  }, [id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title?.trim() && status?.trim()) {
      const updateTodo = todos.map((todo) =>
        todo.id === id ? { ...todo, title, status } : todo
      );
      saveTodo(updateTodo as ITodo[]);
      router.push("/tasks");
    } else alert("Renseignez le titre et le statut");
  };

  const handleSelectChange = (value: string) => {
    setStatus(value);
  };

  console.log(status);
  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <main className="max-w-xl mx-auto mt-20">
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Creation de tâche</CardTitle>
          <Button variant="outline" onClick={() => router.push("/tasks")}>
            <ArrowLeftToLine />
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
            <Select value={status} onValueChange={handleSelectChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="En cours">En cours</SelectItem>
                <SelectItem value="Terminée">Terminée</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="bg-cyan-500 hover:bg-cyan-700">
              Ajouter
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default UpdateTasksPage;
