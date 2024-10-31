export default function ChatRoomUsers({ users, showUsers }) {
  return (
    showUsers &&
    <div className={"xl:flex gap-2 xl:w-1/4 rounded-2xl xl:rounded-none xl:bg-slate-400 bg-gray-600 h-full relative p-4 xl:p-0"}>
      <div className={"xl:border-l-2 xl:h-full"}></div>
      <div className="relative w-full xl:flex flex-col gap-4 break-all 2xl:text-2xl overflow-scroll">
        <h1 className={"text-center text-slate-100 xl:text-black mb-8 xl:mb-4 text-2xl xl:text-xl"}>Utilisateurs connectés</h1>
        {users.map((user, index) => (
          <div key={index} className={"flex gap-2 items-center"}>
            <div className="relative">
              <img className="w-14 h-14 rounded-full border object-cover" src={user[1]} alt=""/>
              <span
                className="bottom-0 left-10 absolute w-4 h-4 bg-green-400 border-2 border-slate-400 rounded-full"></span>
            </div>
            <p className={"text-2xl"}>{user[0]}</p>
          </div>
        ))}
      </div>
    </div>
  )
}