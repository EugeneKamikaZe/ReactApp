import {useState} from 'react'
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

    const handleClickLogin = () => {
        setOpenModal(prevState => !prevState)
    }

    const handleSubmitLoginForm = (values) => {
        console.log(values)
    }

    return (
        <>
            <Menu isOpen={isOpen} isClose={handleClickButton}/>
            <NavBar
                isOpen={isOpen}
                bgActive={bgActive}
                onMenuClick={handleClickButton}
                onClickLogin={handleClickLogin}
            />
            <Modal
                isOpen={isOpenModal}
                title="Log in..."
                onCloseModal={handleClickLogin}
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