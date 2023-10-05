import React from "react";
import ReactDOM from "react-dom/client";
import Stack from "./Stack.jsx";
import Navbar from "./components/navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Stack />} />
      </Routes>
    </BrowserRouter>
    {/* {location.path !== "/dashboard" && <Stack />} */}
  </React.StrictMode>
);
