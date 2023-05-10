import {StopBrew, StartBrew} from '../views/startView';
import React, {useState, useEffect} from 'react'
import writeUserData, { readBrewStatus } from '../firebaseModel';
import sound from '../sounds/bubble.mp3'

function StartPresenter(props){
  const [brewState, setBrewState] = useState(false);
  const audio = new Audio(sound)
  audio.volume = 0.5

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
        audio.play()
    }
  }, [brewState])

  function brewStateACB(boolean){
    writeUserData("fredrik", boolean)
    setBrewState(!brewState)
    props.turnOn(!brewState)
  }
  const setBrewStatus = (state) => {setBrewState(state);}
  // <StartView setBrewingStatus = {brewStateACB}/>
  return (<>
    <div>{brewState && <StopBrew setBrewingStatus = {brewStateACB}/>}</div>
    <div>{!brewState && <StartBrew setBrewingStatus = {brewStateACB}/>}</div>
    </>);
}

export default StartPresenter;
