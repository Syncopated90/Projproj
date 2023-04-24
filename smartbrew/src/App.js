import logo from './logo.svg';
import './App.css';
import StartPresenter from './StartPresenter';
import writeUserData from './firebaseModel';
import {app, database, firebaseConfig} from './firebaseConfig'
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

function App() {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);

  writeUserData(123, "fredrik", "fredrik@kth.se")
  return (
    StartPresenter()
  );
}

export default App;
