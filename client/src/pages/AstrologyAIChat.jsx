import React, { useState } from 'react';
import axios from 'axios';

const AstrologyAIChat = () => {
    const [message, setMessage] = useState('');
    const [sign, setSign] = useState('');
    const [chat, setChat] = useState([]);

    const sendMessage = async () => {
        if (!message.trim() || !sign.trim()) return;

        const response = await axios.post('http://localhost:5000/api/ai-chat', { message, sign });

        setChat([...chat, { user: 'You', text: message }, { user: 'AI', text: response.data.message }]);
        setMessage('');
    };

    return (
        <div className="flex flex-col items-center p-10 bg-gray-900 text-white">
            <h1 className="text-3xl mb-4">🔮 AI Astrology Chat</h1>
            <input className="p-2 m-2 bg-gray-700 rounded" placeholder="Your Zodiac Sign" onChange={(e) => setSign(e.target.value.toLowerCase())} />
            <input className="p-2 m-2 bg-gray-700 rounded" placeholder="Ask your question..." onChange={(e) => setMessage(e.target.value)} />
            <button className="p-2 bg-blue-500 rounded-lg mt-4" onClick={sendMessage}>Ask AI</button>

            <div className="mt-5 p-4 bg-gray-800 rounded w-96 h-64 overflow-y-auto">
                {chat.map((msg, i) => (
                    <p key={i} className={`${msg.user === 'You' ? 'text-blue-400' : 'text-green-400'}`}>
                        <strong>{msg.user}:</strong> {msg.text}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default AstrologyAIChat;
