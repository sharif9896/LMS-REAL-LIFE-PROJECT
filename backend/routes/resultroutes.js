import express from "express";
import {
  submit,
  results,
  deleteresults,
  deleteindresults,
} from "../controllers/resultcontroller.js";

const resultRouter = express.Router();

resultRouter.post("/submit", submit);
resultRouter.get("/getresults", results);
resultRouter.delete("/deleteresults", deleteresults);
resultRouter.delete("/deleteresults/:id", deleteindresults);

export default resultRouter;
