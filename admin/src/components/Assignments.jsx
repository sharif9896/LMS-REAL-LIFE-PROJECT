import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// This component now dynamically loads the jsPDF script.
function Assignments() {
  // State for form inputs
  const [assignment, setAssignment] = useState({
    title: "",
    subject: "",
    teacher: "",
    dueDate: "",
    points: "",
    instructions: "",
  });
  // State for validation error modal
  const [showError, setShowError] = useState(false);
  // State to track if the jsPDF library has loaded
  const [isPdfLibReady, setIsPdfLibReady] = useState(false);

  // Dynamically load the jsPDF script when the component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.async = true;

    // Set state to true once the script is loaded
    script.onload = () => setIsPdfLibReady(true);

    // Corrected typo: AssignmentSendChild -> appendChild
    document.body.appendChild(script);

    return () => {
      // Clean up the script when the component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []); // The empty dependency array ensures this effect runs only once on mount

  // Handles changes for all input fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setAssignment((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreatePdf = (event) => {
    event.preventDefault();

    // Check if jsPDF is loaded on the window object
    if (typeof window.jspdf === "undefined") {
      console.error(
        "jsPDF is not loaded yet. Please wait a moment and try again."
      );
      // We can't use the React state modal here as it's outside the normal flow
      const modal = document.createElement("div");
      modal.className =
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
      modal.innerHTML = `
                <div class="bg-white rounded-lg p-6 shadow-lg text-center">
                    <p class="mb-4 text-gray-700">The PDF library is still loading. Please wait a moment and try again.</p>
                    <button onclick="this.parentElement.parentElement.remove()" class="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        OK
                    </button>
                </div>
            `;
      document.body.appendChild(modal);
      return;
    }

    const { jsPDF } = window.jspdf;

    // Destructure form values for validation and PDF creation
    const { title, subject, teacher, dueDate, points, instructions } =
      assignment;

    // Validate that all fields are filled
    if (
      !title ||
      !subject ||
      !teacher ||
      !dueDate ||
      !points ||
      !instructions
    ) {
      setShowError(true);
      return;
    }

    // --- PDF Generation Logic ---
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    // Set margins and initial position
    const leftMargin = 20;
    const rightMargin = 20;
    const topMargin = 20;
    const contentWidth =
      doc.internal.pageSize.getWidth() - leftMargin - rightMargin;
    let currentY = topMargin;

    // 1. Header: Assignment Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(40, 40, 40);
    const titleWidth =
      (doc.getStringUnitWidth(title) * doc.getFontSize()) /
      doc.internal.scaleFactor;
    const titleX = (doc.internal.pageSize.getWidth() - titleWidth) / 2;
    doc.text(title, titleX, currentY);
    currentY += 15;

    // 2. Sub-header section
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    const details = [
      [`Subject: ${subject}`, `Due Date: ${dueDate}`],
      [`Teacher: ${teacher}`, `Points: ${points}`],
    ];
    details.forEach((row) => {
      doc.text(row[0], leftMargin, currentY);
      doc.text(row[1], doc.internal.pageSize.getWidth() / 2 + 10, currentY);
      currentY += 7;
    });
    currentY += 5;

    // 3. Divider Line
    doc.setDrawColor(200, 200, 200);
    doc.line(
      leftMargin,
      currentY,
      doc.internal.pageSize.getWidth() - rightMargin,
      currentY
    );
    currentY += 15;

    // 4. Instructions
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text("Questions", leftMargin, currentY);
    currentY += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    const splitInstructions = doc.splitTextToSize(instructions, contentWidth);
    doc.text(splitInstructions, leftMargin, currentY);

    // Sanitize the title for the filename
    const safeFileName =
      title.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "assignment";

    // Save the PDF
    doc.save(`${safeFileName}.pdf`);
  };

  return (
    <>
      <Link
        to={"/assign"}
        className="py-2 px-2 ml-20 cursor-pointer bg-green-600 rounded text-white hover:bg-green-700"
      >
        {" "}
        &#128228; Send Assignment to Students
      </Link>

      <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
        {/* Error Modal */}
        {showError && (
          <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <p className="mb-4 text-gray-700">
                Please fill out all fields before creating the PDF.
              </p>
              <button
                onClick={() => setShowError(false)}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="w-[70vw] max-w-1xl mx-auto p-6 md:p-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Create Assignment PDF
              </h1>
              <p className="text-gray-500 mt-2">
                Fill in the details below to generate a downloadable assignment
                PDF.
              </p>
            </div>

            <form onSubmit={handleCreatePdf}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assignment Title */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Assignment Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={assignment.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., World War II Essay"
                    required
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={assignment.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., History"
                    required
                  />
                </div>

                {/* Teacher's Name */}
                <div>
                  <label
                    htmlFor="teacher"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Teacher's Name
                  </label>
                  <input
                    type="text"
                    id="teacher"
                    value={assignment.teacher}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Mr. Smith"
                    required
                  />
                </div>

                {/* Due Date */}
                <div>
                  <label
                    htmlFor="dueDate"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    value={assignment.dueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Points */}
                <div>
                  <label
                    htmlFor="points"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Points
                  </label>
                  <input
                    type="number"
                    id="points"
                    value={assignment.points}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 100"
                    required
                  />
                </div>

                {/* Instructions */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="instructions"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Questions
                  </label>
                  <textarea
                    id="instructions"
                    value={assignment.instructions}
                    onChange={handleChange}
                    rows="8"
                    className="w-full px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Provide clear instructions for the students..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={!isPdfLibReady}
                  className="w-full md:w-auto px-8 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isPdfLibReady
                    ? "Create & Download PDF"
                    : "Loading PDF Library..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Assignments;
