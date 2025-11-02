import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { BACKEND_URL } from "../../utils/util";
function AdminLogin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({ password });
    try {
      const response = await axios.post(
        `${BACKEND_URL}api/admin/signup`,
        {
          firstName,
          lastName,
          email,
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
      navigate("/");
      // navigate("/admin/login");
      localStorage.setItem("admin", JSON.stringify(response.data));
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "AdminLogin failed!!!");
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
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('public/mm.webp')" }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Admin Signin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-left">
            <label className="block text-gray-600 text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-gray-600 text-sm font-medium">
              last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4 text-left">
            <label className="block text-gray-600 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter email"
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
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter password"
            />
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}
          <button className="w-full cursor-pointer bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300">
            Signin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
