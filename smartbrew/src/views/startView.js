import "../css/App.css";
import React, { useState, useEffect } from "react";
import { readWaterLevel2 } from "../firebaseModel";

export const minimumValuetoWaterlevel = 8;

function StartBrew(props) {
  const [waterLevelState, setWaterLevelState] = useState(null);
  const [brewState, setBrewState] = useState();

  useEffect(() => {
    readWaterLevel2("fredrik", (value) => {
      console.log("Water level from Firebase:", value);
      setWaterLevelState(value);
    });
  }, []);

  const minimumValuetoWaterlevel = 8;

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
