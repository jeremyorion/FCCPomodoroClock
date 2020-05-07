import React from 'react';

function SessionSettings(props) {
    return (
        <div id='session-settings'>
            <p id="session-label">Session Length</p>
            <p id='session-length'>{props.session_length}</p>
            <button id='session-decrement' onClick={props.handleClick}>-1</button>
            <button id='session-increment' onClick={props.handleClick}>+1</button>
        </div>
    )
}

export default SessionSettings;