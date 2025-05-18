"use client";

import TaskList from "@/components/taskList";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const TaskPage = () => {
  const router = useRouter();
  return (
    <main className="max-w-xl mx-auto mt-10 mb-10">
      <div className="mb-6 flex justify-between border-b pb-2">
        <h1 className="text-3xl font-bold">Tasks List</h1>
        <Button onClick={() => router.push("/")} variant="outline">
          <ArrowLeft /> <span>Accueil</span>
        </Button>
      </div>
      <TaskList />
    </main>
  );
};

export default TaskPage;
