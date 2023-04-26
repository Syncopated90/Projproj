import '../css/App.css';
import StartPresenter from '../presenters/startPresenter';
import WaterLevel from '../presenters/waterLevelPresenter';
import {readUserData, readWaterLevel} from '../firebaseModel';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import Account from '../components/Account'
import Signin from '../components/Signin'
import Signup from '../components/Signup'
import { AuthContextProvider } from '../context/AuthContext';


function App() {
  readUserData("fredrik")
  readWaterLevel("fredrik")
  return (
    <div className='App'>
      {/*<StartPresenter/>
      <WaterLevel/>*/}
      <h1 className='text-center text-3x1 font-bold'>
        SmartBrew Login Page
      </h1>
      <AuthContextProvider>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/account' element={<Account />} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
