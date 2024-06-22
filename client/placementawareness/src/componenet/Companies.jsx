import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import CardComponent from "./CardComponent";
import useUserData from "./useUserData";

const Companies = () => {
  const [companyData, setCompanyData] = useState([]);
  let { userData } = useUserData();

  const getCompanies = async () => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-all-companies`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataFromResponse = await res.json();

      if (res.ok) {
        setCompanyData(dataFromResponse?.allCompanies);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCompanies();
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
      {companyData?.lenght <= 0 && <p>no companies found </p>}

      <CardComponent data={companyData} />
    </>
  );
};

export default Companies;
