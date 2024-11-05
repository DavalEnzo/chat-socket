import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from "./ChatMessage";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ChatRoomUsers from "./ChatRoomUsers";
import axios from "axios";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";

function ChatRoom({ socket }) {
  const navigate = useNavigate();
  const listRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [users, setUsers] = useState([]);
  const [cookies, removeCookie] = useCookies([]);
  const [showUsers, setShowUsers] = useState(false);
  const [ecriture, setEcriture] = useState({});
  const typingTimeoutRef = useRef(null); // Reference to hold typing timeout

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const verifyCookie = async () => {
      const { data } = await axios.post(
        `https://${process.env.REACT_APP_SOCKET_ENDPOINT}`,
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

  const sendMessage = () => {
    socket.emit('message', {
      text: messageText,
      date: new Date(),
      user: { username: user.username, profilePicture: user.profilePicture },
      name: 'test',
      id: `${socket.id}${Math.random()}`,
      socketID: socket.id,
    });
    setMessageText('');
  };

  useEffect(() => {
    if (messageText) {
      socket.emit('ecrire', { username: user.username, message: messageText });

      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = setTimeout(() => {
        setEcriture({});
      }, 2000);
    } else {
      setEcriture({});
    }
  }, [messageText, socket, user.username]);

  useEffect(() => {
    socket.on('ecrireResponse', (data) => {
      setEcriture({ username: data.username });
    });

    socket.on('messageResponse', (data) => {
      setMessages(([...messages, data]))
    });

    socket.on('joinResponse', (data) => {
      setUsers([...users, data])
    });

    socket.on('leaveResponse', (data) => {
      setUsers(users.filter(user => user[0] !== data))
    });

    listRef.current?.lastElementChild?.scrollIntoView();
  }, [socket, messages, users]);

  return (
    <>
      <div className={"flex flex-col sm:p-11 items-center h-full gap-10"}>
        <div className="flex items-center w-full">
          <h1 className={"text-5xl mx-auto mt-7"}>Messages</h1>
        </div>
        <div className={"flex w-11/12 flex-col xl:flex-row bg-slate-400 h-[calc(100vh-10rem)] rounded-2xl border xl:w-5/6 p-2 gap-3 overflow-hidden"}>
          <button onClick={() => setShowUsers(!showUsers)} className="bg-gray-600 text-white rounded-md px-2 xl:px-4 py-2 min-w-12 ml-auto xl:h-11 xl:order-last">
            <FontAwesomeIcon icon={faUserGroup} />
          </button>
          <div className={"xl:flex flex-col justify-end w-full h-full overflow-scroll " + (showUsers ? "hidden" : "flex")}>
            <div ref={listRef} className={"overflow-scroll scroll-smooth mb-2"}>
              {messages.map((message, index) => (
                <ChatMessage key={index} index={index} message={message} previousMessage={messages[index - 1]}/>
              ))}
              <div className={`flex space-x-1 items-center justify-start align-bottom my-2 ${ecriture.username ? "visible" : "invisible"}`}>
                <div className='h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                <div className='h-2 w-2 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                <div className='h-2 w-2 bg-gray-600 rounded-full animate-bounce'></div>
                <p
                  className={`text-gray-600 mx-3.5 my-2`}>{ecriture.username} est
                  en train d'écrire...</p>
              </div>
            </div>
            <div className="flex items-center rounded-md p-2 w-full">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyUp={e => e.key === 'Enter' ? sendMessage() : ''}
                placeholder="Entrez un message et appuyer sur ENTREE"
                className="flex-grow p-2 rounded-md border border-gray-300"
              />
              <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white rounded-md px-2 xl:px-4 py-2">Envoyer
              </button>
            </div>
          </div>
          <ChatRoomUsers users={users} showUsers={showUsers} />
        </div>
      </div>
    </>
  );
}

export default ChatRoom;