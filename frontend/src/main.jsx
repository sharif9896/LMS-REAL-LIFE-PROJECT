import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AdminSignup from "./pages/AdminSignup.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import UpdateFoods from "./pages/UpdateFoods.jsx";
import Signin from "./pages/Signin.jsx";
import { Provider } from "react-redux";
import ecommerce from "../store/index.js";
import DeleteFoods from "./pages/DeleteFoods.jsx";
import Userlogout from "./pages/Userlogout.jsx";
import Sidebar2 from "./components/Sidebar2.jsx";
import Mainsidebar from "./components/Mainsidebar.jsx";
import Sidebar3 from "./components/Sidebar3.jsx";
import Submitdash from "./pages/Submitdash.jsx";
import Oops from "./components/Oops.jsx";
import Oops1 from "./components/Oops1.jsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AdminLogin /> },
      { path: "/admin/signup", element: <AdminSignup /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/main-stu", element: <Mainsidebar /> },
      { path: "/oops-stu", element: <Oops /> },
      { path: "/oops-stu1", element: <Oops1 /> },
      { path: "/start-exam", element: <Sidebar2 /> },
      { path: "/questions", element: <Sidebar3 /> },
      { path: "/Submitteddashboard", element: <Submitdash /> },
      { path: "/signin", element: <Signin /> },
      { path: "/admin/update-foods/:id", element: <UpdateFoods /> },
      { path: "/deletefood/:id", element: <DeleteFoods /> },
      { path: "/userlogout", element: <Userlogout /> },
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
