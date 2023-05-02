import { getDatabase, update, ref, onValue, off} from "firebase/database";
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from './firebaseConfig';
import {getAuth} from 'firebase/auth';


export default function writeUserData(userId, boolean) {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  
  update(ref(db, 'users/' + userId), {
    brewingstatus: boolean
  });
}
export function readUserData(userId, setBrewState){
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const brewingStatus = ref(db, 'users/' + userId + '/brewingstatus');
  off(brewingStatus)
  onValue(brewingStatus, (snapshot) => {
    const data = snapshot.val();
    setBrewState(data)
    console.log(data);
  })
  
  //return brewingStatus;
}

function writeWaterLevel(userId, waterLevelValue) {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  update(ref(db, 'users/' + userId), {
    waterLevel: waterLevelValue
  });
}

function readWaterLevel(userId, setWaterLevelState){
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const waterLevel = ref(db, 'users/' + userId + '/waterLevel');
  off(waterLevel)
  onValue(waterLevel, (snapshot) => {
    const data = snapshot.val();
    setWaterLevelState(data)
    console.log(data);
  })
}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export {writeWaterLevel, readWaterLevel}
