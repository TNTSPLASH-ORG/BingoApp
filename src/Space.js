import React from "react";

export default function Space(props) {
  return (
    <div 
      key={props.id} 
      onClick={() => props.toggleBackground(props.id)}
      style={{backgroundColor: props.backgroundColor}}
      >
      {props.num}
    </div>
  );
}
