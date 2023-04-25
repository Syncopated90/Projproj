import { getDatabase, ref, onValue, update, off} from "firebase/database";
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from './firebaseConfig';

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
    console.log('hello');
    //return data; data.brewingstatus
    //debugger
  })
  
  //return brewingStatus;
}