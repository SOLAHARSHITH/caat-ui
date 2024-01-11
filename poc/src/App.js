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

const App = () => {
  const [open, setopen] = useState(false);

  return (
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
    </Routes>
  );
};

export default App;
