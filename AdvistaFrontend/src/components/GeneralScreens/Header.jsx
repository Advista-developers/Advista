import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { useAuth } from '../../API/auth';
const Header = () => {

  const {isLoggedIn,Logoutuser} =useAuth()
  return (
    <header>
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src="C:\Users\Kedar Dhule\Documents\Advista\AdvistaFrontend\src\assets\logo5.png" alt="logo" className="h-10 w-10" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links flex space-x-8">
          <li>
            <NavLink
              exact
              to="/"
              className="hover:text-red-500 transition duration-300"
              activeClassName="text-red-500"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/features"
              className="hover:text-red-500 transition duration-300"
              activeClassName="text-red-500"
            >
              Features
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/pricing"
              className="hover:text-red-500 transition duration-300"
              activeClassName="text-red-500"
            >
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="hover:text-red-500 transition duration-300"
              activeClassName="text-red-500"
            >
              Contact
            </NavLink>
          </li>
          <li>
          {isLoggedIn ? (
              <Link to="/logout" target="_blank" rel="noopener noreferrer">
                <button
                  // onClick={Logoutuser()} // Call logout function from context when clicked
                  className="nav-button bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300"
                >
                  Logout
                </button>
              </Link>
            ) : (
              <Link to="/login" target="_blank" rel="noopener noreferrer">
                <button className="nav-button bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300">
                  Get Started
                </button>
              </Link>
            )}

          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
