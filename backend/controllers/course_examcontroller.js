import Course from "../models/course_Model.js";

const getCOU = async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json(courses);
  } catch (err) {
    return res.status(400).json({ error: "Error in Fetching Courses!" });
  }
};

export { getCOU };

// addCE, upCE, delCE,
