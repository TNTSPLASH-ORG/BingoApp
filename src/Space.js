import React from "react";

export default function Space(props) {
  return (
    <div
      class="space" 
      key={props.id} 
      onClick={() => props.toggleBackground(props.id)}
      style={{backgroundColor: props.backgroundColor, cursor: "pointer"}}
      onMouseOver={(event) => event.target.style.backgroundColor = "#4CAF50"}
      onMouseLeave={(event) => event.target.style.backgroundColor = props.backgroundColor}
      >
      {props.num}
    </div>
  );
}
