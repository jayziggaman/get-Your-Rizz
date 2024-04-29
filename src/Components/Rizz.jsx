import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaVolumeUp, FaThumbsUp, FaRegThumbsUp, FaVolumeMute } from 'react-icons/fa'
import { appContext } from '../App'

//placeholder audio to test the start and stop feature
import audioPlay from '../audio/rihanna.mp3'


const Rizz = ({rizz}) => {
  const { setShowRizzModal, setRizzModalImg, rizzes } = useContext(appContext)
  const [thisRizz, setThisRizz] = useState(rizz)
  const { id, img } = thisRizz
  const [isHovering, setIsHovering] = useState(false)

  const audioRef = useRef()

  const intiateModal = (e) => {
    const rizzImg = e.currentTarget.id
    setShowRizzModal(true)

    //make rizzModalImg be this particular image
    setRizzModalImg(rizzImg)
  }


  //This function sets everything for the audio to be played. Since the audio itself has it's display set to none, the speaker/volume up icon will be used to controle the auido settings of the audio tag.
  let rizzId = useRef('')
  //id of the 'rizz' that was just clicked
  const playAudioFtn = (e) => {
    const id = e.currentTarget.dataset.rizzid
    rizzId.current = id
    //finding the span that encloses the audio tag and the speaker icon 
    const rizzSpan = document.querySelector(`.${id}`)

    //the auido tag itself
    const rizzAudio = rizzSpan.querySelector('audio')

    //chnaging the play/pause state of the audio tag depending on its previous state
    if (rizzAudio.paused) {
      rizzAudio.play()

    } else {
      rizzAudio.pause()
    }
  }


  useEffect(() => {
    // checking to see if rizzId.current === ''. This useEffect runs multiple times because the play/pause state of the audio tag were merged. Pausing one audio tag because another one was played will result in this useEffect running more than once.
    if (rizzId.current !== '') {
      rizzes.map(rizz => {
        if (rizz.id !== rizzId.current) {
          const id = rizz.id
          
          const rizzSpan = document.querySelector(`.${id}`)
          const rizzAudio = rizzSpan.querySelector('audio')
  
          rizzAudio.pause()
        }
      })
    }
    // you have to ser rizzId.current to '' so that we can detect when the re run is intentional or a side effect. An intentional one will have a valid id but a re run will have have a value of '' and won't run 
    rizzId.current = ''
  }, [thisRizz])


  useEffect(() => {
    //setting a timeout on the play/pause text that shows above the speake icon so it does not stay forever
    const timeout = setTimeout(() => {
      if (isHovering) {
        setIsHovering(false)
      }
    }, 3000);

    return () => {
      clearTimeout(timeout)
    }
  }, [isHovering])
  


  return (
    <article className={`rizz ${id}`}>

      <div className='rizz-top'>
        <span>
          <img src="" alt="" />
          <p>Admin</p>
        </span>

        <span role={'button'} data-rizzid={id} onClick={e => playAudioFtn(e)}
          className={thisRizz.isPlaying ? 'is-playing' : ''}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <span style={{opacity: isHovering ? '1' : '0'}}>
            {thisRizz.isPlaying ? 'Pause' : 'Play'}
          </span>

          {thisRizz.isPlaying ? <FaVolumeMute /> : <FaVolumeUp />}

          <audio ref={audioRef} loop controls data-audioid={id}
            // syncing the rizz.isPlaying property with the audio tag's paused/playing state
            onPlay={() => setThisRizz({...thisRizz, isPlaying: true})}
            onPause={() => setThisRizz({...thisRizz, isPlaying: false})}
          >
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