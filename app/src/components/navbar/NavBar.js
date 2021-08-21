import React, { useEffect, useState } from 'react'
import Logo from '../logo/Logo'
import './NavBar.css'
import Search from './Search'
import MenuItem from './menu/MenuItem'
import SolidButton from '../button/SolidButton'
import LinedButton from '../button/LinedButton'
import { Link, useLocation } from 'react-router-dom'
const NavBar = () => {
    const location = useLocation()
    const [index, setIndex] = useState(0)

    useEffect(() => {
        console.log(location.pathname)
        if(location.pathname.includes("profile")){
            setIndex(1)
        }
        else {
            setIndex(0)
        }
    }, [location])
    return (
        <div className="navbar-container">
            <Logo />
            <Search />
            <Link to={'/'} style={{ textDecoration: 'none' }}>
                <MenuItem title="Explore" active={index === 0} />
            </Link>
            <Link to={"/profile"} style={{ textDecoration: 'none' }}>
            <MenuItem title="My Items" active={index === 1} />
            </Link>
            <MenuItem title="Following" active={index === 2} />
            <Link to={'/create'} style={{ textDecoration: 'none' }}>
            <SolidButton title="Create" onClick={() => { }} />
            </Link>
            <LinedButton title="Connect" onClick={() => { }} />
        </div>
    )
}

export default NavBar
