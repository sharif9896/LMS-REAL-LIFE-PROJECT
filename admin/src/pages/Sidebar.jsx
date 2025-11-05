import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaClipboardList,
  FaBullhorn,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggle = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const subMenu = (title, items) => (
    <div className="ml-8 mt-2 text-sm flex flex-col space-y-1">
      {items.map((item, i) => (
        <button key={i} className="text-gray-300 hover:text-cyan-400 text-left">
          ➤ {item}
        </button>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-gray-900 text-white p-4 flex flex-col space-y-3 shadow-lg"
    >
      <h2 className="text-center text-xl font-bold mb-4 text-cyan-400">
        ICLMS Admin
      </h2>

      <button className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded">
        <FaTachometerAlt /> Dashboard
      </button>

      <div>
        <button
          onClick={() => toggle("courses")}
          className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded w-full"
        >
          <FaBook /> Courses & Exams
        </button>
        <AnimatePresence>
          {openMenu === "courses" && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
            >
              {subMenu("Courses", [
                "View Courses",
                "Create Course",
                "Exam List",
                "Add Exam",
              ])}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded">
        <FaUserGraduate /> Students
      </button>

      <div>
        <button
          onClick={() => toggle("assignments")}
          className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded w-full"
        >
          <FaClipboardList /> Assignments
        </button>
        <AnimatePresence>
          {openMenu === "assignments" && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
            >
              {subMenu("Assignments", ["Upload", "Review", "Grades"])}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <button
          onClick={() => toggle("announcements")}
          className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded w-full"
        >
          <FaBullhorn /> Announcements
        </button>
        <AnimatePresence>
          {openMenu === "announcements" && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
            >
              {subMenu("Announcements", ["Create", "Manage", "View All"])}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded">
        <FaCog /> Settings
      </button>

      <button className="flex items-center gap-3 hover:bg-gray-800 p-2 rounded text-red-400">
        <FaSignOutAlt /> Logout
      </button>
    </motion.div>
  );
};

export default Sidebar;
