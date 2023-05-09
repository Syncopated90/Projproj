import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../views/timer";
import StartPresenter from "../presenters/startPresenter";
import WaterLevel from "../presenters/waterLevelPresenter";
import CircleLoader from "../views/circleLoader";
import { UserAuth } from "../context/AuthContext";
import { readBrewStatus, readWaterLevel } from "../firebaseModel";

export default function Account (){
  const [water, setWater] = useState(45);
  const [turnedOn, turnOn] = useState(false);
  const[startWaterLevel, setStartWaterLevel] = useState(0)
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  readBrewStatus("fredrik");

  const getTimeOfDay = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      return "morning";
    } else if (hours < 18) {
      return "afternoon";
    } else {
      return "evening";
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };
  function startBrewing(boolean){
    turnOn(boolean);
    setStartWaterLevel(water)
  }
  return (
    <div className="account-div">
      <p>
        Good {getTimeOfDay()}, {user && user.email}
      </p>
      <StartPresenter turnOn={startBrewing}/>
      <Timer />
      <WaterLevel setWaterLevel={setWater}/>
      <CircleLoader waterLevel={water} turnedOn={turnedOn} startWaterLevel={startWaterLevel}/>
      <button onClick={handleLogout} className="button-2">
        Logout
      </button>
    </div>
  );
}
