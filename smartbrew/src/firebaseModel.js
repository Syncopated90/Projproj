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

export function readUserData(userId){
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const brewingStatus = ref(db, 'users/' + userId);
  off(brewingStatus)
  onValue(brewingStatus, (snapshot) => {
    const data = snapshot.val();
    console.log(data.power);
    //return data; data.brewingstatus
    //debugger
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
  const waterLevel = ref(db, 'users/' + userId);
  off(waterLevel)
  onValue(waterLevel, (snapshot) => {
    const data = snapshot.val();
    setWaterLevelState(data.waterLevel)
    console.log(data.waterLevel);
  })
}
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export {writeWaterLevel, readWaterLevel}
