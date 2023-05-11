import "../css/App.css";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Account from "../components/Account";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import logo from "../logo_v3.svg";


function App() {
  return (<>
    <div className="App">
    <img src={logo} alt="smartbrew logo" className='logo'style={{ width: '300px',}} />
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
    </div></>
  );
}

export default App;
