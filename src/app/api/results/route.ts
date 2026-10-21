import { ResultsDB } from "@/src/lib/types";
import { readFileSync, writeFileSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

// The JSON file IS the database (process.cwd() = your project root)
const DB_PATH = join(process.cwd(), "data", "results.json");

function readDb(): ResultsDB {
  return JSON.parse(readFileSync(DB_PATH, "utf-8"));
}

function writeDb(data: ResultsDB) {
  // "null, 2" keeps the file pretty-printed so you can read it
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/results  ->  hand back the whole JSON object
export async function GET() {
  return NextResponse.json(readDb());
}

// POST /api/results  ->  add a new student to the JSON file
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const marks = {
    math: Number(body.math),
    science: Number(body.science),
    english: Number(body.english),
  };

  if (!name || name.length > 40) {
    return NextResponse.json(
      { error: "Please enter a name (max 40 characters)." },
      { status: 400 },
    );
  }
  if (
    Object.values(marks).some((m) => !Number.isInteger(m) || m < 0 || m > 100)
  ) {
    return NextResponse.json(
      { error: "Marks must be whole numbers between 0 and 100." },
      { status: 400 },
    );
  }

  const db = readDb();
  const key = name.toLowerCase(); // "Sara" -> "sara"

  if (db[key]) {
    return NextResponse.json(
      { error: `A result for "${name}" already exists.` },
      { status: 409 },
    );
  }

  db[key] = { name, ...marks }; // adding to the JSON object, e.g. db["sara"]
  writeDb(db);

  return NextResponse.json({ key, student: db[key] }, { status: 201 });
}
