import React, { useState, useEffect } from 'react';

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(hours * 3600 + minutes * 60 + seconds);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    if (timerRunning) {
      const timer = setInterval(() => {
        if (timeRemaining > 0) {
          setTimeRemaining(timeRemaining - 1);
        } else {
          setTimerRunning(false);
          clearInterval(timer);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerRunning, timeRemaining]);

  const handleStartTimer = () => {
    setTimerRunning(true);
  };

  const handleHoursChange = (e) => {
    var value = parseInt(e.target.value);
    if (value > 2){
      value = 2;
    }
    if (!isNaN(value) && value >= 0 && value <= 2) {
      setHours(value);
    }
  };

  const handleMinutesChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 60) {
      setMinutes(value);
    }
  };

  const handleSecondsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 60) {
      setSeconds(value);
    }
  };  

  const handleSetTimer = () => {
    setTimeRemaining(hours * 3600 + minutes * 60 + seconds);
  };

  const formatTime = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="font-link">{formatTime(timeRemaining)}</div>
        <button onClick={handleSetTimer}>Set Timer</button>
        <input placeholder="Hours" type="number" text={isNaN(hours) ? '' : hours} min="0" max="2" onChange={handleHoursChange} />
        <input placeholder="Minutes" type="number" text={isNaN(minutes) ? '' : minutes} min="0" max="60" onChange={handleMinutesChange} />
        <input placeholder="Seconds" type="number" text={isNaN(seconds) ? '' : seconds} min="0" max="60" onChange={handleSecondsChange} />
    </div>
  );
}

export {handleStartTimer}
export default Timer