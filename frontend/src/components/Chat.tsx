"use client";

import React, { useEffect, useState } from "react";
import socket from "@/utils/socket";
import Message from "@/types/Message";
import MessageList from "./MessageList";
import ConnectionState from "./ConnectionState";

export default function ChatComponent() {
  const [inputMessage, setInputMessage] = useState("");
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | undefined>("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
      setIsConnected(true);
      setUserId(socket.id);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    });
    socket.on("new message", (message: Message) => {
      console.log("New message received: ", message);
      setNewMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("new message");
    };
  }, []);

  const sendMessage = () => {
    console.log("all messages: ", newMessages);
    console.log("userId verification", userId);
    if (inputMessage !== "") {
      socket.emit("message", inputMessage);
    }
  };

  return (
    <div>
      <h2>Messages received</h2>
      <ConnectionState isConnected={isConnected} />
      <MessageList msgs={newMessages} userId={userId} />
      <div className="flex gap-3">
        <input
          className="appearance-none bg-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyUp={(event) => {
            if (event.key === "Enter") sendMessage();
          }}
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
