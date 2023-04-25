import StartView from '../views/startView';
import {NotBrewView, BrewView} from '../views/brewingStatusView';
import React, {useState} from 'react'
import writeUserData from '../firebaseModel';
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