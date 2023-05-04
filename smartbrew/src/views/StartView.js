import "../css/App.css";
import WaterLevelView from "../views/waterLevelView";
import React, { useState, useEffect } from "react";
import { writeWaterLevel, readWaterLevel } from "../firebaseModel";

export const minimumValuetoWaterlevel = 8;

function StartBrew(props) {
  const [waterLevelState, setWaterLevelState] = useState(props.waterLevel);
  const [brewState, setBrewState] = useState();

  {
    /*useEffect(() => {
    readWaterLevel3("fredrik", (value) => {
      console.log("Water level from Firebase:", value);
      setWaterLevelState(value);
    });
  }, []);*/
  }

  useEffect(() => {
    readWaterLevel("fredrik", setWaterLevelState);
  }, []);

  const minimumValuetoWaterlevel = 8;

  console.log("Minimum value to water level:", minimumValuetoWaterlevel);
  console.log("Water level state:", waterLevelState);

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
