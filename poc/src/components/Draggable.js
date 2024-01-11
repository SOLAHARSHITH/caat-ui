// Draggable.js
import React from "react";

const Draggable = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, type: "draggable" }, // Specify the type property as 'draggable'
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="draggable"
    >
      {text}
    </div>
  );
};

export default Draggable;
