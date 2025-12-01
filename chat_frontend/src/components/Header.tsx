"use client";

import React from "react";
import type { ConnectionStatus } from "@/lib/types";

interface HeaderProps {
  title?: string;
  status: ConnectionStatus;
  usingMock: boolean;
}

function StatusDot({ status }: { status: ConnectionStatus }) {
  const cls =
    status === "connected"
      ? "status-dot status-connected"
      : status === "connecting"
      ? "status-dot status-connecting"
      : "status-dot status-disconnected";
  const label =
    status === "connected"
      ? "Connected"
      : status === "connecting"
      ? "Connecting"
      : "Disconnected";
  return (
    <span className="inline-flex items-center gap-2" aria-live="polite" aria-label={`Connection ${label}`}>
      <span className={cls} />
      <span className="text-sm text-gray-600">{label}</span>
    </span>
  );
}

// PUBLIC_INTERFACE
/** Header for the chat window with connection status and mock warning banner. */
export default function Header({ title = "Real-time Chat", status, usingMock }: HeaderProps) {
  return (
    <header className="px-4 sm:px-6 py-4 border-b border-gray-100 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900">{title}</h1>
        <StatusDot status={status} />
      </div>
      {usingMock && (
        <div
          className="mt-3 rounded-md border border-amber-200 bg-amber-50 text-amber-800 px-3 py-2 text-sm"
          role="status"
          aria-live="polite"
        >
          No WebSocket URL configured. Running in mock mode with echo replies. Set NEXT_PUBLIC_WS_URL to enable real-time backend.
        </div>
      )}
    </header>
  );
}
