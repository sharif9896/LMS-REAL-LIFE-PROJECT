import React, { useEffect, useState, useRef } from "react";
import SplashScreen from "./SplashScreen";
import axios from "axios";
import { BACKEND_URL } from "../../utils/util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HourTimer from "./HourTimer";
const Quiz = ({ questions }) => {
  const [loading, setLoading] = useState(false);
  // console.log(times);
  //   console.log(questions);
  //   const [questionss, setquestions] = useState([]);
  //   const token = JSON.parse(localStorage.getItem("user"));
  //   const user = token.user;
  // console.log(user.course_exam);
  //   useEffect(() => {
  //     try {
  //       const data = async (req, res) => {
  //         const response = await axios.get(
  //           `${BACKEND_URL}api/question/${user.course_exam}`
  //         );
  //         console.log(response);
  //         setquestions(response);
  //         //   .then((res) => res.json())
  //         //   .then((data) => {
  //         // console.log(data);
  //         // setquestions(response.slice);
  //         //   });
  //       };

  //       data();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }, []);
  //   console.log(questions);
  const questionss = [
    {
      id: 1,
      question: "Which of the following is the main focus of Value Education?",
      options: [
        "Earning money",
        "Improving physical strength",
        "Developing moral and ethical values",
        "Learning technical skills",
      ],
      answer: "Developing moral and ethical values",
    },
    {
      id: 2,
      question: "Value Education primarily helps in:",
      options: [
        "Increasing memory power",
        "Improving handwriting",
        "Personality development and character building",
        "Learning computer skills",
      ],
      answer: "Personality development and character building",
    },
    {
      id: 3,
      question: "Which of the following is NOT a core human value?",
      options: ["Honesty", "Greed", "Compassion", "Respect"],
      answer: "Greed",
    },
    {
      id: 4,
      question: "Value education fosters:",
      options: [
        "Moral awareness",
        "Sports skills",
        "Earning capacity",
        "Entertainment",
      ],
      answer: "Moral awareness",
    },
    {
      id: 5,
      question: "The goal of value education is:",
      options: [
        "Academic excellence",
        "Personality development",
        "Physical fitness",
        "Job opportunities",
      ],
      answer: "Personality development",
    },
    {
      id: 6,
      question: "Value education strengthens:",
      options: ["Ethical values", "Writing skills", "Drawing skills", "Maths"],
      answer: "Ethical values",
    },
    {
      id: 7,
      question: "Which of these values promote peace?",
      options: ["Tolerance", "Anger", "Greed", "Selfishness"],
      answer: "Tolerance",
    },
    {
      id: 8,
      question: "Compassion means:",
      options: [
        "Helping others",
        "Selfish behavior",
        "Earning money",
        "Being angry",
      ],
      answer: "Helping others",
    },
    {
      id: 9,
      question: "Respect in value education refers to:",
      options: [
        "Obeying rules blindly",
        "Treating others with dignity",
        "Being fearful",
        "Agreeing with everyone",
      ],
      answer: "Treating others with dignity",
    },
    {
      id: 10,
      question: "Value education creates awareness about:",
      options: ["Moral duties", "Sports", "Technology", "Movies"],
      answer: "Moral duties",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"));
  const user = token.user;
  const hours = useSelector((store) => store.counts);
  // console.log(hours);

  // console.log(questions.map((row)=>{
  //  row.hours
  // }));

  // const [hours, setHours] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // in seconds
  const intervalRef = useRef(null);

  // console.log(questions);

  // Countdown effect
  useEffect(() => {
    // alert(questions);
    if (hours >= 1 && hours <= 3) {
      setTimeLeft(hours * 3600); // convert to seconds
    } else {
      // alert("Please enter 1, 2, or 3 only!");
    }
    if (timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [timeLeft]);

  // Convert seconds to hh:mm:ss format
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  // Handle input
  // const handleStart = () => {

  // };
  // const result = questions.map((row, index) => {
  //   console.log(row[0].hours);
  // });

  const handleOptionChange = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let score = 0;
    const result = questions.map((row, index) => {
      answers[row.id] === questions[index].answer
        ? (score = score + 1.5)
        : score;
    });
    const resdata = {
      reg_no: user.reg_no,
      name: user.name,
      class_name: user.class,
      department: user.department,
      course_exam: user.course_exam,
      score: score,
    };

    try {
      const result = await axios.post(`${BACKEND_URL}api/user/submit`, resdata);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      toast.success(result.data.message);
      navigate("/Submitteddashboard");
      setSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  //   console.log(answers);
  //   console.log(questions[0].answer);
  //   answers[2] === questions[1].answer ? (score = score + 1.5) : score;
  //   answers[3] === questions[2].answer ? (score = score + 1.5) : score;
  //   answers[4] === questions[3].answer ? (score = score + 1.5) : score;
  //   answers[5] === questions[4].answer ? (score = score + 1.5) : score;
  //   answers[6] === questions[5].answer ? (score = score + 1.5) : score;
  //   answers[7] === questions[6].answer ? (score = score + 1.5) : score;
  //   answers[8] === questions[7].answer ? (score = score + 1.5) : score;
  //   answers[9] === questions[8].answer ? (score = score + 1.5) : score;
  //   answers[10] === questions[9].answer ? (score = score + 1.5) : score;
  //   console.log(score);{score}

  return (
    <>
      <div className="flex justify-center w-[70vw] items-center  absolute top-0 left-80  min-h-screen bg-gray-50 p-6">
        <form className="w-[70vw]" onSubmit={(e) => handleSubmit(e)}>
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-600">
                {user.course_exam}
              </h2>
              <HourTimer hoursFromStore={hours} />
              {/* {timeLeft > 0 ? (
              <h2 className="text-4xl font-mono">{formatTime(timeLeft)}</h2>
            ) : (
              <h2 className="text-xl mt-4">⏳ Timer not started or finished</h2>
            )} */}
              {/* <p className="text-blue-600 font-semibold">Remaining Time: 59:42</p> */}
            </div>

            {/* Scrollable Questions Container */}
            <div className="h-[450px] overflow-y-auto pr-2">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-200 transition"
                >
                  <p className="font-semibold mb-2">
                    {index + 1}.) {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((option, i) => (
                      <label key={i} className="block cursor-pointer">
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          value={option}
                          checked={answers[q.id] === option}
                          onChange={() => handleOptionChange(q.id, option)}
                          className="mr-2"
                          disabled={submitted}
                          required
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                  {/* {submitted && (
                <p
                  className={`mt-2 font-medium ${
                    answers[q.id] === q.answer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {answers[q.id] === q.answer
                    ? "✔ Correct"
                    : `✘ Wrong (Correct: ${q.answer})`}
                </p>
              )} */}
                </div>
              ))}
            </div>

            {/* Footer Buttons
              onClick={(e) => handleSubmit(e)}*/}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleReset}
                className="bg-yellow-400 px-4 py-2 rounded cursor-pointer hover:bg-yellow-500"
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
                disabled={loading}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  backgroundColor: loading ? "#333" : "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {" "}
                {loading ? (
                  <>
                    <span className="spinner" />
                    Loading...
                  </>
                ) : (
                  "Submit"
                )}
                <style>
                  {`
            .spinner {
              width: 16px;
              height: 16px;
              border: 2px solid white;
              border-top: 2px solid transparent;
              border-radius: 50%;
              animation: spin 0.6s linear infinite;
            }

            @keyframes spin {
              to {
                transform: rotate(360deg);
              }
            }
          `}
                </style>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Quiz;

// import React, { useState } from "react";

// const Quiz = () => {
//   const questions = [
//     {
//       id: 1,
//       question: "Which of the following is the main focus of Value Education?",
//       options: [
//         "Earning money",
//         "Improving physical strength",
//         "Developing moral and ethical values",
//         "Learning technical skills",
//       ],
//       answer: "Developing moral and ethical values",
//     },
//     {
//       id: 2,
//       question: "Value Education primarily helps in:",
//       options: [
//         "Increasing memory power",
//         "Improving handwriting",
//         "Personality development and character building",
//         "Learning computer skills",
//       ],
//       answer: "Personality development and character building",
//     },
//     {
//       id: 3,
//       question: "Which of the following is NOT a core human value?",
//       options: ["Honesty", "Greed", "Compassion", "Respect"],
//       answer: "Greed",
//     },
//     {
//       id: 4,
//       question: "Value education fosters:",
//       options: [
//         "Moral awareness",
//         "Sports skills",
//         "Earning capacity",
//         "Entertainment",
//       ],
//       answer: "Moral awareness",
//     },
//     {
//       id: 5,
//       question: "The goal of value education is:",
//       options: [
//         "Academic excellence",
//         "Personality development",
//         "Physical fitness",
//         "Job opportunities",
//       ],
//       answer: "Personality development",
//     },
//     {
//       id: 6,
//       question: "Value education strengthens:",
//       options: ["Ethical values", "Writing skills", "Drawing skills", "Maths"],
//       answer: "Ethical values",
//     },
//     {
//       id: 7,
//       question: "Which of these values promote peace?",
//       options: ["Tolerance", "Anger", "Greed", "Selfishness"],
//       answer: "Tolerance",
//     },
//     {
//       id: 8,
//       question: "Compassion means:",
//       options: [
//         "Helping others",
//         "Selfish behavior",
//         "Earning money",
//         "Being angry",
//       ],
//       answer: "Helping others",
//     },
//     {
//       id: 9,
//       question: "Respect in value education refers to:",
//       options: [
//         "Obeying rules blindly",
//         "Treating others with dignity",
//         "Being fearful",
//         "Agreeing with everyone",
//       ],
//       answer: "Treating others with dignity",
//     },
//     {
//       id: 10,
//       question: "Value education creates awareness about:",
//       options: ["Moral duties", "Sports", "Technology", "Movies"],
//       answer: "Moral duties",
//     },
//   ];

//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const handleOptionChange = (qid, option) => {
//     setAnswers({ ...answers, [qid]: option });
//   };

//   const handleSubmit = () => {
//     setSubmitted(true);
//   };

//   const handleReset = () => {
//     setAnswers({});
//     setSubmitted(false);
//   };

//   let score = 0;
//   answers[1] === questions[0].answer ? (score = score + 1.5) : score;
//   answers[2] === questions[1].answer ? (score = score + 1.5) : score;
//   answers[3] === questions[2].answer ? (score = score + 1.5) : score;
//   answers[4] === questions[3].answer ? (score = score + 1.5) : score;
//   answers[5] === questions[4].answer ? (score = score + 1.5) : score;
//   answers[6] === questions[5].answer ? (score = score + 1.5) : score;
//   answers[7] === questions[6].answer ? (score = score + 1.5) : score;
//   answers[8] === questions[7].answer ? (score = score + 1.5) : score;
//   answers[9] === questions[8].answer ? (score = score + 1.5) : score;
//   answers[10] === questions[9].answer ? (score = score + 1.5) : score;
//   console.log(score);

//   return (
//     <>
//       <div className="p-6 w-fit absolute top-10 left-80 mx-auto font-sans">
//         <h2 className="text-2xl font-bold mb-4">VE II {score}</h2>
//         {questions.map((q, index) => (
//           <div
//             key={q.id}
//             className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-200 transition"
//           >
//             <p className="font-semibold mb-2">
//               {index + 1}.) {q.question}
//             </p>
//             <div className="space-y-2 ">
//               {q.options.map((option, i) => (
//                 <label key={i} className="block cursor-pointer">
//                   <input
//                     type="radio"
//                     name={`q-${q.id}`}
//                     value={option}
//                     checked={answers[q.id] === option}
//                     onChange={() => handleOptionChange(q.id, option)}
//                     className="mr-2 cursor-pointer"
//                     disabled={submitted}
//                   />
//                   {option}
//                 </label>
//               ))}
//             </div>
//             {/* <p hidden>
//               {answers[q.id] === q.answer ? (score = score + 1.5) : score}
//             </p> */}
//             {/* {submitted && (
//               <p
//                 className={`mt-2 font-medium ${
//                   answers[q.id] === q.answer ? "text-green-600" : "text-red-600"
//                 }`}
//               >
//                 {answers[q.id] === q.answer ? (score = score + 1.5) : score}
//                 {answers[q.id] === q.answer
//                   ? "✔ Correct"
//                   : `✘ Wrong (Correct: ${q.answer})`}
//               </p>
//             )} */}
//           </div>
//         ))}

//         <div className="flex space-x-4 justify-between">
//           <button
//             onClick={handleReset}
//             className="bg-yellow-400 hover:bg-yellow-600 px-4 py-3 rounded cursor-pointer"
//           >
//             Reset
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-3 rounded cursor-pointer"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Quiz;
