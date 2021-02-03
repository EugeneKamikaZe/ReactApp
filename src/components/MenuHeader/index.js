import { useState } from 'react'
import Menu from '../Menu'
import NavBar from '../Navbar'

const MenuNavbar = () => {
    const [isActive, setActive] = useState(false)

    const handleClickButton = () => {
        setActive(!isActive)
    }

    return (
        <>
            <Menu isActive={isActive} />
            <NavBar onMenuClick={handleClickButton} />
        </>
    )
}

export default MenuNavbar