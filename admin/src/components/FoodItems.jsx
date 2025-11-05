import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../utils/util";
import { useDispatch, useSelector } from "react-redux";
import Productitem from "./Productitem";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import {
  Home,
  BookOpen,
  Users,
  ClipboardList,
  FileText,
  Settings,
  LogOut,
  MessageCircle,
  Calendar,
  DollarSign,
  Award,
  ChevronDown,
  ChevronRight,
  UserCog,
} from "lucide-react";
const FoodItems = () => {
  const [latestproduct, setLatestProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  // Dummy chart data
  const data = [
    { month: "Jan", exams: 3, students: 2 },
    { month: "Feb", exams: 6, students: 3 },
    { month: "Mar", exams: 5, students: 4 },
    { month: "Apr", exams: 8, students: 6 },
    { month: "May", exams: 10, students: 8 },
    { month: "Jun", exams: 12, students: 9 },
  ];

  const pieData = [
    { name: "Present", value: 78 },
    { name: "Absent", value: 22 },
  ];
  const COLORS = ["#34d399", "#f87171"];

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  return (
    <>
      <div className="flex justify-center items-center">
        <img src="nnb.png" alt="" />

      </div>
              {/* Top Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Total Exams",
              value: 6,
              color: "from-blue-500 to-indigo-500",
            },
            {
              title: "Active Students",
              value: 152,
              color: "from-orange-500 to-pink-500",
            },
            {
              title: "Avg. Performance",
              value: "84%",
              color: "from-purple-500 to-fuchsia-500",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-2xl shadow-lg transition-all`}
            >
              <h2 className="text-lg font-semibold">{card.title}</h2>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </motion.div>
          ))}
        </div> */}

      {/* Charts Section */}
      <hr />
        <div className="grid md:grid-cols-3 gap-6">
          {/* Line Chart */}
          <div className="bg-white rounded-2xl shadow p-4 md:col-span-2">
            <h3 className="font-semibold mb-3 text-gray-700">Monthly Growth</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="exams"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#22c55e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-3 text-gray-700">
              Attendance Overview
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-4 mt-6">
          <h3 className="font-semibold mb-3 text-gray-700">
            Performance Stats
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="exams" fill="#6366f1" />
              <Bar dataKey="students" fill="#22c55e" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    </>
  );
};

export default FoodItems;
