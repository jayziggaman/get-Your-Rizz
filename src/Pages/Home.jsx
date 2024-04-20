import React from 'react'
import Header from '../Components/Header'
import Rizzes from '../Components/Rizzes'

const Home = () => {
  // no functionality here, just trying to arrange chunks into components

  return (
    <main className="home-main">
      {/* header for the page */}
      <Header />
      
      {/* section for all the rizz */}
      <Rizzes />
    </main>
  )
}

export default Home