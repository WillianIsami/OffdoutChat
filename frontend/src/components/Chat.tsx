"use client";

import React, { useEffect, useState } from "react";
import socket from "@/utils/socket";
import { format, parseISO } from "date-fns";

interface Message {
  userId: string;
  content: string;
  timestamp: string;
}

export default function ChatComponent() {
  const [inputMessage, setInputMessage] = useState("");
  const [newMessages, setNewMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    socket.on("new message", (message: Message) => {
      console.log("New message received: ", message);
      setNewMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    console.log("all messages: ", newMessages);
    if (inputMessage !== "") {
      socket.emit("message", inputMessage);
    }
  };

  return (
    <div>
      <h2>Messages received</h2>
      {newMessages.map((message, index) => (
        <ul key={index}>
          <li>{format(parseISO(message.timestamp), "PP")}</li>
          <li>{message.userId}</li>
          <li>
            {message.content} <span>{format(message.timestamp, "HH:mm")}</span>
          </li>
          <br />
        </ul>
      ))}
      <div className="flex gap-3">
        <input
          className="appearance-none bg-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Write your message here!"
        />
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
