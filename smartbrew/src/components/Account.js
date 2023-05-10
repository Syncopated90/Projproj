import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../views/timer";
import StartPresenter from "../presenters/startPresenter";
import WaterLevel from "../presenters/waterLevelPresenter";
import CircleLoader from "../views/circleLoader";
import { UserAuth } from "../context/AuthContext";
import { readBrewStatus, readWaterLevel } from "../firebaseModel";

export default function Account (){
  const [water, setWater] = useState(45);
  const [status, setStatus] = useState(false);
  const[startWaterLevel, setStartWaterLevel] = useState(0)
  const[brewIsFinished, setBrewIsFinished] = useState(false)
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  readBrewStatus("fredrik");


  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.messa );
    }
  };
  function startBrewing(boolean){
    setStatus(boolean);
    setStartWaterLevel(water)
  }

  function setStatusHandler(){
    setStatus(false)

  }

  return (
    <div className="account-div">
      <CircleLoader setBrewIsFinished={setBrewIsFinished}  waterLevel={water} turnedOn={status} startWaterLevel={startWaterLevel}/>
      <Timer isBrewingFinished = {brewIsFinished} turnedOn = {setStatusHandler}/>
      <WaterLevel setWaterLevel={setWater}/>
      <StartPresenter turnOn={startBrewing} powerStatus = {status}/>
      <button onClick={handleLogout} className="button-2">
        Logout
      </button>
    </div>
  );
}
