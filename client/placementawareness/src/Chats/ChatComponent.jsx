import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/userContext";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";
import Navbar from "../componenet/Navbar";

const ChatComponent = () => {
  const { auth } = useGlobalContext();
  const [realTimeMessag, setRealTimeMessage] = useState(null);
  const [allChats, setAllChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [receiveRealMessage, setRecieveRealMessage] = useState(null);

  const socket = useRef("");
  const [onlineUser, setOnlineUser] = useState([]);

  const getChats = async () => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/findChat/${auth?.user}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataFromResponse = await res.json();
      //   console.log(dataFromResponse);

      if (res.ok) {
        setAllChats(dataFromResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      socket.current = io("http://localhost:8000");
      socket.current.emit("new-user-add", auth?.user);
      socket.current.on("get-users", (users) => {
        setOnlineUser(users);
      });
    }
  }, [auth?.user]);

  useEffect(() => {
    if (auth?.user) {
      getChats();
    }
  }, [auth?.user]);

  //send message to socket server
  useEffect(() => {
    if (realTimeMessag !== null) {
      socket.current.emit("send-message", realTimeMessag);
    }
  }, [realTimeMessag]);

  //receive message from socket server
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setRecieveRealMessage(data);
    });
  }, []);

  const handleOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== auth?._id);
    const online = onlineUser.find((user) => user?.userId === chatMember);
    return online ? true : false;
  };

  return (
    <>
      <Navbar />
      <div>
        <div>
          {allChats?.length > 0 &&
            allChats?.map((ele, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentChat(ele)}
                  className="cursor-pointer hover:bg-green-300 p-1"
                >
                  <Conversation
                    key={idx}
                    data={ele}
                    currentUserId={auth?._id}
                    online={handleOnlineStatus(ele)}
                  />
                </div>
              );
            })}
        </div>
      </div>

      <ChatBox
        currentChat={currentChat}
        setRealTimeMessage={setRealTimeMessage}
        receiveRealMessage={receiveRealMessage}
      />
    </>
  );
};

export default ChatComponent;
