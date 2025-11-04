import express from 'express';
import { assignments } from '../controllers/AssignmentController.js';

const assignmentrouter = express.Router();

assignmentrouter.post('/fupload', assignments);

export default assignmentrouter;
