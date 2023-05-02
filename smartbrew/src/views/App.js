import "../css/App.css";
import StartPresenter from "../presenters/startPresenter";
import WaterLevel from "../presenters/waterLevelPresenter";
import { readUserData, readWaterLevel } from "../firebaseModel";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Account from "../components/Account";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <div>
        <h1 className="text-center text-3x1 font-bold">SmartBrew</h1>
        <strong>An internet connected coffee machine</strong>
      </div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
