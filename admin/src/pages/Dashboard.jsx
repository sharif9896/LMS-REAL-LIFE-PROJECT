// import React, { useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import { motion } from "framer-motion";
// import {
//   Home,
//   BookOpen,
//   Users,
//   ClipboardList,
//   FileText,
//   Settings,
//   LogOut,
//   MessageCircle,
//   Calendar,
//   DollarSign,
//   Award,
//   ChevronDown,
//   ChevronRight,
//   UserCog,
// } from "lucide-react";

// const Dashboard = () => {
//   const [open, setOpen] = useState(true);
//   const [openDropdown, setOpenDropdown] = useState(null);

  // // Dummy chart data
  // const data = [
  //   { month: "Jan", exams: 3, students: 2 },
  //   { month: "Feb", exams: 6, students: 3 },
  //   { month: "Mar", exams: 5, students: 4 },
  //   { month: "Apr", exams: 8, students: 6 },
  //   { month: "May", exams: 10, students: 8 },
  //   { month: "Jun", exams: 12, students: 9 },
  // ];

  // const pieData = [
  //   { name: "Present", value: 78 },
  //   { name: "Absent", value: 22 },
  // ];
  // const COLORS = ["#34d399", "#f87171"];

  // const toggleDropdown = (index) => {
  //   setOpenDropdown(openDropdown === index ? null : index);
  // };

//   const menuItems = [
//     { name: "Dashboard", icon: <Home /> },
//     {
//       name: "Courses & Exams",
//       icon: <BookOpen />,
//       submenu: ["Manage Courses", "Manage Exams", "Subjects List"],
//     },
//     {
//       name: "Students",
//       icon: <Users />,
//       submenu: ["All Students", "Attendance", "Grades"],
//     },
//     {
//       name: "Teachers",
//       icon: <UserCog />,
//       submenu: ["Faculty List", "Assign Subjects"],
//     },
//     {
//       name: "Assignments",
//       icon: <ClipboardList />,
//       submenu: ["Upload", "Submissions"],
//     },
//     {
//       name: "Results",
//       icon: <FileText />,
//       submenu: ["View Results", "Export Reports"],
//     },
//     {
//       name: "Announcements",
//       icon: <MessageCircle />,
//       submenu: ["Add Announcement", "View All"],
//     },
//     {
//       name: "Resources",
//       icon: <BookOpen />,
//       submenu: ["Study Materials", "Past Papers"],
//     },
//     {
//       name: "Reports & Analytics",
//       icon: <Bar />,
//       submenu: ["Performance", "Attendance Report"],
//     },
//     {
//       name: "Fee Management",
//       icon: <DollarSign />,
//       submenu: ["Payments", "Receipts"],
//     },
//     {
//       name: "Certificates",
//       icon: <Award />,
//       submenu: ["Generate", "Issued List"],
//     },
//     {
//       name: "Events & Calendar",
//       icon: <Calendar />,
//       submenu: ["Upcoming Events", "Exam Schedule"],
//     },
//     { name: "Settings", icon: <Settings /> },
//     { name: "Logout", icon: <LogOut /> },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100 overflow-hidden">

//       {/* Sidebar */}
//       <motion.div
//         animate={{ width: open ? 250 : 80 }}
//         className="bg-gray-800 text-white p-4 flex flex-col shadow-lg transition-all duration-500"
//       >
//         {/* Logo + Toggle */}
//         <div className="flex items-center justify-between">
//           {open && <h2 className="text-2xl font-bold text-white">ICLMS</h2>}
//           <button onClick={() => setOpen(!open)} className="text-white">
//             ☰
//           </button>
//         </div>

//         {/* Menu */}
//         <nav className="mt-8 space-y-2 overflow-y-auto scrollbar-hide">
//           {menuItems.map((item, i) => (
//             <div key={i}>
//               <div
//                 onClick={() => item.submenu && toggleDropdown(i)}
//                 className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 cursor-pointer ${
//                   openDropdown === i ? "bg-gray-700" : ""
//                 }`}
//               >
//                 <div className="flex items-center space-x-3">
//                   {item.icon}
//                   {open && (
//                     <span className="text-sm font-medium">{item.name}</span>
//                   )}
//                 </div>
//                 {item.submenu && open && (
//                   <span>
//                     {openDropdown === i ? <ChevronDown /> : <ChevronRight />}
//                   </span>
//                 )}
//               </div>
//               {/* Submenu */}
//               {item.submenu && openDropdown === i && open && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="ml-9 mt-2 space-y-2"
//                 >
//                   {item.submenu.map((sub, idx) => (
//                     <div
//                       key={idx}
//                       className="text-sm text-gray-300 hover:text-white cursor-pointer"
//                     >
//                       {sub}
//                     </div>
//                   ))}
//                 </motion.div>
//               )}
//             </div>
//           ))}
//         </nav>
//       </motion.div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 overflow-y-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           Admin Dashboard Overview
//         </h1>


//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FoodItems from "../components/FoodItems";
import { BACKEND_URL } from "../../utils/util";
import axios from "axios";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { itemAction } from "../../store/ItemSlice";
const DashboardContainer = styled.div`
  // text-align: center;

  margin-top: 50px;
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f4f4f4;
  color: white;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Dashboard = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async (req, res) => {
      const resp = await axios.get(`http://localhost:3000/api/user/getresults`);
      dispatch(itemAction.setItems(resp.data.result));
      // console.log(resp.data.result);
    };
    fetchdata();
  }, []);
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header />
        <DashboardContainer className="sm:ml-[250px]">
          <FoodItems />
        </DashboardContainer>
        <Footer />
      </MainContent>
    </Container>
  );
};

export default Dashboard;

// import React from "react";
// import { Link } from "react-router-dom";
// import {toast} from "react-toastify";
// import axios from "axios";
// import {useNavigate} from "react-router-dom";
// import { BACKEND_URL } from "../../utils/util";

// function Dashboard() {
//   const navigate = useNavigate();
//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(`${BACKEND_URL}api/admin/logout`);
//       toast.success(response.data.message);
//       localStorage.removeItem("admin");
//       navigate("/")
//     } catch (error) {
//       console.log("Error in logging out ", error);
//       toast.error(error.response.data.errors || "Error in logging out");
//     }
//   };
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-100 p-5">
//         <div className="flex items-center flex-col mb-10">
//           <img src="public/log.png" alt="Profile" className="rounded-full h-20 w-20" />
//           <h2 className="text-lg font-semibold mt-4">I'm Admin</h2>
//         </div>
//         <nav className="flex flex-col space-y-4">
//           <Link to="/admin/our-courses">
//             <button className="w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded">
//               Our Courses
//             </button>
//           </Link>
//           <Link to="/admin/create-course">
//             <button className="w-full bg-orange-500 hover:bg-blue-600 text-white py-2 rounded">
//               Create Course
//             </button>
//           </Link>

//           <Link to="/">
//             <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded">
//               Home
//             </button>
//           </Link>
//           {/* <Link to="/admin/login"> */}
//             <button
//               onClick={handleLogout}
//               className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
//             >
//               Logout
//             </button>
//           {/* </Link> */}
//         </nav>
//       </div>
//       <div className="flex h-screen items-center justify-center ml-[40%]">
//         Welcome!!!
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
