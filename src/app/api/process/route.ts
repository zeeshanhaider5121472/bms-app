import { dataBase, saveTemplateToProcess } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { processName, templateName, templateId, steps } = body;

    if (!processName || !templateName) {
      return NextResponse.json(
        { success: false, error: "Missing processName or templateName" },
        { status: 400 },
      );
    }

    // Pass templateId so it knows whether to update or create
    saveTemplateToProcess(processName, templateName, steps || [], templateId);

    const updatedDb = dataBase();
    return NextResponse.json({ success: true, db: updatedDb });
  } catch (error) {
    console.error("Failed to save template:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save template to db.json" },
      { status: 500 },
    );
  }
}
