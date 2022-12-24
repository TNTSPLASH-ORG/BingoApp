import React from 'react'
import Container from "./Container";
import ColorPicker from "./ColorPicker";

// const [bingocard, setBingoCard] = useState(() => {
//   const storedbingo = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
//   if (storedbingo) {
//     return storedbingo;
//   } else {
//     return [];
//   }
// });

// useEffect(() => {
//   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bingocard));
// }, [bingocard]);

function ParentContainer(props) {
  return (
    <>
      <ColorPicker
        style={{ marginleft: "0.35em" }}
        color={props.color}
        handleColorPick={props.handleColorPick}
        renderNewCardButton={props.renderNewCardButton}
        handleAddContainer={props.handleAddContainer}
      />
      <Container
        bingocard={props.bingocard}
        color={props.color}
        handleColorPick={props.handleColorPick}
        toggleBackground={props.toggleBackground}
        handleNewBingo={props.handleNewBingo}
        renderNewCardButton={props.renderNewCardButton}
        handleAddContainer={props.handleAddContainer}
      />
    </>
  );
}

export default ParentContainer;