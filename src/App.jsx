import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/header'
import Shop from './container/shop'
import Footer from './components/footer'
import Profile from './container/profile'


function App() {


  return (
    <>
      <Header/>
      <Shop/>
      <Profile/>
      <Footer/>
    </>
  )
}

export default App
