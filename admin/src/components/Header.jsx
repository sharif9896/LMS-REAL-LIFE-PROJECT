import { Link } from "react-router-dom";
import { CgMenuLeft } from "react-icons/cg";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";

const HeaderContainer = styled.div`
  width: 100%;
  background: transparent;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`;
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
  width: 100%;
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
    background: #155dfc;
    border-radius: 5px;
  }
`;

const Header = () => {
  const [visible, setvisible] = useState();
  // const [trues, setTrues] = useState(false);
  return (
    <>
      <HeaderContainer>
        <div
          className="text-3xl text-gray-400"
          onClick={() => setvisible(true)}
        >
          <CgMenuLeft />
        </div>
        <div className="text-gray-400">Admin Dashboard</div>
        <Link
          to={"/signin"}
          className="py-1 px-2 bg-blue-600 text-white text-[15px] rounded"
        >
          signin
        </Link>
      </HeaderContainer>
      <div
        className={` z-2 absolute top-0 bottom-0 right-0 w-[100%] transition-transform ease-out duration:3000 text-xl font-medium bg-[#252525] ${
          visible ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-cols flex-row py-5 px-5 ">
          <div
            onClick={() => setvisible(false)}
            className="flex item-center gap-5  text-gray-500 cursor-pointer"
          >
            <FaAngleLeft className="mt-1" />

            <div className="flex item-center text-gray-500">Back</div>
          </div>
        </div>

        {/* <hr className="border-gray-300 w-[100%]" /> */}

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
      <hr className="border-gray-300" />
    </>
  );
};

export default Header;
