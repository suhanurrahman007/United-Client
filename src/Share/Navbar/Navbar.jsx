import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo/logo.png";
import avatar from "../../assets/Login/placeholder.jpg";
import useAuth from "../../hooks/useAuth";
import auth from "../../Config/firebase.config";
import { FaHome } from "react-icons/fa";
import { MdOutlineCardMembership } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoLogInOutline } from "react-icons/io5";
import useAnnouncement from "../../hooks/useAnnouncement";

const Navbar = () => {
  const [announcement] = useAnnouncement();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(auth)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const commonClasses =
    "px-4  py-2 rounded-lg hover:underline hover:scale-110 hover:shadow-lg transition delay-150 duration-300 ease-in-out";

  const links = (
    <>
      <li id="sidebar" className={`${commonClasses}`}>
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

      <li id="sidebar" className={`${commonClasses}`}>
        <NavLink
          to="/membership"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <span>
            <MdOutlineCardMembership></MdOutlineCardMembership>
          </span>
          Membership
        </NavLink>
      </li>

      <li id="sidebar" className={`${commonClasses}`}>
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <span>
            <IoLogInOutline></IoLogInOutline>
          </span>
          Join Us
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-[#262626] text-white xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52"
          >
            {links}
          </ul>
        </div>
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
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal">{links}</ul>
      </div>
      <div className="navbar-end">
        {user && (
          <div className="text-2xl font-bold mr-5">
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <button
              className="btn bg-[#262626] border-none text-white hover:bg-[#262626]"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              <span className="text-2xl">
                <IoMdNotifications></IoMdNotifications>
              </span>
              <div className="badge badge-secondary text-xs">
                +{announcement?.length}
              </div>
            </button>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box bg-black text-white">
                {announcement.map((item) => (
                  <div className="px-5 py-5" key={item._id}>
                    <h2 className="text-sm">{item?.title}</h2>
                  </div>
                ))}
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        )}

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {user ? (
                <>
                  <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                </>
              ) : (
                <img src={avatar} />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] py-2  space-y-3 px-4 bg-[#202074] text-white shadow menu menu-sm dropdown-content hover:bg-[#010313] hover:text-blue-300   rounded-md w-40"
          >
            <h2 className="text-xs font-bold">
              {user ? user.displayName : "No Any User"}
            </h2>
            <hr className="border-gray-600" />
            <Link className="hover:font-bold" to={"/dashboard/myProfile"}>
              Dashboard
            </Link>
            <hr className="border-gray-600" />
            <button
              onClick={handleLogout}
              className="hover:font-bold text-left" /* to={"/login"} */
            >
              Logout
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
