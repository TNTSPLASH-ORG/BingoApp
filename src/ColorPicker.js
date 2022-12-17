import React from 'react'
import { GithubPicker } from 'react-color';

export default function ColorPicker(props) {
    return(
        <GithubPicker onChange={props.handleColorPick}/>
    )
}
