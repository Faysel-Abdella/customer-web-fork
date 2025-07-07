import React, { useLayoutEffect, useRef, useState } from "react";

import { Message } from "@/types/profile.types";

import RecievedMessage from "./RecievedMessage";
import SentMessage from "./SentMessage";

interface ChatBoardProps {
  messages: Message[];
}
const ChatBoard = ({ messages }: ChatBoardProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  useLayoutEffect(() => {
    if (scrollRef.current && !hasScrolled) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (messages.length > 0) {
      setHasScrolled(true);
    }
  }, [messages, hasScrolled]);

  return (
    <div
      ref={scrollRef}
      className="h-[450px] w-full space-y-4 overflow-y-auto p-4"
    >
      {messages.map((message) =>
        message.to_id == 1 ? (
          <SentMessage key={message.id} message={message.message} />
        ) : (
          <RecievedMessage key={message.id} message={message.message} />
        ),
      )}
    </div>
  );
};

export default ChatBoard;
