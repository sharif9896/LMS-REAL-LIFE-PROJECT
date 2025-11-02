import React from "react";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExamStartPopup from "./components/ExamStartPopup";

function App() {
  return (
    <>
      {/* <ExamStartPopup /> */}
      <ToastContainer />
      <Home />
    </>
  );
}

export default App;
