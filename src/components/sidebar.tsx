// src/components/sidebar.tsx
"use client";

import Link from "next/link";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  FiCheckSquare,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiSearch,
} from "react-icons/fi";
import { Database } from "../lib/types";

const MIN_WIDTH = 240;
const MAX_WIDTH = 420;
const DEFAULT_WIDTH = 280;

export default function Sidebar({ db }: { db: Database }) {
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [collapsed, setCollapsed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, width: DEFAULT_WIDTH });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPath, setCurrentPath] = useState("");

  // Safely grab the current location directly from the window object after mount,
  // bypassing the strict Next.js 16 build pre-rendering checks entirely!
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  function startDrag(e: ReactPointerEvent<HTMLDivElement>) {
    e.preventDefault();
    dragStart.current = { x: e.clientX, width };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function moveDrag(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging || collapsed) return;
    const next = dragStart.current.width + (e.clientX - dragStart.current.x);
    setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, next)));
  }

  function stopDrag() {
    setDragging(false);
  }

  // Safely grab Allprocesses, with a fallback empty object
  const processes = db?.Allprocesses || {};

  const filteredList = Object.entries(processes).filter(([key, p]) => {
    // Fallback name if processname is missing
    const name = p?.processname || key;
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Suspense
      fallback={<div className="h-full" style={{ width: DEFAULT_WIDTH }} />}
    >
      <div className="flex h-full shrink-0 relative select-none">
        <aside
          style={
            { "--sbw": collapsed ? "64px" : `${width}px` } as CSSProperties
          }
          className={[
            "h-full  flex flex-col gap-4",
            "w-full md:w-(--sbw)",
            dragging
              ? "transition-none"
              : "transition-[width] duration-150 ease-out",
          ].join(" ")}
        >
          {collapsed ? (
            /* ========================================================
               1. COLLAPSED VIEW: Skinny structural icon rail 
               ======================================================== */
            <>
              {/* Expand Toggle Button */}
              <button
                onClick={() => setCollapsed(false)}
                title="Expand sidebar"
                className="flex items-center justify-center p-2 rounded-lg bg-white shadow-sm border border-gray-100 hover:bg-slate-50 transition-colors text-slate-700"
              >
                <FiChevronRight className="text-lg" />
              </button>

              {/* Navigation Items (Icons only) */}
              <div className="bg-white rounded-xl p-2 shadow-sm flex flex-col gap-2 border border-gray-100 items-center">
                <Link
                  href="/home"
                  onClick={() => setCurrentPath("/home")}
                  title="Home"
                  className={`p-2.5 rounded-lg transition-colors ${
                    currentPath === "/home" || currentPath === "/"
                      ? "bg-[#93C5FD] text-slate-900"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <FiHome className="text-lg text-blue-600" />
                </Link>

                <Link
                  href="/tasks"
                  onClick={() => setCurrentPath("/tasks")}
                  title="My Tasks"
                  className={`p-2.5 rounded-lg transition-colors ${
                    currentPath === "/tasks"
                      ? "bg-[#93C5FD] text-slate-900"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <FiCheckSquare className="text-lg text-slate-700" />
                </Link>
              </div>

              {/* Dynamic Content Panel Icons */}
              <div className="bg-white rounded-xl py-4 px-1 shadow-sm flex flex-col flex-1 min-h-0 border border-gray-100 items-center gap-3 overflow-y-auto no-scrollbar">
                <div className="bg-red-500 text-white font-black text-xs h-5 w-5 rounded flex items-center justify-center shadow-sm shrink-0">
                  M
                </div>

                {filteredList.map(([key, p]) => (
                  <Link
                    key={key}
                    href={`/processes/${key}`}
                    onClick={() => setCurrentPath(`/processes/${key}`)}
                    title={p.processname || key}
                    className={`h-8 w-8 rounded-lg border-2 border-slate-700 flex shrink-0 transition-all ${
                      currentPath === `/processes/${key}`
                        ? "ring-2 ring-blue-500 bg-slate-100"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="w-1/2 border-r border-slate-700" />
                  </Link>
                ))}
              </div>
            </>
          ) : (
            /* ========================================================
               2. EXPANDED VIEW: Complete sidebar screen view
               ======================================================== */
            <>
              {/* Top Row with Navigation Card and Collapse Trigger Toggle */}
              <div className="bg-white rounded-xl p-2 shadow-sm flex flex-col gap-1 border border-gray-100">
                <div className="flex items-center justify-between px-1 pb-1">
                  <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                    Menu
                  </span>
                  <button
                    onClick={() => setCollapsed(true)}
                    title="Collapse sidebar"
                    className="p-1 rounded hover:bg-slate-100 text-slate-500 transition-colors"
                  >
                    <FiChevronLeft className="text-base" />
                  </button>
                </div>

                {/* SECTION 1: Navigation Container */}
                {/* <div className="bg-white rounded-xl p-2 shadow-sm flex flex-col gap-1 border border-gray-100"> */}
                <Link
                  href="/home"
                  onClick={() => setCurrentPath("/home")}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === "/home" || currentPath === "/"
                      ? "bg-[#93C5FD] text-slate-900"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <FiHome className="text-lg" />
                  <span>Home</span>
                </Link>

                <Link
                  href="/tasks"
                  onClick={() => setCurrentPath("/tasks")}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentPath === "/tasks"
                      ? "bg-[#93C5FD] text-slate-900"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <FiCheckSquare className="text-lg text-slate-700" />
                  <span>My Tasks</span>
                </Link>
              </div>

              {/* SECTION 2: Main Workspace & Filter Panels */}
              <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col flex-1 min-h-0 border border-gray-100">
                <div className="flex items-center gap-2 pb-4">
                  <div className="bg-red-500 text-white font-black text-xs h-5 w-5 rounded flex items-center justify-center shadow-sm">
                    M
                  </div>
                  <h2 className="font-bold text-sm text-slate-900 tracking-wide">
                    Main Workspace
                  </h2>
                </div>

                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <FiSearch className="absolute right-2.5 top-2.5 text-slate-400 text-sm" />
                </div>

                <nav className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {filteredList.map(([processKey, processVal]) => {
                    // console.log("Database received in Sidebar:", db);
                    // console.log("Extracted processes:", db?.Allprocesses);
                    // Dynamically grab templates inside this process
                    const templates = Object.entries(processVal).filter(([k]) =>
                      k.startsWith("template"),
                    );

                    const processUrl = `/processes/${processKey}`;
                    const isProcessActive = currentPath === processUrl;

                    return (
                      <div
                        key={processKey}
                        className="group flex flex-col rounded-lg px-2 py-2 transition-colors bg-white hover:bg-slate-50"
                      >
                        {/* Main Process Row */}
                        <div className="flex items-center justify-between">
                          <Link
                            href={processUrl}
                            onClick={() => setCurrentPath(processUrl)}
                            className="flex items-center gap-2.5 flex-1 min-w-0"
                          >
                            <div className="h-4 w-4 border-2 border-slate-700 rounded-sm flex shrink-0">
                              <div className="w-1/2 border-r border-slate-700" />
                            </div>
                            <span className="text-xs font-semibold text-slate-800 truncate">
                              {processVal.processname || processKey}
                            </span>
                          </Link>
                          <Link
                            href="/new"
                            className="text-slate-500 hover:text-slate-900 font-bold px-1.5 py-0.5 rounded text-sm transition-colors"
                          >
                            +
                          </Link>
                        </div>

                        {/* Templates List */}
                        <div className="ml-6 mt-1.5 space-y-1 border-l-2 border-slate-200 pl-2.5">
                          {templates.length > 0 ? (
                            templates.map(
                              ([templateKey, templateVal]: [string, any]) => {
                                const templateName =
                                  templateVal.templatename || templateKey;
                                const templateRoute = `/processes/${processKey}/${templateKey}`;
                                const isTemplateActive =
                                  currentPath === templateRoute;

                                return (
                                  <Link
                                    key={templateKey}
                                    href={templateRoute}
                                    onClick={() =>
                                      setCurrentPath(templateRoute)
                                    }
                                    className={`block text-[11px] py-1 px-1.5 rounded transition-colors ${
                                      isTemplateActive
                                        ? "bg-blue-100 text-blue-900 font-medium"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                                  >
                                    <span>{templateName}</span>
                                  </Link>
                                );
                              },
                            )
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">
                              No templates
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {filteredList.length === 0 && (
                    <p className="text-xs text-slate-400 text-center pt-4">
                      No items found
                    </p>
                  )}
                </nav>
              </div>
            </>
          )}
        </aside>

        {/* DRAG EDGE */}
        <div
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={stopDrag}
          onDoubleClick={() => setWidth(DEFAULT_WIDTH)}
          className={[
            "absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize z-50 group select-none hidden md:block",
            dragging ? "bg-blue-500" : "bg-transparent hover:bg-slate-300/50",
          ].join(" ")}
        >
          <div className="w-[1px] h-full bg-slate-200/60 mx-auto" />
        </div>
      </div>
    </Suspense>
  );
}
