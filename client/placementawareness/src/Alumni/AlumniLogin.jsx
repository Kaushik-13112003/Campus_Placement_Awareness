import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/userContext";

const AlumniLogin = () => {
  const navigate = useNavigate("");
  const { setAuth } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleChange = async (event) => {
    event.preventDefault();

    if (email === "" || password === "" || role === "") {
      toast.error("complete the fields");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/alumni-login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
            role,
          }),
        }
      );

      let dataFromResponse = await res.json();

      if (res.ok) {
        setAuth({
          token: dataFromResponse?.token,
          user: dataFromResponse?.loginData,
          role: dataFromResponse?.role,
        });
        localStorage.setItem("placement", JSON.stringify(dataFromResponse));
        toast.success("login successfully");
        navigate("/");
      } else {
        toast.error(dataFromResponse?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  return (
    <>
      <div className=" bg-red-300 p-3">
        <h1 className="text-primary text-2xl text-center p-5">Alumni Login</h1>

        <div className="flex  items-center justify-center p-7">
          <form
            className="bg-red-100 rounded-md p-5 md:w-[50%] sm:w-[70%] w-[90%] flex gap-6 flex-col"
            onSubmit={handleChange}
          >
            <div className="flex flex-col gap-3 p-2 cursor-pointer">
              <label htmlFor=" select role">Select role</label>

              <select
                className="bg-red-200 rounded-lg p-2 cursor-pointer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select</option>

                <option value="Alumni">Alumni</option>
              </select>
            </div>
            <div className="flex flex-col gap-3 p-2 ">
              <label htmlFor=" email">E-Mail</label>
              <input
                type="email"
                name="email"
                placeholder="john@gmail.com"
                className="bg-red-200 rounded-lg p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 p-2  mb-5">
              <label htmlFor=" password">Password</label>
              <input
                type="password"
                name="password"
                placeholder=" xyz"
                className="bg-red-200 rounded-lg p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="bg-red-200 p-2 w-[100%] mb-5 rounded-md hover:bg-red-50">
              Login
            </button>
          </form>
        </div>

        <p className="text-center p-5">
          Do not have an account ?{" "}
          <NavLink
            to={"/register"}
            className="hover:underline hover: animate-pulse text-primary"
          >
            Register
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default AlumniLogin;
