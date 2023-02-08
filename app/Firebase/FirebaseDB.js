import database from '@react-native-firebase/database';

// import {
//     ref,
//     onValue,
//     push,
//     update,
//     remove
//   } from 'firebase/database';

// import { db } from './FirebaseConfig';

export const FirebaseDBPush =({name,email,phone})=>{
    database().ref('/User_SignUp').push({
        "userEmail":email ,
        "userPhone" : phone,
        "userName": name,
  });
  }

export const FirebaseDBRead=()=>{
//   database()
//   .get('/User_SignUp')
//   .then(snapshot => {
//     console.log('User data: ', snapshot);
//   });

// onValue(ref(db, '/todos'), querySnapShot => {
//     console.log("new data incoming",querySnapShot.val() );
//   });

database().ref('/User_SignUp' ).on('value', (snapshot) => {
    const userObj = snapshot.val();
    console.log("fjsadjfsakjfad",userObj);
  });
//   database().ref('/User_SignUp' ).child()
}

