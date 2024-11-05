import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../../public/assets/logo.png'; 
import googleIcon from '../../../public/assets/Google.png'; 
import facebookIcon from '../../../public/assets/Meta.png'; 
import emailIcon from '../../../public/assets/Amazon.png'; 
import accountIcon from '../../../public/assets/Netflix.png'; 
import background from '../../../public/assets/background.png'; 
import { useGoogleLogin } from '@react-oauth/google';

import { useAuth } from '../../API/auth';
const Signup = () => {
  const [showEmailSignup, setShowEmailSignup] = useState(false); // State to toggle email signup form
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const navigate = useNavigate();
  const {storeTokenInLS}=useAuth();

  const handleGoogleSuccess = async (authResult) => {
    try {
      if (authResult.code) {
        const code = authResult.code;
        console.log("Google auth code:", code);
        
        // Fetching the token and user details from your backend
        const response = await fetch(`http://localhost:5000/api/auth/google?code=${code}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user details from the backend');
        }
  
        // Parse the response data
        const result = await response.json();
        console.log("Backend response:", result);
  
        // Destructure the token and userID from the backend response
        const { token, userID } = result;
  
        // Save the token and user info in localStorage
        // const userObj = { userID, token };
        // localStorage.setItem('user-info', JSON.stringify(userObj));
        storeTokenInLS(token)
        // Redirect the user to the home page after successful login
        navigate('/');
      } else {
        console.log("Auth result does not contain code:", authResult);
        throw new Error('Google authentication failed');
      }
    } catch (e) {
      console.log('Error during Google Login:', e);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Error during Google login:', error);
  };
  const googleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError,
    flow: 'auth-code',  // This sends the authorization code to your backend
  });
  const facebookLogin=()=>{}
  // Handle form submission (you can adjust this function as needed)
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        storeTokenInLS(responseData.token)
        setCredentials({ email: "", password: "" });
        setErrorMessage(""); // Clear any previous error message
        console.log(responseData);
        
        navigate('/'); // Redirect to login page after successful signup
      } else {  
        const responseError = await response.json();
        setErrorMessage(responseError.error || 'An error occurred during signup'); // Set error message from response
        console.log(responseError);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.log(error);
    }
  };

  const handleInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <div className="flex justify-center mb-4">
          <img className="w-24" src={logo} alt="Logo" />
        </div>
        <p className="text-center text-gray-700 mb-4 text-lg font-semibold">
          The SuperApp for Meta Advertisers
        </p>

        {showEmailSignup ? (
          // Email Signup Form
          <form onSubmit={handleEmailSignup}>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleInput}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleInput}
                className="border border-gray-300 p-2 rounded w-full"
                required
              />
            </div>

            {/* Display error message */}
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Sign Up with Email
            </button>
            <p
              className="text-right text-sm text-gray-600 cursor-pointer hover:underline mt-2"
              onClick={() => setShowEmailSignup(false)} // Go back to main signup options
            >
              Back to Signup Options
            </p>
          </form>
        ) : (
          // Signup Options
          <div className="mb-4">
            {/* Signup with Google */}
            <button
              onClick={()=>googleLogin()}
              className="flex items-center justify-center mb-2 border border-red-500 text-red-500 font-semibold p-2 rounded-lg hover:bg-red-500 hover:text-white transition duration-200"
            >
              <img className="w-5 mr-2" src={googleIcon} alt="Google Icon" />
              <span>Sign up with Google</span>
            </button>

            {/* Signup with Facebook */}
            <button
              onClick={()=>facebookLogin()}
              className="flex items-center justify-center mb-2 border border-blue-600 text-blue-600 font-semibold p-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200"
            >
              <img className="w-5 mr-2" src={facebookIcon} alt="Facebook Icon" />
              <span>Sign up with Facebook</span>
            </button>

            <div className="text-center my-2">or</div>

            {/* Signup with Email */}
            <button
              onClick={() => setShowEmailSignup(true)} // Show email signup form
              className="flex items-center justify-center border border-gray-400 text-gray-700 font-semibold p-2 rounded-lg w-full hover:bg-gray-200 transition duration-200"
            >
              <img className="w-5 mr-2" src={emailIcon} alt="Email Icon" />
              <span>Sign up with Email</span>
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <a
            href="/login" 
            className="flex items-center justify-center text-blue-600 hover:underline mt-2"
          >
            <img className="w-4 mr-2" src={accountIcon} alt="Login Icon" />
            <span>Log In</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
