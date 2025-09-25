import { createContext, useRef, useState, useEffect, use } from "react";
import axios from 'axios'
export const PlayerContext = createContext()
const PlayerContextProvider = (props) => {
    const audioRef = useRef()
    const seekBg = useRef()
    const seekBar = useRef()
    const url = import.meta.env.VITE_API_URL || 'http://localhost:4000' 
    const [songsData, setSongData] = useState([])
    const [albumData, setalbumData] = useState([])

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
    const getSongs = async () => {
        try {
            const response = await axios.get(`${url}/api/song/list`);

            setSongData(response.data.songs);
            setTrack(response.data.songs[0]);
            console.log("Songs fetched:", response.data.songs);

        } catch (error) {
            console.error("Error fetching songs:", error);
        }

    };
    const getAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            await setalbumData(response.data.albums);
            console.log("Albums fetched:", response.data.albums);
            console.log("Album data:", albumData);

        } catch (error) {
            console.error("Error fetching albums:", error);
        }

    };
    const play = () => {
        audioRef.current.play()
        setPlayStatus(true)
    }
    const pause = () => {
        audioRef.current.pause()
        setPlayStatus(false)
    }
    const playWithID = async (id) => {
        await songsData.map((item) => {
            if (item._id === id) {
                setTrack(item)
            }

        })
        setPlayStatus(true)
        try {
            await audioRef.current.play()
        } catch (error) {
            console.log("Audio play failed:", error)
        }
    }
    const previous = async () => {
        songsData.map((item, index) => {
            if (item._id === track._id) {
                if (index > 0) {
                    setTrack(songsData[index - 1])
                    audioRef.current.play()
                    setPlayStatus(true)
                }
            }
        })
        if (track.id === 0) {
            setTrack(songsData[songsData.length - 1])
            audioRef.current.play()
            setPlayStatus(true)
        }
    }
    const next = async () => {
        songsData.map((item, index) => {
            if (item._id === track._id) {
                if (index < songsData.length - 1) {
                    setTrack(songsData[index + 1])
                    audioRef.current.play()
                    setPlayStatus(true)
                }
            }
        })
        if (track.id === songsData.length - 1) {
            setTrack(songsData[0])
            audioRef.current.play()
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
        getSongs();
        getAlbums();

    }, []);
    useEffect(() => {
        const audio = audioRef.current;

        const handleLoadedMetadata = () => {
            const duration = audio.duration;
            if (!isNaN(duration)) {
                setTime((prevTime) => ({
                    ...prevTime,
                    totalTime: {
                        minute: Math.floor(duration / 60),
                        second: Math.floor(duration % 60),
                    },
                }));
            }
        };

        const updateTime = () => {
            const current = audio.currentTime;
            const duration = audio.duration;

            if (isNaN(duration) || !seekBar.current) return;

            const progressPercent = (current / duration) * 100;
            seekBar.current.style.width = `${progressPercent}%`;

            setTime((prevTime) => ({
                ...prevTime,
                currentTime: {
                    minute: Math.floor(current / 60),
                    second: Math.floor(current % 60),
                },
            }));
        };

        if (audio) {
            audio.addEventListener('loadedmetadata', handleLoadedMetadata);
            audio.addEventListener('timeupdate', updateTime);
        }

        return () => {
            if (audio) {
                audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audio.removeEventListener('timeupdate', updateTime);
            }
        };
    }, [track]);

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
        seekSong,
        songsData,
        albumData,

    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>)
}
export default PlayerContextProvider;