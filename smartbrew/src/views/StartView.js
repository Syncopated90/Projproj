import WaterLevelView from "../views/waterLevelView";
import React, {useState, useEffect} from 'react'
import {writeWaterLevel, readWaterLevel} from '../firebaseModel';

function StartBrew(props) {
  const [waterLevelState, setWaterLevelState] = useState(0);
  let minimumValuetoWaterlevel = 8; {/* Let this value be minimun for the coffee machine to brew */}

    useEffect(() => {
        readWaterLevel("fredrik", setWaterLevelState);
    }, [])

  return (
    <div className="App">
      <button
        disabled={waterLevelState !== null && waterLevelState < minimumValuetoWaterlevel}
        onClick={() => props.setBrewingStatus(true)}
      >
        Turn on
      </button>
    </div>
  );
}

function StopBrew(props) {
  return (
    <div className="App">
      <button onClick={() => props.setBrewingStatus(false)}>Turn off</button>
    </div>
  );
}


export { StopBrew, StartBrew };
