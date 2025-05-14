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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ListTodo, LucideDelete } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="max-w-md mx-auto mt-20">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Tasks manager</CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-lg">
            Bienvenu(e) sur votre gestionnaire de tâches
          </CardDescription>
        </CardContent>

        <CardFooter className="flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => router.push("/tasks")}
                  className="bg-sky-500 hover:bg-sky-700"
                >
                  <ListTodo />
                  <span>Task list</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voir la lite des tâches</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </main>
  );
}
