// // src/components/new-result-form.tsx
// "use client";

// import { useState, type FormEvent } from "react";

// type FormState = {
//   name: string;
//   math: string;
//   science: string;
//   english: string;
// };

// const EMPTY: FormState = { name: "", math: "", science: "", english: "" };

// export default function NewResultForm() {
//   const [form, setForm] = useState<FormState>(EMPTY);
//   const [error, setError] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);

//   function update(field: keyof FormState, value: string) {
//     setForm((f) => ({ ...f, [field]: value }));
//   }

//   async function handleSubmit(e: FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setError(null);

//     const name = form.name.trim();
//     const math = Number(form.math);
//     const science = Number(form.science);
//     const english = Number(form.english);

//     if (!name) return setError("Please enter a name.");
//     if (name.length > 40)
//       return setError("Name must be 40 characters or less.");
//     const marks = [
//       ["math", math],
//       ["science", science],
//       ["english", english],
//     ] as const;
//     for (const [subject, mark] of marks) {
//       if (!Number.isInteger(mark) || mark < 0 || mark > 100) {
//         return setError(`${subject} must be a whole number between 0 and 100.`);
//       }
//     }

//     setSaving(true);
//     try {
//       const res = await fetch("/api/results", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, math, science, english }),
//       });
//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error ?? "Something went wrong. Try again.");
//         return;
//       }

//       // Full page jump to the new student's URL — the sidebar re-reads
//       // the JSON on the way, so the new name is already in the menu.
//       window.location.assign(`/student/${data.key}`);
//     } catch {
//       setError("Network error — is the server running?");
//       setSaving(false);
//     }
//   }

//   return (
//     <div className="mx-auto max-w-lg p-6 md:p-10">
//       <h2 className="text-2xl font-bold text-slate-100">New Result</h2>
//       <p className="mt-1 text-sm text-slate-400">
//         Add a student and their marks. They&apos;ll get their own page
//         instantly.
//       </p>

//       <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//         <div>
//           <label
//             htmlFor="name"
//             className="mb-1 block text-sm font-medium text-slate-300"
//           >
//             Name
//           </label>
//           <input
//             id="name"
//             type="text"
//             value={form.name}
//             onChange={(e) => update("name", e.target.value)}
//             placeholder="e.g. Ahmed"
//             maxLength={40}
//             className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
//           />
//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//           {(
//             [
//               ["math", "Math"],
//               ["science", "Science"],
//               ["english", "English"],
//             ] as const
//           ).map(([field, label]) => (
//             <div key={field}>
//               <label
//                 htmlFor={field}
//                 className="mb-1 block text-sm font-medium text-slate-300"
//               >
//                 {label}
//               </label>
//               <input
//                 id={field}
//                 type="number"
//                 min={0}
//                 max={100}
//                 value={form[field]}
//                 onChange={(e) => update(field, e.target.value)}
//                 placeholder="0–100"
//                 className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
//               />
//             </div>
//           ))}
//         </div>

//         {error && (
//           <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
//             {error}
//           </p>
//         )}

//         <button
//           type="submit"
//           disabled={saving}
//           className="w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {saving ? "Saving..." : "Save Result"}
//         </button>
//       </form>
//     </div>
//   );
// }
