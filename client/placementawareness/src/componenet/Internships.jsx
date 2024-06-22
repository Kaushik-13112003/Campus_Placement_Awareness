import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "./Navbar";

export default function BodyPage() {
  return (
    <>
      <Navbar />
      <div className="w-[90vw] mx-auto mt-8">
        {/* internships div */}
        <div className="flex sm:flex-row gap-10 flex-col items-center justify-center bg--200 mb-10">
          <div className="sm:order-1 order-2 ">
            <h1 className="sm:text-5xl text-3xl mb-4">Internships</h1>
            <h2 className="sm:text-3xl text-1xl mb-2">
              Internships in business, engineering and technology and more
            </h2>

            <button className="bg-blue-700 p-3 rounded-full text-white mt-3">
              <NavLink target="_blank" to="https://www.linkedin.com/feed/">
                Explore more Internships
              </NavLink>
            </button>
          </div>

          {/* images div */}
          <div className="sm:order-2 order-1">
            <div className="">
              <img
                src="project_discuss.jpg"
                alt="project discussion"
                className=" relative sm:w-[500px] w-[100%] rounded-full object-cover  "
              />
            </div>
          </div>
        </div>

        {/* our interns */}
        <div className="w-[90vw] flex sm:flex-row flex-col gap-5  justify-center bg-gray-100 rounded-3xl p-6">
          <div className="sm:w-1/2 w-[100%]">
            <img
              src="just_meet.jpg"
              alt="talking image"
              className="rounded-3xl"
            />
          </div>
          <div className="sm:w-1/2 w-[100%]">
            <h1 className="text-3xl font-bold mb-2">Our Interns</h1>
            <p className=" items-start text-justify">
              L.D. College Interns gain experience across departments! From
              building cutting-edge software to designing user-friendly
              interfaces, you'll find your niche at L.D. College. Join a vibrant
              community and contribute to projects impacting thousands. Help us
              shape the future, together!
            </p>
          </div>
        </div>

        {/* find the internships */}

        <h1 className="sm:text-3xl tetx-2xl mt-10 mb-10">Browse Internships</h1>
        <div className="flex sm:flex-row flex-col gap-5 justify-between mb-10 ">
          {/* <div className="w-1/4 border border-gray-400 rounded-xl "> */}
          {/* card-1 */}
          <div className="shadow-sm shadow-black   rounded-3xl bg-blue-50 ">
            <div className="p-5 flex flex-col items-center ">
              <h1 className="text-center mb-4 mt-3 text-2xl">Web Designing</h1>
              <img
                src="coding_1.jpg"
                alt="talking image"
                className=" rounded-xl mb-7"
              />
              <h2 className="text-center">Duration: 1 month</h2>
              <h3 className="text-center">No Stippend</h3>
              <p className="text-center">
                Offer-letter, Completion Certificate & Placement is provided
                based on the Performance
              </p>
              <p>Paid/Free: no charges</p>
            </div>
            <div className="text-center mb-4">
              <button className=" bg-black text-white font-medium py-2 px-3 rounded-full">
                <Link to={"/register"}>Apply Now</Link>
              </button>
            </div>
          </div>

          {/* card-2 */}
          <div className="shadow-sm shadow-black  rounded-3xl  bg-blue-50 ">
            <div className="p-5 flex flex-col items-center">
              <h1 className="text-center mb-4 mt-3 text-2xl">
                Node.js Developer
              </h1>
              <img
                src="coding_3.jpg"
                alt="talking image"
                className=" rounded-xl mb-7"
              />
              <h2 className="text-center">Duration: 6 weeks</h2>
              <h3 className="text-center">Stippend: 5000 &#8377; per-month</h3>
              <p className="text-center">
                Offer-letter, Completion Certificate & Placement is provided
                based on the Performance
              </p>
              <p>Paid/Free: 350 &#8377;</p>
            </div>
            <div className="text-center mb-4">
              <button className=" bg-black text-white font-medium py-2 px-3 rounded-full">
                <Link to={"/register"}>Apply Now</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
