import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const ExamStartPopup = () => {
  const [showModal, setShowModal] = useState(false);
  const [questions, setquestions] = useState([]);
  // useEffect(() => {

  // }, []);
  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleStartExam = () => {
    alert("Exam Started!"); // Replace this with your start exam logic
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Button to open popup */}
      {/* <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Start Exam
      </button> */}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6 w-[500px] text-center relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-40">
                <div className="bg-white rounded-lg shadow-lg p-6 w-[500px] text-center relative">
                  {/* Warning Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-orange-300 text-orange-500 text-3xl">
                      !
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-2">Are you sure?</h2>
                  <p className="text-gray-600 mb-6">
                    You want to take this exam now, your time will start
                    automatically
                  </p>

                  {/* Buttons */}
                  <div className="flex justify-center gap-4">
                    <Link
                      to={"/questions"}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                      Yes, start now!
                    </Link>
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExamStartPopup;
