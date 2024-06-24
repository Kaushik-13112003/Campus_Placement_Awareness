// import React, { useEffect, useState } from "react";
// import useUserData from "./useUserData";

// const MyChat = () => {
//   const { userData } = useUserData();

//   const [allChats, setAllChats] = useState([]);
//   const [allMessages, setAllMessages] = useState([]);

//   const getAllChats = async () => {
//     try {
//       let res = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/get-all-chats/${userData?._id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.ok) {
//         const dataFromResponse = await res.json();
//         // console.log(dataFromResponse?.allChats);

//         setAllChats(dataFromResponse?.allChats);
//         // Assuming each chat has an array of messages
//         const messages = dataFromResponse?.allChats?.flatMap(
//           (chat) => chat.messages
//         );
//         setAllMessages(messages);
//       } else {
//         console.error("Failed to fetch chats");
//       }
//     } catch (err) {
//       console.error("Error fetching chats:", err);
//     }
//   };

//   useEffect(() => {
//     if (userData?._id) {
//       getAllChats();
//     }
//   }, [userData?._id]);

//   return (
//     <>
//       <div className="flex  justify-center items-center">
//         <div className="bg-green-300 p-3 rounded-md w-50vw flex overflow-auto h-[300px]  flex-col ">
//           {allMessages?.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`message ${
//                 msg.userId === "userId" ? "outgoing " : "incoming   items-start"
//               }`}
//             >
//               <p>{msg.message}</p>
//               <p>{new Date(msg.timestamp).toLocaleTimeString()}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MyChat;
