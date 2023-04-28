import React from "react";
import StartPresenter from "../presenters/startPresenter";
import WaterLevel from "../presenters/waterLevelPresenter";
import { UserAuth } from "../context/AuthContext";

const Account = () => {
  const { user, logout } = UserAuth();
  return (
    <div className="account-div">
      {/*<h1 className='account-title'>Account</h1>*/}
      <p>User Email: {user && user.email}</p>

      <StartPresenter />
      <WaterLevel />

      <button class="button-2">Logout</button>
    </div>
  );
};

export default Account;
