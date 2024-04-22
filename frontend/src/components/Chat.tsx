'use client'

import React, { useEffect, useState} from 'react';
import io from 'socket.io-client'

export default function ChatComponent() {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const socket = io("http://locahost:3001");

        socket.on('connect', () => {
            console.log("Connected to the server");
        })
        socket.on('disconnect', () => {
            console.log("Disconnected from server")
        })
        socket.on("message", (message: string) => {
            console.log("New message received: ", message);
            setMessages((prevMessages) => [...prevMessages, message]);
        })
        return () => {
            socket.disconnect()
        }
    }, [])

    return (
        <div>
            <h2>Messages received</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
}
