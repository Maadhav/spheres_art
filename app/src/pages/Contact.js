import React, { useState } from 'react'
import SolidButton from '../components/button/SolidButton'
import './Contact.css'
const Contact = () => {
    const [state, setState] = useState({
        email: '',
        name: '',
        body: '',
        subject: 'Contact For Sphere.ART Marketplace',
    })
    return (
        <div className='contact-page-container'>
            <form method='post'  className='container-width'>
                <div className="field-section">
                    <h2>Email</h2>
                    <input
                        placeholder="Email"
                        type='email'
                        className="field-input"
                        required
                        onChange={(e) => {
                            setState(val => ({ ...val, email: e.target.value }))
                        }}
                        value={state.email}
                    />
                </div>
                <div className="field-section">
                    <h2>Name</h2>
                    <input
                        placeholder="Name"
                        className="field-input"
                        required
                        onChange={(e) => {
                            setState(val => ({ ...val, name: e.target.value }))
                        }}
                        value={state.title}
                    />
                </div>
                <div className="field-section">
                    <h2>Message</h2>
                    <textarea
                        placeholder="Message"
                        className="field-textarea"
                        required
                        onChange={(e) => {
                            setState(val => ({ ...val, body: e.target.value }));
                        }}
                        value={state.body}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "50px",
                    }}
                >
                    <SolidButton title="Submit" onClick={() => {}} />
                </div>
            </form>
        </div>
    )
}

export default Contact
