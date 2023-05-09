import "../css/App.css";
import React, { useState, useEffect } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import { readWaterLevel2 } from "../firebaseModel";
=======
import { writeWaterLevel, readWaterLevel2 } from "../firebaseModel";
>>>>>>> 5304c9e (status text and button finally working)
=======
import { readWaterLevel2 } from "../firebaseModel";
>>>>>>> 7c5bfb2 (removed unused code)

export const minimumValuetoWaterlevel = 8;

function StartBrew(props) {
  const [waterLevelState, setWaterLevelState] = useState(null);
  const [brewState, setBrewState] = useState();

  useEffect(() => {
    readWaterLevel2("fredrik", (value) => {
      console.log("Water level from Firebase:", value);
      setWaterLevelState(value);
    });
<<<<<<< HEAD
=======
  }, []);
<<<<<<< HEAD
  {/*useEffect(() => {
    readWaterLevel("fredrik", setWaterLevelState);
>>>>>>> 5304c9e (status text and button finally working)
  }, []);

  useEffect(() => {
    setWaterLevelState(props.waterLevel);
  }, [props.waterLevel]);*/}

  const minimumValuetoWaterlevel = 8;

<<<<<<< HEAD
=======
  /*console.log("Minimum value to water level:", minimumValuetoWaterlevel);
  console.log("Water level state:", waterLevelState);*/

>>>>>>> 5304c9e (status text and button finally working)
=======

  const minimumValuetoWaterlevel = 8;

>>>>>>> 7c5bfb2 (removed unused code)
  return (
    <div className="App">
      <button
        class="button-39"
        role="button"
        disabled={
          waterLevelState !== null &&
          waterLevelState < minimumValuetoWaterlevel &&
          !brewState
        }
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
      <button
        class="button-39"
        role="button"
        onClick={() => props.setBrewingStatus(false)}
      >
        Turn off
      </button>
    </div>
  );
}

export { StopBrew, StartBrew };
