import { dataBase } from "@/src/lib/db";
import { redirect } from "next/navigation";
import VideoProcessBuilderClient from "./client";

export const instant = false; // <--- THIS LINE TO FIX THE PRERENDERING ERROR

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ processId: string; templateId?: string }>;
}) {
  const resolvedParams = await searchParams;
  const processId = resolvedParams.processId
    ? decodeURIComponent(resolvedParams.processId)
    : null;

  // GUARD: If there is no processId, stop here and do not render the component
  // If there is no processId, redirect to /home on the server
  if (!processId) {
    redirect("/home");
  }

  const templateId = resolvedParams.templateId
    ? decodeURIComponent(resolvedParams.templateId)
    : null;

  let initialData = null;
  let processname = "";
  const isEditing = Boolean(processId && templateId);

  if (isEditing) {
    const db = dataBase();
    const process = db?.Allprocesses?.[processId];
    processname = process?.processname || "";
    const template = process?.[templateId as string];

    if (template) {
      initialData = {
        processName: processId,
        templateName: template.templatename || "",
        steps: Object.entries(template)
          .filter(([k]) => k.startsWith("step"))
          .map(([_, sVal]: [string, any]) => ({
            stepid: sVal.stepid || `step_${Date.now()}`,
            stepname: sVal.stepname || "",
            required: sVal.required ?? true,
            assignees: sVal.assignees
              ? Object.values(sVal.assignees)
              : [{ name: "Zeeshan Haider", role: "Editor" }],
            duedate: sVal.duedate || new Date().toISOString().split("T")[0],
            status: sVal.status || "In Progress",
            comment: sVal.comment || "",
            items: sVal.items ? Object.values(sVal.items) : [],
          })),
      };
    }
  }

  return (
    <VideoProcessBuilderClient
      initialData={initialData}
      isEditing={isEditing}
      initialProcessName={processId}
    />
  );
}
