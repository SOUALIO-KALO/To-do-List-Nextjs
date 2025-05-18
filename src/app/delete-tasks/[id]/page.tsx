"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteTodo, getTodos } from "@/gateways/todos";
import { ITodo } from "@/interfaces/todos";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DeleteTasksPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const todo = todos.find((t) => t.id === id);

  return (
    <main className="max-w-xl mx-auto mt-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Confirmation de suppression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg text-center leading-16">
            <p>Voulez-vous vraiment supprimer la tâche : </p>
            <p className="break-words max-w-xl text-xl font-semibold text-black">
              {todo?.title}
            </p>
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={() => {
              toast("❌ Suppression rejetée");
              router.push("/tasks");
            }}
            className="bg-red-500 hover:bg-red-700"
          >
            Annuler
          </Button>
          <Button
            onClick={() => {
              deleteTodo(id as string);
              toast("🗑️ Tâche supprimée avec succès");
              router.push("/tasks");
            }}
            className="bg-green-500 hover:bg-green-700"
          >
            Confirmer
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};
export default DeleteTasksPage;
