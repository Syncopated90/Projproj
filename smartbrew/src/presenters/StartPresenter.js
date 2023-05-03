import {StopBrew, StartBrew} from '../views/startView';
import {NotBrewView, BrewView} from '../views/brewingStatusView';
import React, {useState, useEffect} from 'react'
import writeUserData, { readUserData } from '../firebaseModel';
import sound from '../sounds/bubble.mp3'

function StartPresenter(){
  const [brewState, setBrewState] = useState(false);
  const audio = new Audio(sound)
  audio.volume = 0.5

  useEffect(() => {
    readUserData("fredrik", setBrewState);
  }, [])

  useEffect(() => {
    if (brewState === true) {
        audio.play()
    }
}, [brewState])

  function brewStateACB(boolean){
    writeUserData("fredrik", boolean)
    setBrewState(!brewState)
  }
  // <StartView setBrewingStatus = {brewStateACB}/>
  return (<>
    <div>{brewState && <StopBrew setBrewingStatus = {brewStateACB}/>}</div>
    <div>{!brewState && <StartBrew setBrewingStatus = {brewStateACB}/>}</div>
    <div>{brewState && <BrewView/>}</div>
    <div>{!brewState && <NotBrewView/>}</div>
    </>);
}

export default StartPresenter;