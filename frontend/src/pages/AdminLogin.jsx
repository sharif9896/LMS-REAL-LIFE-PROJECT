import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { BACKEND_URL } from "../../../admin/utils/util";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

/**
 * AdminLogin.jsx
 *
 * A full-screen login page with a light→dark blue gradient background
 * and a gently floating (up/down) login card that always stays visible.
 */
export default function AdminLogin() {
  const [reg_no, setreg_no] = useState("");
  const [dob, setdob] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log({ dob });
    try {
      const response = await axios.post(
        `${BACKEND_URL}api/examinee/login`,
        {
          reg_no,
          dob,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      console.log("Login successful: ", response.data);
      navigate("/main-stu");
      localStorage.setItem("user", JSON.stringify(response.data));
      toast.success(response.data.message);
    } catch (error) {
      setLoading(false);
      toast.error(error);
      if (error.response) {
        toast.error("Invalid Credentials! Refresh and try again..");
        setErrorMessage(error.response.data.errors || "Invalid Credentials!");
      }
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle animated background orbs for depth */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          className="absolute w-72 h-72 rounded-full bg-blue-300/20 blur-3xl -top-10 -left-10"
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute w-80 h-80 rounded-full bg-blue-900/30 blur-3xl bottom-0 right-0"
          animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating card */}
      {/* <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="w-full max-w-md"
      > */}
      <div className="rounded-2xl w-full max-w-md shadow-2xl  bg-white backdrop-blur-xl border border-gray/20 overflow-hidden">
        <div className="px-8 pt-8 pb-6 text-center text-gray">
          <h1 className="text-3xl font-semibold tracking-tight">
            <center>
              <img src="ss1.png" className="w-68" alt="" />
            </center>
          </h1>
          <p className="mt-1 text-gray/80">Login in to continue</p>
        </div>

        <center>
          <form
            className="w-[30%]  md:px-8 md:pb-8 md:w-90"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative mt-2">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray/80" />
              </div>
              <input
                id="email"
                name="reg_no"
                type="text"
                required
                placeholder="Reg_no."
                autoComplete="off"
                value={reg_no}
                onChange={(e) => setreg_no(e.target.value)}
                className="w-full rounded-xl bg-gray/15 border border-gray/20 pl-10 pr-3 py-3 text-gray placeholder-gray/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <label htmlFor="dob" className="sr-only">
              dob
            </label>
            <div className="relative mt-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray/80" />
              </div>
              <input
                id="dob"
                name="dob"
                type="dob"
                required
                placeholder="(YYYY-MM-DD)"
                autoComplete="off"
                value={dob}
                onChange={(e) => setdob(e.target.value)}
                className="w-full rounded-xl bg-gray/15 border border-gray/20 pl-10 pr-3 py-3 text-gray placeholder-gray/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-gray/90">
              <label className="flex items-center gap-2 text-sm select-none">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-4 w-4 rounded border-gray/30 bg-gray/20"
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-sm underline underline-offset-2 hover:text-gray"
              >
                Forgot dob?
              </button>
            </div>
            {errorMessage && (
              <div className="p-3 text-red-500 text-center">{errorMessage}</div>
            )}
            <center className="w-full bg-[yellow] rounded">
              <button
                type="submit"
                className="mt-6"
                // disabled={loading}
              >
              </button>
            </center>
            <p className="mt-4 text-center text-sm text-gray/80">
              Don’t have an account?{" "}
              <a
                href="#"
                className="underline underline-offset-2 hover:text-gray-900"
              >
                Sign up
              </a>
            </p>
          </form>
        </center>
      </div>

      {/* <p className="mt-4 text-center text-white/70 text-xs">
          Tip: Replace the alert(...) in the onSubmit with your API call.
        </p> */}
      {/* </motion.div> */}
    </div>
  );
}

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useEffect } from "react";
// import { BACKEND_URL } from "../../utils/util";
// function AdminLogin() {
//   const [reg_no, setreg_no] = useState("");
//   const [dob, setdob] = useState("");

//   const [errorMessage, setErrorMessage] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // console.log({ dob });
//     try {
//       const response = await axios.post(
//         `${BACKEND_URL}api/admin/login`,
//         {
//           reg_no,
//           dob,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       console.log("AdminLogin successful: ", response.data);
//       toast.success(response.data.message);
//       navigate("/dashboard");
//       // navigate("/admin/login");
//       localStorage.setItem("admin", JSON.stringify(response.data));
//     } catch (error) {
//       if (error.response) {
//         setErrorMessage(error.response.data.errors || "Invalid Credentials!");
//       }
//     }
//   };

//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (event) => {
//       setMousePos({ x: event.clientX, y: event.clientY });
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);
//   return (
//     <div
//       className="flex items-center bg-[#f5f5f5f5] justify-center min-h-screen bg-cover bg-center"
//       // style={{ backgroundImage: "url('public/mm.webp')" }}
//     >
//       <div className="bg-white p-8 rounded-lg shadow-lg w-fit text-center">
//         <center>
//           {" "}
//           <img src="ss1.png" className="w-66" />{" "}
//         </center>
//         <h2 className="text-sm font-bold bg-green-700 rounded text-white py-1 mt-2 mb-4">
//           Admin Login
//         </h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4 text-left">
//             <label className="block text-gray-600 text-sm font-medium">
//               reg_no
//             </label>
//             <input
//               type="email"
//               value={reg_no}
//               onChange={(e) => setreg_no(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//               placeholder="Enter reg_no"
//               required
//             />
//           </div>
//           <div className="mb-4 text-left">
//             <label className="block text-gray-600 text-sm font-medium">
//               dob
//             </label>
//             <input
//               type="dob"
//               value={dob}
//               onChange={(e) => setdob(e.target.value)}
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
//               placeholder="Enter dob"
//               required
//             />
//           </div>
// {errorMessage && (
//   <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
// )}
//           <button className="w-full bg-[#353535] cursor-pointer text-white py-3 rounded-lg hover:bg-[#252525] transition duration-300">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AdminLogin;
