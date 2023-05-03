import {StopBrew, StartBrew} from '../views/startView';
import {NotBrewView, BrewView} from '../views/brewingStatusView';
import React, {useState, useEffect} from 'react'
import writeUserData, {readBrewStatus} from '../firebaseModel';
function StartPresenter(){
  const [brewState, setBrewState] = useState(false);
  useEffect(() => {
    readBrewStatus("fredrik3", setBrewStatus);
}, [])

  function brewStateACB(boolean){
    writeUserData("fredrik3", boolean)
    setBrewState(!brewState)
  }
  const setBrewStatus = (state) => {setBrewState(state);}
  // <StartView setBrewingStatus = {brewStateACB}/>
  return (<>
    <div>{brewState && <StopBrew setBrewingStatus = {brewStateACB}/>}</div>
    <div>{!brewState && <StartBrew setBrewingStatus = {brewStateACB}/>}</div>
    <div>{brewState && <BrewView/>}</div>
    <div>{!brewState && <NotBrewView/>}</div>
    </>);
}

export default StartPresenter;