import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteFoods = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const handleDelete = async () => {
      const token = JSON.parse(localStorage.getItem("admin"));
      if (!token) {
        navigate("/");
        return;
      }
      try {
        const tokens = token.token;
        const { data } = await axios.delete(
          `http://localhost:3956/api/product/deletefood/${id}`,
          {
            headers: {
              Authorization: `Bearer ${tokens}`,
            },
          }
        );
        toast.success(data.message);
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    handleDelete();
  }, []);
  return <></>;
};

export default DeleteFoods;
