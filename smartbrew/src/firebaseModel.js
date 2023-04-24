import { getDatabase, ref, set} from "firebase/database";
import {initializeApp} from 'firebase/app'
import {app, database, firebaseConfig} from './firebaseConfig';

export default function writeUserData(userId, name, email) {
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
}