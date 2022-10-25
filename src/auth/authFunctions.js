import { db } from '../firebase-config'; 
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";

const usersDBRef = collection(db, 'users')

export const signUpUser = (auth, email,password, dbRef) => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      console.log(userCredential)
      return addUserToDB(email)
    })
    .catch((error) => {
      const errorCode = error.code;
      return errorCode
    });
}

export const getDBDocs = () => {
  return getDocs(usersDBRef)
  .then((snapshot) => {
    console.log(snapshot.docs)
  })
}

//TODO: add username param
export const addUserToDB = (email) => {
  return addDoc(usersDBRef,{email,watched:[]})
  .then((userCreds) => {
    console.log(userCreds)
  })
  .catch((error) => {
  })
}

export const loginUser = (auth, email,password) => {
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    return errorCode
  });

}
