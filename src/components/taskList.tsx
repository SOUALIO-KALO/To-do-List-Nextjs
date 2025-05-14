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
import { deleteTodo, getTodos } from "@/gateways/todos";
import { useRouter } from "next/navigation";
import { Plus, Delete, Edit } from "lucide-react";

const TaskList = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const router = useRouter();

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  return (
    <Table className="">
      <TableCaption>
        <Button
          onClick={() => router.push("/create-tasks")}
          className="bg-green-500 hover:bg-green-700 w-full"
        >
          <Plus />
          <span>Ajouter une tâche</span>
        </Button>
      </TableCaption>
      <TableHeader>
        <TableRow className="text-center">
          <TableHead>TITLE</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead className="text-center ">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="break-words max-w-[250px] whitespace-normal">
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
            <TableCell className="flex gap-2 justify-center">
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
  );
};
export default TaskList;
