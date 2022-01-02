import React from 'react'
import { Link } from 'react-router-dom'
import './Logo.css'


const Logo = () => {
    return (
        <Link to={'/'} className="logo-container">
            <div className="logo"></div>
            <div className="logo-title">Sphere.ART</div>
        </Link>
    )
}

export default Logo
