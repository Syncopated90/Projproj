import logo from '../logo.svg';
import '../css/App.css';
import StartPresenter from '../presenters/StartPresenter';

import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

function App() {
  
  return (
    StartPresenter()
  );
}

export default App;
