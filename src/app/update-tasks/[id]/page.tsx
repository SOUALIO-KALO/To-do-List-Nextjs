"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { toast } from "sonner";

const UpdateTodosPage = () => {
  const [title, setTitle] = useState<string | undefined>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [status, setStatus] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const todoStored = getTodos();
    setTodos(todoStored);
    const todo = todoStored.find(
      (t) => parseInt(t.id) === parseInt(id as string)
    );
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
      toast("✅ Modification enregistrée avec succès");
      router.push("/tasks");
    } else alert("Renseignez le titre et le statut");
  };

  const handleSelectChange = (value: string) => {
    setStatus(value);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <main className="max-w-xl mx-auto mt-20">
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Creation de tâche</CardTitle>
          <Button
            variant="outline"
            onClick={() => {
              toast("❌ Modification rejetée");
              router.push("/tasks");
            }}
          >
            <ArrowLeftToLine />
            <span>Retour</span>
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Titre</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Statut</Label>
              <Select value={status} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="En cours">En cours</SelectItem>
                  <SelectItem value="Terminée">Terminée</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="bg-cyan-500 hover:bg-cyan-700">
              Enregistrement
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default UpdateTodosPage;
