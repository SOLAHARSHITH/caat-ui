import React from 'react'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar';

const PolicyCreate = ({open, setopen}) => {
  return (
    <>
    <Navbar /> <div className='flex gap-3 '> <div> <Sidebar setopen={setopen}/></div> <div className=" mr-3 ml-3 w-1/6 h-auto grid grid-cols-4 gap-3 mt-5 bg-slate-500 rounded-lg"> <div className='col-span-8 '> <div className='bg-gray-400 w-full h-10 rounded-lg'> <h1 className=" text-center mb-10 pt-2">Policies</h1> <div style={{ overflowY: "scroll", maxHeight: "56em" }}> </div> </div> </div> <hr class=" absolute h-0.5 mt-2 bg-white"></hr> <input placeholder='Create a Policy' className='flex absolute bottom-0 left-24 ml-2 mb-0 bg-gray-400 w-48 h-8 mr-8 rounded-lg' /> </div> <div className=" mr-3 ml-3 w-5/6 h-96 mt-5 bg-slate-500 rounded-lg"> <div className='bg-gray-400 w-full h-10 rounded-lg'> <button className="absolute top-4 mt-20 right-4 mr-6 mb-3 text-white rounded-full ">Update</button> </div> </div> </div> <div className='grid grid-cols-2 gap-4'> <div className=" grid gap-3 bg-slate-100 rounded-lg"> </div> </div>
         
        </>
  )
}

export default PolicyCreate

