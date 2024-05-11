import React, { useContext, useEffect, useRef, useState } from 'react'
import {  FaPause, FaPlay } from 'react-icons/fa'
import { Replay10, Forward10, ThumbUpAlt, ThumbUpOffAlt, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { appContext } from '../App'
import axios from 'axios';
import { useSwipeable } from 'react-swipeable';

//placeholder img for Admin
import adminImg from '../images/c1.jpg'


const Rizz = ({rizz}) => {
  const { setShowRizzModal, setRizzModalImg, rizzes, setRizzes, setUser, user } = useContext(appContext)


  const [thisRizz, setThisRizz] = useState(rizz)
  // image, id, audio, likes, isPlaying
  const [index, setIndex] = useState(0)
  const [hover, setHover] = useState({
    show: false, text: '', width: 0
  })

  const btnRefs = useRef([])
  const btnRef = (el) => {
    btnRefs.current.push(el)
  }

  const audioRef = useRef()


  // useEffect(() => {}, [])

  const intiateModal = (e) => {
    setShowRizzModal(true)

    //make rizzModalImg be the array of images for that rizz
    setRizzModalImg(thisRizz.image)
  }


  //This function sets everything for the audio to be played. Since the audio itself has it's display set to none, the speaker/volume up icon will be used to controle the auido settings of the audio tag.

  let rizzId = useRef('')
  //id of the 'rizz' that was just clicked

  const playAudioFtn = e => {
    const id = e.currentTarget.dataset.rizzid
    rizzId.current = id
    //finding the span that encloses the audio tag and the speaker icon 
    const rizzSpan = document.getElementById(id)

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
    const rizzSpan = document.getElementById(id)

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
    const rizzSpan = document.getElementById(id)

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
        if (rizz._id !== rizzId.current) {
          const id = rizz._id
          
          const rizzSpan = document.getElementById(id)
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


  const likeRizz = async (e) => {
    const id = e.currentTarget.dataset.rizzid
    const url = `
    https://get-your-rizz-b61a0773d902.herokuapp.com/api/v1/rizz/${id}/like
    `
    const rizz = rizzes.find(rizz => rizz._id === id)

    const response = await axios.post(url, { likes: rizz.likes + 1 })
    setThisRizz(response.data.data)

    if (response.status === 200) {
      let userLikes = JSON.parse(localStorage.getItem('getyourrizz-user')).likes
      
      const condition = userLikes.find(like => like === id)

      if (!condition) {
        userLikes = [...userLikes, id]

        const user = JSON.parse(localStorage.getItem('getyourrizz-user'))

        localStorage.setItem('getyourrizz-user', JSON.stringify({ ...user, likes: userLikes }))
        setUser({ ...user, likes: userLikes })
      }
    }
  }
  

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index !== (thisRizz.image.length - 1)) {
        setIndex(index => index + 1)

      } else {
        setIndex(index => (index - index))
      }
    } ,

    onSwipedRight: () => {
      if (index !== 0) {
        setIndex(index => index - 1)

      } else {
        setIndex(index => (index + thisRizz.image.length - 1))
      }
    },
  });



  return (
      <article {...handlers} className={`rizz ${thisRizz._id}`}>

        <div className='rizz-top'>
          <span>
            <img src={adminImg} alt="" />
            <p>Admin</p>
          </span>

          <span role={'button'} className={thisRizz.isPlaying ? 'is-playing' : ''}
            id={thisRizz._id}
          >
            <span style={{opacity: hover.show ? '1' : '0', width: hover.width}}>
              {hover.text}
            </span>

            {thisRizz.isPlaying &&
              <button data-text='rewind 10s' data-rizzid={thisRizz._id}  ref={btnRef} 
                data-width={85} onClick={e => rewind(e)}
              >
                <Replay10 fontSize="large" color="black" style={{ color: 'black'}} />
              </button>
            }

            <button data-text={thisRizz.isPlaying ? 'pause' : 'play'}
              data-rizzid={thisRizz._id} onClick={e => playAudioFtn(e)}
              ref={btnRef} data-width={50}
            >
              {thisRizz.isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            {thisRizz.isPlaying &&
              <button data-text='fast forward 10s' data-rizzid={thisRizz._id}
                data-width={120} onClick={e => fastFoward(e)} ref={btnRef}
              >
                <Forward10 fontSize="large" color="black" style={{ color: 'black'}}/>
              </button>
            }

            <audio ref={audioRef} loop controls data-audioid={thisRizz._id}
              // syncing the rizz.isPlaying property with the audio tag's paused/playing state
              onPlay={() => setThisRizz({...thisRizz, isPlaying: true})}
              onPause={() => setThisRizz({...thisRizz, isPlaying: false})}
            >
              <source src={thisRizz.audio} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

          </span>
        </div>

        <div className='rizz-mid'>
          <span>
            {index + 1} / {thisRizz.image.length}
          </span>
          
          <button style={{ left: '10px' }} className='btn'
            onClick={() => {
              if (index !== 0) {
                setIndex(index => index - 1)

              } else {
                setIndex(index => (index + thisRizz.image.length - 1))
              }
            }}
          >
            <ChevronLeft fontSize="large" color="black"
              style={{ color: 'black' }}
            />
          </button>

          {thisRizz.image.sort((a, b) => a.number - b.number).map(img => {
            const { link, _id, number } = img
            return (
              <img src={link} alt="Rizz img" key={_id}
                onClick={e => intiateModal(e)}
                style={{
                  position: index !== (number - 1) && 'absolute',
                  zIndex: index === (number - 1) ? '3' : '0',
                  transform: index === (number - 1) ? 'scale(100%)' : 'scale(70%)'
                }}
              />
            )
          })}

          <button style={{ right: '10px' }} className='btn'
            onClick={() => {
              if (index !== (thisRizz.image.length - 1)) {
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

        <div className='rizz-bottom'>
          <button data-rizzid={thisRizz._id} onClick={e => likeRizz(e)}>
            {user?.likes.find(like => like === thisRizz._id) ?
              <ThumbUpAlt fontSize="large" color="black" style={{ color: 'red'}}/>
              : <ThumbUpOffAlt fontSize="large" color="black" style={{ color: 'black'}}/>
            }
          </button>
          
          <div>
            <span>
              {thisRizz.likes} 
            </span>
            <span>
              {thisRizz.likes === 1 ? 'like' : 'likes'}
            </span>
          </div>
        </div>

      </article>
  )
}

export default Rizz