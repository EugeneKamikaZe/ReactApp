import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAdIUyKVVt5NGUHpfVuO_hfayQRuZpvkXw",
    authDomain: "pokemon-game-ffc66.firebaseapp.com",
    databaseURL: "https://pokemon-game-ffc66-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-ffc66",
    storageBucket: "pokemon-game-ffc66.appspot.com",
    messagingSenderId: "399192204029",
    appId: "1:399192204029:web:10033684a91a4b848a9494"
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

    offPokemonSoket = () => {
        this.database.ref('pokemons').off()
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

const FirebaseClass = new Firebase()

export default FirebaseClass