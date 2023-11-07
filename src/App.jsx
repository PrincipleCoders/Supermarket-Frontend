import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/header'
import Shop from './container/shop'
import Footer from './components/footer'
import Profile from './container/profile'
import Inventory from './container/inventory'
import RemainingOrders from './container/remainingOrders'
import ToDeliver from './container/toDeliver'


function App() {


  return (
    <>
      <Header/>
      {/* <Shop/>
      <Profile/>
      <Inventory/> */}
      <RemainingOrders/>
      <ToDeliver/>
      <Footer/>
    </>
  )
}

export default App
