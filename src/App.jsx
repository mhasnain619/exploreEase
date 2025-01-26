import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ResponsiveDrawer from './Components/Dashboard/Dashboard'
import Home from './Components/Home/Home'
import Profile from './Components/Profile/Profile'
import Contact from './Components/Contact/Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Routes>
        <Route path='/dashboard/*'>
          <Route index element={<ResponsiveDrawer />} />
          <Route path='home' element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='contact' element={<Contact />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
