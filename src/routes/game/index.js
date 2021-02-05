import { useState, useEffect } from 'react'

import PokemonCard from '../../components/PokemonCard'
import Layout from '../../components/Layout'

import s from './style.module.css'
import database from '../../service/firebase'

const newPOKEMON = {
    "abilities": [
        "hatchet",
        "evil-look ",
        "laugh"
    ],
    "stats": {
        "hp": 9000,
        "attack": 1000,
        "defense": 1000,
        "special-attack": 10,
        "special-defense": 10,
        "speed": 5
    },
    "type": "man",
    "img": "https://s.tcdn.co/41a/7fb/41a7fb1f-9bff-3ddb-90fb-be11903192e1/192/7.png",
    "name": "Jonny",
    "base_experience": 122,
    "height": 180,
    "id": 66,
    "values": {
        "top": "e",
        "right": "s",
        "bottom": "i",
        "left": "H"
    }
}

const GamePage = () => {

    const [pokemons, setPokemon] = useState({})

    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemon(snapshot.val())
        })
    }, [])

    const onAddBtnClick = () => {
        const newPostKey = database.ref().child('pokemons').push().key

        let updates = {}
        updates[newPostKey  + '/'] = newPOKEMON

        database
            .ref('pokemons/')
            .update(updates)
            .then(() => {
                database.ref('pokemons').once('value', (snapshot) => {
                    setPokemon(snapshot.val())
                })
            })
    }

    const onCardClick = (id) => {
        setPokemon(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]}
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active
                    console.log(prevState)
                }

                acc[item[0]] = pokemon

                database.ref('pokemons').update(acc)

                return acc
            }, {})
        })
    }

    return (
        <Layout
            id={1}
            title="Pokemon Game"
            colorBg="cornflowerblue"
        >
            <button className={s.addBtn} onClick={onAddBtnClick}>Add pokemon</button>
            <div className={s.flex}>
                {
                    Object.entries(pokemons).map(([key, {name, img, id, type, values, active}]) => (
                        <PokemonCard
                            key = {key}
                            values = {values}
                            name = {name}
                            img = {img}
                            type = {type}
                            id = {id}
                            active={active}
                            onCardClick={onCardClick}
                        />
                    ))
                }
            </div>
        </Layout>
    )
}

export default GamePage