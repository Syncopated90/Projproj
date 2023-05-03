import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
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
      {/*<h1 className='account-title'>Account</h1>*/}
      <p>User Email: {user && user.email}</p>

      <StartPresenter />
      <WaterLevel setWaterLevel={setWater}/>
      <CircleLoader waterLevel={water}/>
      <button onClick={handleLogout} className="button-2">
        Logout
      </button>
    </div>
  );
};

export default Account;
