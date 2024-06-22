import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { FaFileUpload, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { useGlobalContext } from "../context/userContext";

const CreateCompany = () => {
  const navigate = useNavigate("");
  const { auth } = useGlobalContext();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [photos, setPhotos] = useState([]);
  const [properties, setProperties] = useState([]);
  const [departmentData, setDepartmentData] = useState([
    "Information & Technology",
    "Computer Engineering",
    "Mechanical Engineering",
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    properties: properties.map((p) => ({
      name: p?.name,
      values: p?.values,
    }));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/create-company`,
        {
          method: "POST",

          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            type,
            about,
            address,
            city,
            state,
            postalCode,
            country,
            photos,
            department,
            properties: properties || [],
          }),
        }
      );

      const dataFromResponse = await res.json();
      if (res.ok) {
        toast.success(dataFromResponse?.msg);
        navigate("/companies");
      } else {
        toast.error(dataFromResponse?.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    // let data = files[0];
    const formData = new FormData();
    try {
      for (let i = 0; i < files.length; i++) {
        formData.append("photos", files[i]);
      }

      let imageUploadPromise = new Promise(async (resolve, reject) => {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/uploadCompanyPhoto`,
          {
            method: "POST",

            body: formData,
          }
        );

        const dataFromResponse = await res.json();
        if (res.ok) {
          resolve();
          setPhotos((prev) => {
            return [...prev, ...dataFromResponse?.photos];
          });
        } else {
          reject();
        }
      });

      toast.promise(imageUploadPromise, {
        loading: "uploading image...",
        success: "image uploaded",
        error: "something went wrong",
      });
    } catch (err) {
      console.log(err);
    }
  };

  //add properties
  const addProperties = (event) => {
    event.preventDefault();

    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  // handleSort
  const handleSort = (images) => {
    setPhotos(images);
  };

  // handleAddProperties
  const handleAddedPropertiesNames = async (
    index,
    property,
    proprtyCurrentName
  ) => {
    setProperties((prev) => {
      let properties = [...prev];
      properties[index].name = proprtyCurrentName;
      return properties;
    });
  };

  //for values
  const handleAddedPropertiesValues = async (
    index,
    property,
    proprtyCurrentValue
  ) => {
    setProperties((prev) => {
      let properties = [...prev];
      properties[index].values = proprtyCurrentValue;
      return properties;
    });
  };

  // removeProperties
  const removeProperties = (idx) => {
    let filterPropeties = properties.filter((ele, id) => {
      return id !== idx;
    });
    setProperties(filterPropeties);
  };

  // handleRemoveImage
  const handleRemoveImage = (id) => {
    let filterImages = photos?.filter((ele, idx) => {
      return idx !== id;
    });
    setPhotos(filterImages);
  };

  return (
    <>
      <Navbar />

      <div className=" bg-green-300 p-3">
        <h1 className="text-primary text-2xl text-center p-5">Create</h1>

        <div className="flex  items-center justify-center p-7">
          <form
            action=""
            className="bg-green-100 rounded-md p-5  w-[90%] flex gap-10 flex-col"
            // onSubmit={handleChange}
          >
            <label className=" cursor-pointer rounded-md  relative -bottom-6 flex gap-2 bg-green-200 hover:bg-green-50 p-3 items-center justify-center">
              Upload Photo <FaFileUpload size={30} />
              <input
                type="file"
                hidden
                multiple
                except="/Images/*"
                onChange={handleImageUpload}
                className="border p-3 rounded-md focus:bg-green-100"
              />
            </label>
            <div>
              <div>
                {photos?.length > 0 && (
                  <>
                    <ReactSortable
                      className="flex  my-5 gap-3 flex-wrap"
                      list={photos}
                      setList={handleSort}
                    >
                      {photos?.map((ele, idx) => {
                        return (
                          <div key={idx} className="sm:h-[150px] sm:w-[150px] ">
                            <img
                              src={`${
                                import.meta.env.VITE_BACKEND_URL
                              }/uploads/${ele}`}
                              className=" cursor-pointer rounded-lg w-[100%] h-[100%]"
                            ></img>
                            <button
                              className="absolute "
                              type="button"
                              onClick={() => handleRemoveImage(idx)}
                            >
                              {" "}
                              <FaTrash className=" text-red-600 hover:text-red-400" />
                            </button>
                          </div>
                        );
                      })}
                    </ReactSortable>
                  </>
                )}
              </div>

              {photos?.length === 0 && (
                <div className="text-red-400 mt-2 mb-3">
                  photos not avaliable
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 p-2 -mt-4">
              <label htmlFor=" name">Name</label>
              <input
                type="text"
                name="name"
                placeholder=" TCS"
                className="bg-green-200 rounded-lg p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 p-2 -mt-4">
              <label htmlFor=" type">Type</label>
              <input
                type="text"
                name="type"
                placeholder="service based company"
                className="bg-green-200 rounded-lg p-2"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 p-2  mb-3">
              <label htmlFor="category name">Select Department </label>
              <select
                className="bg-green-200 rounded-lg p-2 cursor-pointer"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Select One</option>
                {departmentData?.map((ele, idx) => {
                  return (
                    <option
                      value={ele?._id}
                      key={idx}
                      className="cursor-pointer"
                    >
                      {ele}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-3 p-2 -mt-4">
              <label htmlFor=" about">About</label>
              <textarea
                type="text"
                name="name"
                placeholder="about company"
                className="bg-green-200 rounded-lg p-2 h-[200px]"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 p-2 ">
              <label htmlFor=" address">Address</label>
              <input
                type="address"
                name="address"
                placeholder="location"
                className="bg-green-200 rounded-lg p-2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 p-2 -mt-4">
              <label htmlFor=" city">City</label>
              <input
                type="text"
                name="city"
                placeholder=" gandhinagar"
                className="bg-green-200 rounded-lg p-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 p-2 -mt-4">
              <label htmlFor="postal code">Postal Code</label>
              <input
                type="number"
                name="postal code"
                placeholder=" 231222"
                className="bg-green-200 rounded-lg p-2"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 p-2 -mt-4">
              <label htmlFor=" state">State</label>
              <input
                type="text"
                name="state"
                placeholder=" gujrat"
                className="bg-green-200 rounded-lg p-2"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 p-2 -mt-4">
              <label htmlFor=" country">Country</label>
              <input
                type="text"
                name="country"
                placeholder="india"
                className="bg-green-200 rounded-lg p-2"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div className="flex p-2 my-5">
              <button
                onClick={addProperties}
                className="flex items-center gap-2  bg-green-300 hover:bg-green-200 p-2 rounded-lg  
            "
              >
                Add Job & Salary
              </button>
            </div>
            {properties?.length > 0 && (
              <>
                {properties?.map((ele, idx) => {
                  return (
                    <>
                      <div className="flex bg-green-100 rounded-lg p-3 sm:items-center flex-wrap sm:flex-row flex-col gap-2">
                        <div
                          className="flex sm:flex-row flex-col gap-4 "
                          key={idx}
                        >
                          <div className="flex flex-col gap-3 p-2 ">
                            <label htmlFor="property name">Job Name</label>

                            <input
                              type="text"
                              placeholder="ex:mern stack"
                              className="bg-green-200 rounded-lg p-2"
                              value={ele?.name}
                              onChange={(e) =>
                                handleAddedPropertiesNames(
                                  idx,
                                  ele,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-3 p-2 ">
                            <label htmlFor="property value">Salary</label>

                            <input
                              type="text"
                              placeholder="ex:3 to 4 LPA"
                              className="bg-green-200 rounded-lg p-2"
                              value={ele?.values}
                              onChange={(e) =>
                                handleAddedPropertiesValues(
                                  idx,
                                  ele,
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-3 p-2 ">
                          <label htmlFor=""></label>
                          <button
                            type="button"
                            onClick={() => removeProperties(idx)}
                            className=" bg-red-300 hover:bg-red-400 p-2 rounded-lg"
                          >
                            Remove
                          </button>{" "}
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
            <button
              className="bg-green-200 p-2 w-[100%] mb-5  rounded-md hover:bg-green-50"
              onClick={handleSubmit}
            >
              Create
            </button>{" "}
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCompany;
