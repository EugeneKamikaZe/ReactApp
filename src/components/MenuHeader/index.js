import {useState} from 'react'
import {useSnackbar} from 'notistack'

import Menu from '../Menu'
import NavBar from '../Navbar'
import Modal from '../Modal'
import LoginForm from '../LoginForm'

const MenuNavbar = ({bgActive}) => {
    const [isOpen, setOpen] = useState(null)
    const [isOpenModal, setOpenModal] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const handleClickButton = () => {
        setOpen(prevState => !prevState)
    }

    const handleClickButtonType = () => {
        setOpenModal(prevState => !prevState)
    }

    const handleSubmitLoginForm = async ({email, password, type}) => {
        if (!type) {
            // Registration
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            }
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAdIUyKVVt5NGUHpfVuO_hfayQRuZpvkXw', requestOptions)
                .then(res => res.json())

            if (response.hasOwnProperty('error')) {
                console.log(response.error.message)
                enqueueSnackbar(`${response.error.message}`, {
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    variant: 'error',
                });
            } else {
                localStorage.setItem('idToken', response.idToken)
                setOpenModal(false)
                enqueueSnackbar('User success registered', {
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    variant: 'success',
                });
            }
        } else {
            // Login
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            }
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdIUyKVVt5NGUHpfVuO_hfayQRuZpvkXw', requestOptions)
                .then(res => res.json())

            if (response.hasOwnProperty('error')) {
                enqueueSnackbar(`${response.error.message}`, {
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    variant: 'error',
                });
            } else {
                setOpenModal(false)
                enqueueSnackbar('Success logon', {
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    variant: 'success',
                });
            }
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
                    isOpen={isOpenModal}
                />
            </Modal>
        </>
    )
}

export default MenuNavbar