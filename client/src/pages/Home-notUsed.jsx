import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const Home = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomNumber) {
      sendMessagePrivateRoom();
    } else {
      sendMessage();
    }
  };

  // VOLATILE uses: Volatile events are events that will not be sent if the underlying connection is not ready (a bit like UDP, in terms of reliability). || a message that might be dropped if the low-level transport is not writable.

  // broadcast to all
  const sendMessage = () => {
    if (socket.connected) {
      socket.emit("send_message", { message });
    } else {
      socket.volatile.emit("send_message", { message });
    }
  };

  // broadcast to private room
  const sendMessagePrivateRoom = () => {
    if (socket.connected) {
      socket.emit("send_message_private_roomNumber", { message, roomNumber });
    } else {
      socket.volatile.emit("send_message_private_roomNumber", {
        message,
        roomNumber,
      });
    }
  };

  // receive message from server
  const receiveMessage = () => {
    socket.on("receive_message_private_roomNumber", (data) => {
      setReceivedMessage(data.message);
    });
  };

  const handleJoinRoomNumber = (e) => {
    e.preventDefault();
    if (roomNumber) {
      if (socket.connected) {
        socket.emit("join_roomNumber", roomNumber);
      } else {
        socket.volatile.emit("join_roomNumber", roomNumber);
      }
    }
  };

  useEffect(() => {
    receiveMessage();
  }, [socket]);

  return (
    <div>
      <form onSubmit={(e) => handleJoinRoomNumber(e)}>
        <input
          placeholder="input roomNumber number..."
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />
        <button>Join roomNumber</button>
      </form>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          placeholder="input message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
      <div>
        <h1>Public chat</h1>
        <p>{receivedMessage}</p>
      </div>
    </div>
  );
};

export default Home;
