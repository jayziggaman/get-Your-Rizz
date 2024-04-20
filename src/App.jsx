import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import RizzModal from './Components/RizzModal.jsx'
import Home from './Pages/Home.jsx'

import rizz1 from '../src/images/about-img.png'
import rizz2 from '../src/images/contact-img.png'
import rizz3 from '../src/images/landing-img.png'
import rizz4 from '../src/images/contact-img.jpg'
import rizz5 from '../src/images/cat1.png'
import rizz6 from '../src/images/cat2.png'
import rizz7 from '../src/images/cat3.png'
import rizz8 from '../src/images/cat4.png'
import rizz9 from '../src/images/cat5.png'
import rizz10 from '../src/images/cat6.png'

export const appContext = React.createContext()

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [rizzes, setRizzes] = useState([
    { id: 'zero', img: rizz1 },
    { id: 'one', img: rizz2 },
    { id: 'two', img: rizz3 },
    { id: 'three', img: rizz4 },
    { id: 'four', img: rizz5 },
    { id: 'five', img: rizz6 },
    { id: 'six', img: rizz7 },
    { id: 'seven', img: rizz8 },
    { id: 'eight', img: rizz9 },
    { id: 'nine', img: rizz10 }])
  const [showRizzModal, setShowRizzModal] = useState(false)

  const [showTopRizz, setShowTopRizz] = useState(true)
  const [showLatestRizz, setShowLatestRizz] = useState(true)

  // image that shows in the modal
  const [rizzModalImg, setRizzModalImg] = useState('')

  useEffect(() => {
    if (!showRizzModal) {
      // if showRizzModal is false, rizzModalImg should be ''
      setRizzModalImg('')
    }
  }, [showRizzModal])


  useEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', resize)
  
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])
  

  return (
    <appContext.Provider value={{
      windowWidth, rizzes, showRizzModal, setShowRizzModal, rizzModalImg, setRizzModalImg
    }}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <RizzModal />
      </div>
    </appContext.Provider>
  )
}

export default App