import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function HourTimer({ hoursFromStore }) {
  const Navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(hoursFromStore * 60 * 60); // convert hours → seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      localStorage.removeItem("user");
      // toast.success(response.data.message);
      toast.success("Logout Successful..");
      Navigate("/");
    } // stop when timer reaches 0

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000); // update every second

    return () => clearInterval(timer); // cleanup
  }, [timeLeft]);

  // Convert seconds → HH:MM:SS
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="text-center text-[14px] md:text-xl">
      <h2>
        🕒 Timer for {hoursFromStore} Hour{hoursFromStore > 1 ? "s" : ""}
      </h2>
      <h1
        className="text-[14px] md:text-xl"
        style={{ marginTop: "10px", color: "blue" }}
      >
        Remaining: {formatTime(timeLeft)}
      </h1>
    </div>
  );
}
