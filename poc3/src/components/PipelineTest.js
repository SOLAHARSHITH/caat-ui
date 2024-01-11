import React from "react";
import { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Resources from "../Resources";
import Reactflowbox from "../Reactflowbox";
import FinalDND from "./DragAndDrop";
import PipelineMain from "../PipelineMain";

const PipelineTest = ({ open, setopen }) => {
  return (
    <div className="h-[100vh]">
      <div className="App h-full  ">
        <Navbar />
        <div className="flex h-[90vh]">
          <Sidebar setopen={setopen} />
          <PipelineMain></PipelineMain>
        </div>
      </div>
    </div>
  );
};

export default PipelineTest;