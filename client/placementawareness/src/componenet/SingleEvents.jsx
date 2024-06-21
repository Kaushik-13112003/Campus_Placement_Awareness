import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const SingleEventData = {
  1: {
    title: "Pre-placement Talk",
    image: "../placementguide.jpg",
    date: "2024-07-21",
    agenda: "Discussion about the placement process and tips to succeed.",
    venue: "Auditorium",
    duration: "2 hours",
    heldBy: "Placement Cell",
    whatYouGet: "Knowledge and tips for placements",
  },
  2: {
    title: "Placement Guide Talk",
    image: "../pre-placement-talk.jpg",
    date: "2024-07-25",
    agenda:
      "Guidance on how to prepare for placements, including resume building and interview skills.",
    venue: "Conference Hall",
    duration: "3 hours",
    heldBy: "Career Services",
    whatYouGet: "Comprehensive placement preparation guide",
  },
  3: {
    title: "Interview Preparation Session",
    image: "../interview_preparation.png",
    date: "2024-08-05",
    agenda: "Tips and tricks to ace your interviews.",
    venue: "Lecture Hall 2",
    duration: "1.5 hours",
    heldBy: "Alumni Network",
    whatYouGet: "Effective interview techniques and strategies",
  },
};

function SingleEvent() {
  const { id } = useParams();
  const navigate = useNavigate("");
  const event = SingleEventData[id];

  if (!event) {
    return (
      <div className="min-h-screen bg-green-200 p-8">Event not found.</div>
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen  bg-green-200 p-8 flex items-center flex-col gap-5">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-60 object-cover rounded-lg mb-4 object-center"
          />
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-600 mb-2">
            <strong>Date:</strong> {event.date}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Agenda:</strong> {event.agenda}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Venue:</strong> {event.venue}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Duration:</strong> {event.duration}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Held by:</strong> {event.heldBy}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>What you get:</strong> {event.whatYouGet}
          </p>
        </div>
        {/* you can change path as events from '/'*/}
        <Link
          to={"/events"}
          className="bg-green-400 rounded-md hover:bg-green-300 px-6 py-2"
        >
          Back
        </Link>
      </div>
    </>
  );
}

export default SingleEvent;
