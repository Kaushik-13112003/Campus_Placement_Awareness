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
import Profile from "./componenet/Profile";
import UpdateProfile from "./componenet/UpdateProfile";
import SingleEvent from "./componenet/SingleEvents";
import Events from "./componenet/Events";
import Companies from "./componenet/Companies";
import CreateCompany from "./componenet/CreateCompany";
import MyCompanies from "./componenet/MyCompanies";
import Internships from "./componenet/Internships";
import EditCompany from "./componenet/EditCompany";
import SingleCompany from "./componenet/SingleCompany";
import AlumniRegister from "./Alumni/AlumniRegister";
import AlumniLogin from "./Alumni/AlumniLogin";
import ChatComponent from "./Chats/ChatComponent";
// import Chat from "./componenet/Chat";

const App = () => {
  return (
    <>
      <Toaster />
      <ToastContainer position="bottom-center" />

      <Routes>
        <Route path="/" element={<PrivateAuth />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/companies" element={<Companies />}></Route>
          <Route path="/edit-company/:id" element={<EditCompany />}></Route>
          <Route path="/mycompanies" element={<MyCompanies />}></Route>
          <Route path="/internships" element={<Internships />}></Route>
          <Route path="/create-company" element={<CreateCompany />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/profile-update/:id" element={<UpdateProfile />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/chat" element={<ChatComponent />}></Route>
          <Route path="/single-event/:id" element={<SingleEvent />}></Route>
          <Route path="/single-company/:id" element={<SingleCompany />}></Route>
        </Route>

        <Route path="/register" element={<Register />}></Route>
        <Route path="/alumni-register" element={<AlumniRegister />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/alumni-login" element={<AlumniLogin />}></Route>
      </Routes>
    </>
  );
};

export default App;
