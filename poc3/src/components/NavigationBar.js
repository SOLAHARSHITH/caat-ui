import React from 'react'
import { Link } from 'react-router-dom'

function NavigationBar() {
  return (
    <div>
    <header class="bg-white-300">
        <nav class="flex justify-between  w-[92%]  mx-auto">
            <div>
                {/* <img class="w-16 cursor-pointer" src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png" alt="..." /> */}
            </div>
            <div
                // class="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
              className='bg-white  rounded-b-lg px-5 place-content-center '>  
              <ul 
            //   class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
               className='flex gap-8 h-full items-center'>     <Link to="/Dashboard" className="h-full hover:bg-black hover:text-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Dashboard</Link>
                    <Link to="/PolicyCreate" className="h-full hover:bg-black hover:text-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>PolicyCreate</Link>
                    <Link to="/Pipeline" className="h-full hover:bg-black hover:text-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Pipeline</Link>
                    <Link to="/Resources" className="h-full hover:bg-black hover:text-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Resources</Link>
                    <Link to="/Pricing" className="h-full hover:bg-black hover:text-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Pricing</Link>
                    <Link to="/About" className="h-full hover:bg-black hover:text-white" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>About</Link>
                    
                    {/* <li>
                        <a class="hover:text-gray-500" href="#">Solution</a>
                    </li>
                    <li>
                        <a class="hover:text-gray-500" href="#">Resource</a>
                    </li>
                    <li>
                        <a class="hover:text-gray-500" href="#">Developers</a>
                    </li>
                    <li>
                        <a class="hover:text-gray-500" href="#">Pricing</a>
                    </li> */}
                </ul>
            </div>
            <div class="flex items-center gap-6 m-2">
                <button 
                // class="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
                className='bg-blue-400 text-white px-5 py-2 rounded-full hover:bg-[#87acec]'>Sign in</button>
                <ion-icon onclick="onToggleMenu(this)" name="menu" class="text-3xl cursor-pointer md:hidden"></ion-icon>
            </div>
            </nav>
    </header>
    </div>
  )
}

export default NavigationBar