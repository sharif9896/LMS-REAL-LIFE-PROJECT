import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { BACKEND_URL } from "../../utils/util";
function AdminLogin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ password });
    try {
      const response = await axios.post(
        `${BACKEND_URL}api/admin/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("AdminLogin successful: ", response.data);
      toast.success(response.data.message);
      navigate("/dashboard");
      // navigate("/admin/login");
      localStorage.setItem("admin", JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        toast.error("Invalid Credentials! Refresh and try again..");
        setErrorMessage(error.response.data.errors || "Invalid Credentials! Refresh and try again..");
      }
    }
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div
      className="flex items-center bg-[#f5f5f5f5] justify-center min-h-screen bg-cover bg-center"
      // style={{ backgroundImage: "url('public/mm.webp')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-fit text-center">
        <center>
          {" "}
          <img src="ss1.png" className="w-66" />{" "}
        </center>
        <h2 className="text-sm font-bold bg-green-700 rounded text-white py-1 mt-2 mb-4">
          Staff Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label className="block text-gray-600 text-sm font-medium">
              username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-gray-600 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter password"
              required
            />
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}
          <button className="w-full bg-[#353535] cursor-pointer text-white py-3 rounded-lg hover:bg-[#252525] transition duration-300">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
