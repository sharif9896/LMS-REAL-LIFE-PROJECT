import axios from "axios";
import React, { useEffect } from "react";
import { BACKEND_URL } from "../../utils/util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Userlogout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // const log = async () => {
    localStorage.removeItem("user");
    // toast.success("Logout Successful..");
    navigate("/");
    // };
    // log();
  }, []);
  return <div></div>;
};

export default Userlogout;
