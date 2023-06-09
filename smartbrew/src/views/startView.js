import "../css/App.css";
import React, { useState, useEffect } from "react";
import { writeWaterLevel, readWaterLevel2 } from "../firebaseModel";
export const minimumValuetoWaterlevel = 8;

function StartBrew(props) {
  const [waterLevelState, setWaterLevelState] = useState(null);
  const [brewState, setBrewState] = useState();

  useEffect(() => {
    readWaterLevel2("fredrik", (value) => {
      setWaterLevelState(value);
    });
  }, []);
  console.log(props.waterLevel)
  return (
    <div className="App">
      <button
        className="login-button"
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
        className="login-button"
        onClick={() => props.setBrewingStatus(false)}
      >
        Turn off
      </button>
    </div>
  );
}
function DisabledBrew(props) {
  const [waterLevelState, setWaterLevelState] = useState(null);
  const [brewState, setBrewState] = useState();

  useEffect(() => {
    readWaterLevel2("fredrik", (value) => {
      setWaterLevelState(value);
    });
  }, []);
  return (
    <div className="App">
      <button
        className="login-button"
        disabled={
          waterLevelState !== null &&
          waterLevelState < minimumValuetoWaterlevel &&
          !brewState
        }
      >
        Refill water tank
      </button>
    </div>
  );
  }
export { StopBrew, StartBrew, DisabledBrew };
