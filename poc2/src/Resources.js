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

const Resources = ({ open }) => {
  //START of drag and drop funtions
  const reactFlowWrapper = useRef(null);

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
        data: { label: ` ${labelName}` , nodeData, tempinputValues},
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

  const fetchDataNode = (key) => {
    console.log(key);
    const url = `http://localhost:30007/api/external/package/registry/${key}/?format=json`;
    setData(null);
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
    
  };
 


  const getInputDataByAssetID = (id) => {
    const matchingAsset = tempinputValues.assets.find(asset => asset.assetID === id);
    const matchingPackage= tempinputValues.tempinputValues.pipeline.job_list.find(job_list => job_list.functionID ===id)
    if (matchingAsset) {
      // Extract input data for the matching asset
      const input = matchingAsset.input[1];
      return input;
    }
  
  }

  const[NodeVariableData,setNodeVariableData]=useState({});
  const getNodeByAssetIDSaving = (id,temp2inputValues) => {
    
    const targetNodeIndex = nodes.findIndex(node => node.data.nodeData.uuid === id);

    //const matchingPackage= tempinputValues.tempinputValues.pipeline.job_list.find(job_list => job_list.functionID ===id)
    if (targetNodeIndex !== -1) {
      // Clone the target node to avoid modifying the state directly
      const updatedNode = { ...nodes[targetNodeIndex] };
    
      // Add a key-value pair to the node's data where the key is a string and the value is a JSON object
      updatedNode.data["variables"] = temp2inputValues;
      
      // Create a new nodes array with the updated node
      const updatedNodes = [...nodes];
      updatedNodes[targetNodeIndex] = updatedNode;
    
      // Update the nodes state with the new array
      setNodes(updatedNodes);
      console.log(nodes);
    }else{
      console.log("not matched");
    }

    
    
  
  }

  const getNodeByAssetID = (id) => {
    const targetNode = nodes.find(node => node.data.nodeData.uuid === id);
    const tempNodeVariableData = targetNode.data.variables.input[1];

    setNodeVariableData(tempNodeVariableData);
  }
  //END of drag and drop funtions

  const [list, setList] = useState(null); //USED FOR STORING OF RESOURSES LIST FROM BACKEND
  const [data, setData] = useState(null); //USED FOR STORING THE JSON DATA OF ASSET DROPPED
  // const [link,setLink]=useState('http://localhost:30007/api/external/package/registry/Package-EC2/?format=json');

  // const fetchList = (link ='http://localhost:30007/api/external/package/search/') => {
  //   setData(null);
  //   fetch(link)
  //     .then(response =>  response.json() )
  //     .then(list => setList(list));

  // };
  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    const fetchDataList = async () => {
      try {
        const response = await fetch(
          "http://localhost:30007/api/external/package/search/"
        );
        const list = await response.json();
        setList(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataList();
  }, []); //FETCH THE RESOURCES LIST AND SAVES IT IN LIST

  const fetchData = (identifier) => {
    console.log(identifier);
    const identifierValue = encodeURIComponent(identifier.identifier);
    const url = `http://localhost:30007/api/external/package/registry/${identifierValue}/?format=json`;
    setData(null);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const socket = io('http://localhost:30007/api/external/package/search/');

  //     const link1 = await new Promise((resolve) => {
  //       socket.on('event-name', (link1) => {
  //         resolve(link1);
  //       });
  //     });

  //     setList(link1);
  //     socket.disconnect();
  //   };

  //   fetchData();
  // }, []);
  //FETCH THE RESOURCES LIST AND SAVES IT IN LIST

  // const fetchData = (identifier) => {

  //   const identifierValue = encodeURIComponent(identifier.identifier);
  // const url = `http://localhost:30007/api/external/package/registry/${identifierValue}/?format=json`;
  //   setData(null);
  //   fetch(url)
  //     .then(response =>  response.json() )
  //     .then(data => setData(data));

  // }; // INPUT => IDENTIFIER OBJECT OF THE ASSET FROM THE LIST :: OUTPUT => FETCHES THE DATA OF THE ASSET DYNAMICALLY AND SAVES IT IN DATA

  //   const fetchData = (identifier) => {
  //     const identifierValue = encodeURIComponent(identifier.identifier);
  //     const url = `http://localhost:30007/api/external/package/registry/${identifierValue}/?format=json`;
  //   // Connect to the Socket.io server
  //   const socket = io(url);

  //   // Subscribe to the desired event
  //   socket.on('event-name', (data) => {
  //     setData(data);
  //   });

  //   // Clean up the connection when the component unmounts

  // }

  // const EC2 = () => {
  //   setLink('http://localhost:30007/api/external/package/registry/Package-EC2/?format=json');
  // }
  // const NSG = () => {
  //   setLink('http://localhost:30007/api/external/package/registry/Package-NSG/?format=json');
  // }
  // const [Keys, changeKeys] = useState([]);
  // const [Values, changeValues] = useState([]);

  // const kvHandler = () => {
  //   data && changeKeys(Object.keys(data[0]));
  //   data && changeValues(Object.values(data[0]));
  //   const kvObject = {
  //     Keys, Values

  //   }
  // }

  {
    /*  const [jsonData, setJsonData] = useState({});
  function handleInputChange(event) {
    const { name, value } = event.target;
    setJsonData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }
*/
  }
  // const [inputValue, setInputValue] = useState('');  //

  // const handleChange = (event) => {
  //   setInputValue(event.target.value);
  // };
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setData({
  //     ...data,
  //     email: inputValue
  //   });
  //   //console.log(data);
  //   setInputValue(''); // Reset the input value state
  // };

  const [variableName, changevariableName] = useState(null);
  const handleVariableclick = (keys) => {
    changevariableName(keys);
  };
  //const takevalue = ()=> {

  // var output = document.getElementById("input").value;
  // console.log({output})
  //}

  // const initialValues = {
  //     "assets": [

  //     ],
  //     "pipeline": [{
  //         "pipelineID": "",
  //         "stage_job_map":{

  //         },
  //         "no_of_stages":"",
  //         "job_list":[{
  //                 "stage":"",
  //                 "job": "",
  //                 "packageID": "",
  //                 "metadata": {},
  //                 "input_data":{

  //                 }}],
  //         "metadata": {
  //             "action": "create",
  //             "revert_to": 1
  //         }
  //     }]
  // };
  const [tempassetID, settempassetid] = useState("");
  const handleassetidinput = (event) => {
    const value = event.target.value;
    settempassetid(value);
    console.log(tempassetID);

    // if(tempinputValues){
    //   handleChangeinput(tempinputValues)
    // }
  };
  const [tempinputValues, settempInputValues] = useState([]);
  const handletemporaryinput = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    settempInputValues((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // if(tempinputValues){
    //   handleChangeinput(tempinputValues)
    // }
  };
  useEffect(() => {
    console.log(tempinputValues);
  }, [tempinputValues]);

  const [temp3inputValues, settemp3InputValues] = useState({ assets: [] });
  const [inputValues, setInputValues] = useState({
    assets: [],
    pipeline: [
      {
        pipelineID: "",
        stage_job_map: {},
        no_of_stages: "",
        job_list: [
          {
            stage: "",
            job: "",
            packageID: "",
            metadata: {},
            input_data: [],
          },
        ],
        metadata: {
          action: "create",
          revert_to: 1,
        },
      },
    ],
  });
  const [temp2inputValues, settemp2InputValues] = useState({
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
  const [functiontemp2inputValues, setfunctiontemp2InputValues] = useState({
    stage: "1",
    job: "2",
    packageID: "",
    metadata: {},
    input_data: [],
  });

  const [functiontemp3inputValues, setfunctiontemp3InputValues] = useState({
    pipelineID: "",
    stage_job_map: {},
    no_of_stages: "",
    job_list: [],
    metadata: {
      action: "create",
      revert_to: 1,
    },
  });

  const [functiontemp4inputValues, setfunctiontemp4InputValues] = useState({});
  const shouldRunEffectRef = useRef(false);
  function handlesaveinput(tempinputValues, schema /*tempassetID*/) {
    // const { id, value } = event.target;
    // const valuesArray = Array.isArray(tempinputValues) ? tempinputValues : [tempinputValues];
    shouldRunEffectRef.current = true;
    console.log(tempinputValues);
    // var Validator = require("jsonschema").Validator;
    // var v = new Validator();
    // if(data){
    // var schema = data.input_parameters['json-schema'];
    // console.log(schema);
    // }
    
    // const assetindex = inputValues.findIndex(file => file.assets.assetID === tempassetID);

    // //const matchingPackage= tempinputValues.tempinputValues.pipeline.job_list.find(job_list => job_list.functionID ===id)
    // if (assetindex !== -1) {
    //   // Clone the target node to avoid modifying the state directly
    //   const updatedNode = { ...nodes[assetindex] };
    
    //   // Add a key-value pair to the node's data where the key is a string and the value is a JSON object
    //   updatedNode.input = tempinputValues;
      
    //   // Create a new nodes array with the updated node
    //   const updatedNodes = [...nodes];
    //   updatedNodes[assetindex] = updatedNode;
    
    //   // Update the nodes state with the new array
    //   setNodes(updatedNodes);
    //   console.log(nodes);
    // }else{
    //   console.log("not matched");
    // }

    // console.log(v.validate(tempinputValues, schema));
    // var validationout = v.validate(tempinputValues, schema);

    if (data) {
      if (data["resource-type"] == "asset") {
        settemp2InputValues((prevValues) => ({
          ...prevValues,
          packageID: data.package_json.packageID,
          input: [...prevValues.input, tempinputValues],
          assetID: tempassetID,
        }));
      }
      if (data["resource-type"] == "function") {
        setfunctiontemp2InputValues((prevValues) => ({
          ...prevValues,
          packageID: data.package_json.packageID,
          input_data: [...prevValues.input_data, tempinputValues],
        }));
      }
    }

    //  console.log(JSON.stringify(inputValues));
  }

  useEffect(() => {
    if (shouldRunEffectRef.current) {
      console.log(temp2inputValues);
      getNodeByAssetIDSaving(temp2inputValues.assetID,temp2inputValues);

      handleChangeassetinput(temp2inputValues);
    }
  }, [temp2inputValues]);
  useEffect(() => {
    if (shouldRunEffectRef.current) {
      console.log(functiontemp2inputValues);
      handleChangefunctioninput(functiontemp2inputValues);
    }
  }, [functiontemp2inputValues]);

  function handleChangeassetinput(temp2inputValues) {
    shouldRunEffectRef.current = true;
    settemp3InputValues((prevValues) => ({
      ...prevValues,

      assets: [...prevValues.assets, temp2inputValues],
    }));
  }
  useEffect(() => {
    if (shouldRunEffectRef.current) {
      console.log(temp3inputValues);
      handleChangeinput(temp3inputValues);
    }
  }, [temp3inputValues]);

  function handleChangefunctioninput(functiontemp2inputValues) {
    shouldRunEffectRef.current = true;
    setfunctiontemp3InputValues((prevValues) => ({
      ...prevValues,

      job_list: [...prevValues.job_list, functiontemp2inputValues],
    }));
  }

  useEffect(() => {
    if (shouldRunEffectRef.current) {
      console.log(functiontemp3inputValues);
      handleChangefunction2input(functiontemp3inputValues);
    }
  }, [functiontemp3inputValues]);

  function handleChangefunction2input(functiontemp3inputValues) {
    shouldRunEffectRef.current = true;
    setfunctiontemp4InputValues({
      pipeline: functiontemp3inputValues,
    });
  }
  useEffect(() => {
    if (shouldRunEffectRef.current) {
      console.log(functiontemp4inputValues);
      handleChangeinput(functiontemp4inputValues);
    }
  }, [functiontemp4inputValues]);

  function handleChangeinput(tempinputValues) {
    shouldRunEffectRef.current = true;
    // const { id, value } = event.target;
    console.log("last function");
    // const valuesArray = Array.isArray(tempinputValues) ? tempinputValues : [tempinputValues];
    if (data) {
      if (data["resource-type"] == "asset") {
        setInputValues((prevValues) => ({
          ...prevValues,

          ...tempinputValues,
        }));
      }
      if (data["resource-type"] == "function") {
        setInputValues((prevValues) => ({
          ...prevValues,
          tempinputValues,
        }));
      }
    }

    //  console.log(JSON.stringify(inputValues));
    shouldRunEffectRef.current = false;
  }

  useEffect(() => {
    console.log(inputValues);
  }, [inputValues]);

  function handleSubmit(event) {
    event.preventDefault();

    // console.log(v.validate(inputValues, schema));
    // if((validationout.errors).length >= 1){
    //   console.log(v.validate(inputValues, schema));
    // }else{
    //const socket = io("http://localhost:30007/");
    //socket.emit("event-name", inputValues);
    // }
  }

  // var Validator = require('jsonschema').Validator;
  // var v = new Validator();
  // if(data){
  // var schema = data.input_parameters['json-schema'];
  // }
  // console.log(v.validate(inputValues, schema));
  // var validationout = v.validate(inputValues, schema);
  

  function ObjectTypeFields(
    value,
    handleVariableclick,
    tempinputValues,
    handletemporaryinput
  ) {
    return (
      <div>
        {Object.entries(value).map(([keys, value]) => (
          <div className="p-0">
            {value instanceof Object ? (
              <>
                <div
                  className="vr my-2 border-botom-2 w-full bg-blue-400 border-black  rounded-lg p-2 flex "
                  onClick={(event) => {
                    handleVariableclick(keys);
                  }}
                >
                  <h1 className="w-1/3 text-center m-auto cursor-text">
                    {keys}
                  </h1>
                  <h1 className="w-1/3"></h1>
                  <h1 className="w-1/3"></h1>
                </div>

                {ObjectTypeFields(
                  value,
                  handleVariableclick,
                  tempinputValues,
                  handletemporaryinput
                )}
              </>
            ) : (
              <div
                className="vr my-2 border-botom-2 w-full bg-blue-300 border-black  rounded-lg p-2 flex "
                onClick={(event) => {
                  handleVariableclick(keys);
                }}
              >
                <h1 className="w-1/3 text-center m-auto cursor-text">{keys}</h1>
                <h1 className="w-1/3 text-center m-auto">:</h1>

                <h1 className="w-1/3 text-center m-auto">
                  <div
                    className="   w-full h-10 bg-slate-100 rounded-lg align-top border-2"
                    style={{ display: "flex" }}
                  >
                    <input
                      className="bg-sky-100 w-full text-center"
                      id={keys}
                      type="text"
                      placeholder="Type Here"
                      value={tempinputValues[keys] || ""}
                      onChange={handletemporaryinput}
                    />
                  </div>
                </h1>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  function renderMandatoryInputFields(
    data,
    handleVariableclick,
    tempinputValues,
    handletemporaryinput,
    NodeVariableData
  ) {
    if(NodeVariableData){
    console.log(NodeVariableData)}
    return (
      <div>
        {Object.entries(data.input_parameters.template).map(([keys, value]) => (
          <div className="p-0">
            {value instanceof Object ? (
              <>
                <div
                  className="vr my-2 border-botom-2 w-full bg-blue-400 border-black  rounded-lg p-2 flex "
                  onClick={(event) => {
                    handleVariableclick(keys);
                  }}
                >
                  <h1 className="w-1/3 text-center m-auto cursor-text">
                    {keys}
                  </h1>
                  <h1 className="w-1/3"></h1>
                  <h1 className="w-1/3"></h1>
                </div>

                {ObjectTypeFields(
                  value,
                  handleVariableclick,
                  tempinputValues,
                  handletemporaryinput
                )}
              </>
            ) : (
              <div className="p-0">
                <div
                  className="vr my-2 border-botom-2 w-full border-black bg-blue-400 rounded-lg p-2 flex "
                  onClick={(event) => {
                    handleVariableclick(keys);
                  }}
                >
                  <h1 className="w-1/3 text-center m-auto cursor-text">
                    {keys}
                    {/* {keys === "SecurityGroupIngress" ? console.log(typeof keys) : null} */}
                  </h1>
                  <h1 className="w-1/3 text-center m-auto">:</h1>
                  <h1 className="w-1/3 text-center m-auto">
                    <div
                      className="w-full h-10 bg-slate-100 rounded-lg align-top border-2"
                      style={{ display: "flex" }}
                    >
                      <input
                        className="bg-sky-100 w-full text-center"
                        id={keys}
                        type="text"
                        placeholder="Type Here"
                        defaultValue={ NodeVariableData[keys]  || tempinputValues[keys] || ""}
                        //value={tempinputValues[keys] || ""}
                        onChange={handletemporaryinput}
                      />
                    </div>
                  </h1>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  function renderOptionalInputFields(
    data,
    handleVariableclick,
    tempinputValues,
    handletemporaryinput,
    tempassetID,
    nodes
  ) {
    const targetNode = nodes.find(node => node.data.nodeData.uuid === tempassetID);
    
    if(targetNode.data.variables){
        setNodeVariableData(targetNode.data.variables)
    }
    return (
      <div>
        {Object.entries(data.input_parameters.optional).map(([keys, value]) => (
          <div className="p-0">
            {value instanceof Object ? (
              <>
                <div
                  className="vr my-2 border-botom-2 w-full bg-blue-400 border-black  rounded-lg p-2 flex "
                  onClick={(event) => {
                    handleVariableclick(keys);
                  }}
                >
                  <h1 className="w-1/3 text-center m-auto cursor-text">
                    {keys}
                  </h1>
                  <h1 className="w-1/3"></h1>
                  <h1 className="w-1/3"></h1>
                </div>

                {ObjectTypeFields(
                  value,
                  handleVariableclick,
                  tempinputValues,
                  handletemporaryinput
                )}
              </>
            ) : (
              <div className="p-0">
                <div
                  className="vr my-2 border-botom-2 w-full border-black bg-blue-400 rounded-lg p-2 flex "
                  onClick={(event) => {
                    handleVariableclick(keys);
                  }}
                >
                  <h1 className="w-1/3 text-center m-auto cursor-text">
                    {keys}
                    {/* {keys === "SecurityGroupIngress" ? console.log(typeof keys) : null} */}
                  </h1>
                  <h1 className="w-1/3 text-center m-auto">:</h1>
                  <h1 className="w-1/3 text-center m-auto">
                    <div
                      className="w-full h-10 bg-slate-100 rounded-lg align-top border-2"
                      style={{ display: "flex" }}
                    >
                      <input
                        className="bg-sky-100 w-full text-center"
                        id={keys}
                        type="text"
                        placeholder="Type here"
                        value={tempinputValues[keys] || ""}
                        onChange={handletemporaryinput}
                      />
                    </div>
                  </h1>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  function generateUUID (){
    const id = uuidv4();
    settempassetid(id);
    return id;
  }
 const [click,setclick]=useState(false);
  return (
    <>
      <div className="grid-container grid grid-rows-3 gap-0 h-full">
        <div className={` cont h-[40vh]  ${open ? "w-[81vw]" : "w-[92vw]"}  `}>
          <div className="flex-item h-full  flex-row flex-1 p-0">
            <ReactFlowProvider>
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

              <div
                className="dropbox ml-5 mt-5  w-5/6  bg-slate-300 rounded-lg border-2 shadow-[0px_0px_5px_3px_rgba(102,178,255,0.8)]"
                ref={reactFlowWrapper}
              >
                {/* {!data ? (<h1 className="text-center m-auto w-full h-full pt-[20vh]  border-2 rounded-lg align-items-center bg-slate-300 text-4xl cursor-text ">DROP RESOURCES HERE TO CREATE PIPELINE</h1>) : (null)} */}

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
          </div>
        </div>
        <div className={`mt-0 h-[43vh] pt-0 flex `}>
          <div
            /*className={`rf ml-5 mt-5 w-3/6  align-top ${
              !data ? "shadow-[0px_0px_5px_3px_rgba(102,178,255,0.8)]" : ""
            } `}*/
            className="rf ml-5 mt-5 w-3/6  align-top shadow-[0px_0px_5px_3px_rgba(102,178,255,0.8)]"
          >
            {!data && (
              <h1
                className="text-center m-auto w-full h-full  border-2 rounded-lg align-items-center bg-slate-300 text-4xl cursor-text"
                style={{
                  display: "grid",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                VARIABLES
              </h1>
            )}

            {data  && (
              <>
                {/*console.log(data.input_parameters["json_schema"])*/}
                <form onSubmit={handleSubmit} className="w-full h-full">
                  <div className="h-full shadow-[0px_0px_5px_3px_rgba(102,178,255,0.8)]">
                    <h1 className="text-center pt-2 rounded-lg h-[50px] bg-gray-900 text-white text-2xl sticky ">
                      VARIABLE INPUT
                    </h1>

                    <div
                      className="grid m-auto mt-0 h-full border-2 text-center w-full bg-slate-300  cursor-text rounded-lg shadow-[0px_0px_5px_3px_rgba(102,178,255,0.8)] "
                      style={{
                        display: "grid",
                        overflowY: "scroll",
                        height: "calc(100% - 50px)",
                      }}
                    >
                      {/* {JSON.stringify(data.input_parameters)} */}
                      <div className="vr my-2 border-botom-2 w-full bg-blue-600 border-black  rounded-lg p-2 flex ">
                        <h1 className="w-full h-full text-white text-center m-auto cursor-text">
                          MANDATORY VARIABLES
                        </h1>
                      </div>
                      {data["resource-type"] == "asset" ? (
                        <div className="vr my-2 border-botom-2 w-full border-black bg-blue-400 rounded-lg p-2 flex ">
                          <h1 className="w-1/3 text-center m-auto cursor-text">
                            assetID
                          </h1>
                          <h1 className="w-1/3 text-center m-auto">:</h1>

                          <h1 className="w-1/3 text-center m-auto">
                            <div
                              className="   w-full h-10 bg-slate-100 rounded-lg align-top border-2"
                              style={{ display: "flex" }}
                            >
                              <input
                                className="bg-sky-100 w-full text-center overflow-scroll"
                                value={tempassetID }
                                type="text"
                                onInput={handleassetidinput}
                                readOnly
                              />
                            </div>
                          </h1>
                        </div>
                      ) : null}

                      {renderMandatoryInputFields(
                        data,
                        handleVariableclick,
                        tempinputValues,
                        handletemporaryinput,
                        NodeVariableData
                      )}

                      {/*optional variable*/}
                      <div className="vr my-2 border-botom-2 w-full bg-blue-600 border-black  rounded-lg p-2 flex ">
                        <h1 className="w-full h-full text-center text-white m-auto cursor-text">
                          OPTIONAL VARIABLES
                        </h1>
                      </div>

                      {/*{renderOptionalInputFields(
                        data,
                        handleVariableclick,
                        tempinputValues,
                        handletemporaryinput,
                        tempassetID,
                        nodes
                      )}*/}
                      <div className="vr my-2 border-botom-2 w-full border-black bg-blue-400 rounded-lg p-2 flex ">
                        <h1 className="w-1/3 text-center m-auto cursor-text">
                          Policy ID
                        </h1>
                        <h1 className="w-1/3 text-center m-auto">:</h1>

                        <h1 className="w-1/3 text-center m-auto">
                          <div
                            className="   w-full h-10 bg-slate-100 rounded-lg align-top border-2"
                            style={{ display: "flex" }}
                          >
                            {/* <input
                              className="bg-sky-100 w-full text-center"
                              value={tempassetID}
                              type="text"
                              placeholder="Type Here"
                              onChange={handleassetidinput}
                            /> */}
                          </div>
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <button
                      className="h-9 pb-2 mr-5 text-white bg-rose-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-sky-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() =>
                        handlesaveinput(
                          tempinputValues,
                          data.input_parameters["json_schema"]
                          // tempassetID
                        )
                      }
                    >
                      NEXT
                    </button>
                    <button
                      className="h-9 pb-2 text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-sky-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="submit"
                    >
                      Submit Pipeline
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
          <div
            className="rf ml-5 mt-5 w-3/6  align-top shadow-[0px_0px_5px_3px_rgba(102,178,255,0.8)]"
            style={{ display: "grid" }}
          >
            {!data && (
              <h1
                className="text-center m-auto w-full h-full  border-2 rounded-lg align-items-center bg-slate-300 text-4xl cursor-text"
                style={{
                  display: "grid",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                LOGS
              </h1>
            )}

            {/* {data && (

              <EventLog></EventLog>
            )} */}
            {/* {data && (
              <>
                <h1 className="text-center pt-2 rounded-lg  bg-gray-900 text-white text-2xl sticky">
                    LOGS
                </h1>
              <div className="variable-list-inner w-full   border-2 cursor-text rounded-lg "
              style={{ display: "grid", overflowY: "scroll" }}>
                {JSON.stringify(data.input_parameters)}
                
                
                {Object.entries(data.input_parameters).map(([keys, value]) => (
                  <>
                    {value.type == "string" ? (
                    <div className="vr  text-center border-botom-2 w-full border-black  rounded-lg " onClick={(event) =>{handleVariableclick(keys)}}>
                      
                      <h1 className="w-full h-full text-center  cursor-text" style={{ display: "grid", justifyContent: "center", alignItems: "center"}}>
                        {keys}
                      </h1>
                      
                     

                    </div>) : (null)}
                    {value.type == "[dict]" ? (
                    <div className="my-2 border-2 w-full border-black bg-green-300 rounded-lg p-2 flex "> 
                      
                      <h1 className="w-1/3 text-center m-auto cursor-text">
                        {keys}
                      </h1 >
                      <h1 className="w-1/3 text-center m-auto">
                        :
                      </h1>
                      <h1 className="w-1/3 text-center m-auto">
                        Type={value.type}<br></br>
                        
                        Required={value.required =="true" ? "TRUE" : "FALSE"}
                        



                      </h1>

                    </div>) : (null)}
                    

                    
                  </>
                ))}
                
                
              </div>
              
              </>
            )} */}
            {/* <form onSubmit={handleSubmit}> 
            <div
              className="   w-full h-40 bg-slate-100 rounded-lg align-top border-2"
              style={{ display: "flex", overflowY: "scroll" }}
            >
              <label className="w-full">
                {variableName}
              <input className="bg-sky-100 w-full" type="text" value={inputValue} onChange={handleChange} />
              </label>
              <button type="submit">Submit</button>
            </div>
            </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Resources;
