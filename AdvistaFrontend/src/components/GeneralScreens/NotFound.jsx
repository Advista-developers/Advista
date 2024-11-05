import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-black">
      <div className="text-center space-y-4">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <p className="text-2xl text-white">Page Not Found</p>
        <p className="text-gray-400">Sorry, the page you're looking for doesn't exist.</p>
        <a href="/" className="inline-block px-6 py-3 mt-6 text-white bg-red-600 rounded-lg hover:bg-red-700">
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
