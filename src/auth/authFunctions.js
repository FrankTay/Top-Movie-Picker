import { db } from '../firebase-config'; 
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const usersDBRef = collection(db, 'users')

export const signUpUser = (auth,userName, email,password) => {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("adding username to auth object")
      return updateProfile(auth.currentUser, {
        displayName: userName
      })
    }).then(() => {
      // Signed in 
      console.log("adding acount to db")
      return addUserToDB(userName, email)
    })
    .catch((error) => {
      const errorCode = error.code;
      return errorCode
    });
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

export const getDBDocs = () => {
  return getDocs(usersDBRef)
  .then((snapshot) => {
    console.log(snapshot.docs)
  })
}

//TODO: encrypt email

export const addUserToDB = (userName, email) => {
  return setDoc(doc(db, "users", userName),{email, watched:[]}) 
  .then((userCreds) => {
    console.log(userCreds)
  })
  .catch((error) => {

  })
}

export const addToWatchedList = async (userName, email, data) => {
  const usersDocRef = doc(db, "users", userName)
  // console.log(`current user is ${userName} with email ${email}`)
  // try {
    return await updateDoc(usersDocRef, {
      watched: arrayUnion(data)
    })
  // }
  // catch (error) {
  //   console.log(`we got an error - ${error}`)
  // }
  
    
  //.then(response => {console.log(response)})
  // return getDoc(usersDocRef)
  // .then(result => console.log(result))
}

export const removeFromWatchedList = async (userName, email, data) => {
  const usersDocRef = doc(db, "users", userName)

  return await updateDoc(usersDocRef, {
    watched: arrayRemove(data)
  })
}

export const getWatchedList = async (userName) => {
  const usersDocRef = doc(db, "users", userName)

  const docSnap = await getDoc(usersDocRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data().watched);
    return docSnap.data().watched
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return []
  }
}
