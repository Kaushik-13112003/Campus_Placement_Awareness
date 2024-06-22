import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
// import placementguide from "../assets/placementguide.jpg";
// import preplacementtalk from "../assets/pre-placement-talk.jpg";
// import interviewprepImage from "../assets/interview_praparation.png";

const events = [
  {
    id: 1,
    title: "Pre-placement Talk",
    date: "2024-07-21",
    image: "placementguide.jpg",
    description: "Get insights about the placement process.",
  },
  {
    id: 2,
    title: "Placement Guide Talk",
    date: "2024-07-25",
    image: "pre-placement-talk.jpg",
    description: "Guidance on preparing for placements.",
  },
  {
    id: 3,
    title: "Interview Preparation Session",
    date: "2024-08-05",
    image: "interview_preparation.png",
    description: "Tips and tricks to ace your interviews.",
  },
];

function Events() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-green-200 p-8">
        <h1 className="text-3xl font-bold mb-8 text-center border-b-2 border-green-400 py-4">
          Upcoming Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:scale-105"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-4">{event.date}</p>
              <p className="text-gray-800 mb-4">{event.description}</p>
              <Link
                to={`/single-event/${event.id}`}
                className="text-indigo-500 hover:underline hover:font-semibold"
              >
                See More...
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Events;
