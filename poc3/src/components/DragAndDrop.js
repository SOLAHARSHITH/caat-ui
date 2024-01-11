// import React, { useState } from "react";
// import { DndProvider, useDrag } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { useDrop } from "react-dnd";

// const Resource = ({ id, name }) => {
//   const [{ isDragging }, drag] = useDrag({
//     item: { type: "resource", name },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         opacity: isDragging ? 0.5 : 1,
//         cursor: "move",
//         marginBottom: "8px",
//       }}
//     >
//       {name}
//     </div>
//   );
// };

// const Stage = ({ type, resources, onDropResource }) => {
//   const [{ isOver }, drop] = useDrop({
//     accept: "resource",
//     drop: (item) => onDropResource(item.name, type),
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   });

//   return (
//     <div
//       ref={drop}
//       style={{
//         backgroundColor: isOver ? "lightblue" : "lightgray",
//         padding: "8px",
//         marginBottom: "8px",
//       }}
//     >
//       <h2>{type}</h2>
//       <ul>
//         {resources.map((resource, index) => (
//           <li key={index}>{resource}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const StagesJob = () => {
//   const [stage1Resources, setStage1Resources] = useState([]);
//   const [stage2Resources, setStage2Resources] = useState([]);
//   const [stage3Resources, setStage3Resources] = useState([]);

//   const handleDropResource = (resourceName, stageType) => {
//     switch (stageType) {
//       case "Stage 1":
//         setStage1Resources([...stage1Resources, resourceName]);
//         break;
//       case "Stage 2":
//         setStage2Resources([...stage2Resources, resourceName]);
//         break;
//       case "Stage 3":
//         setStage3Resources([...stage3Resources, resourceName]);
//         break;
//       default:
//         break;
//     }
//   };

//   const resources = [
//     { id: 1, name: "Resource 1" },
//     { id: 2, name: "Resource 2" },
//     { id: 3, name: "Resource 3" },
//   ];

//   return (
//     <div style={{ display: "flex" }}>
//       <div style={{ marginRight: "16px" }}>
//         <h2>Resources</h2>
//         {resources.map((resource) => (
//           <Resource key={resource.id} id={resource.id} name={resource.name} />
//         ))}
//       </div>
//       <div>
//         <h2>Stages</h2>
//         <Stage
//           type="Stage 1"
//           resources={stage1Resources}
//           onDropResource={handleDropResource}
//         />
//         <Stage
//           type="Stage 2"
//           resources={stage2Resources}
//           onDropResource={handleDropResource}
//         />
//         <Stage
//           type="Stage 3"
//           resources={stage3Resources}
//           onDropResource={handleDropResource}
//         />
//       </div>
//     </div>
//   );
// };

// const FinalDND = () => {
//   return (
//     <DndProvider backend={HTML5Backend}>
//       <StagesJob />
//     </DndProvider>
//   );
// };

// export default FinalDND;
