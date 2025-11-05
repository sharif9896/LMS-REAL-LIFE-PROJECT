import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../utils/util";
import { useEffect } from "react";
import { toast } from "react-toastify";
// --- Mock Data based on the provided image (expanded for pagination) ---
const initialStudentData = [
  {
    id: 1,
    reg_no: "31123U18050",
    name: "BABU",
    class_name: "II",
    department: "BCA",
    course_exam: "VALUE EDUCATION",
    score: 7.5,
    timestamp: "2025-09-01 21:05:56",
  },
  {
    id: 2,
    reg_no: "31123U18050",
    name: "BABU",
    class_name: "II",
    department: "BCA",
    course_exam: "VALUE EDUCATION",
    score: 3,
    timestamp: "2025-09-01 21:01:48",
  },
  {
    id: 3,
    reg_no: "31123U18050",
    name: "BABU",
    class_name: "II",
    department: "BCA",
    course_exam: "VALUE EDUCATION",
    score: 7.5,
    timestamp: "2025-09-01 01:32:45",
  },
  {
    id: 4,
    reg_no: "31123U18050",
    name: "BABU",
    class_name: "II",
    department: "BCA",
    course_exam: "VALUE EDUCATION",
    score: 4.5,
    timestamp: "2025-09-01 21:47:28",
  },
  {
    id: 5,
    reg_no: "31123U18051",
    name: "SHARIF RAYAN K",
    class_name: "III BSC CS",
    department: "BSC CS",
    course_exam: "INFORMATION TECHNOLOGY",
    score: 0,
    timestamp: "2025-09-14 16:33:09",
  },
  {
    id: 6,
    reg_no: "31123U18051",
    name: "SHARIF RAYAN K",
    class_name: "III BSC CS",
    department: "BSC CS",
    course_exam: "INFORMATION TECHNOLOGY",
    score: 4.5,
    timestamp: "2025-10-06 19:22:43",
  },
  {
    id: 7,
    reg_no: "31123U18050",
    name: "BABU",
    class_name: "II",
    department: "BCA",
    course_exam: "VALUE EDUCATION",
    score: 6,
    timestamp: "2025-10-06 15:28:23",
  },
  {
    id: 8,
    reg_no: "31123U18050",
    name: "BABU",
    class_name: "II",
    department: "BCA",
    course_exam: "VALUE EDUCATION",
    score: 4.5,
    timestamp: "2025-10-08 13:40:58",
  },
  {
    id: 9,
    reg_no: "31123U18050",
    name: "BABU",
    class_name: "II",
    department: "BCA",
    course_exam: "VALUE EDUCATION",
    score: 6,
    timestamp: "2025-10-09 03:03:50",
  },
  {
    id: 10,
    reg_no: "31123U18050",
    name: "BABU",
    class_name: "II",
    department: "BCA",
    course_exam: "VALUE EDUCATION",
    score: 3,
    timestamp: "2025-10-09 23:35:35",
  },
  {
    id: 11,
    reg_no: "31123U18052",
    name: "ANNA",
    class_name: "I",
    department: "BBA",
    course_exam: "BUSINESS MATHS",
    score: 8.0,
    timestamp: "2025-10-10 11:15:12",
  },
  {
    id: 12,
    reg_no: "31123U18053",
    name: "PETER",
    class_name: "III",
    department: "B.COM",
    course_exam: "CORPORATE ACCOUNTING",
    score: 5.5,
    timestamp: "2025-10-11 09:05:41",
  },
  {
    id: 13,
    reg_no: "31123U18054",
    name: "CHLOE",
    class_name: "II",
    department: "BCA",
    course_exam: "DATA STRUCTURES",
    score: 9.0,
    timestamp: "2025-10-12 14:22:01",
  },
  {
    id: 14,
    reg_no: "31123U18055",
    name: "DAVID",
    class_name: "I",
    department: "BSC CS",
    course_exam: "C PROGRAMMING",
    score: 6.5,
    timestamp: "2025-10-12 16:45:33",
  },
  {
    id: 15,
    reg_no: "31123U18056",
    name: "EMILY",
    class_name: "III",
    department: "BBA",
    course_exam: "MARKETING",
    score: 7.0,
    timestamp: "2025-10-13 10:05:19",
  },
];

// --- Helper function to format score ---
const ScoreBadge = ({ score }) => {
  const scoreValue = parseFloat(score);
  let bgColorClass = "bg-gray-200 text-gray-800";
  if (scoreValue >= 7.5) {
    bgColorClass = "bg-green-100 text-green-800";
  } else if (scoreValue >= 4) {
    bgColorClass = "bg-yellow-100 text-yellow-800";
  } else {
    bgColorClass = "bg-red-100 text-red-800";
  }
  return (
    <span
      className={`px-3 py-1 text-sm font-semibold rounded-full ${bgColorClass}`}
    >
      {Number(score).toFixed(1)}
    </span>
  );
};

// --- Main App Component ---
export default function App() {
  const initialStudentData2 = useSelector((store) => store.items);
  const [students, setStudents] = useState(initialStudentData2);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    if (!students || students.length === 0) {
      toast.warn("No student records found. Redirecting to dashboard.");
      navigate('/dashboard');
    }
    if (!initialStudentData2 || initialStudentData2.length === 0) {
      setStudents(initialStudentData);
    } else {
      setStudents(initialStudentData2);
    }
  }, []);

  // console.log(initialStudentData2);

  // --- Pagination Logic ---
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = students.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(students.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < nPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const deleteResults = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}api/user/deleteresults`
      );
      const data = await response.json();
    } catch (err) {
      console.error("Error in deleting results:", err);
    }
    setStudents([]);
  };

  const deleteone = async (id) => {
    // console.log(id);
    try {
      const deleteresl = await axios.delete(
        `${BACKEND_URL}api/user/deleteresults/${id}`
      );
      const data = await deleteresl.data;
      // console.log(data.message);
      setStudents(students.filter((student) => student._id !== id));
    } catch (err) {}
  };

  const downloadCSV = () => {
    const headers = [
      "Reg No",
      "Name",
      "Class",
      "Department",
      "Course/Exam",
      "Score",
      "Timestamp",
    ];
    const csvContent = [
      headers.join(","),
      ...students.map((s) =>
        [
          s.reg_no,
          s.name,
          s.class_name,
          s.department,
          s.course_exam,
          s.score,
          s.timestamp,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "student_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Link
        to={"/dashboard"}
        className="btn py-1 px-1 bg-blue-600 text-amber-100 cursor-pointer m-auto flex items-center"
      >
        &#x2190; Go Back
      </Link>
      <div className="bg-gray-50 min-h-screen font-sans text-gray-800 p-4 sm:p-6 md:p-8">
        <style>{`
                @keyframes fadeInSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-slide-up {
                    animation: fadeInSlideUp 0.5s ease-out forwards;
                }
            `}</style>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
              Student Exam Results
            </h1>

            <button
              onClick={deleteResults}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white cursor-pointer font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Delete All
            </button>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer font-bold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Download CSV
            </button>
          </div>

          <div className="bg-white shadow-xl rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {[
                      "Reg No",
                      "Name",
                      "Class",
                      "Department",
                      "Course/Exam",
                      "Score",
                      "Timestamp",
                      "Delete",
                    ].map((header) => (
                      <th
                        key={header}
                        className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentRecords.map((student, index) => (
                    <tr
                      key={student.id}
                      className="hover:bg-gray-50 transition-colors duration-200 animate-fade-in-slide-up"
                      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
                    >
                      <td className="p-4 whitespace-nowrap font-mono text-indigo-600">
                        {student.reg_no}
                      </td>
                      <td className="p-4 whitespace-nowrap font-medium text-gray-900">
                        {student.name}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {student.class_name}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {student.department}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {student.course_exam}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <ScoreBadge score={student.score} />
                      </td>
                      <td className="p-4 whitespace-nowrap text-gray-500">
                        {student.timestamp}
                      </td>
                      <td className="p-4 whitespace-nowrap text-gray-500">
                        <span
                          className="cursor-pointer"
                          onClick={() => deleteone(student._id)}
                        >
                          &#128465;
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* --- Pagination Controls --- */}
            <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-white">
              <span className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold">{indexOfFirstRecord + 1}</span>{" "}
                to{" "}
                <span className="font-semibold">
                  {Math.min(indexOfLastRecord, students.length)}
                </span>{" "}
                of <span className="font-semibold">{students.length}</span>{" "}
                results
              </span>
              <div className="inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  Page {currentPage} of {nPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === nPages}
                  className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <footer className="text-center mt-8 text-gray-500 text-sm">
            {/* <p>All data is mock data for demonstration purposes.</p> */}
          </footer>
        </div>
      </div>
    </>
  );
}
