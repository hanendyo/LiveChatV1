import React, { useState } from "react";
import io from "socket.io-client";
import LiveChat from "./LiveChat";
const socket = io.connect("http://localhost:3001");

const Home = () => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [isJoin, setIsJoin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    joinRoom();
  };

  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", { room, userName });
      setIsJoin(true);
    } else {
      alert(`INPUT SALAH!`);
    }
  };

  return (
    <div className="flex w-screen h-screen bg-[gray] items-center justify-center">
      {!isJoin ? (
        <form className="flex flex-col" onSubmit={(e) => handleSubmit(e)}>
          <input
            className="m-[5px]"
            placeholder="username..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="m-[5px]"
            placeholder="room id..."
          />
          <button className="p-[3px] m-[5px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Join room
          </button>
        </form>
      ) : (
        <LiveChat socket={socket} userName={userName} room={room} />
      )}
    </div>
  );
};

export default Home;
