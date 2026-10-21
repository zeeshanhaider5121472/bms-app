// src/app/page.tsx
import { redirect } from "next/navigation";

export default function RootPage() {
  // Automatically and instantly sends the user to /home
  redirect("/home");
}
