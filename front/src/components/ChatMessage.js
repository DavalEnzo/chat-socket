import React from 'react';

function ChatMessage({index, message, previousMessage}) {

  const getLastMessage = () => {
    if (previousMessage && previousMessage.user.username === message.user.username) {
      return previousMessage.text
    }
  }

  return (
    <div key={index} className={"text-2xl flex items-center gap-3 " + (!getLastMessage() ? 'mt-4' : '') }>
        {!getLastMessage() && <img className={"w-11 h-11 rounded-full object-cover"} alt={"profile"} src={message.user.profilePicture} />}
        {getLastMessage() && <div className={"min-w-11"}></div>}
      <div className="flex-col">
        <div className="flex items-baseline gap-2">
          {!getLastMessage() && <p className={"font-bold"}>{message.user.username}</p>}
          {!getLastMessage() && <p className={"text-sm text-black/70"}>{new Date(message.date).toLocaleDateString([], { hour: '2-digit', minute: '2-digit' })}</p>}
        </div>
        <p className={"text-lg break-all"}>{message.text}</p>
      </div>
    </div>
  );
}


export default ChatMessage;