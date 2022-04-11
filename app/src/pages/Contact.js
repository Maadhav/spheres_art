import React, { useEffect, useState } from 'react'
import SolidButton from '../components/button/SolidButton'
import './Contact.css'
import axios from 'axios';
import { toast } from 'react-toastify';


const Contact = () => {
    const [state, setState] = useState({
        email: '',
        name: '',
        msg: '',
    })

    const onSubmit = e => {
        e.preventDefault()
        axios
            .post(
                "https://us-central1-sphere-art.cloudfunctions.net/sendEmail?email=" + state.email + '&name=' + state.name + '&msg=' + state.msg,
            )
            .then((res) => {
                console.log(res.data);
                toast.success("Your message has been sent!");
            })
            .catch((err) => {
                console.log(err);
            });
        setState({
            email: '',
            name: '',
            msg: '',
        })
    }


    return (
        <div className='contact-page-container'>
            <form method='post' className='container-width' onSubmit={onSubmit}>
                <div className="field-section">
                    <h2>Email</h2>
                    <input
                        placeholder="Email"
                        type='email'
                        className="field-input"
                        required
                        pattern='[a-zA-Z0-9._-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}'
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
                        onChange={(e) => {
                            setState(val => ({ ...val, name: e.target.value }))
                        }}
                        value={state.name}
                    />
                </div>
                <div className="field-section">
                    <h2>Message</h2>
                    <textarea
                        placeholder="Message"
                        className="field-textarea"
                        required
                        onChange={(e) => {
                            setState(val => ({ ...val, msg: e.target.value }));
                        }}
                        value={state.msg}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: "50px",
                    }}
                >
                    <SolidButton title="Submit" onClick={() => { }} />
                </div>
            </form>
        </div>
    )
}

export default Contact
