import React, { useEffect, useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'

const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  // contentType refers to whether the user is seeing rizz from the 'top' tab or the 'latest' tab
  const [contentType, setContentType] = useState('top')
  

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
        >
          Top
        </NavLink>

        <span
          className={contentType === 'top' ? 'top-link' :
          contentType === 'latest' && 'latest-link'}
        >
          {/* / */}
        </span>

        <NavLink to={'/?content-type=latest'}
          className={contentType === 'latest' ? 'active-link' : ''}
        >
          Latest
        </NavLink>
      </div>

      <span></span>
    </header>
  )
}

export default Header