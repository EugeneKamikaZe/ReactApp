import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDWviHztOUP-7mJdG_AACbIoNkx_oxxlvc",
    authDomain: "pokemon-game-b03c8.firebaseapp.com",
    databaseURL: "https://pokemon-game-b03c8-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-b03c8",
    storageBucket: "pokemon-game-b03c8.appspot.com",
    messagingSenderId: "119930669005",
    appId: "1:119930669005:web:2131fb89b8e3d5221f2684"
}

firebase.initializeApp(firebaseConfig)

export const fire = firebase
export const database = fire.database()

export default database