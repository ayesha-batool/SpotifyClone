import React, { useContext } from 'react'
import Navbar from './Navbar'
import { assets } from '../assets/assets'
import { useParams } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'

function DisplayAlbum({ album }) {
    const { id } = useParams()
    const { playWithID, songsData } = useContext(PlayerContext)

    if (!album) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-white text-2xl">Loading album...</p>
            </div>
        )
    }

    const filteredSongs = songsData.filter(item => item.album === album.name)

    return (
        <>
            <Navbar />
            {/* Album Header */}
            <div className="mt-10 flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-10">
                <img className="w-52 h-52 object-cover rounded-lg shadow-md" src={album.image} alt={album.name} />
                <div className="text-white space-y-2">
                    <p className="uppercase text-sm text-[#b3b3b3]">Playlist</p>
                    <h1 className="text-4xl md:text-6xl font-bold">{album.name}</h1>
                    <p className="text-[#c4c4c4]">{album.desc}</p>
                    <div className="text-sm text-[#b3b3b3] mt-2 flex items-center gap-2">
                        <img src={assets.spotify_logo} className="w-5 inline-block" alt="Spotify" />
                        <span className="font-semibold">Spotify</span>
                        <span>• 1,123,154 likes</span>
                        <span>• {filteredSongs.length} songs</span>
                        <span>• about 2 hr</span>
                    </div>
                </div>
            </div>

            {/* Tracklist Header */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-10 mb-3 px-2 text-[#a7a7a7] text-sm font-medium">
                <p><span className="mr-4">#</span>Title</p>
                <p>Album</p>
                <p className="hidden sm:block">Date Added</p>
                <img src={assets.clock_icon} alt="Duration" className="m-auto w-4" />
            </div>
            <hr className="border-[#333] mb-4" />

            {/* Song List */}
            {filteredSongs.map((item, index) => (
                <div
                    key={item._id || index}
                    onClick={() => playWithID(item._id)}
                    className="grid grid-cols-3 sm:grid-cols-4 gap-2 items-center p-3 cursor-pointer rounded-md text-[#e4e4e4] hover:bg-[#2a2a2a] transition-all"
                >
                    <div className="flex items-center gap-3">
                        <span className="w-6 text-right text-[#a7a7a7]">{index + 1}</span>
                        <img src={item.image} className="w-10 h-10 rounded object-cover" alt={item.name} />
                        <span>{item.name}</span>
                    </div>
                    <p className="text-sm text-[#bbbbbb]">{album.name}</p>
                    <p className="text-sm hidden sm:block text-[#bbbbbb]">5 days ago</p>
                    <p className="text-sm text-center text-[#bbbbbb]">{item.duration}</p>
                </div>
            ))}
        </>
    )
}

export default DisplayAlbum
