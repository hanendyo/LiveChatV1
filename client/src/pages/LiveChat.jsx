import React, { useEffect, useState } from "react";

const LiveChat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      console.log(`SEND: `, messageList);
      setCurrentMessage("");
    }
  };

  const receiveMessage = () => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(`RECEIVED: `, messageList);
    });
  };

  useEffect(() => {
    receiveMessage();
  }, [socket]);

  return (
    <div className="flex justify-center items-center m-auto w-screen h-screen">
      <div className="w-[350px] h-[450px] border-[1px] border-black">
        <div className="h-[30px] w-full bg-black text-white flex items-center flex-col justify-start">
          <div className="flex flex-row justify-start">
            <div className="w-[10px] h-[10px] rounded-3xl m-2 bg-green-600"></div>
            <p>Live chat</p>
          </div>
        </div>
        <div className="flex h-[85%] bg-gray-200 overflow-y-auto scroll-smooth hover:scroll-auto flex-col">
          {messageList.map((messageContent, i) => {
            return userName === messageContent.author ? (
              <div key={i} className="flex bg-white w-[100%]  justify-end">
                <div>
                  <div className="flex w-fit justify-end bg-green-500 p-2 mt-2 mr-2 mb-0 ml-2 rounded-br-xl rounded-l-xl">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="flex flex-row gap-3 text-xs justify-end mr-2">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="flex bg-white w-[100%] h-[100%] justify-start"
              >
                <div>
                  <div className="flex justify-start w-fit bg-blue-500 p-2 mt-2 ml-2 mb-0 mr-2 rounded-r-xl rounded-bl-xl">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="flex flex-row gap-3 text-xs justify-start ml-2">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <form
          //   onSubmit={(e) => handleSubmit(e)}
          className="flex h-[8%] items-center border-t-[1px] border-black"
        >
          <input
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Message here..."
            className="border-[1px] items-center align-middle w-[80%] h-full overflow-auto"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            type="button"
            className="flex p-[3px] m-[5px] w-1/5 justify-center align-middle items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            send
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveChat;
