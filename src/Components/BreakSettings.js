import React from 'react';

function BreakSettings(props) {
    return (
        <div id='break-settings'>
            <p id='break-label'>Break Length</p>
            <p id='break-length'>{props.break_length}</p>
            <button id='break-decrement' onClick={props.handleClick}>-1</button>
            <button id='break-increment' onClick={props.handleClick}>+1</button>
        </div>
    )
}

export default BreakSettings;