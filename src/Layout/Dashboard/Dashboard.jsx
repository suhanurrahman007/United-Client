import { FaAd, FaBookmark, FaHome, FaMagnet } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { VscThreeBars } from "react-icons/vsc";
import logo from "../../assets/logo/logo.png"

const Dashboard = () => {
  const [isAdmin] = useAdmin()

  const UserSidebarLinks = (
    <>
      <li id="sidebar">
        <NavLink
          to="/dashboard/myProfile"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <FaHome></FaHome>
          My Profile
        </NavLink>
      </li>

      <li id="sidebar">
        <NavLink
          to="/dashboard/addPost"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <FaAd></FaAd>
          Add Post
        </NavLink>
      </li>

      <li id="sidebar">
        <NavLink
          to="/dashboard/myPosts"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <FaMagnet></FaMagnet>
          My Posts
        </NavLink>
      </li>
    </>
  );

  const AdminSidebarLinks = (
    <>
      <li id="sidebar">
        <NavLink
          to="/dashboard/adminProfile"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <FaHome></FaHome>
          Admin Profile
        </NavLink>
      </li>

      <li id="sidebar">
        <NavLink
          to="/dashboard/manageUsers"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <FaAd></FaAd>
          Manage Users
        </NavLink>
      </li>

      <li id="sidebar">
        <NavLink
          to="/dashboard/activities"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <FaMagnet></FaMagnet>
          Activities
        </NavLink>
      </li>

      <li id="sidebar">
        <NavLink
          to="/dashboard/makeAnnouncement"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <FaBookmark></FaBookmark>
          Make Announcement
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="bg-[#1E1E1E] flex justify-between items-center py-3 px-5 lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className="btn w-20 bg-[#1E1E1E] border-none  text-white drawer-button lg:hidden"
            >
              <span className="text-2xl">
                <VscThreeBars></VscThreeBars>
              </span>
            </label>
            <Link
              to={"/"}
              className="btn btn-ghost normal-case items-center text-xs md:text-xl"
            >
              <span>
                <img className="w-10" src={logo} alt="" />
              </span>
              <span className="text-white">United</span>
            </Link>
          </div>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full text-white bg-[#1E1E1E]">
            {/* Sidebar content here */}

            {UserSidebarLinks}
            <div className="divider"></div>
            {isAdmin ? AdminSidebarLinks : ""}
            <div className="divider"></div>
            <li id="sidebar">
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? `pending` : isActive ? `active` : ""
                }
              >
                <span>
                  <FaHome></FaHome>
                </span>
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
