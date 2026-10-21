import { dataBase } from "@/src/lib/db";
import type { Metadata } from "next";
import Link from "next/link";

// 👇 Required for Next.js 16 to allow dynamic URL params navigation safely
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ processId: string }>;
}): Promise<Metadata> {
  const { processId } = await params;
  const decodedProcessId = decodeURIComponent(processId);

  const db = await dataBase();
  const process = db?.Allprocesses?.[decodedProcessId];

  return {
    title: process
      ? `${process.processname || decodedProcessId} record`
      : "Process not found",
  };
}

export default async function ProcessPage({
  params,
}: {
  params: Promise<{ processId: string }>;
}) {
  const { processId } = await params;
  const decodedProcessId = decodeURIComponent(processId);

  const db = await dataBase();
  const process = db?.Allprocesses?.[decodedProcessId];

  if (!process) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center min-h-[60vh]">
        <div className="text-5xl">🔍</div>
        <h1 className="text-xl font-bold text-slate-800">
          Process record not found for &quot;{decodedProcessId}&quot;
        </h1>
        <Link
          href="/home"
          className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-400"
        >
          ← Back home
        </Link>
      </div>
    );
  }

  // Extract all templates inside this process dynamically
  const templates = Object.entries(process).filter(([k]) =>
    k.startsWith("template"),
  );

  return (
    <div className="bg-white overflow-x-auto flex flex-col w-full min-h-full rounded-2xl p-6 pt-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/home" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold">
          {process.processname || decodedProcessId}
        </span>
      </div>

      {/* Process Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">
          {process.processname || decodedProcessId}
        </h1>
        <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
          Process ID: {decodedProcessId}
        </p>
      </div>

      {/* Templates Section */}
      <div className="pl-4 pt-11 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Templates Overview
        </h2>

        {templates.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {templates.map(([tKey, tVal]: [string, any]) => {
              const templateRoute = `/processes/${decodedProcessId}/${tKey}`;
              const stepsCount = Object.keys(tVal).filter((k) =>
                k.startsWith("step"),
              ).length;

              return (
                <div
                  key={tKey}
                  className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center justify-between transition-all hover:shadow-md"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">
                      {tKey}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {tVal.templatename || "Untitled Template"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Contains {stepsCount} recorded step
                      {stepsCount === 1 ? "" : "s"}
                    </p>
                  </div>

                  <Link
                    href={templateRoute}
                    className="rounded-lg bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    View Template →
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic">
            No templates available for this process.
          </p>
        )}
      </div>
    </div>
  );
}
