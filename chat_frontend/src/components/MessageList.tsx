"use client";

import React, { useEffect, useRef } from "react";
import type { ChatMessage } from "@/lib/types";
import MessageItem from "./MessageItem";

interface MessageListProps {
  messages: ChatMessage[];
}

// PUBLIC_INTERFACE
/** Scrollable message area that autoscrolls to the latest message. */
export default function MessageList({ messages }: MessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  return (
    <div className="overflow-y-auto scrollbar-thin bg-gradient-to-b from-[var(--gradient-from)] to-[var(--gradient-to)]">
      <div className="py-4 space-y-3">
        {messages.map((m) => (
          <MessageItem key={m.id} msg={m} />
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
