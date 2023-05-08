import React, { useState, useEffect } from 'react';

function Timer() {
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(minutes * 60 + seconds);
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

  const handleResetTimer = () => {
    setTimeRemaining(minutes * 60 + seconds);
    setTimerRunning(false);
  };

  const handleStartStopTimer = () => {
    setTimerRunning(!timerRunning);
  };

  const handleMinutesChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 60) {
      setMinutes(value);
      setTimeRemaining(value * 60 + seconds);
    }
  };

  const handleSecondsChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 60) {
      setSeconds(value);
      setTimeRemaining(minutes * 60 + value);
    }
  };

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div>
    <div>{formatTime(timeRemaining)}</div>
      <label> 
        Minutes: <input type="number" text={isNaN(minutes) ? '' : minutes} min="0" max="60" onChange={handleMinutesChange}/>
      </label>
      <label>
        Seconds:
        <input type="number" text={isNaN(seconds) ? '' : seconds} min="0" max="60" onChange={handleSecondsChange}/>
      </label>
      {timerRunning ? (
        <button onClick={handleStartStopTimer}>Stop</button>
      ) : (
        <button onClick={handleStartStopTimer}>Start</button>
      )}
      <button onClick={handleResetTimer}>Reset</button>
    </div>
  );
}

export default Timer;
