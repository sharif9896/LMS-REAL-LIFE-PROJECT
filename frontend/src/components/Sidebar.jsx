import React, { useEffect, useState } from "react";
import {
  Menu,
  ChevronDown,
  ChevronRight,
  NotebookText,
  MessageSquareText,
  User,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import FoodItems from "../components/ExamPopup";
import { toast } from "react-toastify";
import ExamStartPopup from "./ExamStartPopup";
import axios from "axios";
import { BACKEND_URL } from "../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import { CountTimingAction } from "../../store/CountTimingSlice";

// Single-file, drop-in component. TailwindCSS assumed.
// Default export so you can render <App /> directly.
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allExamsOpen, setAllExamsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [page, setPage] = useState("home");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [times, settimes] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"));
  const user = token.user;
  // Close sidebar on ESC (mobile)
  useEffect(() => {
    const gettime = async (req, res) => {
      try {
        const timedata = await axios.get(
          `${BACKEND_URL}api/times/${user.course_exam}`
        );
        // console.log(timedata.data[0].hours);
        dispatch(CountTimingAction.setItems(timedata.data[0].hours));
      } catch (err) {
        console.log("Error in Fetching the Timing ", err);
        toast.error(err.response.data.error || "Error in Fetching the Timing");
      }
    };
    gettime();
    const onKey = (e) => e.key === "Escape" && setSidebarOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // console.log(times);

  const handleLogout = () => {
    localStorage.removeItem("user");
    // toast.success(response.data.message);
    toast.success("Logout Successful..");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between gap-3 drop-shadow-lg bg-white/80 backdrop-blur px-4 py-3 shadow-sm">
        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-xl border hover:bg-slate-100 active:scale-95 transition"
          onClick={() => setSidebarOpen((s) => !s)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 font-semibold tracking-wide">
          <Link
            to={"/dashboard"}
            className="h-8 w-10 rounded-md  text-white grid place-items-center text-sm"
          >
            <img src="ss1.png" alt="" />
          </Link>
          <Link to={"/main-stu"} className="text-slate-900">
            ONLINE EXAMINATION
          </Link>
        </div>

        {/* Profile Menu */}
        <div className="relative cursor-pointer">
          <button
            onClick={() => setProfileMenuOpen((o) => !o)}
            className="flex items-center gap-2 cursor-pointer rounded-full border px-3 py-2 hover:bg-slate-100"
          >
            <User className="h-5 w-fit cursor-pointer" />
            <span className="hidden sm:inline-block cursor-pointer text-sm font-medium">
              {user.name || "User"}
            </span>
            <ChevronDown className="h-4 w-4 cursor-pointer" />
          </button>

          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg cursor-pointer border bg-white shadow-md overflow-hidden">
              <button
                onClick={() => {
                  setPage("profile");
                  setProfileMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-4 py-2 cursor-pointer text-sm hover:bg-slate-100"
              >
                <User className="h-4 w-4" /> My Profile
              </button>
              <div
                onClick={handleLogout}
                className="flex w-full items-center gap-2 cursor-pointer px-4 py-2 text-sm hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" /> Logout
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 md:hidden"
          />
        )}

        {/* Sidebar */}
        <aside
          className={
            "fixed md:static z-50 inset-y-0 left-0 w-72 shrink-0 transform transition-transform duration-300 " +
            (sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0") +
            " bg-white shadow-lg"
          }
        >
          <div className="h-[100vh] flex flex-col">
            {/* Logo area to mirror screenshot spacing */}
            {/* <div className="px-4 pt-4 pb-2">
              <div className="h-12 w-12 rounded-lg border grid place-items-center text-xs font-semibold">
                <img src="ss1.png" alt="" />
              </div>
            </div> */}

            {/* Scrollable menu */}
            <nav className="px-3 py-3  pb-6 overflow-y-auto cursor-pointer">
              {/* AVAILABLE EXAM'S */}
              <SectionTitle className="text-blue-800 text-xl cursor-pointer">
                <b className="text-blue-800 text-sm">AVAILABLE EXAM'S</b>
              </SectionTitle>

              <CollapsibleItem
                className="cursor-pointer"
                icon={<NotebookText className="h-5 w-5 cursor-pointer" />}
                title={"All Exam's"}
                open={allExamsOpen}
                onToggle={() => setAllExamsOpen((o) => !o)}
              >
                <SubLink label={user.course_exam} href={"/start-exam"} />
                {/* <SubLink label="Maths I" href="#maths1" />
                <SubLink label="Physics" href="#physics" /> */}
              </CollapsibleItem>

              {/* TAKEN EXAM'S */}
              <SectionTitle className="mt-6 ">
                <b className="text-blue-800 text-sm">TAKEN EXAM'S</b>
              </SectionTitle>
              <SimpleLink
                label="You are not taking exam yet"
                href="#taken-evs2"
              />

              {/* FEEDBACKS */}
              <SectionTitle className="mt-6">
                <b className="text-blue-800 text-sm">FEEDBACKS</b>
              </SectionTitle>
              <SimpleLink
                icon={<MessageSquareText className="h-5 w-5" />}
                label="Add Feedbacks"
                href="#feedback"
              />
            </nav>
          </div>
        </aside>

        {/* Content area */}
        <FoodItems />
        {/* <main className="md:ml-72 p-6">
          <div className="max-w-3xl">
            <h1 className="text-2xl font-semibold mb-3">Instructions</h1>
            <p className="text-sm text-slate-600 mb-6">
              This is a placeholder content panel so you can see the sidebar in
              context. Resize to mobile to test the hamburger and slide-in menu.
            </p>
            <div className="rounded-2xl border bg-white p-4 shadow-sm space-y-3">
              <p>• Read all questions carefully.</p>
              <p>• Do not refresh the page during the exam.</p>
              <p>• Your progress is auto-saved.</p>
              <button
                className="mt-2 inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-slate-50 active:scale-[0.98]"
                onClick={() => alert("Demo action")}
              >
                Start Demo
              </button>
            </div>
          </div>
        </main> */}
      </div>
    </div>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <div
      className={`px-2 pb-2 text-[11px] font-semibold tracking-wide text-slate-500 ${className}`}
    >
      {children}
    </div>
  );
}

function SimpleLink({ label, href, icon }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm hover:bg-slate-100 active:scale-[0.99] transition select-none"
    >
      {icon ? icon : <span className="h-5 w-5 grid place-items-center">•</span>}
      <span className="font-medium text-slate-800 group-hover:text-slate-900">
        {label}
      </span>
    </a>
  );
}

function SubLink({ label, href }) {
  return (
    <Link
      to={href}
      className="ml-10 block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
    >
      {label}
    </Link>
  );
}

function CollapsibleItem({ title, icon, open, onToggle, children }) {
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className={
          "w-full flex items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left transition " +
          (open ? "bg-sky-50 border-sky-200" : "hover:bg-slate-100")
        }
      >
        <span className="flex items-center gap-3">
          {icon}
          <span className="font-semibold">{title}</span>
        </span>
        {open ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      <div
        className={
          "grid transition-all duration-300 ease-out " +
          (open
            ? "grid-rows-[1fr] opacity-100 mt-1"
            : "grid-rows-[0fr] opacity-0")
        }
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

// import { NavLink } from "react-router-dom";
// import {
//   FaUtensils,
//   FaShoppingCart,
//   FaCog,
//   FaSignOutAlt,
//   FaHome,
//   FaAddressBook,
//   FaUserPlus,
// } from "react-icons/fa";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import { BACKEND_URL } from "../../utils/util";
// import { IoNewspaperSharp } from "react-icons/io5";
// import { FaUsers } from "react-icons/fa";
// import { FaFileCircleQuestion } from "react-icons/fa6";
// import { MdOutlineCreditScore } from "react-icons/md";

// const SidebarContainer = styled(motion.div)`
//   width: 250px;
//   background: #f5f5f5;
//   box-shadow: 0px 0px 3px rgb(0, 0, 0.2);
//   min-height: 100vh;
//   padding: 20px;
//   position: fixed;
// `;

// const SidebarItem = styled(NavLink)`
//   display: flex;
//   align-items: center;
//   padding: 15px;
//   margin: 10px 0;
//   text-decoration: none;
//   color: #303030;
//   font-size: 18px;
//   transition: 0.3s;

//   &:hover {
//     background: lightblue;
//     border-radius: 5px;
//   }
// `;

// const Sidebar = () => {
//   // const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className={`hidden sm:block`}>
//       <SidebarContainer
//         initial={{ x: -250 }}
//         animate={{ x: 0 }}
//         transition={{ type: "spring", stiffness: 100 }}
//       >
//         <SidebarItem to="/dashboard">
//           <FaHome /> &nbsp; Dashboard
//         </SidebarItem>
//         <SidebarItem to="/foods">
//           <IoNewspaperSharp /> &nbsp; Courses & Exams
//         </SidebarItem>
//         <SidebarItem to="/orders">
//           <FaUsers /> &nbsp; Students
//         </SidebarItem>
//         <SidebarItem to="/orders">
//           <FaFileCircleQuestion /> &nbsp; Questions
//         </SidebarItem>
//         <SidebarItem to="/orders">
//           <MdOutlineCreditScore /> &nbsp; Results
//         </SidebarItem>
//         <SidebarItem to="/settings">
//           <FaCog /> &nbsp; Settings
//         </SidebarItem>
//         <SidebarItem to="/userlogout">
//           <FaSignOutAlt /> &nbsp; Logout
//         </SidebarItem>
//       </SidebarContainer>
//     </div>
//   );
// };

// export default Sidebar;
