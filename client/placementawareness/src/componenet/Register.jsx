import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate("");

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");

  const handleChange = async (event) => {
    event.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      photo === "" ||
      role === ""
    ) {
      toast.error("complete the fields");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
          role,
          photo,
        }),
      });

      const dataFromResponse = await res.json();

      if (res.ok) {
        toast.success("user registered");
        navigate("/login");
      } else {
        toast.error(dataFromResponse?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // handleImageUpload

  const handleImageUpload = (event) => {
    let files = event.target.files;

    if (files) {
      let data = new FormData();

      if (files.length === 1) {
        data.set("photo", files[0]);

        try {
          let uploadImagePromise = new Promise(async (resolve, reject) => {
            let res = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/uploadPhoto`,
              {
                method: "POST",

                body: data,
              }
            );

            let dataFromResponse = await res.json();
            if (res.ok) {
              resolve();
              setPhoto(dataFromResponse?.photo);
            } else {
              reject();
            }
          });

          toast.promise(uploadImagePromise, {
            loading: "uploading image...",
            success: "image uploaded !!",
            error: "somethong went wrong",
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);
  // console.log(role);
  return (
    <>
      <div className=" bg-green-50 p-3">
        <h1 className="text-primary text-2xl text-center p-5">Register</h1>

        <div className="flex  items-center justify-center p-7">
          <form
            action=""
            className="bg-green-100 rounded-md p-5 md:w-[50%] sm:w-[70%] w-[90%] flex gap-10 flex-col"
            onSubmit={handleChange}
          >
            <label className=" cursor-pointer rounded-md  relative -bottom-6 flex gap-2 bg-green-200 hover:bg-green-50 p-3 items-center justify-center">
              Upload Photo <CgProfile size={30} />
              <input
                type="file"
                hidden
                except="/Images/*"
                onChange={handleImageUpload}
                className="border p-3 rounded-md focus:bg-green-100"
              />
            </label>
            {photo && (
              <>
                <div className="flex items-center justify-center mt-5">
                  <div className=" relative md:h-[170px] md:w-[170px]  sm:h-[130px]  sm:w-[130px] w-[100px]">
                    <img
                      src={`${
                        import.meta.env.VITE_BACKEND_URL
                      }/uploads/${photo}`}
                      className=" cursor-pointer rounded-lg w-[100%] h-[100%]"
                    ></img>
                    <button
                      className="absolute right-0 bottom-0"
                      type="button"
                      onClick={() => setPhoto("")}
                    >
                      {" "}
                      <FaTrash className=" text-red-600 hover:text-red-400" />
                    </button>
                  </div>{" "}
                </div>
              </>
            )}
            <div className="flex flex-col gap-3 p-2 -mt-4">
              <label htmlFor=" name">Name</label>
              <input
                type="text"
                name="name"
                placeholder=" john"
                className="bg-green-200 rounded-lg p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 p-2 ">
              <label htmlFor=" email">E-Mail</label>
              <input
                type="email"
                name="email"
                placeholder="john@gmail.com"
                className="bg-green-200 rounded-lg p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 p-2 ">
              <label htmlFor=" password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="xyz"
                className="bg-green-200 rounded-lg p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 p-2 cursor-pointer">
              <label htmlFor=" select role">Select role</label>

              <select
                className="bg-green-200 rounded-lg p-2 cursor-pointer"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select </option>

                <option value="Admin">Admin</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <button className="bg-green-200 p-2 w-[100%] mb-5  rounded-md hover:bg-green-50">
              Register
            </button>{" "}
          </form>
        </div>

        <p className="text-center p-5">
          Already have an account ?{" "}
          <NavLink
            to={"/login"}
            className="hover:underline hover: animate-pulse text-primary"
          >
            Login
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default Register;
