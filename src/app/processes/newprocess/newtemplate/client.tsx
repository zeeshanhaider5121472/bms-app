"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type ItemType =
  | "single-line"
  | "multi-line"
  | "radio"
  | "checkbox"
  | "due-date"
  | "canvas"
  | "link"
  | "attach-file"
  | "notes"
  | "approval";

interface StepItem {
  itemid: string;
  type: ItemType;
  label: string;
  placeholder?: string;
  options?: string[];
  userValue?: any;
}

interface Step {
  stepid: string;
  stepname: string;
  required: boolean;
  assignees: { name: string; role: string }[];
  duedate: string;
  status: string;
  comment: string;
  items: StepItem[];
}

interface SidebarItemDef {
  type: ItemType;
  label: string;
  category: "Input Field Items" | "Multiple Select Items" | "Properties";
  icon: React.ReactNode;
}

const SIDEBAR_ITEMS: SidebarItemDef[] = [
  {
    type: "single-line",
    label: "Single Line",
    category: "Input Field Items",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.5" />
        <line
          x1="7"
          y1="12"
          x2="14"
          y2="12"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    type: "multi-line",
    label: "Multi Line",
    category: "Input Field Items",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.5" />
        <line
          x1="7"
          y1="9"
          x2="17"
          y2="9"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="7"
          y1="13"
          x2="14"
          y2="13"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    type: "radio",
    label: "Radio Button",
    category: "Multiple Select Items",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <circle cx="7" cy="8" r="2" strokeWidth="1.5" />
        <line
          x1="11"
          y1="8"
          x2="18"
          y2="8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="7" cy="16" r="2" strokeWidth="1.5" />
        <line
          x1="11"
          y1="16"
          x2="18"
          y2="16"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    type: "checkbox",
    label: "Check Box",
    category: "Multiple Select Items",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect x="5" y="6" width="4" height="4" rx="1" strokeWidth="1.5" />
        <line
          x1="11"
          y1="8"
          x2="18"
          y2="8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect x="5" y="14" width="4" height="4" rx="1" strokeWidth="1.5" />
        <line
          x1="11"
          y1="16"
          x2="18"
          y2="16"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    type: "due-date",
    label: "Due Date",
    category: "Properties",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="1.5" />
        <line
          x1="16"
          y1="2"
          x2="16"
          y2="6"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="2"
          x2="8"
          y2="6"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line x1="3" y1="10" x2="21" y2="10" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    type: "canvas",
    label: "Canvas",
    category: "Properties",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
        <path d="M3 9h18M9 21V9" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    type: "link",
    label: "Link",
    category: "Properties",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    type: "attach-file",
    label: "Attach File",
    category: "Properties",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    type: "notes",
    label: "Notes",
    category: "Properties",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    type: "approval",
    label: "Approval",
    category: "Properties",
    icon: (
      <svg
        className="w-5 h-5 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const AVAILABLE_MEMBERS = [
  { name: "Zeeshan Haider", role: "Editor" },
  { name: "Johar abbas", role: "Developer" },
];
const STATUS_LIST = ["Not Started", "In Progress", "In Review", "Completed"];

export default function VideoProcessBuilderClient({
  initialData,
  isEditing,
  initialProcessName,
}: {
  initialData?: any;
  isEditing: boolean;
  initialProcessName: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId =
    searchParams.get("templateId") || searchParams.get("templateid");

  // Prepopulate states if editing an existing template, otherwise default to fresh inputs
  const [processName, setProcessName] = useState(
    initialData?.processName || initialProcessName || "DrBeen Video Process1",
  );
  const [templateName, setTemplateName] = useState(
    isEditing ? initialData?.templateName || "" : "",
  );
  const [steps, setSteps] = useState<Step[]>(
    isEditing ? initialData?.steps || [] : [],
  );
  const [draggedType, setDraggedType] = useState<ItemType | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<{
    stepId: string;
    type: "owner" | "status" | "date";
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize state when navigating between different templates
  useEffect(() => {
    if (isEditing && initialData) {
      setProcessName(initialData.processName || "DrBeen Video Process1");
      setTemplateName(initialData.templateName || "");
      setSteps(initialData.steps || []);
    } else {
      console.log("process: ", initialProcessName);
      // If we are creating a new template, keep the processId from URL if available
      setProcessName(initialProcessName || "DrBeen Video Process1");
      setTemplateName("");
      setSteps([]);
    }
    setIsSubmitting(false);
  }, [initialData, isEditing, initialProcessName]);

  const handleDragStart = (e: React.DragEvent, type: ItemType) => {
    setDraggedType(type);
    e.dataTransfer.setData("text/plain", type);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropToNewStep = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedType) return;

    const newItem = createDefaultItem(draggedType);
    const newStep: Step = {
      stepid: `step_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      stepname: `Choose a ${getDefaultLabel(draggedType)}`,
      required: true,
      assignees: [{ name: "Zeeshan Haider", role: "Editor" }],
      duedate: new Date().toISOString().split("T")[0],
      status: "In Progress",
      comment: "",
      items: [newItem],
    };

    setSteps([...steps, newStep]);
    setDraggedType(null);
  };

  const handleDropToExistingStep = (e: React.DragEvent, stepId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedType) return;

    const newItem = createDefaultItem(draggedType);
    setSteps(
      steps.map((step) =>
        step.stepid === stepId
          ? { ...step, items: [...step.items, newItem] }
          : step,
      ),
    );
    setDraggedType(null);
  };

  function getDefaultLabel(type: ItemType): string {
    switch (type) {
      case "single-line":
        return "Topic Name";
      case "multi-line":
        return "Script Details";
      case "radio":
        return "Categories";
      case "checkbox":
        return "Check Items";
      case "due-date":
        return "Due Date";
      case "canvas":
        return "Drawing Canvas";
      case "link":
        return "Reference Link";
      case "attach-file":
        return "Script File";
      case "notes":
        return "Important Notes";
      case "approval":
        return "Manager Approval";
    }
  }

  function createDefaultItem(type: ItemType): StepItem {
    return {
      itemid: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type,
      label: getDefaultLabel(type),
      placeholder: "Text will be typed here...",
      options:
        type === "radio" || type === "checkbox"
          ? ["Education", "Information", "Entertainment"]
          : undefined,
      userValue: type === "checkbox" ? [] : "",
    };
  }

  const removeStep = (stepId: string) => {
    setSteps(steps.filter((s) => s.stepid !== stepId));
  };

  const removeItem = (stepId: string, itemId: string) => {
    setSteps(
      steps.map((step) => {
        if (step.stepid === stepId) {
          return {
            ...step,
            items: step.items.filter((item) => item.itemid !== itemId),
          };
        }
        return step;
      }),
    );
  };

  const updateItemValue = (stepId: string, itemId: string, userValue: any) => {
    setSteps(
      steps.map((step) => {
        if (step.stepid === stepId) {
          return {
            ...step,
            items: step.items.map((item) =>
              item.itemid === itemId ? { ...item, userValue } : item,
            ),
          };
        }
        return step;
      }),
    );
  };

  const addOption = (stepId: string, itemId: string) => {
    setSteps(
      steps.map((step) => {
        if (step.stepid === stepId) {
          return {
            ...step,
            items: step.items.map((item) => {
              if (item.itemid === itemId && item.options) {
                return {
                  ...item,
                  options: [
                    ...item.options,
                    `Option ${item.options.length + 1}`,
                  ],
                };
              }
              return item;
            }),
          };
        }
        return step;
      }),
    );
  };

  const updateOption = (
    stepId: string,
    itemId: string,
    optionIndex: number,
    value: string,
  ) => {
    setSteps(
      steps.map((step) => {
        if (step.stepid === stepId) {
          return {
            ...step,
            items: step.items.map((item) => {
              if (item.itemid === itemId && item.options) {
                const newOptions = [...item.options];
                newOptions[optionIndex] = value;
                return { ...item, options: newOptions };
              }
              return item;
            }),
          };
        }
        return step;
      }),
    );
  };

  const removeOption = (
    stepId: string,
    itemId: string,
    optionIndex: number,
  ) => {
    setSteps(
      steps.map((step) => {
        if (step.stepid === stepId) {
          return {
            ...step,
            items: step.items.map((item) => {
              if (item.itemid === itemId && item.options) {
                return {
                  ...item,
                  options: item.options.filter((_, idx) => idx !== optionIndex),
                };
              }
              return item;
            }),
          };
        }
        return step;
      }),
    );
  };

  const handlePublish = async () => {
    if (!processName.trim() || !templateName.trim()) {
      alert("Please provide a Process Name and Template Name.");
      return;
    }

    const currentTimestamp = new Date().toISOString().split("T")[0];

    const searchParams =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : null;
    const templateId = searchParams ? searchParams.get("templateId") : null;

    const payload = {
      processName,
      templateName,
      templateId, // <-- This passes the existing template ID to the API if we are editing
      steps: steps.map((step) => ({
        stepid: step.stepid,
        stepname: step.stepname,
        required: step.required,
        assignees: step.assignees.reduce(
          (acc, assignee, aIdx) => {
            acc[`assignee${aIdx + 1}`] = {
              name: assignee.name,
              role: assignee.role,
            };
            return acc;
          },
          {} as Record<string, { name: string; role: string }>,
        ),
        lastupdated: currentTimestamp,
        duedate: step.duedate,
        status: step.status,
        comment: step.comment,
        items: step.items.reduce(
          (acc, item, iIdx) => {
            acc[`item${iIdx + 1}`] = item;
            return acc;
          },
          {} as Record<string, StepItem>,
        ),
      })),
    };

    console.log("--- PUBLISHED TEMPLATE PAYLOAD FOR DB ---");
    console.log(JSON.stringify(payload, null, 2));
    console.log("------------------------------------------");

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        router.push("/home");
        router.refresh();
      } else {
        alert("Failed to save template to db.json");
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error saving template");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between sticky top-0 z-30 gap-4 shadow-xs">
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Process Name
            </label>
            <span className="text-base font-bold text-slate-900 bg-transparent px-1 py-0.5 inline-block">
              {processName}
            </span>
            {/* <input
              required
              type="text"
              value={processName}
              onChange={(e) => setProcessName(e.target.value)}
              className="text-base font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-hidden px-1 py-0.5"
            /> */}
          </div>
          <div className="h-6 w-px bg-slate-200" />
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Template Name
            </label>
            <input
              type="text"
              value={templateName}
              placeholder="Enter Template Name..."
              onChange={(e) => setTemplateName(e.target.value)}
              className="text-base font-bold text-blue-600 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-hidden px-1 py-0.5"
            />
          </div>
        </div>

        <button
          onClick={handlePublish}
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg text-sm shadow-sm transition-colors cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Publish & Save to DB"}
        </button>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        <main className="flex-1 p-6 lg:p-8 max-w-5xl mx-auto w-full">
          {steps.length === 0 ? (
            <div className="border-2 border-dashed border-blue-300 rounded-2xl p-16 text-center bg-white/60 mb-8 flex flex-col items-center justify-center shadow-xs">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 4v16m8-8H4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                Build Template Steps
              </h3>
              <p className="text-slate-500 text-sm max-w-md">
                Drag items from the right sidebar and drop them below to create
                new steps for template{" "}
                <strong>{templateName || "New Template"}</strong>.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.stepid}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropToExistingStep(e, step.stepid)}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 relative transition-all hover:shadow-md"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={step.stepname}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSteps(
                            steps.map((s) =>
                              s.stepid === step.stepid
                                ? { ...s, stepname: val }
                                : s,
                            ),
                          );
                        }}
                        className="font-semibold text-slate-900 text-base bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-hidden px-1 py-0.5 w-full sm:w-96"
                      />
                    </div>
                    <div className="flex items-center space-x-3 self-end sm:self-auto">
                      <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        <input
                          type="checkbox"
                          checked={step.required}
                          onChange={(e) =>
                            setSteps(
                              steps.map((s) =>
                                s.stepid === step.stepid
                                  ? { ...s, required: e.target.checked }
                                  : s,
                              ),
                            )
                          }
                          className="rounded text-blue-600 w-3.5 h-3.5"
                        />
                        <span>Required</span>
                      </label>
                      <button
                        onClick={() => removeStep(step.stepid)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1"
                        title="Delete Step"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M6 18L18 6M6 6l12 12"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 mb-5 px-1 relative">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown?.stepId === step.stepid &&
                              activeDropdown?.type === "owner"
                              ? null
                              : { stepId: step.stepid, type: "owner" },
                          )
                        }
                        className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md"
                      >
                        <span>
                          Assignees:{" "}
                          {step.assignees.map((a) => a.name).join(", ") ||
                            "None"}
                        </span>
                      </button>
                      {activeDropdown?.stepId === step.stepid &&
                        activeDropdown?.type === "owner" && (
                          <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-slate-200 rounded-lg shadow-lg z-20 p-2 space-y-1">
                            {AVAILABLE_MEMBERS.map((user) => {
                              const isSelected = step.assignees.some(
                                (a) => a.name === user.name,
                              );
                              return (
                                <label
                                  key={user.name}
                                  className="flex items-center space-x-2 text-xs hover:bg-blue-50 p-1.5 rounded cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => {
                                      const updated = e.target.checked
                                        ? [...step.assignees, user]
                                        : step.assignees.filter(
                                            (a) => a.name !== user.name,
                                          );
                                      setSteps(
                                        steps.map((s) =>
                                          s.stepid === step.stepid
                                            ? { ...s, assignees: updated }
                                            : s,
                                        ),
                                      );
                                    }}
                                    className="rounded text-blue-600 w-3.5 h-3.5"
                                  />
                                  <span className="font-medium text-slate-700">
                                    {user.name}
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                    </div>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown?.stepId === step.stepid &&
                              activeDropdown?.type === "date"
                              ? null
                              : { stepId: step.stepid, type: "date" },
                          )
                        }
                        className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md"
                      >
                        <span>Due: {step.duedate}</span>
                      </button>
                      {activeDropdown?.stepId === step.stepid &&
                        activeDropdown?.type === "date" && (
                          <div className="absolute top-full left-0 mt-1 p-3 bg-white border border-slate-200 rounded-lg shadow-lg z-20">
                            <input
                              type="date"
                              value={step.duedate}
                              onChange={(e) => {
                                setSteps(
                                  steps.map((s) =>
                                    s.stepid === step.stepid
                                      ? { ...s, duedate: e.target.value }
                                      : s,
                                  ),
                                );
                                setActiveDropdown(null);
                              }}
                              className="text-xs border border-slate-200 rounded px-2 py-1"
                            />
                          </div>
                        )}
                    </div>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown?.stepId === step.stepid &&
                              activeDropdown?.type === "status"
                              ? null
                              : { stepId: step.stepid, type: "status" },
                          )
                        }
                        className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md"
                      >
                        <span>Status: {step.status}</span>
                      </button>
                      {activeDropdown?.stepId === step.stepid &&
                        activeDropdown?.type === "status" && (
                          <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1">
                            {STATUS_LIST.map((status) => (
                              <button
                                key={status}
                                onClick={() => {
                                  setSteps(
                                    steps.map((s) =>
                                      s.stepid === step.stepid
                                        ? { ...s, status }
                                        : s,
                                    ),
                                  );
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 font-medium"
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {step.items.map((item) => (
                      <div
                        key={item.itemid}
                        className="bg-slate-50/90 border border-slate-200 rounded-xl p-4 relative group"
                      >
                        <button
                          onClick={() => removeItem(step.stepid, item.itemid)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-red-600 p-1"
                        >
                          ✕
                        </button>

                        <div className="mb-2 pr-8">
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                              const label = e.target.value;
                              setSteps(
                                steps.map((s) =>
                                  s.stepid === step.stepid
                                    ? {
                                        ...s,
                                        items: s.items.map((i) =>
                                          i.itemid === item.itemid
                                            ? { ...i, label }
                                            : i,
                                        ),
                                      }
                                    : s,
                                ),
                              );
                            }}
                            className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-hidden px-1 py-0.5 w-full sm:w-64"
                          />
                        </div>

                        {item.type === "single-line" && (
                          <input
                            type="text"
                            value={item.userValue || ""}
                            onChange={(e) =>
                              updateItemValue(
                                step.stepid,
                                item.itemid,
                                e.target.value,
                              )
                            }
                            placeholder={item.placeholder}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700"
                          />
                        )}

                        {item.type === "multi-line" && (
                          <textarea
                            rows={3}
                            value={item.userValue || ""}
                            onChange={(e) =>
                              updateItemValue(
                                step.stepid,
                                item.itemid,
                                e.target.value,
                              )
                            }
                            placeholder="Text will be typed here..."
                            className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-700"
                          />
                        )}

                        {item.type === "radio" && (
                          <div className="space-y-2">
                            {item.options?.map((opt, optIdx) => (
                              <div
                                key={optIdx}
                                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3.5 py-2"
                              >
                                <div className="flex items-center space-x-3 flex-1 mr-3">
                                  <input
                                    type="radio"
                                    name={`radio-${item.itemid}`}
                                    checked={item.userValue === opt}
                                    onChange={() =>
                                      updateItemValue(
                                        step.stepid,
                                        item.itemid,
                                        opt,
                                      )
                                    }
                                    className="w-4 h-4 text-blue-600"
                                  />
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) =>
                                      updateOption(
                                        step.stepid,
                                        item.itemid,
                                        optIdx,
                                        e.target.value,
                                      )
                                    }
                                    className="text-sm text-slate-700 bg-transparent border-b border-transparent hover:border-slate-300 w-full py-0.5"
                                  />
                                </div>
                                <button
                                  onClick={() =>
                                    removeOption(
                                      step.stepid,
                                      item.itemid,
                                      optIdx,
                                    )
                                  }
                                  className="text-slate-400 hover:text-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() =>
                                addOption(step.stepid, item.itemid)
                              }
                              className="text-xs font-semibold text-blue-600 bg-white border border-dashed border-blue-300 rounded-lg px-3.5 py-2 w-full"
                            >
                              + Add Option
                            </button>
                          </div>
                        )}

                        {item.type === "checkbox" && (
                          <div className="space-y-2">
                            {item.options?.map((opt, optIdx) => {
                              const currentSelected = Array.isArray(
                                item.userValue,
                              )
                                ? item.userValue
                                : [];
                              const isChecked = currentSelected.includes(opt);
                              return (
                                <div
                                  key={optIdx}
                                  className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3.5 py-2"
                                >
                                  <div className="flex items-center space-x-3 flex-1 mr-3">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          updateItemValue(
                                            step.stepid,
                                            item.itemid,
                                            [...currentSelected, opt],
                                          );
                                        } else {
                                          updateItemValue(
                                            step.stepid,
                                            item.itemid,
                                            currentSelected.filter(
                                              (v: string) => v !== opt,
                                            ),
                                          );
                                        }
                                      }}
                                      className="w-4 h-4 rounded text-blue-600"
                                    />
                                    <input
                                      type="text"
                                      value={opt}
                                      onChange={(e) =>
                                        updateOption(
                                          step.stepid,
                                          item.itemid,
                                          optIdx,
                                          e.target.value,
                                        )
                                      }
                                      className="text-sm text-slate-700 bg-transparent border-b border-transparent hover:border-slate-300 w-full py-0.5"
                                    />
                                  </div>
                                  <button
                                    onClick={() =>
                                      removeOption(
                                        step.stepid,
                                        item.itemid,
                                        optIdx,
                                      )
                                    }
                                    className="text-slate-400 hover:text-red-600"
                                  >
                                    ×
                                  </button>
                                </div>
                              );
                            })}
                            <button
                              onClick={() =>
                                addOption(step.stepid, item.itemid)
                              }
                              className="text-xs font-semibold text-blue-600 bg-white border border-dashed border-blue-300 rounded-lg px-3.5 py-2 w-full"
                            >
                              + Add Option
                            </button>
                          </div>
                        )}

                        {item.type === "attach-file" && (
                          <div className="bg-white border border-dashed border-slate-300 rounded-lg p-5 text-center relative">
                            <input
                              type="file"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  updateItemValue(
                                    step.stepid,
                                    item.itemid,
                                    e.target.files[0].name,
                                  );
                                }
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <span className="text-sm font-medium text-slate-700">
                              {item.userValue
                                ? `Uploaded: ${item.userValue}`
                                : "Click or drag file to upload"}
                            </span>
                          </div>
                        )}

                        {item.type === "link" && (
                          <input
                            type="url"
                            value={item.userValue || ""}
                            onChange={(e) =>
                              updateItemValue(
                                step.stepid,
                                item.itemid,
                                e.target.value,
                              )
                            }
                            placeholder="https://example.com"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700"
                          />
                        )}

                        {item.type === "notes" && (
                          <textarea
                            rows={2}
                            value={item.userValue || ""}
                            onChange={(e) =>
                              updateItemValue(
                                step.stepid,
                                item.itemid,
                                e.target.value,
                              )
                            }
                            placeholder="Important notes..."
                            className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-700"
                          />
                        )}

                        {item.type === "due-date" && (
                          <input
                            type="date"
                            value={item.userValue || ""}
                            onChange={(e) =>
                              updateItemValue(
                                step.stepid,
                                item.itemid,
                                e.target.value,
                              )
                            }
                            className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700"
                          />
                        )}

                        {item.type === "canvas" && (
                          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center text-sm text-slate-400 bg-slate-50">
                            Canvas Drawing Field
                          </div>
                        )}

                        {item.type === "approval" && (
                          <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">
                              Manager Sign-off Required
                            </span>
                            <select
                              value={item.userValue || "Pending"}
                              onChange={(e) =>
                                updateItemValue(
                                  step.stepid,
                                  item.itemid,
                                  e.target.value,
                                )
                              }
                              className="text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-1 font-semibold"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            onDragOver={handleDragOver}
            onDrop={handleDropToNewStep}
            className="mt-6 border-2 border-dashed border-blue-300 rounded-2xl p-6 text-center bg-white/50 hover:bg-white/90 transition-all cursor-pointer flex items-center justify-center space-x-3 text-blue-600 shadow-2xs"
          >
            <span className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {steps.length + 1}
            </span>
            <span className="text-sm font-semibold">
              Drop items here to create a new step
            </span>
          </div>
        </main>

        <aside className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-6 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <h2 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
            Drag Items From Here
          </h2>

          {(
            [
              "Input Field Items",
              "Multiple Select Items",
              "Properties",
            ] as const
          ).map((category) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SIDEBAR_ITEMS.filter((item) => item.category === category).map(
                  (item) => (
                    <div
                      key={item.type}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.type)}
                      className="flex flex-col items-center justify-center p-3.5 bg-white border border-slate-200 rounded-xl hover:border-blue-600 hover:shadow-sm cursor-grab active:cursor-grabbing transition-all text-center group"
                    >
                      <div className="mb-2 p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium text-slate-700 leading-tight">
                        {item.label}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
