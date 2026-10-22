// app/api/process/route.ts
import { addProcess, dataBase } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { processName, processId, processMembers } = await request.json();

    // Call your server-side function
    addProcess(processName, processId, processMembers || []);

    // Return updated db or success flag
    const updatedDb = dataBase();
    return NextResponse.json({ success: true, db: updatedDb });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add process" },
      { status: 500 },
    );
  }
}
