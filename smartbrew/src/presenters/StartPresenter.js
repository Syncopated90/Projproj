import StartView from '../views/startView';
import {NotBrewView, BrewView} from '../views/BrewingStatusView';
import React, {useState, useEffect} from 'react'
import writeUserData, {readUserData} from '../firebaseModel';
import StartView from '../views/startView';
import React, {useState} from 'react'
import writeUserData from '../firebaseModel';
function StartPresenter(){
  const [brewState, setBrewState] = useState(false);
  
  //useEffect(() => {readUserData("fredrik")}, [brewState])
  function brewStateACB(boolean){
    writeUserData("fredrik2", boolean)
    setBrewState(boolean)
  }
  return (<>
    <StartView setBrewingStatus = {brewStateACB}/>
    <div>{brewState && <BrewView/>}</div>
    <div>{!brewState && <NotBrewView/>}</div>
    </>);
}

export default StartPresenter;