import "../css/App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Account from "../components/Account";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import logo from "../smartbrew_logo.svg";
import logo2 from "../logo_v3.svg";


function App() {
  return (
    <div className="App">
        <img src={logo2} alt="smartbrew logo" style={{ width: '100px', height: '100px' }} />
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
