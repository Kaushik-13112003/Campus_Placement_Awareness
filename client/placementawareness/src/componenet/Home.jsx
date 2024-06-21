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
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                userData?.photo
              }`}
              alt={userData?.name}
              className="w-[100%] object-contain rounded-full"
            />
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

      <section>
        {/* explore */}
        <NavLink to="/departments">
          <button className="bg-green-700 rounded-md p-2 text-green-200 hover:bg-green-500 duration-200">
            Explore Companies
          </button>
        </NavLink>
      </section>
    </>
  );
};

export default Home;
