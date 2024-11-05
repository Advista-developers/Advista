import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/HomeScreens/Home.jsx'
import Login from './components/AuthScreens/Login.jsx'
import Register from './components/AuthScreens/Register.jsx'
import NotFound from './components/GeneralScreens/Notfound.jsx'
import {  GoogleOAuthProvider} from '@react-oauth/google'
import { AuthProvider } from './API/auth';
import { Logout } from './components/AuthScreens/Logout.jsx'
import Facebooklogin from './components/AuthScreens/FacebookLogin.jsx'

// import { useAuth } from './API/auth'
import Hero from './components/DashboardScreens/Hero.jsx'
// import { useAuth } from './API/auth'
// const {isLoggedIn}=useAuth();
const GoogleAuthWrapper=()=>{
  return (
    <GoogleOAuthProvider clientId='60429219245-8efsp5mfuc2dvom0bsu8drh99s7ecpbt.apps.googleusercontent.com'>
      <Login></Login>
      
    </GoogleOAuthProvider>
  )
};
const GoogleAuthWrapper2=()=>{
  return (
    <GoogleOAuthProvider clientId='60429219245-8efsp5mfuc2dvom0bsu8drh99s7ecpbt.apps.googleusercontent.com'>
     
      <Register></Register>
    </GoogleOAuthProvider>
  )
};
// const {isLoggedIn,Logoutuser} =useAuth()
const router = createBrowserRouter(

 
  createRoutesFromElements(
    
    <>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/login' element={<GoogleAuthWrapper />} />
      {/* <Route path='/GoogleLogin' element={< GoogleAuthWrapper/>}/> */}
      <Route path='/signup' element={<GoogleAuthWrapper2 />} />
      <Route path='/excess-token' element={<Facebooklogin/>}/>
    </>
  )
);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
    <RouterProvider router={router}/>
    {/* <BrowserRouter>
      <App/>
    </BrowserRouter> */}
  </StrictMode>
  </AuthProvider>
  ,
)
