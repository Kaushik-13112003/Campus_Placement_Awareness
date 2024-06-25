import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import CardComponent from "./CardComponent";
import useUserData from "./useUserData";

const Companies = () => {
  const [companyData, setCompanyData] = useState([]);
  const [sortCompanies, setSortCompanies] = useState([]);
  const [sortBy, setSortBy] = useState("All");
  const [departmentData, setDepartmentData] = useState([
    "Information & Technology",
    "Computer Engineering",
    "Mechanical Engineering",
  ]);
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
        setSortCompanies(dataFromResponse?.allCompanies);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSort = async (value) => {
    // console.log(value);
    setSortBy(value);

    let encodedValue = encodeURIComponent(value); // Encode the value

    try {
      let res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/sort-companies?department=${encodedValue}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataFromResponse = await res.json();
      console.log(dataFromResponse);

      if (res.ok) {
        setSortCompanies(dataFromResponse?.allCompanies);
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
        <div className="mt-6 sm:flex-row flex-col gap-4 flex items-center justify-around">
          <NavLink
            to={"/create-company"}
            className={
              "bg-green-700 p-3 text-green-50 hover:bg-green-600 hover:duration-1000 rounded-lg"
            }
          >
            Create Company
          </NavLink>

          <select
            className="bg-green-600 text-green-50 rounded-lg p-2 cursor-pointer"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="All">All</option>
            {departmentData?.map((ele, idx) => {
              return (
                <option value={ele} key={idx} className="cursor-pointer">
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {userData?.role !== "Admin" && (
        <div className="mt-6 sm:flex-row flex-col gap-4 flex items-center justify-around">
          <select
            className="bg-green-600 text-green-50 rounded-lg p-2 cursor-pointer"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="All">All</option>
            {departmentData?.map((ele, idx) => {
              return (
                <option value={ele} key={idx} className="cursor-pointer">
                  {ele}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {companyData?.length <= 0 && (
        <p className="text-center mt-6">no companies found </p>
      )}

      <CardComponent data={sortCompanies} />
    </>
  );
};

export default Companies;
