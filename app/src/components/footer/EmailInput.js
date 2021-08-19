import React from 'react'
import './EmailInput.css'
import SolidButton from '../button/SolidButton'
const EmailInput = () => {
    return (
        <div className="email-container">
            <input className="email-input" placeholder="Your Email" type="email"/>
            <SolidButton title="Email Me!"/>
        </div>
    )
}
export default EmailInput
