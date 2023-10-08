import React from "react";
import ReactDOM from "react-dom/client";
import Stack from "./Stack.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import { UserContext } from "./context.js/context.js";

let admin = localStorage.getItem("admin");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <UserContext.Provider value={user}> */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Stack />} />
      </Routes>
      {/* </UserContext.Provider> */}
    </BrowserRouter>

    {/* {location.path !== "/dashboard" && <Stack />} */}
  </React.StrictMode>
);
