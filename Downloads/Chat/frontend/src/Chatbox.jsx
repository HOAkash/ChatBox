import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chatbox = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        // Listen for incoming chat messages
        socket.on('chatMessage', (msg) => {
            setChat((prevChat) => [...prevChat, msg]);
        });

        return () => {
            socket.off('chatMessage');
        };
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit('chatMessage', message);
            setMessage('');
        }
    }

    return (
        <div>
            <h1>Chat Box</h1>
            <div>
                {chat.map((msg, idx) => (
                    <div key={idx}>{msg}</div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="Type here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chatbox;
