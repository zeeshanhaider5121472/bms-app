// "use client";

// import { Student } from "../lib/types";

// const average = (s: Student) =>
//   Math.round((s.math + s.science + s.english) / 3);

// const gradeFor = (avg: number) =>
//   avg >= 90 ? "A+" : avg >= 80 ? "A" : avg >= 70 ? "B" : avg >= 60 ? "C" : "D";

// const toneFor = (mark: number) =>
//   mark >= 80
//     ? {
//         bar: "bg-emerald-500",
//         text: "text-emerald-600",
//         chip: "bg-emerald-100 text-emerald-700",
//       }
//     : mark >= 60
//       ? {
//           bar: "bg-amber-500",
//           text: "text-amber-600",
//           chip: "bg-amber-100 text-amber-700",
//         }
//       : {
//           bar: "bg-rose-500",
//           text: "text-rose-600",
//           chip: "bg-rose-100 text-rose-700",
//         };

// export default function ResultScreen({ student }: { student: Student }) {
//   const avg = average(student);
//   const grade = gradeFor(avg);
//   const tone = toneFor(avg);

//   const subjects = [
//     { label: "Math", mark: student.math },
//     { label: "Science", mark: student.science },
//     { label: "English", mark: student.english },
//   ];

//   return (
//     <div className="animate-fade-in-up mx-auto w-full max-w-3xl">
//       <header className="flex flex-wrap items-center justify-between gap-4">
//         <div className="flex items-center gap-4">
//           <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-bold text-emerald-400">
//             {student.name.charAt(0).toUpperCase()}
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight text-slate-900">
//               {student.name}&apos;s Result
//             </h1>
//             <p className="text-sm text-slate-500">
//               Report card &middot; 3 subjects
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="text-right">
//             <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//               Average
//             </p>
//             <p className={`text-2xl font-bold ${tone.text}`}>{avg}%</p>
//           </div>
//           <div
//             className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-extrabold ${tone.chip}`}
//           >
//             {grade}
//           </div>
//         </div>
//       </header>

//       <section className="mt-8 grid gap-4 sm:grid-cols-3">
//         {subjects.map((s) => {
//           const t = toneFor(s.mark);
//           return (
//             <article
//               key={s.label}
//               className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
//             >
//               <div className="flex items-center justify-between">
//                 <p className="text-sm font-medium text-slate-500">{s.label}</p>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${t.chip}`}
//                 >
//                   {s.mark >= 80
//                     ? "Great"
//                     : s.mark >= 60
//                       ? "Okay"
//                       : "Needs work"}
//                 </span>
//               </div>
//               <p className="mt-3 text-3xl font-bold tabular-nums text-slate-900">
//                 {s.mark}
//                 <span className="ml-1 text-sm font-medium text-slate-400">
//                   / 100
//                 </span>
//               </p>
//               <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
//                 <div
//                   className={`h-full rounded-full ${t.bar}`}
//                   style={{ width: `${s.mark}%` }}
//                 />
//               </div>
//             </article>
//           );
//         })}
//       </section>

//       <p className="mt-6 text-xs text-slate-400">
//         This data came from{" "}
//         <code className="rounded bg-slate-200 px-1.5 py-0.5 font-mono">
//           results[&quot;{student.name.toLowerCase()}&quot;]
//         </code>{" "}
//         in <span className="font-mono">data/results.json</span>
//       </p>
//     </div>
//   );
// }
