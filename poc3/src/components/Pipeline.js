import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Resources from "../Resources";
import FinalDND from "./DragAndDrop";
import NavigationBar from "./NavigationBar";

const Pipeline = ({ open, setopen }) => {
  return (
    <div className="h-[100vh]">
      <div className="App h-full  ">
        {/* <Navbar /> */}
        
        <div className="flex h-[90vh] place-content-center">
          {/* <Sidebar setopen={setopen} /> */}
          <Resources open={open} className="place-content-center" />
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
