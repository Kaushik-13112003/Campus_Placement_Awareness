import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/userContext";

const useAlumniData = () => {
  const { auth } = useGlobalContext();
  const [alumniData, setAlumniData] = useState("");
  const getUser = async () => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/alumni-get-single-user?id=${
          auth?.user
        }`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataFromResponse = await res.json();

      if (res.ok) {
        setAlumniData(dataFromResponse?.singleUser);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth?.user) {
      getUser();
    }
  }, [auth?.user]);
  return { alumniData };
};

export default useAlumniData;
