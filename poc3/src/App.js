import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PolicyCreate from "./components/PolicyCreate";
import Pipeline from "./components/Pipeline";
import { useState } from "react";
import "./App.css";
import FinalDND from "./components/DragAndDrop";
import Container from "./components/Container";
import ContainerFinal from "./components/Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PipelineTest from "./components/PipelineTest";
import NavigationBar from "./components/NavigationBar";
import  "./icons/cloud.jpg";

const App = () => {
  const [open, setopen] = useState(false);

  return (
    <div>
    <img src={require("./icons/cloud.jpg")} className="absolute -z-10 h-full w-full"></img>
    <NavigationBar className="z-0"></NavigationBar>
    <Routes>
      <Route
        path="Dashboard"
        element={<Dashboard open={open} setopen={setopen} />}
      />
      <Route
        path="PolicyCreate"
        element={<PolicyCreate open={open} setopen={setopen} />}
      />
      <Route
        path="Pipeline"
        element={<Pipeline open={open} setopen={setopen} />}
      />
      <Route
        path="test"
        element={
          <DndProvider backend={HTML5Backend}>
            <ContainerFinal></ContainerFinal>
          </DndProvider>
        }
      />
      <Route
        path="dev"
        element={<PipelineTest open={open} setopen={setopen} />}
      />

    </Routes>
    </div>
  );
};

export default App;
