import React, { useEffect } from "react";
import Navbar from "./Navbar";
import useUserData from "./useUserData";
import { FaUserEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/userContext";
import useAlumniData from "../Alumni/userAlumniData";

const Profile = () => {
  let { userData } = useUserData();
  let { alumniData } = useAlumniData();
  const { auth } = useGlobalContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      <div className="  flex  items-center justify-center h-[90vh]">
        <div className="bg-green-300  p-6 rounded-md flex items-center  justify-between w-[50%] sm:flex-row flex-col gap-5 ">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
              auth?.role === "Alumni" ? alumniData?.photo : userData?.photo
            }`}
            alt={userData?.name}
            className="sm:w-[200px] w-[100%] rounded-full"
          />

          <div className="flex flex-col gap-4">
            <p className="sm:text-3xl text-2xl">{userData?.name}</p>
            <p>{userData?.email}</p>
            <p className="bg-green-100 mt-2 text-center p-3 rounded-full">
              {userData?.role}
            </p>

            <NavLink
              to={`/profile-update/${userData?._id}`}
              className="bg-green-100  hover:bg-green-200 flex items-center justify-center p-2 rounded-full"
            >
              <button>
                <FaUserEdit size={30} />
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
