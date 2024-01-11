// Droppable.js
import React from "react";

const Droppable = () => {
  const [{ isOver }, drop] = useDrop({
    accept: "draggable", // Specify the same type property as 'draggable'
    drop: () => ({ name: "Droppable" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const backgroundColor = isOver ? "lightgreen" : "white";

  return (
    <div ref={drop} className="droppable" style={{ backgroundColor }}>
      Droppable Area
    </div>
  );
};

export default Droppable;
