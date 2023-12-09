import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/HomePage/Home/Home";
import Membership from "../Pages/Membership/Membership";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivetRoute from "./PrivetRoute";
import Dashboard from "../Layout/Dashboard/Dashboard";
import MyProfile from "../Pages/DashboardPages/UserDashboard/MyProfile/MyProfile";
import AddPost from "../Pages/DashboardPages/UserDashboard/AddPost/AddPost";
import MyPosts from "../Pages/DashboardPages/UserDashboard/MyPosts/MyPosts";
import AdminProfile from "../Pages/DashboardPages/AdminDashboard/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/DashboardPages/AdminDashboard/ManageUsers/ManageUsers";
import Activities from "../Pages/DashboardPages/AdminDashboard/Activities/Activities";
import MakeAnnouncement from "../Pages/DashboardPages/AdminDashboard/MakeAnnouncement/MakeAnnouncement";
import AdminRoute from "./AdminRoute";
import PostDetail from "../Pages/HomePage/Posts/PostDetail";
import Comment from "../Pages/DashboardPages/UserDashboard/Comment/Comment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "membership",
        element: (
          <PrivetRoute>
            <Membership></Membership>
          </PrivetRoute>
        ),
      },
      {
        path: "/posts/:id",
        element: (
            <PostDetail></PostDetail>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signUp",
    element: <SignUp></SignUp>,
  },

  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <Dashboard></Dashboard>
      </PrivetRoute>
    ),
    children: [
      {
        path: "myProfile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "addPost",
        element: <AddPost></AddPost>,
      },
      {
        path: "myPosts",
        element: <MyPosts></MyPosts>,
      },
      {
        path: "comment/:id",
        element: <Comment></Comment>,
      },
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "activities",
        element: (
          <AdminRoute>
            <Activities></Activities>
          </AdminRoute>
        ),
      },
      {
        path: "makeAnnouncement",
        element: (
          <AdminRoute>
            <MakeAnnouncement></MakeAnnouncement>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
