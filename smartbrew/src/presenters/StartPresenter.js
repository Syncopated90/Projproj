import StartView from '../views/StartView';
import {NotBrewView, BrewView} from '../views/BrewingStatusView';
import React, {useState, useEffect} from 'react'
import writeUserData, {readUserData} from '../firebaseModel';
import { getDatabase, ref, onValue, update, off} from "firebase/database";
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from '../firebaseConfig';
function StartPresenter(){
  const [brewState, setBrewState] = useState(false);
  
  //useEffect(() => {readUserData("fredrik")}, [brewState])
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