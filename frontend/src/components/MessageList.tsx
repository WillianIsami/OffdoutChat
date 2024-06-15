import React from "react";
import { format, parseISO } from "date-fns";
import Message from "@/types/Message";

type MessagesProps = {
  msgs: Message[];
  userId: string | undefined;
};

export default function MessageList({ msgs, userId }: MessagesProps) {
  return (
    <div className="w-75">
      {msgs.map((msg, index) => (
        <ul
          key={index}
          className={`mt-5 flex flex-col ${userId === msg.userId ? "items-end" : "items-start"}`}
        >
          <li>{format(parseISO(msg.timestamp), "PP")}</li>
          <li>{msg.userId}</li>
          <li>
            {msg.content} <span>{format(msg.timestamp, "HH:mm")}</span>
          </li>
        </ul>
      ))}
    </div>
  );
}
