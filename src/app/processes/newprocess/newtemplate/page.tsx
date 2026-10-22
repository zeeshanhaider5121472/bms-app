"use client";

import React, { useState } from "react";

// Define types for steps and items
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
  id: string;
  type: ItemType;
  label: string;
  placeholder?: string;
  options?: string[];
  value?: string | string[];
  fileName?: string;
}

interface Step {
  id: string;
  title: string;
  required: boolean;
  owner: string;
  dueDate: string;
  status: string;
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

const OWNERS_LIST = ["Dr. Bean", "John Doe", "Sarah Smith", "Unassigned"];
const STATUS_LIST = ["Not Started", "In Progress", "In Review", "Completed"];

export default function VideoProcessBuilder() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [draggedType, setDraggedType] = useState<ItemType | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<{
    stepId: string;
    type: "owner" | "status" | "date";
  } | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [workflowTitle, setWorkflowTitle] = useState("DrBeen Video Process");
  const [templateName, setTemplateName] = useState("");

  // Structured DB-ready Schema builder
  const getStructuredPayload = () => {
    return {
      workflowMetadata: {
        title: workflowTitle,
        templatetitle: templateName,
        createdAt: new Date().toISOString(),
        totalSteps: steps.length,
      },
      steps: steps.map((step, stepIndex) => ({
        stepIndex: stepIndex + 1,
        stepId: step.id,
        title: step.title,
        isRequired: step.required,
        owner: step.owner,
        dueDate: step.dueDate,
        status: step.status,
        items: step.items.map((item, itemIndex) => ({
          itemIndex: itemIndex + 1,
          itemId: item.id,
          type: item.type,
          label: item.label,
          placeholder: item.placeholder || null,
          options: item.options || null,
          userValue: item.value || null,
        })),
      })),
    };
  };

  // Trigger console log and publish action
  const handleSaveAndLog = () => {
    const payload = getStructuredPayload();
    console.log("--- DB READY WORKFLOW PAYLOAD JSON ---");
    console.log(JSON.stringify(payload, null, 2));
    console.log("----------------------------------------");
    setIsPublishModalOpen(true);
  };

  // Drag and Drop Handlers
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
      id: Math.random().toString(36).substring(2, 9),
      title: `Choose a ${getDefaultLabel(draggedType)} for the video`,
      required: true,
      owner: "Dr. Bean",
      dueDate: "Select date",
      status: "Not Started",
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
        step.id === stepId
          ? { ...step, items: [...step.items, newItem] }
          : step,
      ),
    );
    setDraggedType(null);
  };

  // Helper creators
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
      id: Math.random().toString(36).substring(2, 9),
      type,
      label: getDefaultLabel(type),
      placeholder: "Text will be typed here...",
      options:
        type === "radio" || type === "checkbox"
          ? ["Education", "Information", "Entertainment"]
          : undefined,
      value: type === "checkbox" ? [] : "",
    };
  }

  // Step and item modifiers
  const removeStep = (stepId: string) => {
    setSteps(steps.filter((s) => s.id !== stepId));
  };

  const duplicateStep = (stepId: string) => {
    const stepToCopy = steps.find((s) => s.id === stepId);
    if (!stepToCopy) return;
    const duplicated: Step = {
      ...stepToCopy,
      id: Math.random().toString(36).substring(2, 9),
      title: `${stepToCopy.title} (Copy)`,
      items: stepToCopy.items.map((item) => ({
        ...item,
        id: Math.random().toString(36).substring(2, 9),
      })),
    };
    const index = steps.findIndex((s) => s.id === stepId);
    const newSteps = [...steps];
    newSteps.splice(index + 1, 0, duplicated);
    setSteps(newSteps);
  };

  const removeItem = (stepId: string, itemId: string) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            items: step.items.filter((item) => item.id !== itemId),
          };
        }
        return step;
      }),
    );
  };

  const updateItemLabel = (stepId: string, itemId: string, label: string) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            items: step.items.map((item) =>
              item.id === itemId ? { ...item, label } : item,
            ),
          };
        }
        return step;
      }),
    );
  };

  const updateItemValue = (
    stepId: string,
    itemId: string,
    value: string | string[],
  ) => {
    setSteps(
      steps.map((step) => {
        if (step.id === stepId) {
          return {
            ...step,
            items: step.items.map((item) =>
              item.id === itemId ? { ...item, value } : item,
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
        if (step.id === stepId) {
          return {
            ...step,
            items: step.items.map((item) => {
              if (item.id === itemId && item.options) {
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
        if (step.id === stepId) {
          return {
            ...step,
            items: step.items.map((item) => {
              if (item.id === itemId && item.options) {
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
        if (step.id === stepId) {
          return {
            ...step,
            items: step.items.map((item) => {
              if (item.id === itemId && item.options) {
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex flex-col font-sans gap-2 text-slate-800">
          <input
            type="text"
            value={workflowTitle}
            onChange={(e) => setWorkflowTitle(e.target.value)}
            disabled
            className="text-lg font-bold text-slate-900 tracking-tight bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-hidden px-1 py-0.5 transition-colors"
          />
          <input
            type="text"
            placeholder="Write a template name..."
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="ml-4 text-lg text-slate-900 tracking-tight bg-transparent border-b hover:border-slate-300 focus:border-blue-600 focus:outline-hidden px-1 py-0.5 transition-colors"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveAndLog}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg text-sm shadow-sm transition-colors cursor-pointer"
          >
            Publish & Log JSON
          </button>
        </div>
      </header>

      {/* Main Body Layout */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Content Canvas */}
        <main className="flex-1 p-6 lg:p-8 max-w-5xl mx-auto w-full">
          {steps.length === 0 ? (
            <div className="border-2 border-transparent rounded-2xl p-16 text-center bg-white/60 mb-8 flex flex-col items-center justify-center shadow-xs">
              {/* <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
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
              </div> */}
              <h3 className="text-lg font-bold text-slate-800 mb-1">
                Start Building Your Workflow
              </h3>
              <p className="text-slate-500 text-sm max-w-md">
                Drag any item from the right sidebar and drop it into the drop
                zone below to create your first step.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropToExistingStep(e, step.id)}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 relative transition-all hover:shadow-md"
                >
                  {/* Step Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold shrink-0 shadow-xs">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={step.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSteps(
                            steps.map((s) =>
                              s.id === step.id ? { ...s, title: val } : s,
                            ),
                          );
                        }}
                        className="font-semibold text-slate-900 text-base bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-hidden px-1 py-0.5 transition-colors w-full sm:w-80"
                      />
                    </div>
                    <div className="flex items-center space-x-3 self-end sm:self-auto">
                      <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md hover:bg-slate-200 transition-colors">
                        <input
                          type="checkbox"
                          checked={step.required}
                          onChange={(e) =>
                            setSteps(
                              steps.map((s) =>
                                s.id === step.id
                                  ? { ...s, required: e.target.checked }
                                  : s,
                              ),
                            )
                          }
                          className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                        />
                        <span>Required</span>
                      </label>
                      <button
                        onClick={() => duplicateStep(step.id)}
                        className="text-slate-400 hover:text-blue-600 transition-colors p-1"
                        title="Duplicate Step"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="9"
                            y="9"
                            width="13"
                            height="13"
                            rx="2"
                            strokeWidth="2"
                          />
                          <path
                            d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
                            strokeWidth="2"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeStep(step.id)}
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

                  {/* Step Meta Toolbar */}
                  <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 mb-5 px-1 relative">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown?.stepId === step.id &&
                              activeDropdown?.type === "owner"
                              ? null
                              : { stepId: step.id, type: "owner" },
                          )
                        }
                        className="flex items-center space-x-1.5 hover:text-blue-600 transition-colors bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md"
                      >
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span className="font-medium text-slate-700">
                          Owner: {step.owner}
                        </span>
                      </button>
                      {activeDropdown?.stepId === step.id &&
                        activeDropdown?.type === "owner" && (
                          <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1">
                            {OWNERS_LIST.map((owner) => (
                              <button
                                key={owner}
                                onClick={() => {
                                  setSteps(
                                    steps.map((s) =>
                                      s.id === step.id ? { ...s, owner } : s,
                                    ),
                                  );
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 font-medium"
                              >
                                {owner}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown?.stepId === step.id &&
                              activeDropdown?.type === "date"
                              ? null
                              : { stepId: step.id, type: "date" },
                          )
                        }
                        className="flex items-center space-x-1.5 hover:text-blue-600 transition-colors bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md"
                      >
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            strokeWidth="1.5"
                          />
                          <line
                            x1="16"
                            y1="2"
                            x2="16"
                            y2="6"
                            strokeWidth="1.5"
                          />
                          <line x1="8" y1="2" x2="8" y2="6" strokeWidth="1.5" />
                          <line
                            x1="3"
                            y1="10"
                            x2="21"
                            y2="10"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span className="font-medium text-slate-700">
                          Due: {step.dueDate}
                        </span>
                      </button>
                      {activeDropdown?.stepId === step.id &&
                        activeDropdown?.type === "date" && (
                          <div className="absolute top-full left-0 mt-1 p-3 bg-white border border-slate-200 rounded-lg shadow-lg z-20">
                            <input
                              type="date"
                              onChange={(e) => {
                                setSteps(
                                  steps.map((s) =>
                                    s.id === step.id
                                      ? { ...s, dueDate: e.target.value }
                                      : s,
                                  ),
                                );
                                setActiveDropdown(null);
                              }}
                              className="text-xs border border-slate-200 rounded px-2 py-1 focus:outline-hidden focus:border-blue-600"
                            />
                          </div>
                        )}
                    </div>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown?.stepId === step.id &&
                              activeDropdown?.type === "status"
                              ? null
                              : { stepId: step.id, type: "status" },
                          )
                        }
                        className="flex items-center space-x-1.5 hover:text-blue-600 transition-colors bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md"
                      >
                        <svg
                          className="w-4 h-4 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeWidth="1.5"
                          />
                        </svg>
                        <span className="font-medium text-slate-700">
                          Status: {step.status}
                        </span>
                      </button>
                      {activeDropdown?.stepId === step.id &&
                        activeDropdown?.type === "status" && (
                          <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1">
                            {STATUS_LIST.map((status) => (
                              <button
                                key={status}
                                onClick={() => {
                                  setSteps(
                                    steps.map((s) =>
                                      s.id === step.id ? { ...s, status } : s,
                                    ),
                                  );
                                  setActiveDropdown(null);
                                }}
                                className="w-full text-left px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 font-medium"
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Step Items Container */}
                  <div className="space-y-4">
                    {step.items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-slate-50/90 border border-slate-200 rounded-xl p-4 relative group"
                      >
                        <button
                          onClick={() => removeItem(step.id, item.id)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-red-600 transition-colors p-1"
                          title="Remove Item"
                        >
                          <svg
                            className="w-4 h-4"
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

                        <div className="mb-2 pr-8">
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) =>
                              updateItemLabel(step.id, item.id, e.target.value)
                            }
                            className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-hidden px-1 py-0.5 w-full sm:w-64"
                          />
                        </div>

                        {item.type === "single-line" && (
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={(item.value as string) || ""}
                              onChange={(e) =>
                                updateItemValue(
                                  step.id,
                                  item.id,
                                  e.target.value,
                                )
                              }
                              placeholder={item.placeholder || "Type here..."}
                              className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700 focus:outline-hidden focus:border-blue-600 shadow-2xs"
                            />
                          </div>
                        )}

                        {item.type === "multi-line" && (
                          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
                            <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                              <span className="font-semibold bg-white px-2 py-0.5 border border-slate-200 rounded">
                                Paragraph
                              </span>
                              <span className="font-bold px-1.5 py-0.5 cursor-pointer hover:bg-slate-200 rounded">
                                B
                              </span>
                              <span className="italic px-1.5 py-0.5 cursor-pointer hover:bg-slate-200 rounded">
                                I
                              </span>
                              <span className="underline px-1.5 py-0.5 cursor-pointer hover:bg-slate-200 rounded">
                                U
                              </span>
                            </div>
                            <textarea
                              rows={3}
                              value={(item.value as string) || ""}
                              onChange={(e) =>
                                updateItemValue(
                                  step.id,
                                  item.id,
                                  e.target.value,
                                )
                              }
                              placeholder="Text will be typed here..."
                              className="w-full p-3 text-sm text-slate-700 focus:outline-hidden resize-y"
                            />
                          </div>
                        )}

                        {item.type === "radio" && (
                          <div className="space-y-2">
                            {item.options?.map((opt, optIdx) => (
                              <div
                                key={optIdx}
                                className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3.5 py-2 shadow-2xs"
                              >
                                <div className="flex items-center space-x-3 flex-1 mr-3">
                                  <input
                                    type="radio"
                                    name={`radio-${item.id}`}
                                    checked={item.value === opt}
                                    onChange={() =>
                                      updateItemValue(step.id, item.id, opt)
                                    }
                                    className="w-4 h-4 text-blue-600"
                                  />
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) =>
                                      updateOption(
                                        step.id,
                                        item.id,
                                        optIdx,
                                        e.target.value,
                                      )
                                    }
                                    className="text-sm text-slate-700 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-hidden w-full py-0.5"
                                  />
                                </div>
                                <button
                                  onClick={() =>
                                    removeOption(step.id, item.id, optIdx)
                                  }
                                  className="text-slate-400 hover:text-red-600 p-1"
                                >
                                  <svg
                                    className="w-4 h-4"
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
                            ))}
                            <button
                              onClick={() => addOption(step.id, item.id)}
                              className="mt-1 flex items-center justify-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-white border border-dashed border-blue-300 rounded-lg px-3.5 py-2 w-full transition-colors cursor-pointer"
                            >
                              <span>+ Add Option</span>
                            </button>
                          </div>
                        )}

                        {item.type === "checkbox" && (
                          <div className="space-y-2">
                            {item.options?.map((opt, optIdx) => {
                              const currentSelected = Array.isArray(item.value)
                                ? item.value
                                : [];
                              const isChecked = currentSelected.includes(opt);
                              return (
                                <div
                                  key={optIdx}
                                  className="flex items-center justify-between bg-white border border-slate-200 rounded-lg px-3.5 py-2 shadow-2xs"
                                >
                                  <div className="flex items-center space-x-3 flex-1 mr-3">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          updateItemValue(step.id, item.id, [
                                            ...currentSelected,
                                            opt,
                                          ]);
                                        } else {
                                          updateItemValue(
                                            step.id,
                                            item.id,
                                            currentSelected.filter(
                                              (v) => v !== opt,
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
                                          step.id,
                                          item.id,
                                          optIdx,
                                          e.target.value,
                                        )
                                      }
                                      className="text-sm text-slate-700 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-600 focus:outline-hidden w-full py-0.5"
                                    />
                                  </div>
                                  <button
                                    onClick={() =>
                                      removeOption(step.id, item.id, optIdx)
                                    }
                                    className="text-slate-400 hover:text-red-600 p-1"
                                  >
                                    <svg
                                      className="w-4 h-4"
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
                              );
                            })}
                            <button
                              onClick={() => addOption(step.id, item.id)}
                              className="mt-1 flex items-center justify-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-white border border-dashed border-blue-300 rounded-lg px-3.5 py-2 w-full transition-colors cursor-pointer"
                            >
                              <span>+ Add Option</span>
                            </button>
                          </div>
                        )}

                        {item.type === "attach-file" && (
                          <div className="bg-white border border-dashed border-slate-300 rounded-lg p-5 text-center hover:border-blue-500 transition-colors cursor-pointer relative">
                            <input
                              type="file"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  updateItemValue(
                                    step.id,
                                    item.id,
                                    e.target.files[0].name,
                                  );
                                }
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <svg
                                className="w-6 h-6 text-blue-500 mb-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span className="text-sm font-medium text-slate-700">
                                {item.value
                                  ? `Uploaded: ${item.value}`
                                  : "Click or drag file to upload"}
                              </span>
                            </div>
                          </div>
                        )}

                        {item.type === "link" && (
                          <input
                            type="url"
                            value={(item.value as string) || ""}
                            onChange={(e) =>
                              updateItemValue(step.id, item.id, e.target.value)
                            }
                            placeholder="https://example.com"
                            className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700 focus:outline-hidden focus:border-blue-600 shadow-2xs"
                          />
                        )}

                        {item.type === "notes" && (
                          <textarea
                            rows={2}
                            value={(item.value as string) || ""}
                            onChange={(e) =>
                              updateItemValue(step.id, item.id, e.target.value)
                            }
                            placeholder="Important notes..."
                            className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm text-slate-700 focus:outline-hidden focus:border-blue-600 shadow-2xs resize-y"
                          />
                        )}

                        {item.type === "due-date" && (
                          <input
                            type="date"
                            value={(item.value as string) || ""}
                            onChange={(e) =>
                              updateItemValue(step.id, item.id, e.target.value)
                            }
                            className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-sm text-slate-700 focus:outline-hidden focus:border-blue-600 shadow-2xs"
                          />
                        )}

                        {item.type === "canvas" && (
                          <div className="bg-white border border-slate-200 rounded-lg p-4 text-center text-sm text-slate-400 bg-slate-50">
                            Canvas Drawing Field
                          </div>
                        )}

                        {item.type === "approval" && (
                          <div className="bg-white border border-slate-200 rounded-lg p-4 flex items-center justify-between shadow-2xs">
                            <span className="text-sm font-medium text-slate-700">
                              Manager Sign-off Required
                            </span>
                            <select
                              value={(item.value as string) || "Pending"}
                              onChange={(e) =>
                                updateItemValue(
                                  step.id,
                                  item.id,
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

          {/* Bottom Drop Zone */}
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

        {/* Right Sidebar */}
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

      {/* Publish & DB Payload Modal Preview */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-100 flex flex-col max-h-[90vh]">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Database-Ready JSON Payload
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              All configuration parameters, steps, item types, labels, options,
              and user inputs are fully structured below and logged to your
              browser&apos;s console.
            </p>

            <div className="bg-slate-900 text-emerald-400 border border-slate-800 rounded-xl p-4 overflow-y-auto flex-1 mb-6 text-xs font-mono">
              <pre>{JSON.stringify(getStructuredPayload(), null, 2)}</pre>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const dataStr =
                    "data:text/json;charset=utf-8," +
                    encodeURIComponent(
                      JSON.stringify(getStructuredPayload(), null, 2),
                    );
                  const downloadAnchor = document.createElement("a");
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute(
                    "download",
                    "workflow_schema.json",
                  );
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
              >
                Download Schema JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
