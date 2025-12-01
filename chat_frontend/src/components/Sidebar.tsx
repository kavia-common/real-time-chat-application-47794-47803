"use client";

import React from "react";

// PUBLIC_INTERFACE
/** Placeholder sidebar for participants; currently shows a simple list header. */
export default function Sidebar() {
  return (
    <aside className="hidden md:block w-56 border-r border-gray-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="p-4">
        <h2 className="font-medium text-gray-800">Participants</h2>
        <p className="mt-2 text-sm text-gray-500">Coming soon</p>
      </div>
    </aside>
  );
}
