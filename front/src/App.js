import React, {useEffect, useState} from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import ChatRoom from './components/ChatRoom';
import './App.css';
import socketIO from 'socket.io-client';
import Register from "./components/Register";
import {ToastContainer} from "react-toastify";
import ProfilePage from "./components/ProfilePage";
import NavbarComponent from "./components/NavbarComponent";

const socket = socketIO.connect(`http://${process.env.REACT_APP_SOCKET_ENDPOINT}:4000`);

function App() {
  const [profilePic, setProfilePic] = useState("defaultProfilePic.jpg");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setProfilePic(user.profilePicture);
    }
  }, []);

  return (
    <HashRouter>
    <NavbarComponent profilePic={profilePic} socket={socket} />
      <Routes>
        <Route path="/" exact element={<HomePage socket={socket} setProfilePicture={setProfilePic} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat-room" element={<ChatRoom socket={socket} />} />
        <Route path="/profile" element={<ProfilePage setProfilePicture={setProfilePic} />} />
      </Routes>
    <ToastContainer theme={"colored"} autoClose={3000} />
    </HashRouter>
  );
}
export default App;