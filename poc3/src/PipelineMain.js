import React from "react";
import "./Resources.css";
import { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import { v4 as uuidv4 } from 'uuid';
import "reactflow/dist/style.css";
import { useEffect } from "react";
import io from "socket.io-client";
import { Validator } from "jsonschema";
import EventLog from "./EventLogs";
import ResourceList from "./ResourceList";
import Reactflowbox from "./Reactflowbox";

function PipelineMain() {
  return (
    <Reactflowbox></Reactflowbox>
  )
}

export default PipelineMain