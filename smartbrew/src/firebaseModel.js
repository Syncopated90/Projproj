import { getDatabase, ref, set} from "firebase/database";
import {initializeApp} from 'firebase/app'
import {firebaseConfig} from './firebaseConfig';

export default function writeUserData(userId, boolean) {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  
  set(ref(db, 'users/' + userId), {
    brewingstatus: boolean,
  });
}