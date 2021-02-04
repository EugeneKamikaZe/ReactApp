import { useState } from 'react'
import Menu from '../Menu'
import NavBar from '../Navbar'

const MenuNavbar = ({ bgActive }) => {
    const [isOpen, setOpen] = useState(null)

    const handleClickButton = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <>
            <Menu isOpen={isOpen} isClose={handleClickButton} />
            <NavBar isOpen={isOpen} bgActive={bgActive} onMenuClick={handleClickButton} />
        </>
    )
}

export default MenuNavbar