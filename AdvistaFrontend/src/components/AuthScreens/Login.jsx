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

const Login = () => {
  const [showEmailLogin, setShowEmailLogin] = useState(false); // State to toggle email login form
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(""); // State for handling errors
  const navigate = useNavigate();
  const { isLoggedIn,storeTokenInLS } = useAuth();

  if (isLoggedIn) {
    navigate('/');
  }
  const handleGoogleSuccess = async (authResult) => {
    try {
      if (authResult.code) {
        const code = authResult.code;
        console.log("Google auth code:", code);
        
        const response = await fetch(`https://advista.vercel.app/api/auth/google?code=${code}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user details from the backend');
        }
  
        const result = await response.json();
        console.log("Backend response:", result);
        
        const { token, userID } = result;
        storeTokenInLS(token);
        navigate('/excess-token');
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
    flow: 'auth-code',
    scope: 'profile https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/analytics.edit https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/adwords',
});

  
  const handleFacebookLogin = async () => {
    // window.open("https://advista.vercel.app/api/auth/facebook", "_self");
    navigate('/excess-token')
  };
  
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch('https://advista.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const responseData = await response.json();
        storeTokenInLS(responseData.token);
        setCredentials({ email: "", password: "" });
        navigate('/');
      } else {
        const responseError = await response.json();
        setErrorMessage(responseError.error || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again.");
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
          The for Meta Advertisers
        </p>

        {showEmailLogin ? (
          <form onSubmit={handleEmailLogin}>
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

            {errorMessage && (
              <div className="mb-4 text-red-600 text-sm">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Log In with Email
            </button>
            <p
              className="text-right text-sm text-gray-600 cursor-pointer hover:underline mt-2"
              onClick={() => setShowEmailLogin(false)}
            >
              Back to Login
            </p>
          </form>
        ) : (
          <div className="mb-4">
            <button
              onClick={() => googleLogin()}
              className="flex items-center justify-center mb-2 border border-red-500 text-red-500 font-semibold p-2 rounded-lg hover:bg-red-500 hover:text-white transition duration-200"
            >
              <img className="w-5 mr-2" src={googleIcon} alt="Google Icon" />
              <span>Log in with Google</span>
            </button>
            <button
              onClick={() => handleFacebookLogin()}
              className="flex items-center justify-center mb-2 border border-blue-600 text-blue-600 font-semibold p-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200"
            >
              <img className="w-5 mr-2" src={facebookIcon} alt="Facebook Icon" />
              <span>Log in with Facebook</span>
            </button>
            <div className="text-center my-2">or</div>
            <button
              onClick={() => setShowEmailLogin(true)}
              className="flex items-center justify-center border border-gray-400 text-gray-700 font-semibold p-2 rounded-lg w-full hover:bg-gray-200 transition duration-200"
            >
              <img className="w-5 mr-2" src={emailIcon} alt="Email Icon" />
              <span>Log in with Email</span>
            </button>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <a
            href="/signup"
            className="flex items-center justify-center text-blue-600 hover:underline mt-2"
          >
            <img className="w-4 mr-2" src={accountIcon} alt="Create Account Icon" />
            <span>Sign Up</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
