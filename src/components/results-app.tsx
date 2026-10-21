// "use client";

// import { useEffect, useState } from "react";
// import { ResultsDB, Selected } from "../lib/types";
// import NewResultForm from "./new-result-form";
// import ResultScreen from "./result-screen";

// /* -------- sidebar sizing rules -------- */
// const MIN_W = 200; // never skinnier than this
// const MAX_W = 420; // never wider than this
// const DEFAULT_W = 288; // same as Tailwind's w-72
// const COLLAPSED_W = 72; // icon-only rail when collapsed

// // THE APP — left menu never moves, right side swaps screens
// export default function ResultsApp({
//   initialData,
// }: {
//   initialData: ResultsDB;
// }) {
//   const [students, setStudents] = useState<ResultsDB>(initialData);
//   const [selected, setSelected] = useState<Selected>(
//     Object.keys(initialData)[0] ?? null, // open the first student by default
//   );

//   /* -------- sidebar size state -------- */
//   const [width, setWidth] = useState(DEFAULT_W);
//   const [collapsed, setCollapsed] = useState(false);
//   const [dragging, setDragging] = useState(false);

//   // load saved sidebar prefs after mount (avoids server/client mismatch)
//   useEffect(() => {
//     const savedW = Number(localStorage.getItem("rb-sidebar-width"));
//     if (savedW >= MIN_W && savedW <= MAX_W) setWidth(savedW);
//     setCollapsed(localStorage.getItem("rb-sidebar-collapsed") === "1");
//   }, []);

//   // remember prefs across reloads
//   useEffect(() => {
//     localStorage.setItem("rb-sidebar-width", String(width));
//     localStorage.setItem("rb-sidebar-collapsed", collapsed ? "1" : "0");
//   }, [width, collapsed]);

//   // drag-to-resize: follow the mouse until release
//   function startDrag(e: React.MouseEvent) {
//     e.preventDefault();
//     setDragging(true);
//     const onMove = (ev: MouseEvent) => {
//       setWidth(Math.min(MAX_W, Math.max(MIN_W, ev.clientX)));
//     };
//     const onUp = () => {
//       setDragging(false);
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };
//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//   }

//   // keyboard resize: focus the edge, then use arrow keys
//   function onHandleKeyDown(e: React.KeyboardEvent) {
//     if (e.key === "ArrowLeft") setWidth((w) => Math.max(MIN_W, w - 24));
//     if (e.key === "ArrowRight") setWidth((w) => Math.min(MAX_W, w + 24));
//   }

//   // pull the fresh JSON after a save so the menu updates
//   async function refreshList() {
//     const res = await fetch("/api/results");
//     if (res.ok) setStudents(await res.json());
//   }

//   // FIXED: Properly compute the currently selected student object from the dictionary keys
//   const selectedStudent =
//     selected && selected !== "new" ? students[selected] : null;

//   const sbWidth = collapsed ? COLLAPSED_W : width;

//   return (
//     <div
//       className={`flex h-dvh flex-col bg-slate-100 md:flex-row ${
//         dragging ? "cursor-col-resize select-none" : ""
//       }`}
//     >
//       {/* ---------------- LEFT: the menu (collapsible + resizable) ---------------- */}
//       <aside
//         style={{ "--sb-w": `${sbWidth}px` } as React.CSSProperties}
//         className={`relative shrink-0 md:w-[var(--sb-w)] ${
//           dragging ? "" : "transition-[width] duration-200"
//         }`}
//       >
//         <div className="no-scrollbar flex h-auto items-center gap-2 overflow-x-auto bg-slate-950 p-3 md:h-full md:flex-col md:items-stretch md:overflow-y-auto md:p-4">
//           {/* brand + collapse toggle */}
//           <div
//             className={`flex shrink-0 items-center gap-2.5 pr-2 md:px-2 md:pb-5 md:pt-1 ${
//               collapsed ? "md:flex-col md:items-center md:gap-2" : ""
//             }`}
//           >
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-lg font-black text-slate-950">
//               R
//             </div>
//             <div className={`leading-tight ${collapsed ? "md:hidden" : ""}`}>
//               <p className="whitespace-nowrap text-sm font-bold text-white">
//                 Result Board
//               </p>
//               <p className="whitespace-nowrap text-[11px] text-slate-400">
//                 JSON-powered
//               </p>
//             </div>
//             <button
//               type="button"
//               onClick={() => setCollapsed((c) => !c)}
//               title={collapsed ? "Expand menu" : "Collapse menu"}
//               aria-label={collapsed ? "Expand menu" : "Collapse menu"}
//               className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-white/10 hover:text-white md:flex ${
//                 collapsed ? "md:ml-0" : "md:ml-auto"
//               }`}
//             >
//               {collapsed ? "›" : "‹"}
//             </button>
//           </div>

//           {/* FIXED: Use Object.entries to get both the key ("ali") and student data (s) */}
//           <nav
//             className="flex flex-row gap-2 md:flex-col"
//             aria-label="Students"
//           >
//             {Object.entries(students).map(([key, s]) => {
//               const active = selected === key;
//               return (
//                 <button
//                   key={key}
//                   type="button"
//                   onClick={() => setSelected(key)}
//                   aria-current={active ? "page" : undefined}
//                   title={collapsed ? `${s.name} Result` : undefined}
//                   className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
//                     collapsed ? "md:justify-center md:px-0" : ""
//                   } ${
//                     active
//                       ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40"
//                       : "text-slate-300 hover:bg-white/5 hover:text-white"
//                   }`}
//                 >
//                   <span
//                     className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
//                       active
//                         ? "bg-emerald-500 text-slate-950"
//                         : "bg-slate-800 text-slate-300"
//                     }`}
//                   >
//                     {s.name.charAt(0).toUpperCase()}
//                   </span>
//                   <span
//                     className={`font-medium ${collapsed ? "md:hidden" : ""}`}
//                   >
//                     {s.name}{" "}
//                     <span className="font-normal text-slate-400">Result</span>
//                   </span>
//                 </button>
//               );
//             })}
//           </nav>

//           {/* the "New Result" menu item */}
//           <button
//             type="button"
//             onClick={() => setSelected("new")}
//             aria-current={selected === "new" ? "page" : undefined}
//             title={collapsed ? "New Result" : undefined}
//             className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors md:mt-auto ${
//               collapsed ? "md:justify-center md:px-0" : ""
//             } ${
//               selected === "new"
//                 ? "bg-emerald-500 text-slate-950"
//                 : "bg-slate-900 text-slate-300 ring-1 ring-slate-800 hover:bg-slate-800 hover:text-white"
//             }`}
//           >
//             <span
//               className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-lg leading-none ${
//                 selected === "new"
//                   ? "bg-slate-950/15 text-slate-950"
//                   : "bg-emerald-500/15 text-emerald-400"
//               }`}
//             >
//               +
//             </span>
//             <span className={`font-medium ${collapsed ? "md:hidden" : ""}`}>
//               New Result
//             </span>
//           </button>
//         </div>

//         {/* drag handle on the edge — desktop only, hidden while collapsed */}
//         <div
//           role="separator"
//           aria-orientation="vertical"
//           aria-label="Drag to resize the menu. Double-click to reset. Arrow keys to fine-tune."
//           tabIndex={0}
//           onMouseDown={startDrag}
//           onDoubleClick={() => setWidth(DEFAULT_W)}
//           onKeyDown={onHandleKeyDown}
//           title="Drag to resize · double-click to reset"
//           className={`absolute inset-y-0 right-0 hidden w-1.5 cursor-col-resize md:block ${
//             collapsed ? "hidden" : ""
//           } ${dragging ? "bg-emerald-500/60" : "hover:bg-emerald-500/30"}`}
//         />
//       </aside>

//       {/* ---------------- RIGHT: the screen that changes ---------------- */}
//       <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-8">
//         {selected === "new" ? (
//           <NewResultForm
//             key="new"
//             onSaved={async (key) => {
//               await refreshList();
//               setSelected(key); // jump straight to the new student's screen
//             }}
//           />
//         ) : selectedStudent ? (
//           <ResultScreen key={selected} student={selectedStudent} />
//         ) : (
//           <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
//             <h1 className="text-lg font-semibold text-slate-900">
//               Pick a student
//             </h1>
//             <p className="text-sm text-slate-500">
//               Choose a result from the menu, or create a new one.
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
