import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/header'
import Shop from './container/shop'
import About from './components/about'
import Contact from './components/contact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/> 
      <Shop/>
      <About/>
      <Contact/>
      
    </>
  )
}

export default App
