import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function HomePage({ socket }) {
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState('');

  const handlePseudoChange = (event) => {
    setPseudo(event.target.value);
  }

  const joinChatRoom = () => {
    socket.emit('join', pseudo);
    localStorage.setItem('user', pseudo);
    navigate('/chat-room');
  };

  return (
    <div className={'flex justify-center items-center'}>
      <div className={"flex flex-col gap-4 my-52 bg-slate-400 p-5 rounded-2xl w-8/12 justify-center items-center content-center"}>
        <h1 className={"text-5xl mb-7"}>Connexion</h1>
        <input type="text" value={pseudo} onKeyUp={e => e.key === 'Enter' ? joinChatRoom() : ''} onChange={handlePseudoChange} placeholder="Entrez votre pseudo" className="flex-grow p-2 rounded-md border border-gray-300"/>
        <button onClick={joinChatRoom} className={"bg-blue-500 text-white p-3 rounded-2xl mt-5"}>Rejoindre le chat</button>
      </div>
    </div>
  )
}