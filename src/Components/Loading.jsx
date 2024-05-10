import React, { useContext, useEffect, useState } from 'react'


const Loading = () => {
  const [index, setIndex] = useState(0)
  const divs = document.querySelectorAll('.loading div')


  useEffect(() => {
    const interval = setInterval(() => {
      if (index === 2) {
        setIndex(index => index - index)
      } else {
        setIndex(index => index + 1)
      }
    }, 500);

    return () => {
      clearInterval(interval)
    }
  }, [index])


  useEffect(() => {
    divs.forEach((div, i) => {
      if (i === index) {
        div.style.backgroundColor = 'gray'
      } else {
        div.style.backgroundColor = 'gainsboro'
      }
    })
  }, [index])


  const style = {
    height: '12px',
    width: '12px',
    borderRadius: '20px',
    display: 'block',
    margin: '0',
    padding: '0',
    backgroundColor: 'gainsboro'
  }


  return (
    <section className='loading'
      style={{
        position: 'fixed',
        top: '0px',
        height: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        left: 0,
        right: 0
      }}
    >
      <div style={style}></div>
      <div style={style}></div>
      <div style={style}></div>
    </section>
  )
}

export default Loading