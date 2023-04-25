import StartView from '../views/StartView';
import {NotBrewView, BrewView} from '../views/BrewingStatusView';
import React, {useState} from 'react'
import writeUserData from '../firebaseModel';
function StartPresenter(){
  const [brewState, setBrewState] = useState(false);
  function brewStateACB(boolean){
    writeUserData("fredrik", boolean)
    setBrewState(boolean)
  }
  return (<>
    <StartView setBrewingStatus = {brewStateACB}/>
    <div>{brewState && <BrewView/>}</div>
    <div>{!brewState && <NotBrewView/>}</div>
    </>);
}

export default StartPresenter;