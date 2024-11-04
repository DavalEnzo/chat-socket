import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function HomePage({ socket, setProfilePicture }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const joinChatRoom = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(
        `https://${process.env.REACT_APP_SOCKET_ENDPOINT}:4000/login`,
        {
          ...inputValue,
        },
        {withCredentials: true}
      );
      console.log(data);
      const {user, success, message} = data;
      if (success) {
        socket.emit('join', [user.username, user.profilePicture]);
        localStorage.setItem('user', JSON.stringify(user));
        setProfilePicture(user.profilePicture);
        navigate("/chat-room");
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      username: "",
      password: "",
    });
  };

  return (
    <div className={'flex justify-center items-center  h-full'}>
      <div className={"flex flex-col h-4/7 gap-9 bg-slate-400 p-5 rounded-2xl w-4/12 items-center"}>
        <h1 className={"text-7xl mb-7"}>Connexion</h1>
        <input type="text" name={"username"} value={username} onKeyUp={e => e.key === 'Enter' ? joinChatRoom() : ''} onChange={handleOnChange} placeholder="Entrez votre pseudo" className="p-2 rounded-md border border-gray-300 w-4/5"/>
        <input type="password" name={"password"} value={password} onChange={handleOnChange} placeholder="Entrez votre mot de passe" className="p-2 rounded-md border border-gray-300 w-4/5"/>
        <button type={"submit"} onClick={joinChatRoom} className={"bg-blue-500 text-white p-3 rounded-2xl mt-5"}>Rejoindre le chat</button>
        <Link to={'/register'} className={"text-2xl"}>Pas de compte ? <b className={"text-blue-500 underline"}>Inscrivez-vous</b></Link>
      </div>
    </div>
  )
}