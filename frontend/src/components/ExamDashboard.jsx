import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SplashScreen from "../components/SplashScreen";

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
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // 3 seconds
    return () => clearTimeout(timeout);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }
  return (
    <Sidebar />
    // <Container>
    //   <Sidebar />
    //   <MainContent>
    //     <Header />
    //     <DashboardContainer className="sm:ml-[250px]">
    //       <FoodItems />
    //     </DashboardContainer>
    //     <Footer />
    //   </MainContent>
    // </Container>
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
