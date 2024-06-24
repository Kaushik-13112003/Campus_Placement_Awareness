// // import React, { useEffect, useState } from "react";
// // import io from "socket.io-client";
// // import { useParams } from "react-router-dom";
// // import { useGlobalContext } from "../context/userContext";
// // import useUserData from "./useUserData";
// // import Navbar from "./Navbar";
// // import MyChat from "./MyChat";

// // const socket = io(import.meta.env.VITE_BACKEND_URL, {
// //   withCredentials: true,
// //   extraHeaders: {
// //     "my-custom-header": "example",
// //   },
// // });

// // const Chat = () => {
// //   const { auth } = useGlobalContext();
// //   const [userId, setUserId] = useState("");
// //   let { userData } = useUserData();
// //   const { alumniId } = useParams();
// //   const [message, setMessage] = useState("");
// //   const [messages, setMessages] = useState([]);

// //   useEffect(() => {
// //     if (userId && alumniId) {
// //       socket.emit("join", { userId, alumniId });

// //       socket.on("receiveMessage", (newMessage) => {
// //         setMessages((prevMessages) => [...prevMessages, newMessage]);
// //       });

// //       return () => {
// //         socket.off("receiveMessage"); // Cleanup on unmount
// //         socket.disconnect();
// //       };
// //     }
// //   }, [userId, alumniId]);

// //   const sendMessage = () => {
// //     if (message.trim()) {
// //       socket.emit("sendMessage", { userId, alumniId, message });
// //       setMessage("");
// //     }
// //   };

// //   useEffect(() => {
// //     setUserId(userData?._id);
// //   }, [userData?._id]);

// //   return (
// //     <>
// //       <Navbar />

// //       <div className="flex justify-center items-center h-screen gap-4">
// //         <div className="">
// //           <MyChat />

// //           <div className="w-[50vw]">
// //             <div className="chat-box">
// //               {/* {messages.map((msg, idx) => (
// //                 <div key={idx} className="message">
// //                   <p>{msg.message}</p>
// //                   <p>{new Date(msg.timestamp).toLocaleTimeString()}</p>
// //                 </div>
// //               ))} */}
// //             </div>
// //             <input
// //               type="text"
// //               value={message}
// //               className="bg-green-200 p-2 mt-5 rounded-md"
// //               onChange={(e) => setMessage(e.target.value)}
// //               placeholder="Type your message..."
// //             />
// //             <button onClick={sendMessage}>Send</button>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Chat;
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";
// import { useGlobalContext } from "../context/userContext";
// import useUserData from "./useUserData";
// import MyChat from "./MyChat";

// const socket = io(import.meta.env.VITE_BACKEND_URL, {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "example",
//   },
// });

// const Chat = ({ alumniId }) => {
//   const { auth } = useGlobalContext();
//   const [userId, setUserId] = useState("");
//   let { userData } = useUserData();
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     if (userId && alumniId) {
//       socket.emit("join", { userId, alumniId });

//       socket.on("receiveMessage", (newMessage) => {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       });

//       return () => {
//         socket.off("receiveMessage"); // Cleanup on unmount
//         socket.disconnect();
//       };
//     }
//   }, [userId, alumniId]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("sendMessage", { userId, alumniId, message });
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { userId, message, timestamp: new Date() },
//       ]);
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     setUserId(userData?._id);
//   }, [userData?._id]);

//   return (
//     <div className="flex justify-center items-center h-screen gap-4">
//       <MyChat />
//       <div className="w-[50vw]">
//         <div className="chat-box">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`message ${
//                 msg.userId === userId ? "outgoing" : "incoming"
//               }`}
//             >
//               <p>{msg.message}</p>
//               <p>{new Date(msg.timestamp).toLocaleTimeString()}</p>
//             </div>
//           ))}
//         </div>
//         <input
//           type="text"
//           value={message}
//           className="bg-green-200 p-2 mt-5 rounded-md"
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
