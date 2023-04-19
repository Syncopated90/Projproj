import StartView from './StartView';
import {NotBrewView, BrewView} from './BrewingStatusView';
import React, {useState} from 'react'
function StartPresenter(){
  const [brewState, setBrewState] = useState(false);
  function brewStateACB(boolean){
    setBrewState(boolean)
  }
  return (<>
    <StartView setBrewingStatus = {brewStateACB}/>
    <div>{brewState && <BrewView/>}</div>
    <div>{!brewState && <NotBrewView/>}</div>
    </>);
}

export default StartPresenter;