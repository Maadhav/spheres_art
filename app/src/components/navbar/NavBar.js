import React from 'react'
import Logo from '../logo/Logo'
import './NavBar.css'
import Search from './Search'

const NavBar = () => {
    return (
        <div className="navbar-container">
            <Logo/>
            <Search/>
        </div>
    )
}

export default NavBar
