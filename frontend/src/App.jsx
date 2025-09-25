import React, { useContext, useRef } from 'react'
import SideBar from './components/SideBar'
import Player from './components/Player'
import Display from './components/Display'
import { PlayerContext } from './context/PlayerContext'
function App() {
  const { audioRef, track, songsData } = useContext(PlayerContext)
  const seekBg = useRef()

  return (
    <div className='bg-black h-screen '>

      {songsData.length !== 0 ? (
        <>
          <div className='h-[90%] flex'>
            <SideBar />
            <Display />
          </div>
          <Player />
        </>
      ) : (
        <div className='h-screen flex items-center justify-center text-white'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold mb-4'>Spotify Clone</h1>
            <p className='text-gray-400'>Loading your music...</p>
            <p className='text-sm text-gray-500 mt-2'>Make sure your backend is running</p>
          </div>
        </div>
      )}

      <audio preload='auto' src={track ? track.file : ""} ref={audioRef}></audio>
    </div>
  )
}

export default App