import Header from '../../components/Header'
import Layout from '../../components/Layout'

import s from './style.module.css'
import cn from 'classnames'

import '../../App.css'

import Bg1 from '../../assets/bg1.jpg'
import Bg2 from '../../assets/bg3.jpg'

const HomePage = ({ onChangePage }) => {

    const handleClickButton = (page) => {
        onChangePage && onChangePage(page)
    }

    return (
        <>
            <Header
                title="Pokemon Game"
                descr="Triple Triad"
                onClickButton={handleClickButton}
            />
            <Layout
                id={1}
                title="About Game"
                urlBg={Bg1}
            >
                <p>Triple Triad is a card game played on a 3x3 board. At the start of a game, each player chooses 5 cards they own to be their hand for that game, and then take turns playing their cards in unoccupied spaces of the board.</p>
                <p>Each card has 4 numbers on it, one per side, which range from 1 to 10 (known as A). If a card is played which touches an opponent's card on a side, the touching numbers are compared. If the number on the newly-placed card is higher than the opponent's card's number, that opponent's card is captured and swaps ownership. Nothing happens if the newly-placed card's number is equal or less than the opponent's card's number.</p>
                <p>The goal is to control the most cards on the board at the end of the game, when no further cards can be played.</p>
                <p>The winner receives one random card used by the loser. No cards change hands if the game is a draw. </p>
            </Layout>
            <Layout
                id={2}
                title="Rule variations"
                urlBg={Bg2}
            >
                <p>There are a number of rules and modifications which can be applied to a Triple Triad game. These are all optional, and any combination of these rules can be applied.</p>
                <div className={s.rules}>
                    <p className={cn(s.rules__header, s.title)}>Rule </p>
                    <p className={cn(s.rules__header, s.title)}>Description </p>
                    <p className={cn(s.rules__header, s.title)}>Rule phrase </p>

                    <p className={s.rules__header}>Same Number Wins</p>
                    <p>Cards are also captured if their touching number is equal to the newly-played card's number, as well as if it is less than the newly-played card's number. Also, the captured cards then immediately attempt to capture any cards touching them. </p>
                    <p className={s.phrase}>samewins</p>

                    <p className={s.rules__header}>Open Hand</p>
                    <p>Players can see the cards in the opponent's hand. </p>
                    <p className={s.phrase}>openhand</p>

                    <p className={s.rules__header}>Grid Wrap</p>
                    <p>The board wraps around on itself in all directions, so there are no edges. For example, the top of a card played in the top centre spot will touch the bottom of a card in the bottom centre spot, and may capture it. </p>
                    <p className={s.phrase}>wrap</p>

                    <p className={s.rules__header}>Space Elements</p>
                    <p>Each space on the board is assigned a random type. If a card is placed on a space with the same type, it gains +1 to all its values (values can even go beyond "A" because of this).

                        This bonus only applies to a newly-played card attempting to capture other cards; the bonus is removed afterwards. It will not apply if the card attempts to capture other cards because of the "Same Number Wins" rule (because it wasn't a newly-played card). </p>
                    <p className={s.phrase}>elements</p>

                    <p className={s.rules__header}>Random Hand</p>
                    <p>The player doesn't choose 5 cards to be their hand at the start of the game. 5 cards are randomly chosen out of all the cards they own instead. This doesn't affect opponents, because their hands are already randomly generated. </p>
                    <p className={s.phrase}>randomhand</p>

                    <p className={s.rules__header}>Count Unplayed</p>
                    <p>Each player's score includes the cards in their hand as well as the cards they control on the board.</p>
                    <p className={s.phrase}>countunplayed</p>
                </div>
            </Layout>
        </>
    )
}

export default HomePage;
