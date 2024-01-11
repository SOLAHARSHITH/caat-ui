// import React, { useState } from "react";
// import { useDrag, useDrop } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";

// const ItemTypes = {
//   CARD: "card",
// };

// const Card = ({ id, text, index, moveCard }) => {
//   const ref = React.useRef(null);

//   const [, drop] = useDrop({
//     accept: ItemTypes.CARD,
//     hover(item, monitor) {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;

//       if (dragIndex === hoverIndex) {
//         return;
//       }

//       moveCard(dragIndex, hoverIndex, item.id);

//       item.index = hoverIndex;
//     },
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: ItemTypes.CARD,
//     item: { id, index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   const opacity = isDragging ? 0.5 : 1;

//   drag(drop(ref));

//   return (
//     <div ref={ref} style={{ opacity }}>
//       {text}
//     </div>
//   );
// };

// const DropBox = () => {
//   const [droppedCards, setDroppedCards] = useState([]);

//   const [, drop] = useDrop({
//     accept: ItemTypes.CARD,
//     drop(item) {
//       const { id, text } = item;
//       const newDroppedCard = { id, text };
//       setDroppedCards((prevCards) => [...prevCards, newDroppedCard]);
//     },
//   });

//   return (
//     <div ref={drop} style={{ border: "1px dashed black", padding: "10px" }}>
//       <h2>Drop Box</h2>
//       <div style={{ minHeight: "100px" }}>
//         {droppedCards.map((card) => (
//           <div
//             key={card.id}
//             style={{ margin: "10px", background: "lightgray", padding: "5px" }}
//           >
//             {card.text}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const Container = () => {
//   const [cards, setCards] = useState([
//     { id: 1, text: "Card 1" },
//     { id: 2, text: "Card 2" },
//     { id: 3, text: "Card 3" },
//   ]);

//   const moveCard = (dragIndex, hoverIndex, id) => {
//     const draggedCard = cards.find((card) => card.id === id);
//     const updatedCards = cards.filter((card) => card.id !== id);

//     updatedCards.splice(hoverIndex, 0, draggedCard);

//     setCards(updatedCards);
//   };

//   return (
//     <div>
//       <DropBox />
//       <div style={{ marginTop: "20px" }}>
//         {cards.map((card, index) => (
//           <Card
//             key={card.id}
//             id={card.id}
//             text={card.text}
//             index={index}
//             moveCard={moveCard}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function ContainerFinal() {
//   return (
//     <div className="App">
//       <Container />
//     </div>
//   );
// }
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  CARD: "card",
};

const Card = ({ id, text, index, moveCard }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(dragIndex, hoverIndex, item.id);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.5 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }}>
      {text}
    </div>
  );
};

const DropBox = () => {
  const [droppedCards, setDroppedCards] = useState([]);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop(item) {
      const { id, text } = item;
      const newDroppedCard = { id, text };
      setDroppedCards((prevCards) => [...prevCards, newDroppedCard]);
    },
  });

  return (
    <div ref={drop} style={{ border: "1px dashed black", padding: "10px" }}>
      <h2>Drop Box</h2>
      <div style={{ minHeight: "100px" }}>
        {droppedCards.map((card) => (
          <div
            key={card.id}
            style={{ margin: "10px", background: "lightgray", padding: "5px" }}
          >
            {card.text}
          </div>
        ))}
      </div>
    </div>
  );
};

const Container = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Card 1" },
    { id: 2, text: "Card 2" },
    { id: 3, text: "Card 3" },
  ]);

  const moveCard = (dragIndex, hoverIndex, id) => {
    const draggedCard = cards.find((card) => card.id === id);
    const updatedCards = cards.filter((card) => card.id !== id);

    updatedCards.splice(hoverIndex, 0, draggedCard);

    setCards(updatedCards);
  };

  return (
    <div>
      <DropBox />
      <div style={{ marginTop: "20px" }}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            text={card.text}
            index={index}
            moveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
};

export default function ContainerFinal() {
  return (
    <div className="App">
      <Container />
    </div>
  );
}
