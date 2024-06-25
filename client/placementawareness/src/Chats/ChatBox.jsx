// import React, { useEffect, useRef, useState } from "react";
// import { useGlobalContext } from "../context/userContext";
// import { format } from "timeago.js";
// import { FaPlus } from "react-icons/fa";
// import InputEmoji from "react-input-emoji";
// import { MdSend } from "react-icons/md";

// const ChatBox = ({ currentChat, setRealTimeMessage, receiveRealMessage }) => {
//   let { auth } = useGlobalContext();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const scroll = useRef();

//   const getMessages = async () => {
//     try {
//       let res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/find-message/${currentChat?._id}`,
//         {
//           method: "GET",

//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const dataFromResponse = await res.json();
//       //   console.log(dataFromResponse);

//       if (res.ok) {
//         setMessages(dataFromResponse);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   //   handleChnage
//   const handleChnage = (newMessage) => {
//     setNewMessage(newMessage);
//   };

//   //   handleSendMessage
//   const handleSendMessage = async (event) => {
//     event.preventDefault();
//     const message = {
//       senderId: auth?.user,
//       chatId: currentChat?._id,
//       text: newMessage,
//     };
//     try {
//       let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/new-message`, {
//         method: "POST",

//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({ ...message }),
//       });

//       const dataFromResponse = await res.json();

//       if (res.ok) {
//         setMessages([...messages, dataFromResponse]);
//         setNewMessage("");
//       }
//     } catch (err) {
//       console.log(err);
//     }

//     //make real time
//     let receiverId = currentChat?.members.find((id) => id !== auth?.user);
//     setRealTimeMessage({ ...message, receiverId });
//   };

//   useEffect(() => {
//     if (currentChat?._id) {
//       getMessages();
//     }
//   }, [currentChat?._id]);

//   //real time message
//   useEffect(() => {
//     if (
//       receiveRealMessage !== null &&
//       receiveRealMessage.chatId === currentChat?._id
//     ) {
//       setMessages([...messages, receiveRealMessage]);
//     }
//   }, [receiveRealMessage]);

//   //scrolle to bottom
//   useEffect(() => {
//     scroll.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <>
//       {currentChat ? (
//         <div className=" w-[90vw] mx-auto">
//           <div className="bg-green-200 h-screen overflow-auto rounded-lg p-5">
//             {messages?.length > 0 &&
//               messages?.map((ele, idx) => {
//                 return (
//                   <div
//                     key={idx}
//                     ref={scroll}
//                     className={` flex   p-2 rounded-md  gap-3`}
//                   >
//                     {ele.senderId === auth?.user && (
//                       <div className="items-end bg-green-300 p-2 rounded-md">
//                         <p>{ele?.text}</p>
//                         <p>{format(ele?.createdAt)}</p>
//                       </div>
//                     )}

//                     {ele.senderId !== auth?.user && (
//                       <div className="items-end bg-green-400 p-2 rounded-md">
//                         <p>{ele?.text}</p>
//                         <p>{format(ele?.createdAt)}</p>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//           </div>

//           <div className="flex items-center fixed-bottom mb-5 mt-5">
//             <p>
//               <FaPlus />
//             </p>
//             <InputEmoji value={newMessage} onChange={handleChnage} />
//             <button onClick={handleSendMessage}>
//               <MdSend />
//             </button>
//           </div>
//         </div>
//       ) : (
//         <p className="text-center mt-6">Tap on above to start chat</p>
//       )}
//     </>
//   );
// };

// export default ChatBox;
import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/userContext";
import { format } from "timeago.js";
import { FaPlus } from "react-icons/fa";
import InputEmoji from "react-input-emoji";
import { MdSend } from "react-icons/md";

const ChatBox = ({ currentChat, setRealTimeMessage, receiveRealMessage }) => {
  const { auth } = useGlobalContext();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef(null);

  const getMessages = async () => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/find-message/${currentChat?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataFromResponse = await res.json();
      if (res.ok) {
        setMessages(dataFromResponse);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    const message = {
      senderId: auth?.user,
      chatId: currentChat?._id,
      text: newMessage,
    };
    try {
      let res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/new-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const dataFromResponse = await res.json();

      if (res.ok) {
        setMessages((prevMessages) => [...prevMessages, dataFromResponse]);
        setNewMessage("");
      }
    } catch (err) {
      console.log(err);
    }

    const receiverId = currentChat?.members.find((id) => id !== auth?.user);
    setRealTimeMessage({ ...message, receiverId });
  };

  useEffect(() => {
    if (currentChat?._id) {
      getMessages();
    }
  }, [currentChat?._id]);

  useEffect(() => {
    if (receiveRealMessage && receiveRealMessage.chatId === currentChat?._id) {
      setMessages((prevMessages) => [...prevMessages, receiveRealMessage]);
    }
  }, [receiveRealMessage]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* {!currentChat?.receiverId ? (
        <p className="text-center my-5">no chats yet</p>
      ) : (
        <></>
      )} */}

      {currentChat ? (
        <div className="w-[90vw] mx-auto">
          <div className="bg-green-200 h-screen overflow-auto rounded-lg p-5">
            {messages.length > 0 &&
              messages.map((ele, idx) => (
                <div
                  key={idx}
                  ref={scroll}
                  className={`flex p-2 rounded-md gap-3 ${
                    ele.senderId === auth?.user
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`items-end p-2 rounded-md ${
                      ele.senderId === auth?.user
                        ? "bg-green-300 text-right"
                        : "bg-green-400 text-left"
                    }`}
                  >
                    <p>{ele.text}</p>
                    <p className="text-sm text-gray-600">
                      {format(ele.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className="flex items-center fixed-bottom mb-5 mt-5">
            <p>
              <FaPlus />
            </p>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <button onClick={handleSendMessage}>
              <MdSend />
            </button>
          </div>
        </div>
      ) : (
        ""
        // <p className="text-center mt-6">Tap on above to start chat</p>
      )}
    </>
  );
};

export default ChatBox;
