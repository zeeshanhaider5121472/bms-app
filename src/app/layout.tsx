// src/app/layout.tsx
import type { Metadata } from "next";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { dataBase } from "../lib/db";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BPMS",
    template: "%s — BPMS",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Fetch your data cleanly. In Next.js 16, layouts are async-friendly.
  const dbDatabase = await dataBase();

  return (
    <html lang="en">
      <body className="antialiased px-4">
        {/* 1. Outer full-screen layout container wrapper */}
        <div className="flex h-screen flex-col overflow-hidden text-black">
          {/* Header container sits natively on top */}
          <div className="shrink-0">
            <Header />
          </div>

          {/* 2. Main workspace grid takes EXACTLY the remaining height */}
          <div className="flex flex-1 min-h-0 w-full flex-col md:flex-row">
            {/* Your Sidebar component */}
            <Sidebar db={dbDatabase} />

            {/* 3. The floating resize bar placeholder 
              If you have a manual black line element or component, place it directly here.
              Ensure it has NO margin or padding classes so it drops anchoring gaps. */}
            {/* <div className="bg-slate-300 self-stretch shrink-0 opacity-10 hover:opacity-100 transition-opacity cursor-col-resize hidden md:block" /> */}

            {/* Main content pane panel */}
            {/* Note: Removed 'gap' from the parent wrapper; gaps must be managed by the resize line to avoid floating */}
            <main className="flex-1 min-h-0 overflow-y-auto pl-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
