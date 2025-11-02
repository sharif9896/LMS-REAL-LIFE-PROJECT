import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, FileText } from "lucide-react";

export default function ExamPopup() {
  const [showPopup, setShowPopup] = useState(true);
  const [checked, setChecked] = useState(false);

  return (
    <>
      {showPopup && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* <motion.div
            className="bg-white rounded-2xl shadow-2xl w-[700px] text-justify p-6 flex flex-col"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          > */}
            {/* Warning icon */}
            {/* <div className="flex justify-center mb-3">
              <AlertTriangle className="text-orange-500" size={32} />
            </div> */}
            {/* Header with icon */}
            <div className="bg-white rounded-2xl shadow-2xl w-[700px] text-justify p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              {/* <FileText className="text-blue-500 mr-2" size={28} /> */}
              <h2 className="text-xl text-[#303030] font-bold">
                📜 Exam Instructions
              </h2>
              <button
                id="closePopup"
                className="close-btn text-gray-900 cursor-pointer text-2xl"
                onClick={() => setShowPopup(false)}
              >
                &times;
              </button>
            </div>

            {/* Scrollable instructions */}
            <div className="flex-1 overflow-y-auto max-h-56 pr-2 text-sm text-[#303030] border  space-y-2">
              <h3
                style={{
                  fontSize: "15px",
                  color: "#303030",
                  fontFamily: "sans-serif",
                  padding: "10px",
                  textAlign: "justify",
                  textDecoration: "underline",
                }}
              >
                Instructions for Online Examination
              </h3>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                1. Make sure your device (laptop, PC, or tablet) is fully
                charged and meets the technical requirements (camera,
                microphone, browser compatibility).
              </p>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                2. Environment Setup: <br /> Choose a quiet, well-lit room with
                minimal distractions. No other person should be present in the
                room during the exam. Ensure your background is free from any
                materials that could be considered as unauthorized aid.
              </p>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                3. Instructions During the Exam: <br /> Do not navigate away
                from the exam window; attempts to switch tabs or applications
                may lead to automatic disqualification. Maintain proper conduct;
                any suspicious activity will be flagged by the proctoring
                system. You are not allowed to use any external devices such as
                mobile phones, calculators, or books unless specifically
                permitted.
              </p>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                4. Post-Exam Conduct: <br /> Do not discuss or share exam
                questions or answers after the exam, as this will be considered
                a violation of exam integrity.
              </p>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                5. Negative marking will apply to incorrect answers.
              </p>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                6. Do not use calculators, mobile phones, or external help.
              </p>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                7. Once submitted, you cannot reattempt the exam.
              </p>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                8. Timer will continue even if you disconnect temporarily.
              </p>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                9. Read all questions carefully before answering.
              </p>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                10. Click the "Submit" button only after completing the exam.
              </p>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                11. Any malpractice will result in immediate disqualification.
              </p>
              <p style={{ padding: "10px", textAlign: "justify" }}>
                12. Raise any technical issues to the invigilator promptly.
              </p>
            </div>

            {/* Fixed checkbox + button */}
            <div className="mt-4">
              <label className="flex items-center cursor-pointer text-[#303030] space-x-2 text-sm mb-2">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />
                <span>
                  I have read and understood the instructions.{" "}
                  <b> Click All Exam's in Left Side bar</b>
                </span>
              </label>

              <button
                className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                  checked
                    ? "bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-black"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!checked}
                onClick={() => setShowPopup(false)}
              >
                Got it
              </button>
            </div>
            </div>
          </motion.div>
      )}
    </>
  );
}

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { BACKEND_URL } from "../../utils/util";
// import { useDispatch, useSelector } from "react-redux";
// import { motion } from "framer-motion";
// import { FileText } from "lucide-react";
// const FoodItems = () => {
//   const [latestproduct, setLatestProduct] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();

//   const [show, setShow] = useState(true);
//   const [checked, setChecked] = useState(false);

//   if (!show) return null;
//   return (
//     <>
//       <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//         <motion.div
//           className="bg-white rounded-xl shadow-2xl w-[500px] max-h-[80vh] flex flex-col relative"
//           animate={{ y: [0, -10, 0] }}
//           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-4 border-b">
//             <div className="flex items-center gap-2">
//               <FileText className="text-purple-600" size={22} />
//               <h2 className="font-semibold text-lg text-gray-800">
//                 Exam Instructions
//               </h2>
//             </div>
//             <button
//               onClick={() => setShow(false)}
//               className="text-gray-500 hover:text-gray-800 text-xl"
//             >
//               ×
//             </button>
//           </div>

//           {/* Scrollable Instructions */}
//           <div className="p-4 overflow-y-auto text-sm text-gray-700 space-y-2 flex-1">
//             <p>
//               1. Make sure your device (laptop, PC, or tablet) is fully charged
//               and meets the technical requirements (camera, microphone, browser
//               compatibility).
//             </p>
//             <p>
//               2. Ensure you are seated in a quiet, well-lit room with minimal
//               distractions. No other person should be present in the room during
//               the exam. Ensure your background is free from any materials that
//               could be considered as unauthorized aid.
//             </p>
//             <p>
//               3. Instructions during the exam: Do not navigate away from the
//               exam window or attempt to switch tabs or applications. This may
//               lead to disqualification.
//             </p>
//             <p>
//               4. Maintain exam integrity. Any suspicious activity will be
//               flagged by the proctoring system, and your exam may be terminated.
//             </p>
//             <p>
//               5. You are not allowed to use any external devices such as mobile
//               phones, calculators, or books unless specifically permitted.
//             </p>
//           </div>

//           {/* Checkbox & Button */}
//           <div className="p-4 border-t space-y-3">
//             <label className="flex items-center text-sm text-gray-700">
//               <input
//                 type="checkbox"
//                 checked={checked}
//                 onChange={(e) => setChecked(e.target.checked)}
//                 className="mr-2"
//               />
//               I accepted all the instructions to write the exam.
//             </label>

//             <button
//               onClick={() => setShow(false)}
//               disabled={!checked}
//               className={`w-full py-2 rounded-md font-medium ${
//                 checked
//                   ? "bg-yellow-400 hover:bg-yellow-500 text-black"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               Got It
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// };

// export default FoodItems;
