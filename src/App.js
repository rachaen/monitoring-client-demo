// src/App.js

import React, { useEffect, useState, useRef } from 'react';
import SockJS from 'sockjs-client';

const App = () => {
  const [messageCount, setMessageCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const connectToServer = () => {
    if (!isConnected) {
      const socket = new SockJS('/endpoint'); // 엔드포인트 주소를 지정합니다.
      socketRef.current = socket;

      socket.onopen = () => {
        console.log('Connected to the server');
        setIsConnected(true);
      };

      socket.onmessage = (e) => {
        const newMessage = JSON.parse(e.data);

        setMessageCount((prevCount) => prevCount + 1);

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

      socket.onclose = () => {
        console.log('Disconnected from the server');
        setIsConnected(false);
      };
    }
  };

  const disconnectFromServer = () => {
    if (isConnected && socketRef.current) {
      socketRef.current.close();
      setIsConnected(false);
      console.log('Disconnected from the server');
    }
  };

  return (
    <div>
      <h1>WebSocket Messages</h1>
      <button onClick={connectToServer} disabled={isConnected}>
        Connect
      </button>
      <button onClick={disconnectFromServer} disabled={!isConnected}>
        Disconnect
      </button>
      {/* 메세지 카운트 */}
      <p>Message Count: {messageCount}</p>

      {/* 메세지 출력 스크롤 */}
      <div style={{ height: '400px', overflow: 'auto', border: '1px solid black' }}>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              [{msg.count}] {msg.text}
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      </div>
    </div>
  );
};

export default App;
