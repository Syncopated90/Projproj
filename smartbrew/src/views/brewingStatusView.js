import React, { useState, useEffect } from "react";
import { writeWaterLevel, readWaterLevel2 } from "../firebaseModel";
import {
  StopBrew,
  StartBrew,
  minimumValuetoWaterlevel,
} from "./startView";

function NotBrewView(props) {
  const [brewState, setBrewState] = useState();
  const [waterLevelState, setWaterLevelState] = useState(null);
  let minimumValuetoWaterlevel = 8;

  useEffect(() => {
    readWaterLevel2("fredrik", (value) => {
      console.log("Water level from Firebase:", value);
      setWaterLevelState(value);
    });
  }, []);

  let text;
  console.log("Water level state for text: " + waterLevelState);
  if (!brewState) {
    text =
      waterLevelState === null
        ? "Checking water level..."
        : waterLevelState < minimumValuetoWaterlevel
        ? "Coffee machine needs refill"
        : "Your coffee machine is ready to brew";
  } else {
    text = "Nogo";
  }

  return (
    <>
      <div className="App">Coffee is not brewing</div>
      <div className="status">
        <p>Status: {text}</p>
        {waterLevelState !== null &&
        waterLevelState < minimumValuetoWaterlevel ? (
          <span className="status-icon red"></span>
        ) : (
          <span className="status-icon green"></span>
        )}
      </div>
      {/*<p>Status: {text}</p>
      <p>Water level: {waterLevelState}</p>*/}
    </>
  );
}

function BrewView() {
  return <div className="App">Coffee is brewing!</div>;
}

export { NotBrewView, BrewView };
