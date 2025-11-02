import Course from "../models/course_Model.js";
// import examinee_tbl from "../models/examinee_tbl.js";

const hourst = async (req, res) => {
  const { getalls } = req.params; // value from URL like /api/hourst/education
  // console.log("🔹 Received param:", getalls);

  try {
    // ✅ Await the query to actually get data
    const data2 = await Course.find({ coursename: getalls });

    // Check if any data found
    if (!data2 || data2.length === 0) {
      return res.status(404).json({ message: "No matching data found!" });
    }

    // ✅ Extract only exam_duration field
    const solid = data2.map((row) => ({
      hours: row.exam_duration,
    }));

    // console.log("✅ Found Data:", solid);
    return res.status(200).json(solid);
  } catch (e) {
    console.error("❌ Error in Timing:", e);
    return res.status(400).json({ error: "Error in Timing!" });
  }
};

export { hourst };
