// import React, { useState, useEffect, useRef } from "react";

// export default function CountdownTimer() {
  // const [hours, setHours] = useState(0);
  // const [timeLeft, setTimeLeft] = useState(0); // in seconds
  // const intervalRef = useRef(null);

  // // Convert seconds to hh:mm:ss format
  // const formatTime = (secs) => {
  //   const h = Math.floor(secs / 3600);
  //   const m = Math.floor((secs % 3600) / 60);
  //   const s = secs % 60;
  //   return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
  //     s
  //   ).padStart(2, "0")}`;
  // };

  // // Handle input
  // const handleStart = () => {
  //   if (hours >= 1 && hours <= 3) {
  //     setTimeLeft(hours * 3600); // convert to seconds
  //   } else {
  //     alert("Please enter 1, 2, or 3 only!");
  //   }
  // };

  // // Countdown effect
  // useEffect(() => {
  //   if (timeLeft > 0) {
  //     intervalRef.current = setInterval(() => {
  //       setTimeLeft((prev) => prev - 1);
  //     }, 1000);
  //   }

  //   return () => clearInterval(intervalRef.current);
  // }, [timeLeft]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
//       <h1 className="text-2xl font-bold mb-4">Hour Countdown Timer</h1>

//       <div className="flex gap-2 mb-4">
//         <input
//           type="number"
//           min="1"
//           max="3"
//           className="p-2 rounded-lg text-black"
//           placeholder="Enter 1, 2, or 3"
//           value={hours}
//           onChange={(e) => setHours(Number(e.target.value))}
//         />
//         <button
//           onClick={handleStart}
//           className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
//         >
//           Start
//         </button>
//       </div>

      // {timeLeft > 0 ? (
      //   <h2 className="text-4xl font-mono">{formatTime(timeLeft)}</h2>
      // ) : (
      //   <h2 className="text-xl mt-4">⏳ Timer not started or finished</h2>
      // )}
//     </div>
//   );
// }

import React from "react";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Quiz from "./components/Quiz";

function App() {
  return (
    <>
      {/* <Quiz /> */}
      <ToastContainer />
      <Home />
    </>
  );
}

export default App;
