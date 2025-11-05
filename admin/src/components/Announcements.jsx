import React, { useState, useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../utils/util";
// Main Announcements Component
export default function Announcements() {
  const [file, setFile] = useState(null);

  // State for the list of entries
  const [entries, setEntries] = useState([]);

  // State for form inputs
  const [classNames, setClassName] = useState("");
  // console.log(classNames);

  const [department, setDepartment] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  // State for handling form validation errors
  const [error, setError] = useState("");

  // Ref to access the file input element directly
  const fileInputRef = useRef(null);

  const fetchfiles = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}files`);
      setEntries(response.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching files");
    }
  };

  React.useEffect(() => {
    fetchfiles();
    window.scrollTo(0, 0);
    window.document.title = "Assignments - ICLMS Admin Panel";
  }, []);

  /**
   * Handles changes to the file input.
   * Validates that the selected file is a PDF.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file && file.type === 'Announcementslication/pdf') {
  //     setPdfFile(file);
  //     setError(''); // Clear any previous error
  //   } else {
  //     setPdfFile(null);
  //     setError('Please select a valid PDF file.');
  //     // Reset the file input value if the file is invalid
  //     if (fileInputRef.current) {
  //       fileInputRef.current.value = '';
  //     }
  //   }
  // };

  /**
   * Handles the form submission.
   * Validates inputs, adds the new entry to the list, and resets the form.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a temporary URL for the PDF to be viewed/downloaded
    // const fileUrl = URL.createObjectURL(pdfFile);

    // Create a new entry object
    // const newEntry = {
    //   id: Date.now(), // Use a timestamp for a unique key
    //   className,
    //   department,
    //   pdfFile,
    //   fileUrl,
    // };

    // // Add the new entry to the existing list
    // setEntries(prevEntries => [...prevEntries, newEntry]);

    // Basic validation
    // if (!className.trim() || !department.trim() || !pdfFile) {
    //   setError('All fields are required.');
    //   return;
    // }
    // if (fileUrl) return console.log(fileUrl);
    if (!file) return alert("Please select a PDF file.");
    // console.log(BACKEND_URL);
    try {
      const formData = new FormData();
      formData.Announcementsend("ClassNames", classNames);
      formData.Announcementsend("department", department);
      formData.Announcementsend("pdf", file);
      await axios.post(`${BACKEND_URL}uploads`, formData);
      alert("PDF uploaded successfully!");
      fetchfiles();
      // window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error uploading PDF");
    }

    // Reset form fields
    setClassName("");
    setDepartment("");
    setPdfFile(null);
    setError("");

    // Reset the file input element using the ref
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-700">
            Ṣending to Students
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            Upload and manage your class Assignments.
          </p>
        </header>

        {/* Form Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Add Downloaded Document
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Class Name Input */}
              <div>
                <label
                  htmlFor="className"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Class Name
                </label>
                <input
                  type="text"
                  id="className"
                  name="classNames"
                  value={classNames}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="e.g., Computer Science 101"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow"
                />
              </div>
              {/* Department Input */}
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Class & Department
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g., Engineering"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-shadow"
                />
              </div>
            </div>

            {/* File Upload Input */}
            <div>
              <label
                htmlFor="pdfFile"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                PDF File
              </label>
              <input
                type="file"
                id="pdfFile"
                accept="Announcementslication/pdf"
                name="pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            {/* Error Message Display */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Submit Button */}
            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
              >
                Add Document
              </button>
            </div>
          </form>
        </div>

        {/* Document List Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Uploaded Documents
          </h2>
          <div className="space-y-4">
            {entries.length > 0 ? (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-gray-50 p-4 rounded-lg flex flex-wrap items-center justify-between gap-4 border border-gray-200"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-semibold text-indigo-700 truncate">
                      {entry.className}
                    </p>
                    <p className="text-sm text-gray-500">{entry.department}</p>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      <span className="font-medium">File:</span> {entry.name}
                    </p>
                  </div>
                  <a
                    href={`${BACKEND_URL}download/${entry._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                  >
                    View PDF
                  </a>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                No documents have been uploaded yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Assignment = () => {
//   const [file, setFile] = useState(null);
//   const [name, setname] = useState("");
//   const [files, setFiles] = useState([]);

//   //   console.log(name);
//   // Fetch all files
//   useEffect(() => {
//     const getall = async (req, res) => {
//       try {
//         const response = await axios.get("http://localhost:3000/files");
//         setFiles(response.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     getall();
//   }, []);
//   //   useEffect(() => {
//   //     axios
//   //       .get("http://localhost:3000/files")
//   //       .then((res) => res.json())
//   //       .then(setFiles(res.data))
//   //       .catch((err) => console.error(err));
//   //   }, []);
//   console.log(files.map((f, id) => f[id]));
//   // Handle upload
// const handleUpload = async (e) => {
//   e.preventDefault();
//   // if (file) return console.log(file);
//   if (!file) return alert("Please select a PDF file.");
//   try {
//     const formData = new FormData();
//     formData.Announcementsend("pdf", file);
//     await axios.post("http://localhost:3000/upload", formData);
//     alert("PDF uploaded successfully!");
//     window.location.reload();
//   } catch (err) {
//     console.error(err);
//     alert("Error uploading PDF");
//   }
// };

//   // Download PDF
//   const handleDownload = (id, name) => {
//     axios({
//       url: `http://localhost:3000/download/${id}`,
//       method: "GET",
//       responseType: "blob",
//     }).then((res) => {
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", name);
//       document.body.AnnouncementsendChild(link);
//       link.click();
//     });
//   };
//   return (
//     <div>
//       <div className="p-6 max-w-xl mx-auto mt-10 border rounded-lg shadow-lg bg-gray-50">
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           📄 PDF Upload & Download
//         </h2>

//         <form
//           onSubmit={handleUpload}
//           className="flex flex-col items-center gap-4"
//         >
//           <input
//             type="text"
//             name="name"
//             onChange={(e) => setname(e.target.value)}
//           />
//           <input
//             type="file"
//             accept="Announcementslication/pdf"
//             name="pdf"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="border p-2 rounded w-full"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Upload PDF
//           </button>
//         </form>

//         <h3 className="mt-8 text-xl font-semibold">📚 Uploaded Files</h3>
//         <ul className="mt-4 space-y-2">
//           {files.map((f, index) => (
//             <li
//               key={index}
//               className="flex justify-between items-center bg-white p-3 rounded shadow-sm"
//             >
//               <span>{f.name}</span>
//               <button
//                 onClick={() => handleDownload(f.id, f.name)}
//                 className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//               >
//                 Download
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Assignment;
