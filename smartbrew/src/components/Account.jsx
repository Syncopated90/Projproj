import React from "react";
import { useNavigate } from "react-router-dom";
import StartPresenter from "../presenters/startPresenter";
import WaterLevel from "../presenters/waterLevelPresenter";
import { UserAuth } from "../context/AuthContext";
import { readUserData, readWaterLevel } from "../firebaseModel";  

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  readUserData("fredrik2");
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
      <WaterLevel />

      <button onClick={handleLogout} class="button-2">
        Logout
      </button>
    </div>
  );
};

export default Account;
