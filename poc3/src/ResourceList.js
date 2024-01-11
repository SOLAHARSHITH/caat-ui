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

function ResourceList(list,generateUUID,onDragStart,fetchData,settempInputValues,settemp2InputValues,setfunctiontemp2InputValues,settempassetid,setNodeVariableData) {
  return (
    <div className="rf ml-5 mt-5 w-1/6  border-2 bg-slate-300 rounded-lg shadow-[0px_0px_5px_3px_rgba(102,178,255,0.8)]">
                <h1 className="text-center h-[50px] pt-2 divide-y-4 dark:divide-black  bg-gray-900 rounded-lg text-white text-2xl sticky shadow-[0_35px_60px_-15px_rgba(160,160,160,0.3)]">
                  Resources
                </h1>
                <div style={{ maxHeight: "18em" }}>
                  <div className="ml-5 mr-5">
                    {list &&
                      Object.values(list).map((keys) => (
                        <div
                          className="ls my-2  border-2 border-black rounded-lg p-2 cursor-grab"
                          onDragStart={(event) => {
                            //onDragStart(event, "default", { name: keys.name });
                            const generatedUUID = generateUUID(); // Generate UUID and get it from generateUUID function
                            const name = keys.name; // Get the 'name' data from wherever it is available
                            const tempidentifierData=keys.identifier;

                            // Combine 'name' and 'generatedUUID' in a single object
                            const dataToTransfer = {
                                 name: name,
                                uuid: generatedUUID,
                                key: tempidentifierData
                            };
                            onDragStart(event, "default", dataToTransfer);

                            // Convert the data to a JSON string and set it as the data being dragged
                            //event.dataTransfer.setData("application/json", JSON.stringify(dataToTransfer));
                            fetchData({ identifier: keys.identifier });
                            settempInputValues([]);
                            settemp2InputValues({
                              assetID: "",
                              packageID: "",
                              input: [
                                { input_file_name: "input.json" }, //"input_file_name": data.package_json.path.input_json.value;
                              ],
                              metadata: {
                                action: "create",
                                revert_to: 1,
                              },
                            });
                            setfunctiontemp2InputValues({
                              stage: "1",
                              job: "2",
                              packageID: "",
                              metadata: {},
                              input_data: [],
                            });
                            settempassetid(generatedUUID);
                            setNodeVariableData({});
                            //generateUUID();
                          }}
                          draggable
                        >
                          <h1 className="">{keys.name}</h1>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
  )
}

export default ResourceList