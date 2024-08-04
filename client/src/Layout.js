import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/HeaderComponent/Header'
import {Toaster} from 'react-hot-toast'

const Layout = () => {
  return (
    <main>
        <Header />
        <Toaster
          position='top-right'
          reverseOrder={false}
        />
        <Outlet />
    </main>
  )
}

export default Layout
