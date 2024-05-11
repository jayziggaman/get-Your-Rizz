import React, { useContext, useState } from 'react'
import { appContext } from '../App'
import {  ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';

const RizzModal = () => {
  const { showRizzModal, setShowRizzModal, rizzModalImg } = useContext(appContext)

  const [index, setIndex] = useState(0)

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index !== (rizzModalImg.length - 1)) {
        setIndex(index => index + 1)

      } else {
        setIndex(index => (index - index))
      }
    } ,

    onSwipedRight: () => {
      if (index !== 0) {
        setIndex(index => index - 1)

      } else {
        setIndex(index => (index + rizzModalImg.length - 1))
      }
    },
  });


  
  return (
    <section className={showRizzModal ? "rizz-modal show" : 'rizz-modal'}>
      <button className="rizz-modal-cancel"
        onClick={() => setShowRizzModal(false)}
      >
        <span></span>
        <span></span>
      </button>

      <div {...handlers} className="rizz-modal-img">
        <button className='btn modal' style={{ left: '10px' }}
          onClick={() => {
          if (index !== 0) {
            setIndex(index => index - 1)

          } else {
            setIndex(index => (index + rizzModalImg.length - 1))
          }
        }}
         
        >
          <ChevronLeft fontSize="large" color="black"
            style={{ color: 'black' }}
          />
        </button>
        
        {rizzModalImg.sort((a, b) => a.number - b.number).map(img => {
            const { link, _id, number } = img
            return (
              <img src={link} alt="Modal img" key={_id}
                style={{
                  position: index !== (number - 1) && 'absolute',
                  zIndex: index === (number - 1) ? '5' : '0',
                  transform: index === (number - 1) ? 'scale(100%)' : 'scale(70%)'
                }}
              />
            )
          })}

        <button className='btn modal' style={{ right: '10px' }}
          onClick={() => {
          if (index !== (rizzModalImg.length - 1)) {
            setIndex(index => index + 1)

          } else {
            setIndex(index => (index - index))
          }
        }}
          
        >
          <ChevronRight fontSize="large" color="black"
            style={{ color: 'black' }}
          />
        </button>
      </div>
      
      
        
    </section>
  )
}

export default RizzModal