import { useContext, useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import profileDefault from "../assets/profile.jpg";
import logo from "../../public/logo.png";

export default function Navbar() {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/plants", label: "Plants" },
    { path: "/plant-of-the-week", label: "Plant of the Week" },
    ...(user ? [{ path: "/profile", label: "Profile" }] : [])
  ];

  return (
    <nav className="navbar bg-base-300 px-6 py-2 sticky top-0 z-50">
      {/* Left Section - Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-1">
          <img src={logo} alt="GreenNest Logo" className="w-10 h-10" />
          <div>
            <span className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              GreenNest
            </span>
            <p className="text-xs text-base-content/60">Plant Paradise</p>
          </div>
        </Link>
      </div>

      {/* Center Links Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks.map((link, i) => (
            <li key={i}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-primary-content font-semibold px-3 py-2 rounded"
                    : "hover:bg-primary/10 px-3 py-2 rounded"
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end gap-3">
        {/* Desktop View */}
        <div className="hidden lg:flex gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user?.photoURL || profileDefault}
                    alt="User"
                  />
                </div>
              </label>
              <ul className="mt-3 z-1 p-3 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-primary/10">
                <li className="menu-title">
                  <span className="text-primary font-semibold">
                    {user?.displayName || "User"}
                  </span>
                </li>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="text-error hover:bg-error/10 w-full text-left p-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline btn-primary btn-sm">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu - Right Side */}
        <div className="relative lg:hidden" ref={dropdownRef}>
          <button
            className="btn btn-ghost"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
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
          </button>

          {isOpen && (
            <ul className="absolute right-0 mt-3 z-[100] p-3 shadow-xl bg-base-100 rounded-box w-56 border border-primary/10">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary text-primary-content font-semibold block p-2 rounded"
                        : "hover:bg-primary/10 block p-2 rounded"
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}

              {/* Login / Signup for mobile when not logged in */}
              {!user && (
                <>
                  <li className="border-t border-base-300 mt-2 pt-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block p-2 font-medium rounded hover:bg-primary/10"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="block p-2 font-medium rounded hover:bg-success/10"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}

              {/* Logout for mobile when logged in */}
              {user && (
                <li className="border-t border-base-300 mt-2 pt-2">
                  <button
                    onClick={() => {
                      logOut();
                      setIsOpen(false);
                    }}
                    className="text-error hover:bg-error/10 w-full text-left p-2 rounded"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}