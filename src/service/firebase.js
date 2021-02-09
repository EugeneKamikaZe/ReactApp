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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

class Firebase {
    constructor() {
        this.fire = firebase
        this.database = this.fire.database()
    }

    getPokemonSoket = (cb) => {
        this.database.ref('pokemons').on('value', (snapshot) => {
            cb(snapshot.val())
        })
    }

    getPokemonsOnce = async () => {
        return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val())
    }

    postPokemon = (key, pokemon) => {
        this.database.ref(`pokemons/${key}`).set(pokemon)
    }

    addPokemon = (data, cb) => {
        const newPostKey = this.database.ref().child('pokemons').push().key
        this.database.ref('pokemons/' + newPostKey).set(data).then(() => cb())
    }
}

export default Firebase