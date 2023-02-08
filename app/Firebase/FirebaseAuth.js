import { firebase } from '@react-native-firebase/auth';


var message = ''


const userAuth = firebase.auth();

export const CreateNewUser = ({ email, password }) => {
  userAuth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User Created", user);
      message = "success"
      console.log("User Created", message);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("User Created Error", errorMessage, "User Created Error Code", errorCode);
      message = 'failed'
      console.log("User Created", message);
      
      // ..
    });
    return message

}

export const SignInUser = async ({ email, password }) => {
  userAuth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User SignedIn", user);
      message = "sucess"

    })
    .catch((error) => {
      const errorCode = error.code;
      console.log("User Sign In Error", errorMessage, "User Sign In Error Code", errorCode);
      message = 'failed'

    });
    return message

}

// export const SignOutUser=()=>{
// signOut(userAuth).then(() => {
//   // Sign-out successful.
// }).catch((error) => {
//     console.log("User SignedOut Error",error);

//   // An error happened.
// })}