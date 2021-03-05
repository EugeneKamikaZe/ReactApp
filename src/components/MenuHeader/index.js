import {useState} from 'react'
import {NotificationManager} from 'react-notifications'

import Menu from '../Menu'
import NavBar from '../Navbar'
import Modal from '../Modal'
import LoginForm from '../LoginForm'

const MenuNavbar = ({bgActive}) => {
    const [isOpen, setOpen] = useState(null)
    const [isOpenModal, setOpenModal] = useState(false)

    const handleClickButton = () => {
        setOpen(prevState => !prevState)
    }

    const handleClickButtonType = () => {
        setOpenModal(prevState => !prevState)
    }

    const handleSubmitLoginForm = async ({email, password, type}) => {
        if (!type) {
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
                NotificationManager.error(response.error.message, 'Error registration')
            } else {
                localStorage.setItem('idToken', response.idToken)
                setOpenModal(false)
                NotificationManager.success('User success registered')
            }
        } else {
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
                NotificationManager.error(response.error.message, 'Invalid login or password')
            } else {
                setOpenModal(false)
                NotificationManager.success('Success logon')
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