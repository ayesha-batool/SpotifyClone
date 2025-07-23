import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { url } from '../App';
import { toast } from 'react-toastify';

function ListSong() {
  const [data, setData] = useState([])
  const fetchSongs = async () => {
    try {
      console.log(url)
      const response = await axios.get(`${url}/api/song/list`)
      console.log(response.data)
      if (response.data.success) {

        setData(response.data.songs)
      }
      else {
        toast.error("Something went wrong")
      }

    }
    catch (error) {
      console.log(error)
    }
  }
  const removeSong = async (id) => {
    try {
      console.log(id)
      const response = await axios.delete(`${url}/api/song/remove/${id}`)
      console.log(response)
      toast.success("Song removed")
      await fetchSongs()

    }
    catch (error) {
      toast.error("Error", error)
    }
  }
  useEffect(() => {
    fetchSongs()
  }, [])
  return (
    <div>
      <p>All Song List</p>
      <br />
      <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>

        <b>Image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Album</b>
        <b>Duration</b>
        <b>Action</b>

      </div>
      {data.map((item, index) => {
        return (
          <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
            <img src={item.image} className='w-12' alt="" />
            <p>{item.name}</p>
            <p>{item.album}</p>
            <p>{item.duration}</p>

            <p className='cursor-pointer' onClick={() => removeSong(item._id)}>x</p>

          </div>
        )
      })}
    </div>

  );
}

export default ListSong; 