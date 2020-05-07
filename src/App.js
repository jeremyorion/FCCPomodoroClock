import React, { Component } from 'react';
import './App.css';
import BreakSettings from './Components/BreakSettings';
import SessionSettings from './Components/SessionSettings';
import Timer from './Components/Timer';



class App extends Component {
  constructor(){
    super();
    this.state={
      breakLength: 300,
      sessionLength: 1500,
      timeRemaining: 1500,
      clockisRunning: false,
      whichTimer: 'Session'
    }

    this.handleClick = this.handleClick.bind(this);
    this.timer = this.timer.bind(this);
  }

  handleIncrement(target) {
    const incrementValue = 60;
    const maxLength = 3600;

    let incrementedBreakLength = this.state.breakLength + incrementValue;
    let incrementedSessionLength = this.state.sessionLength + incrementValue;
    let incrementedTimeRemaining = this.state.timeRemaining + incrementValue;

    switch(target){
      case 'break':
        if (this.state.breakLength < maxLength) {
          this.setState({
            breakLength: incrementedBreakLength
          });
        }
        break;
      case 'session':
        if (this.state.sessionLength < maxLength) {
          this.setState({
            sessionLength: incrementedSessionLength,
            timeRemaining: incrementedTimeRemaining
          });
        }
        break;
      default:
        console.log('Something went wrong')
    }
  }

  handleDecrement(target) {

    const decrementValue = 60;
    const minLength = 60;

    let decrementedBreakLength = this.state.breakLength - decrementValue;
    let decrementedSessionLength = this.state.sessionLength - decrementValue;
    let decrementedTimeRemaining = this.state.timeRemaining - decrementValue;

    switch(target){
      case 'break':
        if(this.state.breakLength > minLength){
          this.setState({
            breakLength: decrementedBreakLength
          });
        }
        break;
      case 'session':
        if(this.state.sessionLength > minLength) {
          this.setState({
            sessionLength: decrementedSessionLength,
            timeRemaining: decrementedTimeRemaining
          });
        }
        break;
      default:
        console.log('Something went wrong')
    }
  }

  componentDidMount(){
   setInterval(this.timer, 1000);
  }

  timer() {
    let newTimeRemaining = this.state.timeRemaining - 1;
    if (this.state.clockisRunning && newTimeRemaining > 0)
      {this.setState({timeRemaining: newTimeRemaining})}
      else if (this.state.clockisRunning && newTimeRemaining === 0){
        this.setState({timeRemaining: newTimeRemaining});
        this.chime();
      } 
    else if (this.state.clockisRunning && newTimeRemaining < 0)
      {
        this.timerSwap();
      }
    else {clearInterval(this.timer)}
  }

  chime() {
    const audio = document.getElementById('beep');
    audio.currentTime=0;
    audio.play();
  }

  timerSwap(){

    if(this.state.whichTimer === 'Session'){
      let newTimer = 'Break';
      let newTimeRemaining = this.state.breakLength;
      this.setState({
        whichTimer: newTimer,
        timeRemaining: newTimeRemaining
      })
    } else {
      let newTimer = 'Session';
      let newTimeRemaining = this.state.sessionLength;
      this.setState({
        whichTimer: newTimer,
        timeRemaining: newTimeRemaining
      })
    }
  }

  handleStopStart(){
    if (this.state.clockisRunning){
      this.setState({
        clockisRunning: false
      });
    } else {
      this.setState({
        clockisRunning: true
      })
    }    
  }

  handleFullReset() {
    const audio = document.getElementById('beep');
    audio.currentTime=0;
    audio.pause();
    this.setState({
      clockisRunning: false,
      breakLength: 300,
      sessionLength: 1500,
      timeRemaining: 1500,
      whichTimer: 'Session'
    })
  }

  handleClick(event){

    switch(event.target.id) {
      case 'break-decrement':
        if(!this.state.clockisRunning){
          this.handleDecrement('break');
        }
        break;
      case 'break-increment':
        if(!this.state.clockisRunning){
          this.handleIncrement('break');
        }
        break;
      case 'session-decrement':
        if(!this.state.clockisRunning){
          this.handleDecrement('session');
        }
        break;
      case 'session-increment':
        if(!this.state.clockisRunning){
          this.handleIncrement('session');
        }
        break;
      case 'start_stop':
        this.handleStopStart();
        break;
      case 'reset':
        this.handleFullReset();
        break;
      default:
        console.log(event.target)
    }
  }
  
  render() {
    return (
      <div className="App">
        <BreakSettings 
          break_length={this.state.breakLength / 60} 
          handleClick={this.handleClick} 
        />

        <SessionSettings 
          session_length={this.state.sessionLength / 60} 
          handleClick={this.handleClick}
        />
        
        <Timer 
          minutes={Math.floor(this.state.timeRemaining / 60)} 
          seconds={ this.state.timeRemaining % 60} 
          handleClick={this.handleClick}
          whichTimer={this.state.whichTimer}
        />
      </div>
    );
  }
}


export default App;
