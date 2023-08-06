import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import PageNotFound from "./screens/PageNotFound";
import Register from "./screens/Register";
import VerifyOTP from "./screens/VerifyOTP";
import "react-toastify/dist/ReactToastify.css";




function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="about" element={<Login />} />
          <Route path="contact" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyOTP />} />
          <Route path="/*" element={<PageNotFound/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
