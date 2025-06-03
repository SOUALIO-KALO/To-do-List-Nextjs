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
import { ListTodo } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="max-w-xl absolute top-1/2 -translate-y-1/2 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Tasks manager</CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-xl">
            Bienvenu(e) sur votre gestionnaire de tâches
          </CardDescription>
        </CardContent>

        <CardFooter className="flex justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => router.push("/tasks")}
                  className="bg-sky-500 hover:bg-sky-700 text-xl py-6 w-[150px]"
                >
                  <ListTodo className="size-7" />
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
