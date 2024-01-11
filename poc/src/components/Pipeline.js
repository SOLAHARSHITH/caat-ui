import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Resources from "../Resources";
import FinalDND from "./DragAndDrop";

const Pipeline = ({ open, setopen }) => {
  return (
    <div className="h-[100vh]">
      <div className="App h-full  ">
        <Navbar />
        <div className="flex h-[90vh]">
          <Sidebar setopen={setopen} />
          <Resources open={open} />
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
