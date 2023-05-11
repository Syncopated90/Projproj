import React, { useState, useEffect } from 'react';

function Timer(props) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(hours * 3600 + minutes * 60 + seconds);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if(props.isBrewingFinished === true){
      setTimerRunning(true)
    }
  }, [props.isBrewingFinished, props.powerStatus])

  useEffect(() => {
    if(props.powerStatus === false){
      setTimerRunning(false)
      setTimeRemaining(600);
    }
  }, [props.powerStatus])

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        if (timeRemaining > 0) {
          setTimeRemaining(timeRemaining - 1);
        } else {
          setTimerRunning(false);
          clearInterval(timer);
          props.turnedOn()
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerRunning, timeRemaining]);

  const handleHoursChange = (e) => {
    var value = parseInt(e.target.value);
    if((value === '')){
      value = 0;
    }
    if (value > 2){
      value = 2;
    }
    if (!isNaN(value) && value >= 0 && value <= 2) {
      setHours(value);
    }
  };

  const handleMinutesChange = (e) => {
    const value = parseInt(e.target.value);
    if((value === '')){
      value = 0;
    }
    if (!isNaN(value) && value >= 0 && value <= 60) {
      setMinutes(value);
    }
  };

  const handleSecondsChange = (e) => {
    const value = parseInt(e.target.value);
    if(value === ''){
      value = 0;
    }
    if (!isNaN(value) && value >= 0 && value <= 60) {
      setSeconds(value);
    }
  };  

  const handleSetTimer = () => {
    var totalHours = parseInt(document.getElementById('hours').value) || 0;
    var totalMinutes = parseInt(document.getElementById('minutes').value) || 0;
    var totalSeconds = parseInt(document.getElementById('seconds').value) || 0;
    if (totalHours > 2){
      totalHours = 2
    }
    if (totalHours < 0){
      totalHours = 0
    }
    if (totalMinutes > 60){
      totalMinutes = 60
    }
    if (totalMinutes < 0){
      totalMinutes = 0
    }
    if (totalSeconds > 60){
      totalSeconds = 60
    }
    if (totalSeconds < 0){
      totalSeconds = 0
    }
    setTimeRemaining(totalHours * 3600 + totalMinutes * 60 + totalSeconds);
  };


  const formatTime = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  return (
    <div>
      <div className='site-text'>Keep coffee warm for:</div>
      <div className="timer">{formatTime(timeRemaining)}</div>
      <button disabled={timerRunning || props.powerStatus} className={timerRunning || props.powerStatus ? 'timer-button disabled' : 'timer-button'} onClick={handleSetTimer}>Set Timer</button>
      <input disabled={timerRunning || props.powerStatus} className={timerRunning || props.powerStatus ? 'timer-input disabled' : 'timer-input'} id="hours" placeholder="Hour" type="number" min="0" max="2" onChange={handleHoursChange} />
      <input disabled={timerRunning || props.powerStatus} className={timerRunning || props.powerStatus ? 'timer-input disabled' : 'timer-input'} id="minutes" placeholder="Min" type="number" min="0" max="60" onChange={handleMinutesChange} />
      <input disabled={timerRunning || props.powerStatus} className={timerRunning || props.powerStatus ? 'timer-input disabled' : 'timer-input'} id="seconds" placeholder="Sec" type="number" min="0" max="60" onChange={handleSecondsChange} />
    </div>
  );
}

export default Timer