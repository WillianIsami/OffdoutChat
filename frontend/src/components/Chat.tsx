'use client'

import React, { useEffect, useState} from 'react';
import io from 'socket.io-client';

export default function ChatComponent() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    
    // const socket = io(`${process.env.BASE_URL}`);
    const socket = io("http://localhost:3001");
    useEffect(() => {
        socket.on('connect', () => {
            console.log("Connected to the server");
        });
        socket.on('disconnect', () => {
            console.log("Disconnected from server")
        });
        socket.on("message", (message: string) => {
            console.log("New message received: ", message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, [])
    
    const sendMessage = () => {
        socket.emit("message", message)
    }

    return (
        <div>
            <h2>Messages received</h2>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <div className='flex gap-3'>
                <input 
                    className='appearance-none bg-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none' 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder='Write your message here!'
                />
                <button 
                    className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded' 
                    onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
