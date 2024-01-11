import React from 'react'
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const Dashboard = ({open, setopen}) => {
  return (
    <>
      <Navbar />
      <div className='flex gap-3'>
        <Sidebar setopen={setopen} />
        <div className=" mr-3 ml-3 mt-5 w-full h-80 bg-slate-100 rounded-lg">
          <h1 className=" text-center mb-10">hello</h1>
        </div>
      </div>
    </>

  )
}

export default Dashboard
