import { createContext, useRef, useState, useEffect } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext()
const PlayerContextProvider = (props) => {
    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()

    const [track, setTrack] = useState(songsData[0])
    const [playStatus, setPlayStatus] = useState(false)
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    })
    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }
    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }
    const playWithID = async (id) => {
        await setTrack(songsData[id])
        await setPlayStatus(true)
        try {
            await audioRef.current.play()
        } catch (error) {
            console.log("Audio play failed:", error)
        }
    }
    const previous = async () => {
        if (track.id > 0) {
            await setTrack(songsData[track.id - 1])
            await audioRef.current.play()
            setPlayStatus(true)
        }
    }
    const next = async () => {
        if (track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1])
            await audioRef.current.play()
            setPlayStatus(true)
        }
    }
    const seekSong = async (e) => {
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)

    }
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play()
        }
    }, [])
    useEffect(() => {
        if (audioRef.current && track) {
            audioRef.current.src = track.file
        }
    }, [track])
    useEffect(() => {
        const updateTime = () => {
            seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
            setTime({
                currentTime: {
                    second: Math.floor(audioRef.current.currentTime % 60),
                    minute: Math.floor(audioRef.current.currentTime / 60)
                },
                totalTime: {
                    second: Math.floor(audioRef.current.duration % 60),
                    minute: Math.floor(audioRef.current.duration / 60)
                }
            });
        };
        if (audioRef.current) {
            audioRef.current.ontimeupdate = updateTime;
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = null;
            }
        };
    }, [audioRef]);
    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        pause, play,
        playWithID,
        previous, next,
        seekSong

    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>)
}
export default PlayerContextProvider;