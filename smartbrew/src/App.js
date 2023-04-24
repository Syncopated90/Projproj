import logo from './logo.svg';
import './App.css';
import StartPresenter from './StartPresenter';

import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

function App() {
  
  return (
    StartPresenter()
  );
}

export default App;
