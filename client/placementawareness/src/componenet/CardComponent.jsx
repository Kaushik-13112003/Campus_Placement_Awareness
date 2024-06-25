import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/userContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

const CardComponent = ({ data }) => {
  const [allCompanies, setAllCompanies] = useState([]);

  const { auth } = useGlobalContext();

  const handleDelete = async (id) => {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/delete-company/${id}`,
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let dataFromResponse = await res.json();
      if (res.ok) {
        toast.success("company deleted");
        setAllCompanies(dataFromResponse?.allCompanies);
      } else {
        toast.error("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setAllCompanies(data);
  }, [data]);
  return (
    <>
      <div className="min-h-screen  p-8">
        {allCompanies?.length <= 0 && (
          <p className="text-center mt-6">no companies found </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {allCompanies?.map((ele, idx) => (
            <>
              <div className=" position-realtive">
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-lg hover:scale-105"
                >
                  <NavLink to={`/single-company/${ele?._id}`}>
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        ele?.photos[0]
                      }`}
                      alt={ele.title}
                      className="w-full h-52 object-cover rounded-lg mb-4"
                    />
                  </NavLink>
                  <h2 className="text-2xl font-bold mb-2">
                    {ele.name?.toUpperCase()}
                  </h2>
                  <p className="text-gray-600 mb-4">{ele.type}</p>
                  <p className="text-gray-800 mb-4">
                    {ele.about?.substring(0, 60) + "...."}
                  </p>

                  <div className="flex justify-between">
                    <NavLink
                      to={`/single-company/${ele._id}`}
                      className="text-indigo-500 hover:underline hover:font-semibold"
                    >
                      Explore More...
                    </NavLink>

                    {ele.admin?.role === "Admin" &&
                      ele.admin?._id === auth?.user && (
                        <div className="flex gap-3 ">
                          <NavLink to={`/edit-company/${ele?._id}`}>
                            <button>
                              <FaEdit
                                size={20}
                                className="hover:text-green-600 hover:duration-500"
                              />
                            </button>
                          </NavLink>

                          <NavLink>
                            <button onClick={() => handleDelete(ele?._id)}>
                              <FaTrash className="hover:text-red-600 hover:duration-500" />
                            </button>
                          </NavLink>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardComponent;
