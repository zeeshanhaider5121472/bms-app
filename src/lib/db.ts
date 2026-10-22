import { readFileSync, writeFileSync } from "fs";
import { unstable_noStore as noStore } from "next/cache";
import { join } from "path";
import { Database } from "./types";

const filePath = join(process.cwd(), "data", "db.json");

export function dataBase(): Database {
  noStore();
  return JSON.parse(readFileSync(filePath, "utf-8"));
}

export function addProcess(
  processName: string,
  templateName: string,
  stepsData: any[],
): void {
  saveTemplateToProcess(processName, templateName, stepsData);
}
export function saveTemplateToProcess(
  processName: string,
  templateName: string,
  stepsData: any[],
  templateIdToUpdate?: string | null,
): void {
  const db: Database = JSON.parse(readFileSync(filePath, "utf-8"));

  if (!db.Allprocesses[processName]) {
    db.Allprocesses[processName] = {
      processid: `p_${Date.now()}`,
      processname: processName,
      processmembers: {
        member1: { name: "Zeeshan Haider", role: "Editor" },
      },
    };
  }

  const processItem = db.Allprocesses[processName];

  // Check if we are updating an existing template key or creating a new one
  let targetTemplateKey = "";
  let finalTemplateId = `t_${Date.now()}`;

  if (templateIdToUpdate) {
    // Check if templateIdToUpdate matches the object key (e.g. "template1") OR the inner templateid property
    const foundEntry = Object.entries(processItem).find(
      ([key, val]: [string, any]) =>
        key.startsWith("template") &&
        (key === templateIdToUpdate ||
          val.templateid === templateIdToUpdate ||
          val.templateId === templateIdToUpdate),
    );
    if (foundEntry) {
      targetTemplateKey = foundEntry[0];
      finalTemplateId = foundEntry[1].templateid || templateIdToUpdate;
    }
  }

  if (!targetTemplateKey) {
    // Create new template key
    const existingTemplateKeys = Object.keys(processItem).filter((k) =>
      k.startsWith("template"),
    );
    targetTemplateKey = `template${existingTemplateKeys.length + 1}`;
  }

  // Format steps
  const formattedSteps: Record<string, any> = {};
  stepsData.forEach((step, idx) => {
    const stepKey = `step${idx + 1}`;
    formattedSteps[stepKey] = {
      stepid: step.stepid,
      stepname: step.stepname,
      processref: `${processName}\\${templateName}`,
      required: step.required,
      assignees: step.assignees,
      lastupdated: step.lastupdated || new Date().toISOString().split("T")[0],
      duedate: step.duedate,
      status: step.status,
      comment: step.comment || "",
      items: step.items,
    };
  });

  // Save template
  processItem[targetTemplateKey] = {
    templateid: finalTemplateId,
    templatename: templateName,
    ...formattedSteps,
  };

  writeFileSync(filePath, JSON.stringify(db, null, 2), "utf-8");
}
