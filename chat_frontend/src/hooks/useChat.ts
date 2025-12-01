"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { env } from "@/lib/env";
import type { ChatMessage, ConnectionStatus } from "@/lib/types";
import { loadMessages, persistMessages, uid } from "@/lib/utils";

// PUBLIC_INTERFACE
/**
 * useChat
 * Manages a WebSocket connection (if NEXT_PUBLIC_WS_URL exists) and provides
 * message list, connection status, sendMessage method, and a flag indicating mock fallback.
 */
export function useChat(username: string = "You") {
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [usingMock, setUsingMock] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  // Load from cache once on mount (client)
  useEffect(() => {
    const cached = loadMessages();
    if (cached.length) {
      setMessages(cached);
    }
  }, []);

  const wsUrl = env.NEXT_PUBLIC_WS_URL?.trim();

  // Establish WebSocket connection or switch to mock
  useEffect(() => {
    let closed = false;

    if (!wsUrl) {
      // Mock mode
      setUsingMock(true);
      setStatus("connected"); // treat mock as connected
      return;
    }

    setUsingMock(false);
    setStatus("connecting");

    try {
      const socket = new WebSocket(wsUrl);
      wsRef.current = socket;

      socket.addEventListener("open", () => {
        if (closed) return;
        setStatus("connected");
      });

      socket.addEventListener("message", (evt) => {
        if (closed) return;
        const data = safeParse(evt.data);

        // Type guard: structured message { author?: string; text?: string; timestamp?: number }
        const isStructured = (v: unknown): v is { author?: string; text?: string; timestamp?: number } => {
          return typeof v === "object" && v !== null;
        };

        let text: string;
        let author: string;
        let ts: number;

        if (typeof data === "string") {
          text = data;
          author = "Remote";
          ts = Date.now();
        } else if (isStructured(data)) {
          text = typeof data.text === "string" ? data.text : String(evt.data);
          author = typeof data.author === "string" ? data.author : "Remote";
          ts = typeof data.timestamp === "number" ? data.timestamp : Date.now();
        } else {
          text = String(evt.data);
          author = "Remote";
          ts = Date.now();
        }

        const msg: ChatMessage = {
          id: uid(),
          author,
          text,
          timestamp: ts,
          side: "them",
        };
        setMessages((prev) => {
          const next = [...prev, msg];
          persistMessages(next);
          return next;
        });
      });

      socket.addEventListener("close", () => {
        if (closed) return;
        setStatus("disconnected");
      });

      socket.addEventListener("error", () => {
        if (closed) return;
        setStatus("disconnected");
      });

      return () => {
        closed = true;
        try {
          socket.close();
        } catch {
          // ignore
        }
        wsRef.current = null;
      };
    } catch {
      setStatus("disconnected");
      setUsingMock(true);
    }
  }, [wsUrl]);

  // PUBLIC_INTERFACE
  /** Send a message. In mock mode, an echo reply is generated after a short delay. */
  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const myMsg: ChatMessage = {
        id: uid(),
        author: username,
        text: trimmed,
        timestamp: Date.now(),
        side: "me",
      };

      setMessages((prev) => {
        const next = [...prev, myMsg];
        persistMessages(next);
        return next;
      });

      // Try WebSocket
      if (!usingMock && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        try {
          wsRef.current.send(
            JSON.stringify({
              author: username,
              text: trimmed,
              timestamp: myMsg.timestamp,
            })
          );
        } catch {
          // ignore send errors; rely on mock fallback if needed
        }
      } else {
        // Mock echo after delay
        const delay = 800 + Math.round(Math.random() * 600);
        setTimeout(() => {
          const echo: ChatMessage = {
            id: uid(),
            author: "Echo Bot",
            text: `Echo: ${trimmed}`,
            timestamp: Date.now(),
            side: "them",
          };
          setMessages((prev) => {
            const next = [...prev, echo];
            persistMessages(next);
            return next;
          });
        }, delay);
      }
    },
    [usingMock, username]
  );

  const api = useMemo(
    () => ({
      status,
      messages,
      usingMock,
      sendMessage,
    }),
    [status, messages, usingMock, sendMessage]
  );

  return api;
}

function safeParse(input: unknown): unknown {
  try {
    if (typeof input === "string") {
      return JSON.parse(input);
    }
    return input;
  } catch {
    return input;
  }
}
