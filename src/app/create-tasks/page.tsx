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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const createPage = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("En cours");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      const newTodo: ITodo = {
        id: uuidv4(),
        title,
        status: status,
      };
      const todos = getTodos();
      todos.push(newTodo);

      saveTodo(todos);
      setTitle("");
      toast("✅ Tâche ajoutée avec succès");
      router.push("/tasks");
    } else {
      alert("Veuillez renseigner le titre");
    }
  };

  const handleSelectChange = (value: string) => {
    setStatus(value);
  };

  return (
    <main className="max-w-lg mx-auto mt-20">
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle className="text-2xl">Creation de tâche</CardTitle>
          <Button variant="outline" onClick={() => router.push("/tasks")}>
            <ArrowLeft />
            <span>Retour</span>
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-lg">Titre</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titre de la tâche"
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
              Ajouter
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default createPage;
