import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios'
import { url } from '../App'
import { toast } from 'react-toastify';
function AddAlbum() {
  const [image, setImage] = useState(false)
  const [color, setColor] = useState('#121212')
  const [name, setName] = useState('')
  const [desc, setDesc] = useState("")

  const [loading, setLoading] = useState(false)
 
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('desc', desc)
      formData.append('image', image)
      formData.append('bgColor', color)

      console.log(name, desc, image, color)
      const response = await axios.post(`${url}/api/album/add`, formData)
      console.log(response)

      toast.success("Album Added")
      setName("")
      setDesc("")
      setColor("")
      setImage(false)
   

    } catch (error) {
      toast.error("Error", error)
    }


    setLoading(false)
  }

  return loading ? (
    <div className='grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin'></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center gap-8 text-gray-600'>

      <div className='flex flex-col gap-4'>
        <p>Upload Image</p>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} id='image' accept='image/*' hidden />
        <label htmlFor="image">
          <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-24 cursor-pointer' alt="" />
        </label>
      </div>

      <div className='flex flex-col gap-2.5'>
        <p>Album Name</p>
        <input onChange={(e) => setName(e.target.value)} className='bg-transparent outline-green-600  border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type="text" placeholder='Type Here' />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album Description</p>
        <input onChange={(e) => setDesc(e.target.value)} className='bg-transparent outline-green-600  border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' type="text" placeholder='Type Here' />
      </div>
      <div className='flex  gap-3'>
        <p>Background Color</p>
        <input className='m-auto' value={color} onChange={(e) => setColor(e.target.value)} type="color" />
      </div>

      <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>ADD</button>
    </form>
  );
}

export default AddAlbum; 