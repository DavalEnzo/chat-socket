export default function ChatRoomUsers({ users }) {
  return (
    <div className={"flex gap-2 w-1/3"}>
      <div className={"border-l-2 h-full"}></div>
      <div className="flex flex-col gap-4 break-all 2xl:text-2xl">
        <h1 className={"text-center"}>Utilisateurs connectés</h1>
        {users.map((user, index) => (
          <div key={index} className={"flex gap-2 items-center"}>
            <div className="relative">
              <img className="w-10 h-10 rounded-full" src="https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=" alt=""/>
              <span
                className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-slate-400 rounded-full"></span>
            </div>
            <p>{user}</p>
          </div>
        ))}
      </div>
    </div>
  )
}