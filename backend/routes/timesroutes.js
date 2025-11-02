import express from "express";
import { hourst } from "../controllers/timecontroller.js";
// import {
//   hourst,
// } from "../controllers/timecontroller.js";

const timerouter = express.Router();
timerouter.get("/:getalls", hourst);
export default timerouter;
