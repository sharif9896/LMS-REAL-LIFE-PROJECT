import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminSignup from "./pages/AdminSignup.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Foods from "./pages/ImportExcel.jsx";
import Orders from "./pages/Orders.jsx";
import Settings from "./pages/Settings.jsx";
import UpdateFoods from "./pages/UpdateFoods.jsx";
import Signin from "./pages/Signin.jsx";
import { Provider } from "react-redux";
import ecommerce from "../store/index.js";
import DeleteFoods from "./pages/DeleteFoods.jsx";
import Adminlogout from "./pages/Adminlogout.jsx";
import Students from "./pages/Students.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core
import "primeicons/primeicons.css"; // Icons
import Course from "./pages/Course.jsx";
import Question from "./pages/Question.jsx";
import Assignment_Stu from "./pages/Assignment_Stu.jsx";
import Results from "./components/Results.jsx";
import Assignments from "./components/Assignments.jsx";
import Assignment_Dash from "./pages/Assignment_Dash.jsx";
import Announce from "./pages/Announce.jsx";
import Anouncement_Dash from "./pages/Anouncement_Dash.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AdminLogin /> },
      { path: "/admin/signup", element: <AdminSignup /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/courses", element: <Course /> },
      { path: "/students", element: <Students /> },
      { path: "/questions", element: <Question /> },
      { path: "/settings", element: <Settings /> },
      { path: "/signin", element: <Signin /> },
      { path: "/admin/update-foods/:id", element: <UpdateFoods /> },
      { path: "/deletefood/:id", element: <DeleteFoods /> },
      { path: "/adminlogout", element: <Adminlogout /> },
      { path: "/assign", element: <Assignment_Stu /> },
      { path: "/assigns", element: <Assignment_Dash /> },
      { path: "/results", element: <Results /> },
      { path: "/Announce", element: <Announce /> },
       { path: "/anounces", element: <Anouncement_Dash /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={ecommerce}>
      <RouterProvider router={route}></RouterProvider>
    </Provider>
  </StrictMode>
);
