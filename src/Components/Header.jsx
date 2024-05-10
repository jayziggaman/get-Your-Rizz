import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { appContext } from '../App'

const Header = () => {
  const {contentType, setContentType} = useContext(appContext)
  const [searchParams, setSearchParams] = useSearchParams()
  // contentType refers to whether the user is seeing rizz from the 'top' tab or the 'latest' tab
  

  useEffect(() => {
    // setting contentType to always have a value
    // if searchParams is null, contentType is automatically set to 'top'

    if (searchParams.get('content-type')) {
      setContentType(searchParams.get('content-type'))

    } else {
      setContentType('top')
    }
  }, [searchParams])


  return (
    <header className="home-header">
      <p>
        Stay up to date...
      </p>

      <div>
        <NavLink to={'/?content-type=top'}
          className={contentType === 'top' ? 'active-link' : ''}
          onClick={() => {
            localStorage.setItem('getyourrizz-contentType', JSON.stringify('top'))
          }}
        >
          Top
        </NavLink>

        <span
          className={contentType === 'top' ? 'top-link' :
          contentType === 'latest' && 'latest-link'}
        >
        </span>

        <NavLink to={'/?content-type=latest'}
          className={contentType === 'latest' ? 'active-link' : ''}
          onClick={() => {
            localStorage.setItem('getyourrizz-contentType', JSON.stringify('latest'))
          }}
        >
          Latest
        </NavLink>
      </div>

      <span></span>
    </header>
  )
}

export default Header