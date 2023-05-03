import { StopBrew, StartBrew } from "../views/startView";
import { NotBrewView, BrewView } from "../views/brewingStatusView";
import React, { useState, useEffect } from "react";
import writeUserData from "../firebaseModel";
import { readWaterLevel } from "../firebaseModel";
import { WaterLevelView } from "../views/waterLevelView";

function StartPresenter() {
  const [brewState, setBrewState] = useState(false);
  const [waterLevelState, setWaterLevelState] = useState(null);

  useEffect(() => {
    readWaterLevel("fredrik", setWaterLevelState);
  }, []);

  function brewStateACB(boolean) {
    writeUserData("fredrik2", boolean);
    setBrewState(!brewState);
  }

  return (
    <>
      <div>{brewState && <StopBrew setBrewingStatus={brewStateACB} />}</div>
      <div>{!brewState && <StartBrew setBrewingStatus={brewStateACB} />}</div>
      <div>{brewState && <BrewView />}</div>
      <div>{!brewState && <NotBrewView />}</div>
    </>
  );
}

export default StartPresenter;
