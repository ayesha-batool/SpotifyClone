import React, { useContext } from 'react'
import { assets, songsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'
function Player() {

    const {track, seekBar, seekBg, playStatus, play, pause,seekSong, time, audioRef,previous,next } = useContext(PlayerContext)

    console.log("🎵 Track:", track);
    console.log("🔁 Play Status:", playStatus);
    console.log("🕒 Time Object:", time);
    console.log("🎧 Audio Ref:", audioRef?.current);
    console.log("📊 Seek Bar Ref:", seekBar?.current);
    console.log("📊 Seek BG Ref:", seekBg?.current);
    
    return track?(
        <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
            <audio ref={audioRef} src={track.file} />
            <div className='hidden lg:flex items-center gap-4 '>

                <img src={track.image} alt="songImage" className='w-12' />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>

            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className="flex gap-4">
                    <img src={assets.shuffle_icon} alt="" className='w-4 cursor-pointer' />
                    <img onClick={previous} src={assets.prev_icon} alt="" className='w-4 cursor-pointer' />
                    {playStatus ?
                        <img onClick={pause} src={assets.pause_icon} alt="" className='w-4 cursor-pointer' />
                        :
                        <img onClick={play} src={assets.play_icon} alt="" className='w-4 cursor-pointer' />
                    }

                    <img onClick={next} src={assets.next_icon} alt="" className='w-4 cursor-pointer' />
                    <img src={assets.loop_icon} alt="" className='w-4 cursor-pointer' />

                </div>
                <div className='flex items-center gap-5'>
                    <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second}</p>

                </div>
            </div>
            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                <img src={assets.play_icon} className='w-4' alt="" />
                <img src={assets.mic_icon} className='w-4' alt="" />
                <img src={assets.queue_icon} className='w-4' alt="" />
                <img src={assets.speaker_icon} className='w-4' alt="" />
                <img src={assets.volume_icon} className='w-4' alt="" />
                <div className='w-20 bg-slate-50 h-1 rounded'></div>
                <img src={assets.mini_player_icon} className='w-4' alt="" />
                <img src={assets.zoom_icon} className='w-4' alt="" />
            </div>

        </div>):null
}

export default Player