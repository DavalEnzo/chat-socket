import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatRoom from './components/ChatRoom';
import './App.css';
import socketIO from 'socket.io-client';

const socket = socketIO.connect(`http://${process.env.REACT_APP_SOCKET_ENDPOINT}:4000`);

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<HomePage socket={socket} />} />
        <Route path="/chat-room" element={<ChatRoom socket={socket} />} />
      </Routes>
    </HashRouter>
  );
}
export default App;