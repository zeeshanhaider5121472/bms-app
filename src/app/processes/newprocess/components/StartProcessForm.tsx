// components/StartProcessForm.tsx
"use client";

import { UserItem } from "@/src/lib/types";
import { ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StartProcessFormProps {
  dbusers: Record<string, UserItem>;
}

export default function StartProcessForm({ dbusers }: StartProcessFormProps) {
  const [processName, setProcessName] = useState("");
  const userList: UserItem[] = Object.values(dbusers);
  const [selectedUsers, setSelectedUsers] = useState<UserItem[]>([]);
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log("Loaded Database from db.json:", dbusers);
  const router = useRouter();

  const filteredUsers = userList.filter(
    (user) =>
      user.username.toLowerCase().includes(query.toLowerCase()) &&
      !selectedUsers.some((m) => m.userid === user.userid),
  );

  const handleSelectUser = (user: UserItem) => {
    setSelectedUsers([...selectedUsers, user]);
    setQuery("");
    setIsDropdownOpen(false);
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((m) => m.userid !== userId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Call your API route instead of trying to run db.ts functions directly in the browser
    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          processName,
          processId: `p_${Date.now()}`,
          processMembers: selectedUsers,
        }),
      });

      const data = await res.json();
      if (data.success) {
        console.log("Process successfully added to db.json!", data.db);
        alert("Process created and saved!");
        // Refresh the current router state to fetch new server data
        router.refresh();

        // Navigate to home
        router.push("/processes/newprocess/newtemplate");
      }
    } catch (err) {
      console.error("Error saving process:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Process Name Input */}
      <div className="space-y-2">
        <label className="block text-sm text-zinc-600 font-normal">
          Process Name
        </label>
        <div className="relative flex items-center">
          <input
            required
            minLength={3}
            maxLength={25}
            type="text"
            value={processName}
            onChange={(e) => setProcessName(e.target.value)}
            placeholder="Give your process a name, e.g: marketing plan"
            className="w-full px-4 py-2.5 text-zinc-800 bg-white border border-zinc-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 text-sm pr-10"
          />
          {processName && (
            <button
              type="button"
              onClick={() => setProcessName("")}
              className="absolute right-3 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* users Selection Input / Dropdown */}
      <div className="space-y-2 relative">
        <label className="block text-sm text-zinc-600 font-normal">
          Select Users
        </label>
        <div
          className="w-full min-h-10.5 px-3 py-1.5 bg-white border border-zinc-300 rounded-lg flex flex-wrap items-center gap-1.5 focus-within:ring-1 focus-within:ring-zinc-400 focus-within:border-zinc-400 cursor-text"
          onClick={() => setIsDropdownOpen(true)}
        >
          {selectedUsers.map((user) => (
            <span
              key={user.userid}
              className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 text-xs px-2.5 py-1 rounded-md"
            >
              {user.username}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveUser(user.userid);
                }}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <input
            required={selectedUsers.length === 0}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsDropdownOpen(true);
            }}
            placeholder={
              selectedUsers.length === 0 ? "Select users..." : "Add more..."
            }
            className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-800 min-w-30 py-1"
          />
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && filteredUsers.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredUsers.map((user) => (
              <div
                key={user.userid}
                onClick={() => handleSelectUser(user)}
                className="px-4 py-2.5 hover:bg-zinc-50 cursor-pointer flex flex-col"
              >
                <span className="text-sm font-medium text-zinc-800">
                  {user.username}
                </span>
                {/* <span className="text-xs text-zinc-500">{user.email}</span> */}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}
