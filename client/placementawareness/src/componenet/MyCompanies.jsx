import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useGlobalContext } from "../context/userContext";
import CardComponent from "./CardComponent";
import { NavLink } from "react-router-dom";
import useUserData from "./useUserData";

const MyCompanies = () => {
  const { auth } = useGlobalContext();
  const { userData } = useUserData();

  const [myCompanyData, setMyCompanyData] = useState([]);
  const getMyCompanies = async () => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/single-admin-company/${
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
      // console.log(dataFromResponse);

      if (res.ok) {
        setMyCompanyData(dataFromResponse?.allCompanies);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getMyCompanies();
  }, []);
  return (
    <>
      <Navbar />
      {userData?.role === "Admin" && (
        <div className="mt-6 flex items-center justify-center">
          <NavLink
            to={"/create-company"}
            className={
              "bg-green-700 p-3 text-green-50 hover:bg-green-600 hover:duration-1000 rounded-lg"
            }
          >
            Create Company
          </NavLink>
        </div>
      )}
      {myCompanyData?.length <= 0 && (
        <>
          <div className="flex flex-col gap-3 items-center mt-7">
            <p>No companies found</p>
          </div>
        </>
      )}
      <CardComponent data={myCompanyData} />
    </>
  );
};

export default MyCompanies;
