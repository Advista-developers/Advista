// Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';
// import { login } from '../../../../BackendAdvista/Controllers/auth';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful assistant.' }, // Initial system message
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userMessage.trim() === '') return;

    // Add the user's message to the conversation
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setUserMessage(''); // Clear the input field
    setIsLoading(true);

    try {
      // Send the messages to the backend to communicate with OpenAI API
      const res = await axios.post('http://localhost:5000/api/chat/chatbot', {
        messages: newMessages,
      });
      console.log('res:',res);
      
      // Add the chatbot's response to the conversation
      const botMessage = res.data.response;
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error('Error communicating with backend:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-4">
        <h1 className="text-xl font-bold text-center mb-4">Chat with OpenAI</h1>

        <div className="h-64 overflow-y-auto border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 ${
                msg.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <span className={`font-semibold ${msg.role === 'user' ? 'text-blue-500' : 'text-green-500'}`}>
                {msg.role === 'user' ? 'You: ' : 'Bot: '}
              </span>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send
          </button>
        </form>

        {isLoading && (
          <p className="mt-2 text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
