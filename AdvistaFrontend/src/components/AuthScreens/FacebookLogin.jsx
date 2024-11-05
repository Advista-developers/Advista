import React, { useState } from 'react';
// import FacebookLogin from 'react-facebook-login';
import axios from 'axios'; // Import axios for API calls
import background from '../../../public/assets/background.png';
import Home from '../HomeScreens/Home';

const FacebookLoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleFacebookResponse = async (response) => {
    // Check if the response is successful

    console.log("response:" ,response);
    
    // if (response.accessToken) {
      
    //   const userInfo = {
    //     accessToken: response.accessToken,
    //     email: response.email,
    //     id: response.id, 
    //   };

    //   try {
        
    //     const res = await axios.post('http://localhost:5000/api/auth/facebook', userInfo);
        
    //     if (res.data.success) {
    //       setUserData(res.data.user); 
    //       setIsLoggedIn(true); 
    //     }
    //   } catch (error) {
    //     console.error('Error during Facebook login:', error);
    //   }
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200" style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center relative">
        {!isLoggedIn ? (
          <>
            <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
              <div className="h-28 w-28 rounded-full border-2 border-blue-200 opacity-30"></div>
              <div className="absolute h-20 w-20 rounded-full border-2 border-blue-600 opacity-50"></div>
            </div>

            <div className="relative flex justify-center mb-10">
              <div className="h-12 w-12 rounded-full bg-blue-600 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.676 0H1.324C.593 0 0 .592 0 1.323v21.354C0 23.407.593 24 1.324 24h11.495v-9.294H9.847v-3.622h2.973V8.41c0-2.953 1.804-4.561 4.437-4.561 1.26 0 2.343.093 2.656.135v3.08l-1.825.001c-1.43 0-1.706.678-1.706 1.672v2.192h3.413l-.444 3.622h-2.97V24h5.816C23.407 24 24 23.407 24 22.677V1.323C24 .592 23.407 0 22.676 0z" />
                </svg>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4">Connect Facebook</h2>
            <p className="text-gray-500 mb-6">
              ⚡ Free trial, fast setup. Start by linking your Facebook accounts.
            </p>
            
            <FacebookLogin
              appId="1272490550451287"
              autoLoad={false}
              fields="name,email,picture"
              scope="public_profile,email"
              callback={handleFacebookResponse}
              render={renderProps => (
                <button onClick={renderProps.onClick} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.676 0H1.324C.593 0 0 .592 0 1.323v21.354C0 23.407.593 24 1.324 24h11.495v-9.294H9.847v-3.622h2.973V8.41c0-2.953 1.804-4.561 4.437-4.561 1.26 0 2.343.093 2.656.135v3.08l-1.825.001c-1.43 0-1.706.678-1.706 1.672v2.192h3.413l-.444 3.622h-2.97V24h5.816C23.407 24 24 23.407 24 22.677V1.323C24 .592 23.407 0 22.676 0z" />
                  </svg>
                  Connect Facebook
                </button>
              )}
            />
            <div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.676 0H1.324C.593 0 0 .592 0 1.323v21.354C0 23.407.593 24 1.324 24h11.495v-9.294H9.847v-3.622h2.973V8.41c0-2.953 1.804-4.561 4.437-4.561 1.26 0 2.343.093 2.656.135v3.08l-1.825.001c-1.43 0-1.706.678-1.706 1.672v2.192h3.413l-.444 3.622h-2.97V24h5.816C23.407 24 24 23.407 24 22.677V1.323C24 .592 23.407 0 22.676 0z" />
                  </svg>
                  Connect Facebook
                </button>
            </div>
            <div className="mt-6 text-gray-400">
              <span className="text-sm">Meta</span> + <span className="text-sm">Google Partners</span>
            </div>
          </>
        ) : (
          <Home user={userData} /> // Pass user data to the Home component if needed
        )}
      </div>
    </div>
  );
};

export default FacebookLoginPage;
