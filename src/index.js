import './main.css';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue} from 'firebase/database';


//Initialize firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD58_CuPxsPsPF3C7ivUYKsjz__DxEUj2k',
  authDomain: 'invitacion-xv-demo-eeff8.firebaseapp.com',
  projectId: 'invitacion-xv-demo-eeff8',
  storageBucket: 'invitacion-xv-demo-eeff8.appspot.com',
  messagingSenderId: '928152016075',
  appId: '1:928152016075:web:69b325ba5b3681eb07374e',
  databaseURL: 'https://invitacion-xv-demo-eeff8-default-rtdb.firebaseio.com'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const guestRef = ref(db, 'invitados');



const seenDiv = document.getElementById('seenDiv');;
const acceptedDiv = document.getElementById('acceptedDiv');;
const rejectedDiv = document.getElementById('rejectedDiv');;
const pendingDiv = document.getElementById('pendingDiv');;
const totalDiv = document.getElementById('totalDiv');;

function processData(snapshot) {
  let seen = 0;
  let accepted = 0;
  let rejected = 0;
  let pending = 0;
  let total = 0;
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    console.log(childData);
    if (childData.confirm === true) {
      accepted++;
    }
    else if (childData.confirm === false) {
      rejected++;
    }
    else {
      pending++;
    }
    total = total + childData.total;
    seen ++;
  });
  seenDiv.innerHTML = seen;
  acceptedDiv.innerHTML = accepted;
  rejectedDiv.innerHTML = rejected;
  pendingDiv.innerHTML = pending;
  totalDiv.innerHTML = total;
}



onValue(guestRef, (snapshot) => {
  processData(snapshot);
});




