import React from 'react';

const AccountSwitcher = ({ closeDropdown }) => {
  return (
    <div className="absolute top-16 right-0 w-80 bg-gray-800 shadow-lg rounded-lg p-4 z-50 text-white font-sans">
      {/* User Info */}
      <div className="flex flex-col mb-3">
        <span className="text-lg font-bold">kirtanpawar4418@gmail.com</span>
        <span className="text-sm text-gray-400">381773</span>
      </div>

      {/* Dropdown Header */}
      <div className="border-b border-gray-600 pb-2 mb-3">
        <h3 className="text-xl font-bold">My Madgicx</h3>
      </div>

      {/* Account List */}
      <ul className="space-y-2">
        <li className="p-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-transform cursor-pointer">
          Manage connected ad accounts
        </li>
        <li className="p-2 bg-blue-600 text-white rounded-md transition-transform cursor-pointer">
          Your subscriptions
        </li>
      </ul>

      {/* Help Section */}
      <div className="mt-4">
        <h4 className="text-sm font-bold mb-2">Get help</h4>
        <ul className="space-y-2">
          <li className="p-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-transform cursor-pointer">
            Help Center
          </li>
          <li className="p-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-transform cursor-pointer">
            Advista Academy
          </li>
          <li className="p-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-transform cursor-pointer">
            Success Program
          </li>
          <li className="p-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-transform cursor-pointer">
            Consulting Services
          </li>
          <li className="p-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-transform cursor-pointer">
            Campaign Management Services
          </li>
        </ul>
      </div>

      {/* More Options */}
      <div className="mt-4">
        <h4 className="text-sm font-bold mb-2">More options</h4>
        <ul className="space-y-2">
          <li className="p-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-transform cursor-pointer">
            Become a Advista Partner
          </li>
          <li className="flex items-center p-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-transform cursor-pointer">
            <span className="mr-2">Dark</span>
            <input type="checkbox" className="form-checkbox text-blue-500" />
          </li>
          <li className="p-2 rounded-md hover:bg-gray-700 hover:scale-105 transition-transform cursor-pointer">
            Log Out
          </li>
        </ul>
      </div>

      {/* Close Button */}
      <button
        onClick={closeDropdown}
        className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-transform hover:scale-105"
      >
        Close
      </button>
    </div>
  );
};

export default AccountSwitcher;
