import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import Productitem from "./Productitem";

const FoodItems = () => {
  const [latestproduct, setLatestProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-center items-center">
        <img src="nnb.png" alt="" />
      </div>
    </>
  );
};

export default FoodItems;
