// app/page.tsx

import { dataBase } from "@/src/lib/db";
import StartProcessForm from "./components/StartProcessForm";

export default function StartProcessPage() {
  // This runs on the server and prints the database object in your terminal (CLI)
  const db = dataBase();

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold text-zinc-800 mb-8">
          Let’s start working together
        </h1>
        <StartProcessForm dbusers={db.Users} />
      </div>
    </main>
  );
}
