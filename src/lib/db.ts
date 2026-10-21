// src/lib/db.ts — the ONLY place that knows where the JSON file lives
import { readFileSync } from "fs";
import { unstable_noStore as noStore } from "next/cache";
import { join } from "path";
import { Database } from "./types";

export function dataBase(): Database {
  noStore(); //only for development, to avoid caching the results.json file
  return JSON.parse(
    readFileSync(join(process.cwd(), "data", "db.json"), "utf-8"),
  );
}
