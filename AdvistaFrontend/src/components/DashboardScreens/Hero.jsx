import React, { useState } from 'react';
import AccountSwitcher from './AccountSwitcher.jsx';

const App = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownVisible(true); // Show dropdown on hover
  };

  const handleMouseLeave = () => {
    setIsDropdownVisible(false); // Hide dropdown when not hovering
  };

  return (
    <div className="font-sans p-5">
      {/* Header Section */}
      <header className="flex justify-between items-center p-4 bg-gray-100 border border-gray-300">
        <div className="flex items-center">
          <div className="font-bold text-red-600 border border-red-600 px-2 py-1 mr-2">Advista.in</div>
          <div className="text-lg ml-4">Welcome, Kirtan Pawar</div>
        </div>
        <div
          className="flex items-center"
          onMouseEnter={handleMouseEnter}  // Show dropdown on mouse enter
          onMouseLeave={handleMouseLeave}  // Hide dropdown on mouse leave
        >
          <button className="bg-gray-200 border border-gray-300 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-300 transition">
            Switch Ad Account
          </button>
          <img
            src="path_to_profile_image.jpg"
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover ml-3"
          />
          {isDropdownVisible && (
            <AccountSwitcher closeDropdown={handleMouseLeave} />
          )}
        </div>
      </header>

      {/* Navigation Menu */}
      <nav className="flex my-4 py-2 border-b border-gray-300">
        {['About', 'Meta Dashboard', 'Targeting Insights', 'Creative Insights', 'Contact Us'].map((item, index) => (
          <a
            key={index}
            href="#"
            className="text-black font-bold py-2 px-3 mr-6 hover:bg-gray-200 rounded-md transition transform hover:-translate-y-1"
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Main Section */}
      <div className="flex justify-between items-center p-4 border border-gray-300 mt-0 shadow-md hover:shadow-lg transition">
        <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transform hover:scale-105 transition">
          + New Campaign
        </button>
        <div className="flex">
          <input
            type="text"
            placeholder="Last Date Modified"
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>

      {/* Campaign Content */}
      <div className="border border-gray-300 mt-5 p-4 min-h-[300px] hover:shadow-md transition transform hover:scale-105">
        {/* Add content here for the campaigns */}
      </div>
    </div>
  );
};

export default App;
