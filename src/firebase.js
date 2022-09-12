import firebase from "firebase/compat/app"
import { getFirestore, collection } from "firebase/firestore"
import { getStorage, getDownloadURL  } from "firebase/storage"

/* code from our Firebase console */
const firebaseConfig = {
  apiKey: "AIzaSyCSAHslHTQRCj3IMX_1Kx6T22uL_VQhfMo",
  authDomain: "deadbydaylightrecords.firebaseapp.com",
  projectId: "deadbydaylightrecords",
  storageBucket: "deadbydaylightrecords.appspot.com",
  messagingSenderId: "315613574552",
  appId: "1:315613574552:web:d5127c263f29e3d96b67ed",
  measurementId: "G-F56R2WE88N"
}
// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig)
var db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
const killersColRef = collection(db,"killers")
const skillsColRef = collection(db,"skills")

const download = (pathReference, list) => {
  getDownloadURL(pathReference)
  .then((url) => {
    list.push(url)
  })
  .catch((error) => {
    console.log(error)
  })
}

export{
  storage, killersColRef, skillsColRef, download
}