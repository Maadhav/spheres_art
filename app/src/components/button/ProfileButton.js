import React from 'react'
import './Button.css'
import profile from '../../images/profile.png'
import { ChevronDown } from 'react-iconly'
import Blockies from 'react-blockies';
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const ProfileButton = ({ title, onDisconnect }) => {
    return (
        <div className="profile-button" onClick={() => {
            var element = document.getElementById("dropdown");
            if (element.classList.contains('show')) {
                element.classList.remove('show');
            } else {
                element.classList.add('show')
            }
        }} >
            <Tippy
                content={<span>{title}</span>}
                maxWidth="none"
            >
                <div>

                    <Blockies
                        seed={title}
                        scale={4.25}
                        className="profile-button-image" alt="" />
                </div>
            </Tippy>
            <div class="dropdown-content" id="dropdown">
                <div onClick={onDisconnect}>Disconnect</div>
            </div>
        </div>
    )
}

export default ProfileButton
