import { NavLink } from "react-router-dom";
import {
  FaUtensils,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaAddressBook,
  FaUserPlus,
} from "react-icons/fa";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BACKEND_URL } from "../../utils/util";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { MdOutlineCreditScore } from "react-icons/md";

const SidebarContainer = styled(motion.div)`
  width: 250px;
  background: #fff;
  box-shadow: 0px 0px 3px rgb(0, 0, 0.2);
  min-height: 100vh;
  padding: 20px;
  position: fixed;
`;

const SidebarItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  text-decoration: none;
  color: #303030;
  font-size: 18px;
  transition: 0.3s;

  &:hover {
    background: lightblue;
    border-radius: 5px;
  }
`;

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`hidden sm:block`}>
      <SidebarContainer
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <SidebarItem to="/dashboard">
          <FaHome /> &nbsp; Dashboard
        </SidebarItem>
        <SidebarItem to="/courses">
          <IoNewspaperSharp /> &nbsp; Courses & Exams
        </SidebarItem>
        <SidebarItem to="/students">
          <FaUsers /> &nbsp; Students
        </SidebarItem>
        <SidebarItem to="/questions">
          <FaFileCircleQuestion /> &nbsp; Questions
        </SidebarItem>
        <SidebarItem to="/results">
          <MdOutlineCreditScore /> &nbsp; Results
        </SidebarItem>
        <SidebarItem to="/settings">
          <FaCog /> &nbsp; Settings
        </SidebarItem>
        <SidebarItem to="/adminlogout">
          <FaSignOutAlt /> &nbsp; Logout
        </SidebarItem>
      </SidebarContainer>
    </div>
  );
};

export default Sidebar;
