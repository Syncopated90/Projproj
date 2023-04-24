import logo from '../logo.svg';
import '../css/App.css';
import StartPresenter from '../presenters/startPresenter';

import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import WaterLevel from '../presenters/waterLevelPresenter';

function App() {
  
  return (
    <div>
      <StartPresenter/>
      <WaterLevel/>
    </div>
  );
}

export default App;
