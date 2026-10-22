import { dataBase } from "@/src/lib/db";
import type { Metadata } from "next";
import Link from "next/link";

// Required for Next.js 16 to handle dynamic URL params navigation safely
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    processId: string;
    templateid?: string;
    templateId?: string;
  }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const processId = decodeURIComponent(resolvedParams.processId);
  const templateId = decodeURIComponent(
    resolvedParams.templateid || resolvedParams.templateId || "",
  );

  const db = await dataBase();
  const process = db?.Allprocesses?.[processId];
  const template = process?.[templateId];

  return {
    title: template
      ? `${template.templatename || templateId} Details`
      : "Template not found",
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{
    processId: string;
    templateid?: string;
    templateId?: string;
  }>;
}) {
  const resolvedParams = await params;

  // Safely grab and decode parameters regardless of casing (templateid vs templateId)
  const processId = decodeURIComponent(resolvedParams.processId || "");
  const templateId = decodeURIComponent(
    resolvedParams.templateid || resolvedParams.templateId || "",
  );

  const db = await dataBase();
  const process = db?.Allprocesses?.[processId];
  const template = process?.[templateId];

  if (!process || !template) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-8 text-center min-h-[60vh]">
        <div className="text-5xl">🔍</div>
        <h1 className="text-xl font-bold text-slate-800">
          Template record not found for &quot;{templateId}&quot; in process
          &quot;{processId}&quot;
        </h1>
        <Link
          href={`/processes/${encodeURIComponent(processId)}`}
          className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-400"
        >
          ← Back to Process
        </Link>
      </div>
    );
  }

  // Extract all steps inside this specific template
  const steps = Object.entries(template).filter(([k]) => k.startsWith("step"));

  return (
    // <div className="p-8 max-w-4xl mx-auto space-y-6">
    <div className="bg-white overflow-x-auto flex flex-col w-full min-h-full rounded-2xl p-6 pt-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/home" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/processes/${encodeURIComponent(processId)}`}
          className="hover:underline"
        >
          {process.processname || processId}
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold uppercase">
          {template.templatename}
        </span>
      </div>

      {/* Template Header */}
      <div className="border-b border-gray-200 pb-4 mt-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {template.templatename || "Untitled Template"}
          </h1>
          <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
            Parent Process: {process.processname || processId}
          </p>
        </div>

        {/* Navigation Link to Edit Page */}
        <Link
          href={`/processes/newprocess/newtemplate?processId=${encodeURIComponent(processId)}&templateId=${encodeURIComponent(templateId)}`}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm shadow-sm transition-colors"
        >
          ✏️ Edit Template Steps
        </Link>
      </div>

      {/* table Section */}
      <div className="overflow-x-auto p-6">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Process
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Assignees
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Due
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Comments
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {steps.map(([sKey, sVal]: [string, any]) => (
              <tr key={sKey} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {sVal.stepname}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sVal.processref}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center p-1 -space-x-2 overflow-hidden">
                    {Object.values(sVal.assignees).map(
                      (assignee: any, index: number) => {
                        const initial = assignee.name
                          ? assignee.name.charAt(0).toUpperCase()
                          : "?";
                        const tooltipText = `${assignee.name} (${assignee.role})`;

                        return (
                          <div
                            key={index}
                            title={tooltipText}
                            className="relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-white text-xs font-semibold ring-2 ring-white cursor-pointer hover:z-10 transition-transform hover:scale-110"
                          >
                            {initial}
                          </div>
                        );
                      },
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sVal.lastupdated}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block text-[10px] px-2.5 py-1 rounded-full font-semibold ${
                      sVal.status === "In Progress"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {sVal.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sVal.duedate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {sVal.comment && (
                    <div className="text-xs text-slate-600 border border-blue-100 p-3 rounded-lg">
                      <span className="font-semibold text-blue-900">
                        Comment:
                      </span>{" "}
                      &quot;{sVal.comment}&quot;
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Back Button */}
      <div className="pt-4">
        <Link
          href={`/processes/${encodeURIComponent(processId)}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          ← Back to Process Overview
        </Link>
      </div>
    </div>
  );
}
