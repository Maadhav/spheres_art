import React from 'react'
import './Button.css'
import profile from '../../images/profile.png'
import { ChevronDown } from 'react-iconly'

const ProfileButton = ({ title, onSignOut }) => {
    return (
        <button className="profile-button"  >
            <img src={profile} className="profile-button-image" />
            <div className="profile-button-text">{title}</div>
            <ChevronDown set="bold" primaryColor="white" onClick={() => {
                var element = document.getElementById("dropdown");
                if (element.classList.contains('show')) {
                    element.classList.remove('show');
                } else {
                    element.classList.add('show')
                }
            }} className="dropbtn" />
            <div class="dropdown-content" id="dropdown">
                <div onClick={onSignOut}>Sign Out</div>
            </div>
        </button>
    )
}

export default ProfileButton
