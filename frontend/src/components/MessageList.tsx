import React from "react";
import { format, isToday, isYesterday } from "date-fns";
import Message from "@/types/Message";

type MessagesProps = {
  msgs: Message[];
  userId: string | undefined;
};

const formattedDate = (date: string) => {
  if (isToday(date)) {
    return `${format(date, "h:mm a")}, Today`;
  } else if (isYesterday(date)) {
    return `${format(date, "h:mm a")}, Yesterday`;
  }
  return format(date, "h:mm a, d MMM");
};

export default function MessageList({ msgs, userId }: MessagesProps) {
  return (
    <div className="">
      {msgs.map((msg, index) => (
        <ul
          key={index}
          className={`w-2/3 rounded bg-neutral-700 mt-5 p-5 text-white mt-5 flex flex-col ${userId === msg.userId ? "items-end ml-auto" : "items-start"}`}
        >
          <li className="w-full flex flex-row justify-between text-sm">
            <p className="flex-grow">{msg.userId}</p>
            <p className="">{formattedDate(msg.timestamp)}</p>
          </li>
          <li className="text-base ">{msg.content}</li>
        </ul>
      ))}
    </div>
  );
}
