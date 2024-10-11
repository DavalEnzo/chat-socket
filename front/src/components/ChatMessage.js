import React from 'react';

function ChatMessage({index, message}) {
  return (
    <div key={index} className="text-2xl mb-7 flex items-center gap-3">
      <img className={"w-11 h-11 rounded-full"} alt={"profile"} src={"https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo="} />
      <p>{message.user}: {message.text}</p>
    </div>
  );
}


export default ChatMessage;