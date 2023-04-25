import { getDatabase, ref, set, get, onValue, once, update} from "firebase/database";
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from './firebaseConfig';

export default function writeUserData(userId, boolean) {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  
  update(ref(db, 'users/' + userId), {
    brewingstatus: boolean
  });
}

export async function readUserData(userId){
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const brewingStatus = ref(db, 'users/' + userId);
  const unsub = onValue(brewingStatus, (snapshot) => {
    const data = snapshot.val();
    console.log(data.brewingstatus);
    //return data;
  })
  return unsub;
}