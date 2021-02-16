import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import s from './style.module.css'
import PokemonCard from '../../../../components/PokemonCard'
import PlayerBoard from './component/playerBoard'

import {PokemonContext} from '../../../../context/pokemonContext'
import Result from './component/result'

const counterWin = (board, player1, player2) => {
    let player1Count = player1.length
    let player2Count = player2.length

    board.forEach(item => {
        if (item.card.possession === 'red') {
            player2Count++
        }

        if (item.card.possession === 'blue') {
            player1Count++
        }
    })

    return [player1Count, player2Count]
}

const BoardPage = () => {
    const {pokemons, pokemons2} = useContext(PokemonContext)
    const [board, setBoard] = useState([])
    const [player1, setPlayer1] = useState(() => {
        return Object.values(pokemons).map(item => ({
            ...item,
            possession: 'blue'
        }))
    })
    const [player2, setPlayer2] = useState([])
    const [choiceCard, setChoiceCard] = useState(null)
    const [steps, setStep] = useState(0)
    const history = useHistory()
    const [result, setResult] = useState('')

    if (Object.keys(pokemons).length === 0) {
        history.replace('/game')
    }

    const handleClickBoard = async (position) => {
        if (choiceCard) {
            const params = {
                position,
                card: choiceCard,
                board
            }

            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            })
            const request = await res.json()

            if (choiceCard.player === 1) {
                setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }
            if (choiceCard.player === 2) {
                setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id))
            }

            setBoard(request.data)
            setStep(prevState => {
                return prevState + 1
            })
        }
    }

    useEffect(() => {
        if (steps === 9) {
            const [count1, count2] = counterWin(board, player1, player2)

            if (count1 > count2) {
                setResult('win')
                setTimeout(() => history.replace('/game/finish'), 2000)
            } else if (count1 < count2) {
                setResult('lose')
                setTimeout(() => history.replace('/game/finish'), 2000)
            } else {
                setResult('draw')
                setTimeout(() => history.replace('/game/finish'), 2000)
            }
        }
    }, [steps])

    useEffect(async () => {
        const boardResponse = await fetch('https://reactmarathon-api.netlify.app/api/board')
        const boardRequest = await boardResponse.json()

        setBoard(boardRequest.data)

        setPlayer2(() => {
            return pokemons2.data.map(item => ({
                ...item,
                possession: 'red'
            }))
        })
    }, [])

    return (
        <div className={s.root}>
            <Result type={result}/>
            <div className={s.playerOne}>
                <PlayerBoard
                    player={1}
                    cards={player1}
                    onClickCard={(card) => setChoiceCard(card)}
                />
            </div>
            <div className={s.board}>
                {
                    board.map(item => (
                        <div key={item.position}
                             className={s.boardPlate}
                             onClick={() => !item.card && handleClickBoard(item.position)}
                        >
                            {
                                item.card && <PokemonCard {...item.card} minimize/>
                            }
                        </div>
                    ))
                }
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChoiceCard(card)}
                />
            </div>
        </div>
    )
}

export default BoardPage