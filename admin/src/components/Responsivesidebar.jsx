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

const SidebarContainer = styled(motion.div)`
  width: 250px;
  background: #252525;
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
  color: white;
  font-size: 18px;
  transition: 0.3s;

  &:hover {
    background: #ff6600;
    border-radius: 5px;
  }
`;

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      <SidebarContainer
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <SidebarItem to="/dashboard">
          <FaHome /> &nbsp; Dashboard
        </SidebarItem>
        <SidebarItem to="/foods">
          <FaUtensils /> &nbsp; Foods
        </SidebarItem>
        <SidebarItem to="/orders">
          <FaShoppingCart /> &nbsp; Orders
        </SidebarItem>
        <SidebarItem to="/settings">
          <FaCog /> &nbsp; Settings
        </SidebarItem>
        <SidebarItem to="/">
          <FaSignOutAlt /> &nbsp; Logout
        </SidebarItem>
      </SidebarContainer>
    </div>
  );
};

export default Sidebar;
