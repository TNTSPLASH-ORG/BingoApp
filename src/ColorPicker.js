import React, { useState} from "react";
import { GithubPicker } from "react-color";

function handleClick(renderStatus, setRender) {
    if (renderStatus === true) {
        renderStatus = false
        setRender(false)
    } else {
        renderStatus = true
        setRender(true)
    }
}


function ColorPicker(props) {
  const [hasRender, setRender] = useState(false);
  console.log("ADDCARD", props)
  
  return (
    <>
      <nav style={{ backgroundColor: props.color }}>
        <img
          className="color_icon"
          src={require("./imgs/colorpicker.png")}
          alt="Color Picker Icon"
          style={{ width: "35px", height: "35px" }}
          onClick={() => handleClick(hasRender, setRender)}
        ></img>
        {props.renderNewCardButton && (
          <button
            className="new_card"
            onClick={(props.handleAddContainer)}
          >
            Add Card
          </button>
        )}
      </nav>
      {hasRender && <GithubPicker onChange={props.handleColorPick} />}
    </>
  );
}

export default ColorPicker;