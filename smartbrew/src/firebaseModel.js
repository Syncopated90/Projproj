import { getDatabase, ref, set, onValue} from "firebase/database";
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from './firebaseConfig';

export default function writeUserData(userId, boolean) {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  
  set(ref(db, 'users/' + userId), {
    brewingstatus: boolean,
  });
}

export function readUserData(userId){
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const brewingStatus = ref(db, 'users/' + userId);
  onValue(brewingStatus, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    return data;
  });

}