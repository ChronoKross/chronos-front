import React from "react";
import ReactDOM from "react-dom/client";
import Stack from "./Stack.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
//WORKING CONDITION

import Login from "./pages/Login.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="#/login" element={<Login />} />
        <Route path="#/dashboard" element={<Dashboard />} />
        <Route path="#/" element={<Stack />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>

    {/* {location.path !== "/dashboard" && <Stack />} */}
  </React.StrictMode>
);
