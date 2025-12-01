"use client";

import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useChat } from "@/hooks/useChat";

// PUBLIC_INTERFACE
/** High-level chat layout: header, message list, input, and sidebar placeholder. */
export default function ChatLayout() {
  const { messages, sendMessage, status, usingMock } = useChat();

  return (
    <div className="container-centered">
      <section className="card-surface chat-shell w-full">
        <Header status={status} usingMock={usingMock} />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_14rem]">
          <div className="min-h-0"> {/* ensures the list can scroll within grid row */}
            <MessageList messages={messages} />
          </div>
          <Sidebar />
        </div>
        <MessageInput onSend={sendMessage} />
      </section>
    </div>
  );
}
