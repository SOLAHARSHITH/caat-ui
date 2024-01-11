function App() {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [nextNodeId, setNextNodeId] = useState(1);
    const [nextJobId, setNextJobId] = useState(1);
  
    const handleConnect = (params) => {
      const { source, target } = params;
  
      const sourceNode = nodes.find((node) => node.id === source);
      const targetNode = nodes.find((node) => node.id === target);
  
      if (sourceNode && targetNode) {
        const sourceJobId = sourceNode.data.job_id;
        const targetJobId = targetNode.data.job_id;
  
        if (sourceJobId >= targetJobId) {
            SwapNodes(sourceNode,targetNode);
         
        }
  
        const newEdge = {
          id: `edge-${source}-${target}`,
          source,
          target,
          type: 'smoothstep',
        };
  
        setEdges((prevEdges) => prevEdges.concat(newEdge));
      }
    };

const SwapNodes=(sourceNode,targetNode)=>{
    const updatedSourceNode = {
        ...sourceNode,
        data: { ...sourceNode.data, job_id: targetJobId ,label: `${targetJobId}`},
        id: `${targetJobId}`
      };
      

      const updatedTargetNode = {
        ...targetNode,
        data: { ...targetNode.data, job_id: sourceJobId ,label: `${sourceJobId}`},
        id: `${sourceJobId}` 
      };

      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === updatedSourceNode.id
            ? updatedSourceNode
            : node.id === updatedTargetNode.id
            ? updatedTargetNode
            : node
        )
      );
      SourceCorrection(updatedSourceNode.id);
      TargetCorrection(updatedTargetNode.id);


}
    const getSourceNodes = (nodeId) => {
        const sourceNodeIds = edges
          .filter((edge) => edge.target === nodeId)
          .map((edge) => parseInt(edge.source, 10)); // Parse the IDs as integers
      
        return sourceNodeIds;
      };
      const getTargetNodes = (nodeId) => {
        const targetNodeIds = edges
          .filter((edge) => edge.source === nodeId)
          .map((edge) => parseInt(edge.target, 10)); // Parse the IDs as integers
      
        return targetNodeIds;
      };
      

    const SourceCorrection =(id)=>{
        const Required_Node = nodes.find(node => node.id === id);
        if (Required_Node) {
            const sourceNodes = getSourceNodes(id);
            console.log(`Source nodes attached to ${id}:`, sourceNodes);
        
            const targetNodes = getTargetNodes(id);
            console.log(`Target nodes attached to ${id}:`, targetNodes);

            if (sourceNodes.length > 0) {
                const maxSourceNodeId = Math.max(...sourceNodes);
                if (maxSourceNodeId > parseInt(id, 10)) {
                  const maxSourceNode = nodes.find((node) => node.id === maxSourceNodeId.toString());
                  console.log('Max source node with ID:', maxSourceNode);
                  SwapNodes(maxSourceNode,Required_Node);
                  // ... rest of your logic
                }else{
                    return
                }
              }else{
                return
            }
          }

    }
    const TargetCorrection =(id)=>{
        const Required_Node = nodes.find(node => node.id === id);
        if (Required_Node) {
            const sourceNodes = getSourceNodes(id);
            console.log(`Source nodes attached to ${id}:`, sourceNodes);
        
            const targetNodes = getTargetNodes(id);
            console.log(`Target nodes attached to ${id}:`, targetNodes);

            if (targetNodes.length > 0) {
                const mintargetNodeId = Math.min(...targetNodes);
                if (mintargetNodeId < parseInt(id, 10)) {
                  const mintargetNode = nodes.find((node) => node.id === mintargetNodeId.toString());
                  console.log('Min target node with ID:', mintargetNode);
                  SwapNodes(Required_Node,mintargetNode);
                  // ... rest of your logic
                }else{
                    return
                }
              }else{
                return
            }
          }

    }
  
  
    const handleDrop = (event) => {
        event.preventDefault();
        const node_id = nextNodeId;
        setNextNodeId((prevNodeId) => prevNodeId + 1);
    
        const job_id = nextJobId;
        setNextJobId((prevJobId) => prevJobId + 1);
    
        // Fetch data for the dropped element
        const elementData = fetchDataForDroppedElement(); // Replace with your fetch logic
    
        const newNode = {
          id: `${job_id}`,
          data: { label: `${job_id}`, job_id, ...elementData },
          position: { x: event.clientX, y: event.clientY },
        };
  
      setNodes((prevNodes) => prevNodes.concat(newNode));
    };
  
    return (
      <div>
        {/* ... rest of your JSX ... */}
        <ReactFlow elements={nodes.concat(edges)} onDrop={handleDrop} onConnect={handleConnect} />
      </div>
    );
  }
  