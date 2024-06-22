import React from "react";
import useUserData from "./useUserData";
import { IoIosLogOut } from "react-icons/io";
import { useGlobalContext } from "../context/userContext";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GiAwareness } from "react-icons/gi";

const Home = () => {
  const navigate = useNavigate("");
  let { userData } = useUserData();
  let { setAuth } = useGlobalContext();

  //   handleLogout
  const handleLogout = () => {
    setAuth({
      user: "",
      token: "",
    });
    localStorage.removeItem("placement");
    navigate("/login");
    toast.success("logout successfully");
  };
  return (
    <>
      <nav className=" flex justify-around sm:flex-row flex-col gap-4 p-6 text-green-200 items-center bg-green-700">
        <NavLink
          to="/"
          className={
            "flex gap-2 items-center text-3xl hover:text-green-100  animate-bounce "
          }
        >
          <h1 className=" ">Placemnt </h1>
          <GiAwareness />
        </NavLink>

        <div className="flex gap-4 items-center">
          <div className="w-[50px] ">
            <NavLink
              to={`/profile/${userData?._id}`}
              className={"hover:text-green-300"}
            >
              {" "}
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                  userData?.photo
                }`}
                alt={userData?.name}
                className="w-[100%] object-contain rounded-full"
              />{" "}
            </NavLink>
          </div>
          <p>{userData?.name}</p>
          <button onClick={handleLogout}>
            <IoIosLogOut
              size={30}
              className="hover:text-green-200 hover:animate-pulse duration-200"
            />
          </button>
        </div>
      </nav>

      <section className="flex flex-col gap-5 items-center mt-8">
        {/* explore */}
        <h1 className="font-bold text-5xl text-green-800">LDCE</h1>
        <p className="sm:text-3xl text-2xl">Campus Placement Awareness</p>
      </section>

      <section className="w-[90vw] mx-auto mt-7">
        <div className="flex flex-col gap-3 text-justify mb-10">
          <h1 className="font-bold text-3xl text-green-800">Our Vision</h1>
          <p>
            The idea behind Campus Placement Awareness is to create a
            centralized platform for facilitating campus placements, connecting
            students, colleges, and companies in a seamless and efficient
            manner. Students can explore job opportunities, access information
            about companies arriving at their colleges & match companies
            according to their skills. Colleges can showcase their placement
            records, schedule placement events, and track student progress.
          </p>
          <p>
            By providing a comprehensive solution to the campus placement
            process, Campus Placement Awareness aims to streamline recruitment
            efforts, improve student outcomes, and foster meaningful connections
            between students and companies.
          </p>
          <NavLink to="/companies">
            <button className="bg-green-700 rounded-md p-2 text-green-200 hover:bg-green-600 duration-200">
              Explore Companies
            </button>
          </NavLink>
        </div>
      </section>
    </>
  );
};

export default Home;
