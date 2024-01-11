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

//needs: 
const initialNodes = [
    // {
    //   id: "1",
    //   type: "default",
    //   data: { label: "First node" },
    //   position: { x: 0, y: 0 },
    // },
  ];
  
  const defaultEdgeOptions = {
    type: "default",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
      color: "#000",
    },
  };
  

function Reactflowbox({reactFlowWrapper,tempinputValues,setclick,fetchDataNode,settempassetid,getNodeByAssetID}) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback(
        (params) =>
          setEdges((eds) => {
            return addEdge(params, eds);
          }),
        [setEdges]
      );
    
      const onDrop = useCallback(
        (e) => {
          e.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          const type = e.dataTransfer.getData("application/reactflow");
          const nodeData = JSON.parse(e.dataTransfer.getData("application/json"));
          
          console.log(nodeData.uuid);
          const labelName = e.dataTransfer.getData("text/plain");
          if (typeof type === "undefined" || !type) {
            return;
          }
          const position = reactFlowInstance.project({
            x: e.clientX - reactFlowBounds.left,
            y: e.clientY - reactFlowBounds.top,
          });
    
          const id = Math.random().toString(16);
          const newItem = {
            id: id,
            type: type,
            data: { label: ` ${labelName}` , nodeData, tempinputValues,variables:{
              "assetID": "",
              "packageID": "",
              "input": [
                  {
                      "input_file_name": ""
                  },
                  {
                      
                  }
              ],
              "metadata": {
                  "action": "create",
                  "revert_to": 1
              }
          }},
            position:position,
          };
          
          
          //setNodes((nodes) => nodes.concat(newItem));
          /*setNodes((prevValues) => ({
            ...prevValues, newItem
          }));*/
          setNodes((nodes) => {
            const updatedNodes = nodes.concat(newItem);
            console.log(updatedNodes);
            return updatedNodes;
          });
          
          //console.log(nodes);
        },
        [reactFlowInstance, setNodes]
      );
    
      useEffect(() => {
        console.log(nodes);
      }, [nodes]);
      
    
      const onDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      };
    
      const onDragStart = (e, nodeType, label) => {
        const labelvalue = encodeURIComponent(label.name);
        e.dataTransfer.setData("application/reactflow", nodeType);
        e.dataTransfer.setData("application/json", JSON.stringify(label));
        e.dataTransfer.setData("text/plain",labelvalue)
        e.dataTransfer.effectAllowed = "move";
      };
    
    
      const onNodeClick = (event, node) => {
        console.log("clicked")
        setclick(true);
        const id=encodeURIComponent(node.data.nodeData.uuid);
        console.log(id);
        // const key=decodeURIComponent(node.data.nodeData.key);
        // console.log(key);
        // console.log(node.data.nodeData.key)
        console.log(node.data.nodeData.key);
        fetchDataNode(node.data.nodeData.key);
        settempassetid(id);
        //getInputDataByAssetID(id);
        //const newData = prompt('Enter new data for the node:', node.data.label);
        // if (newData !== null) {
        //   const updatedNodes = nodes.map((n) =>
        //     n.id === node.id ? { ...n, data: { ...n.data, label: newData } } : n
        //   );
        //   onNodesChange(updatedNodes);
        // }
        getNodeByAssetID(id);
      };
  return (
   
     <ReactFlowProvider>
        <ResourceList onDragStart={onDragStart} ></ResourceList>
    <div
                className="dropbox ml-5 mt-5  w-5/6  bg-slate-300 rounded-lg border-2 shadow-[0px_0px_5px_3px_rgba(102,178,255,0.8)]"
                ref={reactFlowWrapper}
              >
    <ReactFlow
                  nodes={nodes}
                  //elements={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onInit={setReactFlowInstance}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  defaultEdgeOptions={defaultEdgeOptions}
                  onNodeClick={onNodeClick}
                  fitView
                  className="rf "
                ></ReactFlow>
    </div>
    </ReactFlowProvider>
  )
}

export default Reactflowbox