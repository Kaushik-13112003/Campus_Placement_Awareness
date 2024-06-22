import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { MdLocationPin } from "react-icons/md";
import { useParams, NavLink } from "react-router-dom";

const SingleCompany = () => {
  const [singleCompanyData, setSingleCompanyData] = useState("");
  const { id } = useParams();

  //   getSingleCompany
  const getSingleCompany = async () => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/get-single-company/${id}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const dataFromResponse = await res.json();

      if (res.ok) {
        setSingleCompanyData(dataFromResponse?.singleCompany);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleCompany();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="w-[90vw] mx-auto mt-6">
        <div className="flex flex-col gap-2">
          <h1 className="sm:text-3xl text-2xl font-bold">
            {singleCompanyData?.name?.toUpperCase()}
          </h1>
          <p className="text-red-600">{singleCompanyData?.type}</p>
          <p className=" text-justify">{singleCompanyData?.about}</p>
        </div>
      </div>

      <div className="flex items-center  justify-center mt-5 ">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4 grid-cols-1  grid-flow-dense">
          {singleCompanyData?.photos?.map((ele, idx) => {
            return (
              <div key={idx} className="sm:w-[200px] sm:h-[200px] w-[90vw]">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${ele}`}
                  alt=""
                  className=" w-[100%] h-[100%] object-cover rounded-lg mt-3 hover:animate-pulse hover:cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-[90vw] mx-auto mt-10 mb-10">
        <h1 className="sm:text-3xl text-2xl font-bold mb-5 mt-10">
          Jobs & Salary
        </h1>
        {singleCompanyData?.properties?.length > 0 && (
          <>
            {singleCompanyData?.properties?.map((ele, idx) => {
              return (
                <>
                  <div className="flex bg-green-100 rounded-lg p-3 sm:items-center flex-wrap sm:flex-row flex-col gap-2">
                    <div className="flex sm:flex-row flex-col gap-4 " key={idx}>
                      <div className="flex flex-col gap-3 p-2 ">
                        <label htmlFor="property name">Job Name</label>

                        <input
                          type="text"
                          placeholder="ex:mern stack"
                          className="bg-green-200 rounded-lg p-2"
                          value={ele?.name}
                        />
                      </div>
                      <div className="flex flex-col gap-3 p-2 ">
                        <label htmlFor="property value">Salary</label>

                        <input
                          type="text"
                          placeholder="ex:3 to 4 LPA"
                          className="bg-green-200 rounded-lg p-2"
                          value={ele?.values}
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        )}

        <h1 className="sm:text-3xl text-2xl font-bold mb-5 mt-10">Location</h1>
        <div>
          <NavLink
            target="_blank"
            className={
              "-ml-2 mb-2 text-color location flex gap-2 hover:text-green-600 hover:duration-700"
            }
            to={`https://maps.google.com/?q=${singleCompanyData?.address}`}
          >
            <MdLocationPin size={30} />
            <span>{singleCompanyData?.address}</span>{" "}
          </NavLink>
          <p>
            {singleCompanyData?.city} - {singleCompanyData?.postalCode}
          </p>
          <p>
            {singleCompanyData?.state},{singleCompanyData?.country}
          </p>
        </div>
      </div>
    </>
  );
};

export default SingleCompany;
