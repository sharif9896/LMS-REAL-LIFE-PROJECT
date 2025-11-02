import React from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #1e1e1e;
  color: white;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Home = () => {
  return (

        <Outlet />
        
  );
};

export default Home;
