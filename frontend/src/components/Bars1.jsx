import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { BACKEND_URL } from "../../utils/util";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const StudentFileCard = () => {
  const [file, setfile] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"));
  const user = token.user;
  useEffect(() => {
    const fetxhfile = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}files/${user.class}/${user.department}`
        );
        // console.log("Fetched file:", response);
        setfile(response.data[0]);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };
    fetxhfile();
  }, []);

  const handleDownload = (id) => {
    const link = document.createElement("a");
    link.href = `${BACKEND_URL}download/${id}`; // Adjust based on your backend/static file setup
    link.download = file.name;
    link.click();
  };

  return (
    <>
      {file ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-200 hover:shadow-2xl transition"
        >
          <h2 className="text-2xl font-semibold text-gray-600 mb-3 text-center">
            📘 Assignment - Download & Complete
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium text-gray-900">Class:</span>{" "}
              {file.ClassNames}
            </p>
            <p>
              <span className="font-medium text-gray-900">Department:</span>{" "}
              {file.department}
            </p>
            <p>
              <span className="font-medium text-gray-900">File Name:</span>{" "}
              {file.name}
            </p>
            <p>
              <span className="font-medium text-gray-900">Uploaded:</span>{" "}
              {new Date(file.timestamp).toLocaleString()}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDownload(file._id)}
            className="mt-5 flex items-center justify-center cursor-pointer gap-2 bg-gray-600 text-white px-5 py-2 rounded-xl w-full hover:bg-blue-700 transition"
          >
            <Download size={20} /> Download PDF
          </motion.button>
        </motion.div>
      ) : (
        <div>
          <div className="w-auto h-55 flex justify-center items-center">
            <img className="w-60" src="errorico.png" alt="" />
          </div>
          <p className="w-auto flex justify-center items-center">
            - Oop's, Does'nt have an any Assignment yet! -
          </p>
        </div>
      )}
    </>
  );
};

export default StudentFileCard;

// import React from "react";

// const Bars1 = () => {
//   return (
//     <div>
//       <div className="w-auto h-55 flex justify-center items-center">
//         <img className="w-60" src="errorico.png" alt="" />
//       </div>
//       <p className="w-auto flex justify-center items-center">
//         - Oop's, Does'nt have an any Assignment yet! -
//       </p>
//     </div>
//   );
// };
// export default Bars1;
