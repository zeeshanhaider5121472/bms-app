// src/lib/db.ts — the ONLY place that knows where the JSON file lives
import { readFileSync, writeFileSync } from "fs";
import { unstable_noStore as noStore } from "next/cache";
import { join } from "path";
import { Database, ProcessItem, UserItem } from "./types";

const filePath = join(process.cwd(), "data", "db.json");

export function dataBase(): Database {
  noStore(); //only for development, to avoid caching the results.json file
  return JSON.parse(readFileSync(filePath, "utf-8"));
}

export function addProcess(
  processName: string,
  processId: string,
  members: UserItem[],
): void {
  //Format the selected users into your "processmembers" structure:
  // e.g., { member1: { name: "...", role: "..." }, member2: { ... } }
  const processmembers: Record<string, { name: string; role: string }> = {};
  members.forEach((user, index) => {
    processmembers[`member${index + 1}`] = {
      name: user.username,
      role: user.role,
    };
  });

  // 1. Read existing db
  const db: Database = JSON.parse(readFileSync(filePath, "utf-8"));

  // 2. Create the new process item object
  const newProcess: ProcessItem = {
    processid: processId,
    processname: processName,
    processmembers: processmembers,
  };

  // 3. Add it directly to Allprocesses
  db.Allprocesses[processName] = newProcess;

  // 4. Save the updated file back
  writeFileSync(filePath, JSON.stringify(db, null, 2), "utf-8");
}
