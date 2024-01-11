import { useState } from "react";
import React from "react";
import { Link } from 'react-router-dom'


const Sidebar = ({ setopen }) => {
  const [localopen, localsetopen] = useState(false);
  const handlelocalchange = (newvalue) => {
    localsetopen(newvalue);
    setopen(newvalue);
  };

  return (
    <>
      <div className=" Sidebar flex border-white">
        <div
          className={`${
            localopen ? "w-52" : "w-16"
          } h-[90vh] p-5 pt-8 pl-2.5 bg-blue-400 relative`}
        >
          <img
            src={require("./icons/control.png")}
            className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2  ${
              !localopen && "rotate-180"
            }`}
            onClick={() => handlelocalchange(!localopen)}
          />
          <div className="flex gap-x-4 items-center  cursor-pointer  hover:bg-gray-500 rounded-md">
            <img
              src={require("./icons/dashboard.png")}
              className={`cursor-pointer duration-500 w-6 h-6 `}
            />
            <h1
              className={`text-white origin-left font-medium text-xl first-letter duration-300 cursor-pointer hover:bg--200 rounded-sm ${
                !localopen && "scale-0"
              }`}
            >
             <Link to="/Dashboard">Dashboard</Link>
            </h1>
          </div>
          <div className="flex gap-x-4 items-center mt-6 cursor-pointer  hover:bg-gray-500 rounded-md">
            <img
              src={require("./icons/Assets2.png")}
              className={`cursor-pointer duration-500 w-6 h-6`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl first-letter duration-300 ${
                !localopen && "scale-0"
              }`}
            >
             <Link to="/PolicyCreate">PolicyCreate</Link>
            </h1>
          </div>
          <div className="flex gap-x-4 items-center mt-6 cursor-pointer  hover:bg-gray-500 rounded-md">
            <img
              src={require("./icons/pipeline.png")}
              className={`cursor-pointer duration-500 w-6 h-6 border-dark-purple`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl first-letter duration-300 ${
                !localopen && "scale-0"
              }`}
            >
             <Link to="/Pipeline">Pipeline</Link>
            </h1>
          </div>
          <div className="flex gap-x-4 items-center mt-6 cursor-pointer  hover:bg-gray-500 rounded-md">
            <img
              src={require("./icons/credentials.png")}
              className={`cursor-pointer duration-500 w-6 h-6 color `}
            />
            <h1
              className={`text-white origin-left font-medium text-xl first-letter duration-300 ${
                !localopen && "scale-0"
              }`}
            >
              Credentials
            </h1>
          </div>
          <div className="flex gap-x-4 items-center mt-6 cursor-pointer  hover:bg-gray-500 rounded-md">
            <img
              src={require("./icons/settings.png")}
              className={`cursor-pointer duration-500 w-6 h-6 `}
            />
            <h1
              className={`text-white origin-left font-medium text-xl first-letter duration-300 ${
                !localopen && "scale-0"
              }`}
            >
              Settings
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
