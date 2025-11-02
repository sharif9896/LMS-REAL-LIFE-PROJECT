import db from "../config/conn.js";
import Questions from "../models/QuestionModel.js";

const getquestions = async (req, res) => {
  // const { getall } = req.params;
  try {
    const data = await Questions.find({});
    // console.log(data);
    return res.status(200).json(data);
  } catch (er) {
    return res.status(400).json("Error in Fetching the questions");
  }
};

const getquestion = async (req, res) => {
  const { getall } = req.params;
  // console.log(getall);
  try {
    const data = await Questions.find({ course_name: getall });
    // console.log(result);
    const formated = data.map((row) => ({
      id: row.id,
      question: row.questions,
      options: [row.opt1, row.opt2, row.opt3, row.opt4],
      answer: row.correct_answer,
    }));

    // ✅ Shuffle the array (Fisher–Yates algorithm)
    for (let i = formated.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [formated[i], formated[j]] = [formated[j], formated[i]];
    }

    // console.log(data2);
    return res.status(200).json(formated);
  } catch (er) {
    return res.status(400).json("Error in Fetching the questions");
  }
};

export { getquestions, getquestion };
