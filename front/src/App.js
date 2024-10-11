import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatRoom from './components/ChatRoom';
import './App.css';
import socketIO from 'socket.io-client';
import Register from "./components/Register";
import {ToastContainer} from "react-toastify";


const socket = socketIO.connect(`https://${process.env.REACT_APP_SOCKET_ENDPOINT}`);

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<HomePage socket={socket} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat-room" element={<ChatRoom socket={socket} />} />
      </Routes>
    <ToastContainer theme={"colored"} autoClose={3000} />
    </HashRouter>
  );
}
export default App;