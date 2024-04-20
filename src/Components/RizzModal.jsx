import React, { useContext } from 'react'
import { appContext } from '../App'

const RizzModal = () => {
  const { showRizzModal, setShowRizzModal, rizzModalImg, setRizzModalImg } = useContext(appContext)
  
  return (
    <section className={showRizzModal ? "rizz-modal show" : 'rizz-modal'}>
      <button className="rizz-modal-cancel"
        onClick={() => setShowRizzModal(false)}
      >
        <span></span>
        <span></span>
      </button>

      <div className="rizz-modal-img">
        <img src={rizzModalImg} alt="" />
      </div>
    </section>
  )
}

export default RizzModal