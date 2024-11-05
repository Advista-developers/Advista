import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <nav className="navbar flex justify-between items-center px-4">
        {/* Left Navigation Links */}
        <div className="nav-left">
          <ul className="nav-menu flex space-x-6">
            <li>
              <Link to="/careers" className="hover:text-red-500 transition duration-300">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-red-500 transition duration-300">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/academy" className="hover:text-red-500 transition duration-300">
                Academy
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-red-500 transition duration-300">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Logo */}
        <div className="nav-right">
          <Link to="/">
            <img src="SRC/logo5.png" alt="ADvista Logo" className="logo h-10 w-10" />
          </Link>
        </div>
      </nav>

      {/* Footer Content */}
      <div className="footer-content text-center mt-4">
        <p className="mb-2">&copy; 2024 ADvista. All rights reserved.</p>
        <ul className="footer-links flex justify-center space-x-6">
          <li>
            <Link to="/privacy-policy" className="hover:text-red-500 transition duration-300">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms-of-service" className="hover:text-red-500 transition duration-300">
              Terms of Service
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-red-500 transition duration-300">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
