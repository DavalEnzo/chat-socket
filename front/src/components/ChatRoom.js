import React, {useEffect, useRef, useState} from 'react';
import ChatMessage from "./ChatMessage";
import {toast, Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ChatRoomUsers from "./ChatRoomUsers";
import axios from "axios";
import {useCookies} from "react-cookie";

function ChatRoom({ socket }) {
  const navigate = useNavigate();
  const listRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [users, setUsers] = useState([]);
  const [cookies, removeCookie] = useCookies([]);

  const user = localStorage.getItem('user');

  useEffect(() => {
    const verifyCookie = async () => {
      console.log(cookies)
      const { data } = await axios.post(
        `http://${process.env.REACT_APP_SOCKET_ENDPOINT}:4000`,
        {},
        { withCredentials: true }
      );
      const { status } = data;
      if (!status) {
        toast.error("Connectez vous pour accéder à cette page", {
          position: "bottom-right"
        });
        navigate("/");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    socket.emit('leave', user);
    socket.on('leaveResponse', (data) => {
      toast.success(`Utilisateur ${data} déconnecté`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      if (data === user) {
        localStorage.removeItem('token');
      }
    });
    removeCookie('token');
    navigate("/");
  };

  const sendMessage = () => {
    socket.emit('message', {
      text: messageText,
      user: user,
      name: 'test',
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
    setMessageText('');
  };

  useEffect(() => {
    socket.on('messageResponse', (data) => {
      setMessages(([...messages, data]))
    });

    socket.on('joinResponse', (data) => {
      setUsers([...users, data])
    });

    socket.on('leaveResponse', (data) => {
      setUsers(users.filter(user => user !== data))
    });

    listRef.current?.lastElementChild?.scrollIntoView()
  }, [socket, messages, users]);

  return (
    <>
      <div className={"flex flex-col p-11 items-center gap-12 h-full"}>
        <div className="flex items-center w-full">
          <h1 className={"text-5xl ml-auto"}>Messages</h1>
          <img className={"w-20 h-20 rounded-full ml-auto"}
               src={"https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="}
               alt=""/>
        </div>
        <div className={"flex bg-slate-400 h-5/6 rounded-2xl border w-5/6 p-5 gap-3"}>
          <div className={"flex flex-col justify-end w-full"}>
            <div ref={listRef} className={"overflow-scroll scroll-smooth"}>
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message}/>
              ))}
            </div>
            <div className="flex items-center rounded-md">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyUp={e => e.key === 'Enter' ? sendMessage() : ''}
                placeholder="Entrez un message et appuyer sur ENTREE"
                className="flex-grow p-2 rounded-md border border-gray-300"
              />
              <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white rounded-md px-4 py-2">Envoyer
              </button>
              <button onClick={Logout} className={"ml-2 bg-red-500 text-white rounded-md px-4 py-2"}>Se
                déconnecter
              </button>
            </div>
          </div>
          <ChatRoomUsers users={users} />
        </div>
      </div>
    </>
  );
}

export default ChatRoom;