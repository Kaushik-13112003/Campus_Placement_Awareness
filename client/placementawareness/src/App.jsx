import React from "react";
// import Login from "./component/Login";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateAuth from "./private/PrivateAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import Register from "./componenet/Register";
import Login from "./componenet/Login";
import Home from "./componenet/Home";
import Departments from "./componenet/Departments";
import Profile from "./componenet/Profile";
import UpdateProfile from "./componenet/UpdateProfile";
import SingleEvent from "./componenet/SingleEvents";
import Events from "./componenet/Events";

const App = () => {
  return (
    <>
      <Toaster />
      <ToastContainer position="bottom-center" />

      <Routes>
        <Route path="/" element={<PrivateAuth />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/departments" element={<Departments />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/profile-update/:id" element={<UpdateProfile />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/single-event/:id" element={<SingleEvent />}></Route>
        </Route>

        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </>
  );
};

export default App;
