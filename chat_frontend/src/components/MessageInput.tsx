"use client";

import React, { FormEvent, useCallback, useRef, useState } from "react";

interface MessageInputProps {
  onSend: (text: string) => void;
}

// PUBLIC_INTERFACE
/** Input composer; sends on Enter or Send click. */
export default function MessageInput({ onSend }: MessageInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!text.trim()) return;
      onSend(text);
      setText("");
      // Restore focus for quick messages
      inputRef.current?.focus();
    },
    [text, onSend]
  );

  return (
    <form onSubmit={handleSubmit} className="px-3 sm:px-4 py-3 bg-white border-t border-gray-100">
      <div className="flex items-center gap-2">
        <label htmlFor="chat-input" className="sr-only">
          Type your message
        </label>
        <input
          id="chat-input"
          ref={inputRef}
          className="flex-1 rounded-xl border border-gray-200 px-3 py-2 text-sm shadow-sm focus:border-[var(--color-primary)]"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Message input"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] text-white text-sm font-medium px-4 py-2 shadow-sm hover:brightness-105 active:brightness-95 transition"
          aria-label="Send message"
        >
          Send
        </button>
      </div>
    </form>
  );
}
