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
    console.log("Firebase data:", data); // Add this line
    setWaterLevelState(data.waterLevel)
    console.log("Firebase: "+data.waterLevel);
  })
}
function readWaterLevel2(userId, setWaterLevelState){
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const waterLevel = ref(db, 'users/' + userId + '/waterLevel'); // access 'waterLevel' field under 'users'
  off(waterLevel)
  onValue(waterLevel, (snapshot) => {
    const data = snapshot.val();
    setWaterLevelState(data) // pass the entire data object as 'waterLevelState'
    console.log("Firebase data:", data);
  })
}
function readWaterLevel3(userId, setWaterLevelState){
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const waterLevel = ref(db, 'users/' + userId + '/waterLevel'); // access 'waterLevel' field under 'users'
  off(waterLevel)
  onValue(waterLevel, (snapshot) => {
    const data = snapshot.val();
    setWaterLevelState(data) // pass the entire data object as 'waterLevelState'
    console.log("Firebase data:", data);
  })
}


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export {writeWaterLevel, readWaterLevel, readWaterLevel2, readWaterLevel3}
