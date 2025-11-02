import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils/util";
// import CourseTable from "./CourseTable";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import StudentTable from "./StudentTable";
import QuestionsTable from "./QuestionsTable";

const CourseImportExport = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingS, setLoadingS] = useState(false);
  const handleExport = async () => {
    setLoading(true);
    const res = await axios.get(`${BACKEND_URL}api/question/export`, {
      responseType: "blob",
    });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "questions.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  const handleImport = async () => {
    if (!file) return toast.warning("Please select a file first!");

    try {
      setLoadingS(true);
      const arrayBuffer = await file.arrayBuffer();

      const res = await fetch(`${BACKEND_URL}api/question/import`, {
        method: "POST",
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
        body: arrayBuffer,
      });

      const data = await res.json();
      setTimeout(() => {
        setLoadingS(false);
      }, 2000);
      toast.success(data.message);
      // alert(data.message || data.error);
    } catch (error) {
      console.error("Error importing courses:", error);
      toast.error("An error occurred while importing courses.");
    }
  };

  return (
    <>
      <div style={{ padding: 24, fontFamily: "sans-serif" }}>
        <h2>Questions Excel Import / Export</h2>
        <div className="flex justify-between items-center mb-1">
          <p className="text-gray-400">
            <b>Expected Excel headers:</b>Course_name, Questions, Option_1,
            Option_2, Option_3, Option_4 <br /> Correct_Answer
          </p>
        </div>
      </div>
      <div className="p-6 w-fit flex justify-between gap-4 mx-auto border-amber-700 rounded-lg shadow-md">
        <button
          onClick={handleExport}
          className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded mb-4 w-100"
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
              Exporing...
            </>
          ) : (
            "Export Excel"
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

        {/* <button
          onClick={handleExport}
          className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded mb-4 w-100"
        >
          Export Excel
        </button> */}
        <input
          type="file"
          accept=".xlsx"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full mb-4 border py-2 px-3 rounded cursor-pointer"
        />

        <button
          onClick={handleImport}
          className="bg-green-500 text-white px-4 py-2 mb-4 cursor-pointer rounded w-100"
          disabled={loading}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: loadingS ? "#333" : "#00c950",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: loadingS ? "not-allowed" : "pointer",
          }}
        >
          {" "}
          {loadingS ? (
            <>
              <span className="spinner" />
              Imporing...
            </>
          ) : (
            "Import Excel"
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

        {/* <button
          onClick={handleImport}
          className="bg-green-500 text-white px-4 py-2 mb-4 cursor-pointer rounded w-100"
        >
          Import Excel
        </button> */}
      </div>

      <div className="flex justify-center items-center text-gray-700 gap-2 flex-wrap mb-2">
        <hr className="border-none w-20 sm:w-36 h-[1px] bg-gray-500 " />
        or <hr className="border-none w-20 sm:w-36 h-[1px] bg-gray-500 " />
      </div>
      <center>
        <Link
          to="StudentsEntry"
          className="py-2 px-2 cursor-pointer w-fit bg-amber-900 hover:bg-amber-950 text-white rounded"
        >
          Click to Add Individually
        </Link>
      </center>
      <QuestionsTable />
    </>
  );
};

export default CourseImportExport;

// import React, { useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../utils/util";

// const CourseImportExport = () => {
//   const [file, setFile] = useState(null);

//   const handleExport = async () => {
//     const res = await axios.get(`${BACKEND_URL}api/examinee/export`, {
//       responseType: "blob",
//     });
//     const url = window.URL.createObjectURL(new Blob([res.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "examinees.xlsx");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const handleImport = async () => {
//     if (!file) return alert("Please select a file first!");

//     const arrayBuffer = await file.arrayBuffer();

//     const res = await fetch(`${BACKEND_URL}api/examinee/import`, {
//       method: "POST",
//       headers: {
//         "Content-Type":
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       },
//       body: arrayBuffer,
//     });

//     const data = await res.json();
//     alert(data.message || data.error);
//   };

//   return (
//     <>
//       <h2 className="text-xl font-bold mb-4">Examinee Excel Import / Export</h2>
//       <div className="p-6 max-w-md flex justify-between gap-4 mx-auto border-amber-700 border rounded-lg shadow-md">
//         <button
//           onClick={handleExport}
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full"
//         >
//           Export Excel
//         </button>
//         <input
//           type="file"
//           accept=".xlsx"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="block w-full mb-4"
//         />
//         <button
//           onClick={handleImport}
//           className="bg-green-500 text-white px-4 py-2 rounded w-full"
//         >
//           Import Excel
//         </button>
//       </div>
//     </>
//   );
// };

// export default CourseImportExport;

// import React, { useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../../utils/util";

// const CourseImportExport = () => {
//   const [file, setFile] = useState(null);

//   const handleExport = async () => {
//     const res = await axios.get(`${BACKEND_URL}api/question/export`, {
//       responseType: "blob",
//     });
//     const url = window.URL.createObjectURL(new Blob([res.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", "questions.xlsx");
//     document.body.appendChild(link);
//     link.click();
//   };

//   const handleImport = async () => {
//     if (!file) return alert("Please select a file first!");

//     const arrayBuffer = await file.arrayBuffer();

//     const res = await fetch(`${BACKEND_URL}api/question/import`, {
//       method: "POST",
//       headers: {
//         "Content-Type":
//           "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       },
//       body: arrayBuffer,
//     });

//     const data = await res.json();
//     alert(data.message || data.error);
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto border rounded-lg shadow-md">
//       <h2 className="text-xl font-bold mb-4">Examinee Excel Import / Export</h2>
//       <button
//         onClick={handleExport}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4 w-full"
//       >
//         Export Excel
//       </button>
//       <input
//         type="file"
//         accept=".xlsx"
//         onChange={(e) => setFile(e.target.files[0])}
//         className="block w-full mb-4"
//       />
//       <button
//         onClick={handleImport}
//         className="bg-green-500 text-white px-4 py-2 rounded w-full"
//       >
//         Import Excel
//       </button>
//     </div>
//   );
// };

// export default CourseImportExport;
