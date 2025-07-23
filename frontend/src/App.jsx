import React, { useContext, useRef } from 'react'
import SideBar from './components/SideBar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
function App() {
  const { audioRef, track } = useContext(PlayerContext)
  const seekBg = useRef()

  return (
    <div className='bg-black h-screen '>
      <div className='h-[90%] flex'>
        <SideBar />
        <Display />
      </div>

      <Player />

      <audio preload='auto' src={track.file} ref={audioRef}></audio>
    </div>
  )
}

export default App