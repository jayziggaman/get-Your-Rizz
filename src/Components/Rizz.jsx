import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaVolumeUp, FaThumbsUp ,FaRegThumbsUp } from 'react-icons/fa'
import { appContext } from '../App'

//placeholder audio to test the start and stop feature
import audioPlay from '../audio/rihanna.mp3'


const Rizz = ({rizz}) => {
  const { setShowRizzModal, setRizzModalImg } = useContext(appContext)
  const { id, img } = rizz
  const [playAudio, setPlayAudio] = useState(false)

  const audioRef = useRef()

  const intiateModal = (e) => {
    const rizzImg = e.currentTarget.id
    setShowRizzModal(true)

    //make rizzModalImg be this particular image
    setRizzModalImg(rizzImg)
  }


  //This function sets everythign for the audio to be played. Since the audio itself has it's display set to none, the speaker/volume up icon will be used to controle the auido settings of the audio tag.
  const playAudioFtn = (e) => {
    //the 'rizz' variable represents the particular rizz that it's speaker icon was clicked  
    const rizzId = e.currentTarget.dataset.rizzid
    const rizz = document.querySelector(`.${rizzId}`)

    const audio = rizz.querySelector('audio')
    audioRef.current = audio

    setPlayAudio(!playAudio)
  }


  useEffect(() => {
    if (audioRef.current) {
      if (playAudio) {
        audioRef.current.play()
  
      } else {
        audioRef.current.pause()
      }
    }
  }, [playAudio])
  
  

  return (
    <article className={`rizz ${id}`}>

      <div className='rizz-top'>
        <span>
          <img src="" alt="" />
          <p>Admin</p>
        </span>

        <span role={'button'} data-rizzid={id}
          onClick={e => playAudioFtn(e)}
        >
          <FaVolumeUp />
          <audio controls>
            <source src={audioPlay} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

        </span>
      </div>

      <div className='rizz-mid' id={img}
        onClick={e => intiateModal(e)}
      >
        <img src={img} alt="" />
      </div>

      <div className='rizz-bottom'>
        <FaRegThumbsUp />
        <FaThumbsUp />
      </div>
    </article>
  )
}

export default Rizz