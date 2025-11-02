import React, { useState } from "react";

const ExamStartPopup = () => {
  const [showModal, setShowModal] = useState(false);

  const handleStartExam = () => {
    alert("Exam Started!"); // Replace this with your start exam logic
    setShowModal(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Button to open popup */}
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Start Exam
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center relative">
            {/* Warning Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-orange-300 text-orange-500 text-3xl">
                !
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold mb-2">Are you sure?</h2>
            <p className="text-gray-600 mb-6">
              You want to take this exam now, your time will start automatically
            </p>

            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStartExam}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                Yes, start now!
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamStartPopup;
