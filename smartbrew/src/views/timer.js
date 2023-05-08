import React, { useState, useRef, useEffect } from 'react'
  

  
const Timer = () => {

    const [seconds, setSeconds] = useState('');
    const [minutes, setMinutes] = useState('');
    const [hours, setHours] = useState('');


    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);
  
    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');

  
  
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
  
  
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
  
  
    const clearTimer = (e) => {
  
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        // setTimer('00:00:00');
        console.log("HEEEJ")
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {
        let deadline = new Date();
        let totalTime = calculateSeconds()
        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + totalTime );
        return deadline;
    }
  
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
  
    // We put empty array to act as componentDid
    // mount only
    /* useEffect(() => {
        clearTimer(getDeadTime());
    }, []); */
  
    // Another way to call the clearTimer() to start
    // the countdown is via action event from the
    // button first we create function to be called
    // by the button

    const onClickReset = () => {
        clearTimer(getDeadTime());
    }

    function handleSeconds(e){
        setSeconds(e.target.value)
    }

    function handleMinutes(e){
        setMinutes(e.target.value)
    }

    function handleHours(e){
        setHours(e.target.value)
    }
    function applyValues(e){
        
        setTimer(
            (hours > 9 ? hours : (hours === '' ? '00' : '0' + hours)) + ':' +
            (minutes > 9 ? minutes : (minutes === '' ? '00' : '0' + minutes)) + ':' +
            (seconds > 9 ? seconds : (seconds === '' ? '00' : '0' + seconds))
        )

    
    }
  
    function calculateSeconds(){

            
        

        console.log(

        (isNaN(parseInt(hours)) ? 0 : parseInt(hours)*3600) + 
        (isNaN(parseInt(minutes)) ? 0 : parseInt(minutes)*60) +
        (isNaN(parseInt(seconds)) ? 0 : parseInt(seconds))
        
        )
            
            
    
        
        

        return ((hours * 3600) + (minutes * 60) + seconds)
    }
    //<button onClick={onClickReset}>Reset</button>
    return (
        <div className="timer">
            <h2>{timer}</h2>
            <button onClick={applyValues}>Set timer</button>
            <button onClick={onClickReset}>Start</button>
            <input type="text" placeholder="Hour" value={hours} onChange={handleHours}></input>
            <input type="text" placeholder="Minutes" value={minutes} onChange={handleMinutes}></input>
            <input type="text" placeholder="Seconds" value={seconds} onChange={handleSeconds}></input>
        </div>
    )
    
}
  
export default Timer;