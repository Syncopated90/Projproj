import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Timer from "../views/timer";
import StartPresenter from "../presenters/startPresenter";
import WaterLevel from "../presenters/waterLevelPresenter";
import CircleLoaderPresenter from '../presenters/circleLoaderPresenter'
import CircleLoader from '../views/circleLoader';
import { UserAuth } from "../context/AuthContext";
import { readUserData, readWaterLevel } from "../firebaseModel";

const Account = () => {
  const[water, setWater] = useState(45);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  readUserData("fredrik2");

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
  return (
    <div className="account-div">
      <p>
        Good {getTimeOfDay()}, {user && user.email}
      </p>
      <StartPresenter />
      <Timer />
      <WaterLevel setWaterLevel={setWater}/>
      <CircleLoader waterLevel={water}/>
      <button onClick={handleLogout} className="button-2">
        Logout
      </button>
    </div>
  );
};

export default Account;
