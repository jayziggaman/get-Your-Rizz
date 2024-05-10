import React, { useContext } from 'react'
import { appContext } from '../App'
import Loading from './Loading'
import Rizz from './Rizz'
import noMedia from '../images/no-media-found.jpg'

const Rizzes = () => {
  const { rizzes, loading, noContent } = useContext(appContext)

  return (
    <section className="rizzes">
      {loading && <Loading />} 

      {noContent &&
        <div className="no-content">
          <img src={noMedia} alt="" />
          
          <h3>Oops...</h3>
          <p>
            Looks like an error occured. Please reload this page.
          </p>
        </div>
      }

      {rizzes &&
        <>
          {rizzes.map(rizz => {
            const { _id } = rizz
            
            return (
              <Rizz key={_id} rizz={rizz} />
            )
          })}
        </>
      }
    </section>
  )
}

export default Rizzes