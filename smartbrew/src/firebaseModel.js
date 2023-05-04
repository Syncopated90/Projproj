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
function readBrewStatus(props){
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const brewingStatus = ref(db, 'users/' + props.userId + '/brewingstatus');
  off(brewingStatus)
  onValue(brewingStatus, (snapshot) => {
    const data = snapshot.val();
    //props.setBrewStatus(data.brewingstatus);
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

function readWaterLevel(props){
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const waterLevel = ref(db, 'users/' + props.userId);
  //off(waterLevel)
  onValue(waterLevel, (snapshot) => {
    const data = snapshot.val();
    console.log("Firebase data:", data); // Add this line
    //props.setWaterLevelState(data.waterLevel)
    //props.setWaterLevel(data.waterLevel)
    //console.log(data.waterLevel);
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
export {writeWaterLevel, readWaterLevel, readWaterLevel2, readWaterLevel3, readBrewStatus}
