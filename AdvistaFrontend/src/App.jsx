
import './App.css'
import Header from './components/GeneralScreens/Header';
import Footer from './components/GeneralScreens/Footer';
import { Navigate, Outlet, Route, Router, Routes } from 'react-router-dom';
import NotFound from './components/GeneralScreens/Notfound';
import Signup from './components/AuthScreens/Register';
import { useEffect, useState } from 'react';
import Login from './components/AuthScreens/Login';

function App() {

    const [user,setUser]=useState(null);

    const getuser=()=>{

    }

    useEffect(() => {
      return () => {
        getuser();
      }
    }, [])
    
  return (
   
    <>
    {/* <h1>Hello</h1> */}
    
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LayoutsWithHeader />}>
            {/* <Route exact path='/' element={user ? <Home/>: <Navigate to="/login"/>}/> */}
            <Route exact path='/' element={<Home/>}/>
            <Route exact path="*" element={<NotFound />} />
          </Route>
          <Route path='/login' element={user ? <Navigate to="/"/>:<Login />} />
          <Route path='/signup' element={user ? <Navigate to="/"/>:<Signup />} />
        </Routes>
      </div>
   
    </>
  )
}




const LayoutsWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* <h1>Hello</h1> */}
    </>
  );
};
export default App