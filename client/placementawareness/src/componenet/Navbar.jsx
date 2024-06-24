import React, { useCallback, useState } from "react";
import { GiAwareness, GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useGlobalContext } from "../context/userContext";
import { NavLink } from "react-router-dom";
import useUserData from "./useUserData";

const Navbar = () => {
  const { auth } = useGlobalContext();
  let { userData } = useUserData();
  const [toggle, setToggle] = useState(false);

  const toggleFunction = useCallback(() => {
    setToggle((value) => !value);
  }, []);

  return (
    <>
      <header className="border flex justify-between items-center bg-green-100 p-3 ">
        <div>
          <NavLink
            to="/"
            className={
              "flex gap-2 p-2 items-center text-3xl hover:text-green-700 duration-1000  "
            }
          >
            <h1 className=" ">Placemnt </h1>
            <GiAwareness />
          </NavLink>
        </div>

        <>
          <div className="hidden  gap-3 items-center sm:flex ">
            <NavLink
              to={`/profile/${auth?.user}`}
              className="hover:text-green-500"
              style={{ textDecoration: "none" }}
            >
              <CgProfile size={30} />
            </NavLink>

            <NavLink
              to={`/`}
              className="hover:text-green-500"
              style={{ textDecoration: "none" }}
            >
              Home
            </NavLink>

            <NavLink
              to={"/companies"}
              className="hover:text-green-500"
              style={{ textDecoration: "none" }}
            >
              Companies
            </NavLink>

            {userData.role === "Admin" && (
              <>
                <NavLink
                  to={"/mycompanies"}
                  className="hover:text-green-500"
                  style={{ textDecoration: "none" }}
                >
                  My Company
                </NavLink>
              </>
            )}

            {userData.role !== "Admin" && (
              <>
                <NavLink
                  to={"/chat"}
                  className="hover:text-green-500"
                  style={{ textDecoration: "none" }}
                >
                  Chats
                </NavLink>
              </>
            )}

            <NavLink
              to={"/internships"}
              className="hover:text-green-500"
              style={{ textDecoration: "none" }}
            >
              Internships
            </NavLink>

            <NavLink
              to={"/events"}
              className="hover:text-green-500"
              style={{ textDecoration: "none" }}
            >
              Events
            </NavLink>
          </div>
        </>

        <div className="sm:hidden block">
          {!toggle ? (
            <GiHamburgerMenu
              size={25}
              onClick={toggleFunction}
              className="cursor-pointer"
            />
          ) : (
            <IoIosCloseCircle
              size={25}
              onClick={toggleFunction}
              className="cursor-pointer"
            />
          )}
        </div>
      </header>

      <div>
        <>
          {toggle ? (
            <>
              <div className="bg-green-200 p-2 sm:hidden  gap-4 items-center flex flex-col w-[100%]">
                <NavLink
                  onClick={toggleFunction}
                  to={`/profile/${auth?.user}`}
                  className="hover:text-green-500"
                  style={{ textDecoration: "none" }}
                >
                  <CgProfile size={30} className="my-3" />
                </NavLink>

                <NavLink
                  onClick={toggleFunction}
                  to={`/`}
                  className="hover:text-green-500"
                  style={{ textDecoration: "none" }}
                >
                  Home{" "}
                </NavLink>

                <NavLink
                  onClick={toggleFunction}
                  to={"/companies"}
                  className="hover:text-green-500 hover:bg-green-100 w-[100%] text-center rounded-sm p-1"
                  style={{ textDecoration: "none" }}
                >
                  Companies
                </NavLink>
                {userData.role === "Admin" && (
                  <>
                    <NavLink
                      onClick={toggleFunction}
                      to={"/mycompanies"}
                      className="hover:text-green-500 hover:bg-green-100 w-[100%] text-center rounded-sm p-1"
                      style={{ textDecoration: "none" }}
                    >
                      My Companies
                    </NavLink>
                  </>
                )}

                {userData.role !== "Admin" && (
                  <>
                    <NavLink
                      onClick={toggleFunction}
                      to={"/chat"}
                      className="hover:text-green-500 hover:bg-green-100 w-[100%] text-center rounded-sm p-1"
                      style={{ textDecoration: "none" }}
                    >
                      Chats
                    </NavLink>
                  </>
                )}

                <NavLink
                  to={"/internships"}
                  onClick={toggleFunction}
                  className="hover:text-green-500 hover:bg-green-100 w-[100%] text-center rounded-sm p-1"
                  style={{ textDecoration: "none" }}
                >
                  Internships
                </NavLink>

                <NavLink
                  onClick={toggleFunction}
                  to={"/events"}
                  className="hover:text-green-500 hover:bg-green-100 w-[100%] text-center rounded-sm p-1"
                  style={{ textDecoration: "none" }}
                >
                  Events
                </NavLink>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      </div>
    </>
  );
};

// export default Header;
export default Navbar;
