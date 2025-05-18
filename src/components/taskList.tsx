"use client";

import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState, useEffect } from "react";
import { ITodo } from "@/interfaces/todos";
import { getTodos } from "@/gateways/todos";
import { useRouter } from "next/navigation";
import { Plus, Delete, Edit } from "lucide-react";

const TaskList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState("All");
  const router = useRouter();

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const filteredTodos: ITodo[] = todos.filter((todo) => {
    if (filter === "En cours") return todo.status === "En cours";
    if (filter === "Terminée") return todo.status === "Terminée";
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6 border-b-2 pb-2">
        <div className="flex">
          <span className="text-xl font-semibold">Filtre : </span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setFilter("All")}
            className="bg-indigo-500 hover:bg-indigo-700"
          >
            Toutes
          </Button>
          <Button
            onClick={() => setFilter("En cours")}
            className="bg-indigo-500 hover:bg-indigo-700"
          >
            En cours
          </Button>
          <Button
            onClick={() => setFilter("Terminée")}
            className="bg-indigo-500 hover:bg-indigo-700"
          >
            Terminée(s)
          </Button>
        </div>
      </div>

      <Table className="border-2">
        <TableCaption>
          <Button
            onClick={() => router.push("/create-tasks")}
            className="bg-green-500 hover:bg-green-700 w-full h-10 text-base"
          >
            <Plus />
            <span>Ajouter une tâche</span>
          </Button>
        </TableCaption>
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead className="font-bold ">TITLE</TableHead>
            <TableHead className="font-bold">STATUS</TableHead>
            <TableHead className="text-center font-bold">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTodos.map((todo) => (
            <TableRow key={todo.id}>
              <TableCell className="break-words min-w-[250px]  max-w-[250px] whitespace-normal">
                <Label
                  className={`${
                    todo.status === "Terminée"
                      ? "line-through text-neutral-400"
                      : ""
                  }`}
                >
                  {todo.title}
                </Label>
              </TableCell>
              <TableCell>{todo.status}</TableCell>
              <TableCell className="flex gap-2 justify-end items-center">
                <Button
                  onClick={() => router.push(`/update-tasks/${todo.id}`)}
                  className="bg-blue-500 hover:bg-blue-700"
                >
                  <Edit /> Edit
                </Button>
                <Button
                  onClick={() => router.push(`/delete-tasks/${todo.id}`)}
                  className="bg-red-500 hover:bg-red-700"
                >
                  <Delete /> Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default TaskList;
