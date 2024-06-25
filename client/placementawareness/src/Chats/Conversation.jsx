import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/userContext";
import ChatBox from "./ChatBox";

const Conversation = ({ currentUserId, data, online }) => {
  let { auth } = useGlobalContext();
  const [userToWhomSendMessage, setUserToWhomSendMessage] = useState("");
  //   console.log(currentUserId);

  const getUser = async (userId) => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-single-user?id=${userId}`,
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
        setUserToWhomSendMessage(dataFromResponse?.singleUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      let userId = data?.members?.find((id) => id !== auth?.user);

      if (userId) {
        getUser(userId);
      }
    }
  }, [currentUserId]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-5">
        {userToWhomSendMessage?.photo && (
          <>
            <div className="flex items-center gap-4">
              <div className=" flex flex-col items-center">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                    userToWhomSendMessage?.photo
                  }`}
                  alt={userToWhomSendMessage?.name}
                  className="w-[70px] rounded-full "
                />
                {/* <p className="">{online ? "Online" : "Ofline"}</p> */}
              </div>
              <p className="text-2xl">{userToWhomSendMessage?.name}</p>
            </div>
          </>
        )}
      </div>

      <div className="h-[1px] w-[90vw] mx-auto bg-green-600 mt-5"></div>
      {/* <ChatBox /> */}
    </>
  );
};

export default Conversation;
