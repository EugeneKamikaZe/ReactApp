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
    console.log(type)
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