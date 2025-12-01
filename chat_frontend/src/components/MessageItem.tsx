"use client";

import React from "react";
import type { ChatMessage } from "@/lib/types";
import { formatTime } from "@/lib/utils";

interface MessageItemProps {
  msg: ChatMessage;
}

// PUBLIC_INTERFACE
/** Renders a single chat message bubble with author and timestamp. */
export default function MessageItem({ msg }: MessageItemProps) {
  const isMe = msg.side === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} px-3 sm:px-4`}>
      <div
        className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-2 shadow-sm transition
          ${isMe ? "bg-[var(--color-primary)] text-white rounded-br-sm" : "bg-white text-gray-900 rounded-bl-sm border border-gray-100"}
        `}
        role="article"
        aria-label={`${msg.author} at ${formatTime(msg.timestamp)}`}
      >
        <div className={`text-xs ${isMe ? "text-white/80" : "text-gray-500"}`}>{isMe ? "You" : msg.author}</div>
        <div className="mt-1 text-sm leading-relaxed">{msg.text}</div>
        <div className={`mt-1 text-[11px] ${isMe ? "text-white/70" : "text-gray-400"}`}>{formatTime(msg.timestamp)}</div>
      </div>
    </div>
  );
}
