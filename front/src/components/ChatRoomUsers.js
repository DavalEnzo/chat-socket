export default function ChatRoomUsers({ users }) {
  return (
    <div className={"flex gap-2 w-1/3"}>
      <div className={"border-l-2 h-full"}></div>
      <div className="flex flex-col gap-2 break-all 2xl:text-2xl">
        <h1 className={"text-center"}>Utilisateurs connectés</h1>
        {users.map((user, index) => (
          <div key={index} className={"flex justify-between items-center"}>
            <p>{user}</p>
          </div>
        ))}
      </div>
    </div>
  )
}