import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import useUserData from "./useUserData";
import { useGlobalContext } from "../context/userContext";

const UpdateProfile = () => {
  const navigate = useNavigate("");
  const { auth } = useGlobalContext();

  let { userData } = useUserData();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [whatsAppNumber, setwhatsAppNumber] = useState("");
  const [linkedInUrl, setlinkedInUrl] = useState("");
  const [currentCompany, setCurrentCompany] = useState("");
  const [currentRole, setCurrentRole] = useState("");

  const handleChange = async (event) => {
    event.preventDefault();

    if (userData?.role === "Alumni") {
      if (
        name === "" ||
        photo === "" ||
        currentCompany === "" ||
        currentRole === "" ||
        linkedInUrl === ""
      ) {
        toast.error("complete the fields");
        return;
      }
    } else {
      if (name === "" || photo === "") {
        toast.error("complete the fields");
        return;
      }
    }

    let data;
    if (userData?.role === "Alumni") {
      data = { currentCompany, name, currentRole, photo, linkedInUrl };
    } else {
      data = { name, photo };
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-profile/${userData?._id}`,
        {
          method: "PUT",

          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...data,role
          }),
        }
      );

      const dataFromResponse = await res.json();

      if (res.ok) {
        toast.success("profile updated");
        navigate(`/profile/${userData?._id}`);
      } else {
        toast.error(dataFromResponse?.message || "something went wrong !!");
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

    if (userData) {
      setName(userData?.name);
      setEmail(userData?.email);
      setRole(userData?.role);
      setPhoto(userData?.photo);
      if (userData?.role === "Alumni") {
        setCurrentCompany(userData?.currentCompany);
        setCurrentRole(userData?.currentRole);
        setlinkedInUrl(userData?.linkedInUrl);
        setwhatsAppNumber(userData?.whatsAppNumber);
      }
    }
  }, [navigate, userData]);
  // console.log(role);
  return (
    <>
      <Navbar />
      <div className=" bg-green-300 p-3">
        <h1 className="text-primary text-2xl text-center p-5">
          Updating Profile...
        </h1>

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
            <div className="flex flex-col gap-3 p-2 cursor-pointer">
              <label htmlFor=" select role">Select role</label>

              <select
                disabled
                className="bg-green-200 rounded-lg p-2 cursor-pointer"
              >
                <option value={role}>{role}</option>
              </select>
            </div>
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
                disabled
                value={email}
                placeholder="john@gmail.com"
                className="bg-green-200 rounded-lg p-2"
              />
            </div>
            {userData?.role === "Alumni" && (
              <>
                <div className="flex flex-col gap-3 p-2 ">
                  <label htmlFor=" phone">WhatsApp Number</label>
                  <input
                    type="phone"
                    name="phone"
                    disabled
                    placeholder="1936272777"
                    className="bg-green-200 rounded-lg p-2"
                    value={whatsAppNumber}
                  />
                </div>
                <div className="flex flex-col gap-3 p-2 ">
                  <label htmlFor=" linkedInUrl">LinkedIn URL</label>
                  <input
                    type="linkedInUrl"
                    name="linkedInUrl"
                    placeholder="your profile url"
                    className="bg-green-200 rounded-lg p-2"
                    value={linkedInUrl}
                    onChange={(e) => setlinkedInUrl(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3 p-2 ">
                  <label htmlFor=" currentCompany">Working Company</label>
                  <input
                    type="currentCompany"
                    name="currentCompany"
                    placeholder="TCS"
                    className="bg-green-200 rounded-lg p-2"
                    value={currentCompany}
                    onChange={(e) => setCurrentCompany(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3 p-2 ">
                  <label htmlFor=" currentRole">Current Role</label>
                  <input
                    type="currentRole"
                    name="currentRole"
                    placeholder="senior mamager"
                    className="bg-green-200 rounded-lg p-2"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                  />
                </div>
              </>
            )}
            <button className="bg-green-200 p-2 w-[100%] mb-5  rounded-md hover:bg-green-50">
              Update
            </button>{" "}
          </form>
        </div>

        <p className="text-center p-5">
          Go Back ?{" "}
          <NavLink
            to={`/profile/${userData?._id}`}
            className="hover:underline hover: animate-pulse text-primary"
          >
            Profile
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default UpdateProfile;
