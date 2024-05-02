import React, { useContext, useEffect, useRef, useState } from 'react'
import {  FaPause, FaPlay } from 'react-icons/fa'
import { Replay10, Forward10, ThumbUpAlt, ThumbUpOffAlt } from '@mui/icons-material';
import { appContext } from '../App'

//placeholder audio to test the start and stop feature
import audioPlay from '../audio/rihanna.mp3'

//placeholder img for Admin
import adminImg from '../images/c1.jpg'


const Rizz = ({rizz}) => {
  const { setShowRizzModal, setRizzModalImg, rizzes, userAuth } = useContext(appContext)
  const [thisRizz, setThisRizz] = useState(rizz)
  const { id, img } = thisRizz
  const [hover, setHover] = useState({
    show: false, text: '', width: 0
  })

  const btnRefs = useRef([])
  const btnRef = (el) => {
    btnRefs.current.push(el)
  }

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
  const playAudioFtn = e => {
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


  const rewind = e => {
    const id = e.currentTarget.dataset.rizzid
    rizzId.current = id
    //finding the span that encloses the audio tag and the speaker icon 
    const rizzSpan = document.querySelector(`.${id}`)

    //the auido tag itself
    const rizzAudio = rizzSpan.querySelector('audio')

    const currentTime = rizzAudio.currentTime

    if (currentTime <= 10) {
      rizzAudio.currentTime = 0

    } else {
      rizzAudio.currentTime = currentTime - 10
    }
  }


  const fastFoward = e => {
    const id = e.currentTarget.dataset.rizzid
    rizzId.current = id
    //finding the span that encloses the audio tag and the speaker icon 
    const rizzSpan = document.querySelector(`.${id}`)

    //the auido tag itself
    const rizzAudio = rizzSpan.querySelector('audio')

    const totalTime = rizzAudio.duration
    const currentTime = rizzAudio.currentTime

    if ((currentTime + 10) >= totalTime) {
      rizzAudio.currentTime = totalTime

    } else {
      rizzAudio.currentTime = currentTime + 10
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
      if (hover.show) {
        setHover({
          show: false, text: '', width: 0
        })
      }
    }, 3000);

    return () => {
      clearTimeout(timeout)
    }
  }, [hover])


  useEffect(() => {
    function mouseoverFtn(e) { 
      const element = e.currentTarget

      const x = element.getBoundingClientRect().x

      setHover({
        show: true, text: element.dataset.text, width: parseInt(element.dataset.width)
      })
    }

    
    btnRefs.current.forEach(btn => {
      if (btn) {
        btn.addEventListener('mouseover', mouseoverFtn)
      }
    })

    return () => {
      btnRefs.current.forEach(btn => {
        if (btn) {
          btn.removeEventListener('mouseover', mouseoverFtn)
        }
      })
    }
  }, [thisRizz])


  const likeRizz = () => {
    const condition = thisRizz.likes.find(like => like === userAuth)

    if (condition) {
      setThisRizz({ ...thisRizz, likes: thisRizz.likes.filter(like => like !== userAuth) })

    } else {
      setThisRizz({ ...thisRizz, likes: [...thisRizz.likes, userAuth] })
    }
  }



  return (
    <article className={`rizz ${id}`}>

      <div className='rizz-top'>
        <span>
          <img src={adminImg} alt="" />
          <p>Admin</p>
        </span>

        <span role={'button'} 
          className={thisRizz.isPlaying ? 'is-playing' : ''}
        >
          <span style={{opacity: hover.show ? '1' : '0', width: hover.width}}>
            {hover.text}
          </span>

          {thisRizz.isPlaying &&
            <button data-text='rewind 10s' data-rizzid={id} data-width={85}
              onClick={e => rewind(e)} ref={btnRef} 
            >
              <Replay10 fontSize="large" color="black" style={{ color: 'black'}} />
            </button>
          }

          <button data-text={thisRizz.isPlaying ? 'pause' : 'play'} data-rizzid={id}
            onClick={e => playAudioFtn(e)} ref={btnRef} data-width={50}
          >
            {thisRizz.isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          {thisRizz.isPlaying &&
            <button data-text='fast forward 10s' data-rizzid={id} data-width={120}
              onClick={e => fastFoward(e)} ref={btnRef}
            >
              <Forward10 fontSize="large" color="black" style={{ color: 'black'}}/>
            </button>
          }

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
        <button data-rizzid={id} onClick={e => likeRizz(e)}>
          {/* {thisRizz.likes.find(like => like === userAuth) ?
            <FaThumbsUp /> : <FaRegThumbsUp />
          } */}
          {thisRizz.likes.find(like => like === userAuth) ?
            <ThumbUpAlt fontSize="large" color="black" style={{ color: 'red'}}/>
            : <ThumbUpOffAlt fontSize="large" color="black" style={{ color: 'black'}}/>
          }
        </button>
        
        <div>
          <span>
            {thisRizz.likes.length} 
          </span>
          <span>
            {thisRizz.likes.length === 1 ? 'like' : 'likes'}
          </span>
        </div>
      </div>
    </article>
  )
}

export default Rizz