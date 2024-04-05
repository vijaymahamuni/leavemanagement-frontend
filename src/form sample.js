// -----App.js -----



import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, RouterLink, Link } from "react-router-dom";
import "./form.css";
import Form from "./Form";
import Login from "./login";
import Success from "./success";
import Axios from "axios";
import Home from "./home";
import Update from "./Update";
import Contact from "./contact";
import Dashboard from "./dashboard";
import Layout from "./Layout";
import "./layout.css"
import "./App.css"
import { Menu } from "@mui/material";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes >
          <Route path='login' element={<Login />} />
          <Route path='/form' element={<Form />} />
          <Route path='/layout' element={<Layout />}>
            <Route path="success" element={<Success />} />
            <Route path='home' element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contact" element={<Contact />} />
            <Route path="logout" element={<Login />} />
          </Route>
          <Route path='Update' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;










