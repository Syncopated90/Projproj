import {StopBrew, StartBrew, DisabledBrew} from '../views/startView';
import React, {useState, useEffect} from 'react'
import writeUserData, { readBrewStatus } from '../firebaseModel';
import bubbleSound from '../sounds/bubble.mp3'
import shutDown from '../sounds/shutdown.mp3'
import "../css/App.css";

function StartPresenter(props){
  const [brewState, setBrewState] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const start = new Audio(bubbleSound)
  start.volume = 0.5
  const powerOff = new Audio(shutDown)
  powerOff.volume = 0.5

  useEffect(() => {
    if(props.powerStatus === false){
      setBrewState(false)
    }
  }, [props.powerStatus])

  useEffect(() => {
    readBrewStatus("fredrik", setBrewStatus);
  }, [])

  useEffect(() => {
    if (brewState === true) {
      start.play()
    }
  }, [brewState])

  useEffect(() => {
    if (hasMounted && brewState === false) {
      powerOff.play()
    }
    setHasMounted(true)
  }, [brewState])

  function brewStateACB(boolean){
    writeUserData("fredrik", boolean)
    setBrewState(!brewState)
    props.turnOn(!brewState)
  }
  const setBrewStatus = (state) => {setBrewState(state);}
  // <StartView setBrewingStatus = {brewStateACB}/> <div className='mobile-padding'></div>
  return (<>
    <div>{brewState && <StopBrew setBrewingStatus = {brewStateACB}/>}</div>
    <div>{!brewState && (props.waterLevel >= 8) && <StartBrew setBrewingStatus = {brewStateACB}/>}</div>
    <div>{!brewState && (props.waterLevel < 8) && <DisabledBrew/>}</div>
    
    </>);
}

export default StartPresenter;
