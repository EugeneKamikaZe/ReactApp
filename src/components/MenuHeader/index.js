import {useState} from 'react'
import {useSnackbar} from 'notistack'

import Menu from '../Menu'
import NavBar from '../Navbar'
import Modal from '../Modal'
import LoginForm from '../LoginForm'

const singingSignupUser = async ({email, password, type}) => {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({
            email,
            password,
            returnSecureToken: true
        })
    }

    switch (type) {
        case 'signup':
            return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdIUyKVVt5NGUHpfVuO_hfayQRuZpvkXw', requestOptions).then(res => res.json())
        case 'login':
            return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdIUyKVVt5NGUHpfVuO_hfayQRuZpvkXw', requestOptions).then(res => res.json())
        default:
            return 'I cannot login user'
    }
}

const MenuNavbar = ({bgActive}) => {
    const [isOpen, setOpen] = useState(null)
    const [isOpenModal, setOpenModal] = useState(false)
    const {enqueueSnackbar} = useSnackbar()

    const handleClickButton = () => {
        setOpen(prevState => !prevState)
    }

    const handleClickButtonType = () => {
        setOpenModal(prevState => !prevState)
    }

    const handleSubmitLoginForm = async (props) => {
        const response = await singingSignupUser(props)

        if (response.hasOwnProperty('error')) {
            enqueueSnackbar(`${response.error.message}`, {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                variant: 'error'
            })
        } else {
            if (props.type === 'signup') {
                const pokemonStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json())

                for (const item of pokemonStart.data) {
                    await fetch(`https://pokemon-game-ffc66-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`, {
                        method: 'POST',
                        body: JSON.stringify(item)
                    })
                }
            }
            localStorage.setItem('idToken', response.idToken)
            handleClickButtonType()
            enqueueSnackbar('Success', {
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
                variant: 'success'
            })
        }
    }

    return (
        <>
            <Menu isOpen={isOpen} isClose={handleClickButton}/>
            <NavBar
                isOpen={isOpen}
                bgActive={bgActive}
                onMenuClick={handleClickButton}
                onClickLogin={handleClickButtonType}
            />
            <Modal
                isOpen={isOpenModal}
                title="Log in..."
                onCloseModal={handleClickButtonType}
            >
                <LoginForm
                    onSubmit={handleSubmitLoginForm}
                    isResetField={!isOpenModal}
                />
            </Modal>
        </>
    )
}

export default MenuNavbar