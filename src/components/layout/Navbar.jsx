import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { logout } from "../../features/auth/authSlice";

const Navbar = () => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const mail = useSelector((state) => state.auth.email);

    const [isContentDropdownOpen, setIsContentDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

        useEffect(() => {
        // Close dropdowns on route change
        setIsContentDropdownOpen(false);
        setIsProfileDropdownOpen(false);
      }, [location]);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/login");
      };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Left Section: Brand and Links */}
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold text-white">
          <span className="text-blue-300">Bulky</span><Link to="/" className="text-xl font-bold">
            Books
          </Link>
        </h1>
        {token ? (
            <Link to="/dashboard" className="hover:text-gray-300">Home</Link>
          ) : (
            <Link to="/" className="hover:text-gray-300">Home</Link>
          )}
      </div>

      {/* Right Section: Register and Login */}
      <ul className="flex space-x-6">
            {token ? (
              <>
                <li className="relative">
                  <button
                    className="hover:text-gray-300"
                    style={{cursor: "pointer"}}
                    onClick={() => setIsContentDropdownOpen(!isContentDropdownOpen)}
                  >
                    Content Management ▾
                  </button>
                  {isContentDropdownOpen && (
                    <ul className="absolute left-0 mt-2 w-48 bg-white text-black shadow-md rounded">
                      <li>
                        <Link
                          to="/products"
                          className="block px-4 py-2 hover:bg-gray-200"
                          onClick={() => setIsContentDropdownOpen(false)}
                        >
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/categories"
                          className="block px-4 py-2 hover:bg-gray-200"
                          onClick={() => setIsContentDropdownOpen(false)}
                        >
                          Categories
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                <li className="relative">
                  <button
                    className="hover:text-gray-300"
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    style={{cursor: "pointer"}}
                  >
                    User: {mail}
                  </button>
                  {isProfileDropdownOpen && (
                    <ul className="absolute left-0 mt-2 w-36 bg-white text-black shadow-md rounded">
                      <li>
                        <p
                          onClick={() => {
                            handleLogout();
                            setIsProfileDropdownOpen(false);
                          }}
                          className="block px-4 py-2 cursor-pointer hover:bg-gray-200"
                        >
                          Logout
                        </p>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-300">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-gray-300">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
    </nav>
  );
};

export default Navbar;
