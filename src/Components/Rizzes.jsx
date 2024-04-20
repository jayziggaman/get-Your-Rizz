import React, { useContext } from 'react'
import { appContext } from '../App'
import Rizz from './Rizz'

const Rizzes = () => {
  const { rizzes } = useContext(appContext)
  
  return (
    <section className="rizzes">
      {rizzes.map((rizz, i) => {
        return (
          <Rizz key={i} rizz={rizz}/>
        )
      })}
    </section>
  )
}

export default Rizzes