import React, { useRef } from 'react'
import Navbar from './Navbar'
import { albumsData, songsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'

function DisplayHome() {
    const albumRowRef = useRef(null)
    const songRowRef = useRef(null)

    const scrollRow = (ref, dir) => {
        if (ref.current) {
            ref.current.scrollBy({ left: dir * 300, behavior: 'smooth' })
        }
    }

    return (
        <>
            <Navbar />

            {/* === Albums Section === */}
            <div className='mb-4 relative'>
                <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
                <div className='relative'>
                    {/* Left Arrow */}
                    <button
                        onClick={() => scrollRow(albumRowRef, -1)}
                        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 text-white rounded-full p-2 shadow-lg hover:bg-gray-700'
                    >
                        &#8592;
                    </button>

                    {/* Row */}
                    <div
                        ref={albumRowRef}
                        className='flex overflow-x-auto scroll-smooth pl-12 pr-12 gap-4'
                    >
                        {albumsData.map((item, index) => (
                            <AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scrollRow(albumRowRef, 1)}
                        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 text-white rounded-full p-2 shadow-lg hover:bg-gray-700'
                    >
                        &#8594;
                    </button>
                </div>
            </div>

            {/* === Songs Section === */}
            <div className='mb-4 relative'>
                <h1 className='my-5 font-bold text-2xl'>Today's biggest hits</h1>
                <div className='relative'>
                    {/* Left Arrow */}
                    <button
                        onClick={() => scrollRow(songRowRef, -1)}
                        className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 text-white rounded-full p-2 shadow-lg hover:bg-gray-700'
                    >
                        &#8592;
                    </button>

                    {/* Row */}
                    <div
                        ref={songRowRef}
                        className='flex overflow-x-auto scroll-smooth pl-12 pr-12 gap-4'
                    >
                        {songsData.map((item, index) => (
                            <SongItem key={index} name={item.name} desc={item.desc} image={item.image} id={item.id} />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scrollRow(songRowRef, 1)}
                        className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900 text-white rounded-full p-2 shadow-lg hover:bg-gray-700'
                    >
                        &#8594;
                    </button>
                </div>
            </div>
        </>
    )
}

export default DisplayHome
