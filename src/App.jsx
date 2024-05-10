import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid';
import RizzModal from './Components/RizzModal.jsx'
import Home from './Pages/Home.jsx'

export const appContext = React.createContext()

// { id: 'zero', img: rizz1, isPlaying: false, likes: [] },
// { id: 'one', img: rizz2, isPlaying: false, likes: []  },
// { id: 'two', img: rizz3, isPlaying: false, likes: []  },
// { id: 'three', img: rizz4, isPlaying: false, likes: []  },
// { id: 'four', img: rizz5, isPlaying: false, likes: []  },
// { id: 'five', img: rizz6, isPlaying: false, likes: []  },
// { id: 'six', img: rizz7, isPlaying: false, likes: []  },
// { id: 'seven', img: rizz8, isPlaying: false, likes: []  },
// { id: 'eight', img: rizz9, isPlaying: false, likes: []  },
// { id: 'nine', img: rizz10, isPlaying: false, likes: []  }

const App = () => {
  // whether the user is looking at the top rizzes or the latest ones
  const [contentType, setContentType] = useState(
    JSON.parse(localStorage.getItem('getyourrizz-contentType')) || 'top'
  )
  // automatically generated for each user to track rizz likes
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('getyourrizz-user'))
  )
  const [userAuth, setUserAuth] = useState(user ? user.id : '')
  const [loading, setLoading] = useState(true)
  // true when an arror occured while fetching the data
  const [noContent, setNoContent] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [rizzes, setRizzes] = useState()
  const [showRizzModal, setShowRizzModal] = useState(false)

  // image that shows in the modal
  const [rizzModalImg, setRizzModalImg] = useState([])



  //setting the users id
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('getyourrizz-user'))

    if (!user) {
      const id = uuidv4()
      setUserAuth(id)
    }
  }, [])


  useEffect(() => {
    if (userAuth && !user) {
      localStorage.setItem('getyourrizz-user', JSON.stringify({
        id: userAuth,
        likes: []
      }))
    }
  }, [userAuth, user])


  useEffect(() => {
    const fetchData = async () => {
      const url = `https://get-your-rizz-b61a0773d902.herokuapp.com/api/v1/rizz/${contentType}?page=1&limit=100`
      try {
        // Make a GET request using Axios
        const response = await axios.get(url);

        // Set the fetched data in the component state
        const arr = response.data.data.data
        
        // adding an isPlaying property to the rizzes so they can be paused and played without sending requests to the backend
        const newRizzes = arr.map(rizz => rizz = {...rizz, isPlaying: false})

        setRizzes(newRizzes);

      } finally {
        setLoading(false)
      }
    };


    fetchData()
  }, [contentType])


  useEffect(() => {
    if (!loading && rizzes === undefined) {
      setNoContent(true)

    } else {
      setNoContent(false)
    }
  }, [loading, rizzes])


  useEffect(() => {
    if (!showRizzModal) {
      // if showRizzModal is false, rizzModalImg should be []
      setRizzModalImg([])
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
      windowWidth, rizzes, setRizzes, showRizzModal, setShowRizzModal, rizzModalImg, setRizzModalImg, userAuth, loading, noContent, contentType, setContentType, user, setUser
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