import React from 'react';

function Timer(props) {
    return (
        <div id='timer'>
            <p id="timer-label">{props.whichTimer}</p>
    <p id='time-left'>{props.minutes.toString().padStart(2,'0')}:{props.seconds.toString().padStart(2,'0')}</p>
            <button id='start_stop' onClick={props.handleClick}>Play/Pause</button>
            <button id='reset' onClick={props.handleClick}>Reset</button>
            <audio id='beep' src='https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'></audio>
        </div>
    )
}

export default Timer;