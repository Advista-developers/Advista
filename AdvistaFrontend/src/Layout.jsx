import React from 'react'
import Header from './components/GeneralScreens/Header'
import Footer from './components/GeneralScreens/Footer'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout