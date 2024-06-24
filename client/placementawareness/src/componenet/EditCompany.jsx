import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { FaFileUpload, FaLinkedin, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { useGlobalContext } from "../context/userContext";
import { CgMail, CgPhone } from "react-icons/cg";

const EditCompany = () => {
  const navigate = useNavigate("");
  const { auth } = useGlobalContext();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [photos, setPhotos] = useState([]);
  const [properties, setProperties] = useState([]);
  const [alumniData, setAlumniData] = useState([]);
  const [alumniResult, setAlumniResults] = useState([]);
  const [department, setDepartment] = useState("");
  const [departmentData, setDepartmentData] = useState([
    "Information & Technology",
    "Computer Engineering",
    "Mechanical Engineering",
  ]);
  const [alumniSearchQuery, setAlumniSearchQuery] = useState("");
  const [alumniSearchResults, setAlumniSearchResults] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    properties: properties.map((p) => ({
      name: p?.name,
      values: p?.values,
    }));

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-company/${id}`,
        {
          method: "PUT",

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
        navigate(-1);
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
        setName(dataFromResponse?.singleCompany?.name);
        setType(dataFromResponse?.singleCompany?.type);
        setAbout(dataFromResponse?.singleCompany?.about);
        setCountry(dataFromResponse?.singleCompany?.country);
        setCity(dataFromResponse?.singleCompany?.city);
        setPostalCode(dataFromResponse?.singleCompany?.postalCode);
        setState(dataFromResponse?.singleCompany?.state);
        setProperties(dataFromResponse?.singleCompany?.properties);
        setAddress(dataFromResponse?.singleCompany?.address);
        setPhotos(dataFromResponse?.singleCompany?.photos);
        setDepartment(dataFromResponse?.singleCompany?.department);
        setAlumniResults(dataFromResponse?.findAlumnies);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAlumniSearch = async () => {
    if (alumniSearchQuery === "") {
      toast.error("enter something to search");
      return;
    }
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/search-alumni?query=${alumniSearchQuery}`,
        {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
        }
      );

      const dataFromResponse = await res.json();
      // console.log(dataFromResponse);
      if (dataFromResponse?.length > 0) {
        setAlumniSearchResults(dataFromResponse);
        setAlumniSearchQuery("");
      } else {
        toast.error("alumni not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddAlumni = async (alumniId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/add-alumni/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ alumniId }),
        }
      );

      const dataFromResponse = await res.json();
      if (res.ok) {
        setSelectedAlumni((prev) => [...prev, dataFromResponse]);
        toast.success("Alumni added successfully");
      } else {
        toast.error(dataFromResponse?.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeAlumni = (id) => {
    let filter = alumniSearchResults.filter((ele) => {
      return ele?._id !== id;
    });
    setAlumniSearchResults(filter);
  };

  useEffect(() => {
    getSingleCompany();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className=" bg-green-300 p-3">
        <h1 className="text-primary text-2xl text-center p-5">Updating...</h1>

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
            {alumniResult?.length > 0 && (
              <h1 className="p-2 text-center  text-2xl">Alumni</h1>
            )}
            {alumniResult?.map((alumni, idx) => (
              <div
                key={idx}
                className="flex justify-around sm:flex-row flex-col gap-5 items-center bg-green-400 mt-6 rounded-lg p-4"
              >
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col gap-2 items-center">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        alumni?.photo
                      }`}
                      alt=""
                      className="w-[100px] rounded-full"
                    />
                    <p>{alumni?.name}</p>
                  </div>
                </div>

                <div className=" flex flex-col gap-2">
                  <a
                    target="_blank"
                    className="hover:text-white flex gap-2 items-center"
                    href={`mailto:${alumni?.email}`}
                  >
                    <CgMail size={20} />
                    <span>{alumni?.email}</span>
                  </a>
                  <a
                    target="_blank"
                    className="hover:text-white flex gap-2 items-center"
                    // href={`tel:${alumni?.whatsAppNumber}`}
                    href={`https://wa.me/${alumni?.whatsAppNumber}`}
                  >
                    <CgPhone size={20} />
                    <span>{alumni?.whatsAppNumber}</span>
                  </a>
                  <a
                    target="_blank"
                    className="hover:text-white flex gap-2 items-center"
                    href={alumni?.linkedInUrl}
                  >
                    <FaLinkedin size={20} />
                    <span>{alumni?.linkedInUrl}</span>
                  </a>
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-3 p-2 -mt-4">
              <label htmlFor="alumniSearch">Add Alumni</label>
              <input
                type="text"
                name="alumniSearch"
                placeholder="Search by name or email"
                className="bg-green-200 rounded-lg p-2"
                value={alumniSearchQuery}
                onChange={(e) => setAlumniSearchQuery(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAlumniSearch}
                className="bg-green-300 hover:bg-green-200 p-2 rounded-lg mt-2"
              >
                Search Alumni
              </button>
            </div>
            {/* alumni if found */}
            {alumniSearchResults?.length > 0 && (
              <div className="flex flex-col gap-3 p-2 -mt-4">
                {alumniSearchResults.map((alumni, idx) => (
                  <div
                    key={idx}
                    className="flex justify-around sm:flex-row flex-col gap-5 items-center bg-green-200 rounded-lg p-4"
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                          alumni?.photo
                        }`}
                        alt=""
                        className="w-[100px] rounded-full"
                      />
                      <span>{alumni?.name}</span>
                    </div>

                    <div className="flex gap-3 ">
                      <button
                        type="button"
                        onClick={() => handleAddAlumni(alumni._id)}
                        className="bg-green-300 hover:bg-green-100 w-[100px] p-2 rounded-lg"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => removeAlumni(alumni._id)}
                        className="bg-red-300 w-[100px] hover:bg-red-100 p-2 rounded-lg"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              className="bg-green-200 p-2 w-[100%] mb-5  rounded-md hover:bg-green-50"
              onClick={handleSubmit}
            >
              Update
            </button>{" "}
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCompany;
