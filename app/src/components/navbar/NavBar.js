import React from 'react'
import Logo from '../logo/Logo'
import './NavBar.css'
import Search from './Search'
import MenuItem from './menu/MenuItem'
const NavBar = () => {
    return (
        <div className="navbar-container">
            <Logo/>
            <Search/>
            <MenuItem title="Explore" active = {true}/>
            <MenuItem title="My Items" active = {false}/>
            <MenuItem title="Following" active = {false}/>
        </div>
    )
}

export default NavBar
