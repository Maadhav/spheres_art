import React from 'react'
import Logo from '../logo/Logo'
import './NavBar.css'
import Search from './Search'
import MenuItem from './menu/MenuItem'
import SolidButton from '../button/SolidButton'
import LinedButton from '../button/LinedButton'
const NavBar = () => {
    return (
        <div className="navbar-container">
            <Logo/>
            <Search/>
            <MenuItem title="Explore" active = {true}/>
            <MenuItem title="My Items" active = {false}/>
            <MenuItem title="Following" active = {false}/>
            <SolidButton title="Create" onClick={() => {}}/>
            <LinedButton title="Connect" onClick={() => {}}/>
        </div>
    )
}

export default NavBar
