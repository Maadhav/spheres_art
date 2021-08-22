import React, { useState } from 'react'
import './ItemPage.css'
import profile from '../images/profile.png'
import SolidButton from '../components/button/SolidButton'
import CheckOut from '../components/dialog/CheckOut'
import Payment from '../components/dialog/Payment'
import Blockies from 'react-blockies'
const ItemPage = () => {

    const [checkout, setCheckout] =  useState(false)
    const [payment, setPayment] =  useState(false)
    return (
        <div className="section-separator">
            <div className="image-section">
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFMYCWAtp0Hb83KVHXxqvUQA6d1dlRYxJfQ&usqp=CAU' className="image-style" />
            </div>
            <div className="details-section">
                <div style={{ margin: "45px 43px" }}>
                    <h1>Abstract Smoke Red Blue</h1>
                    <div className="price-text">From<span style={{ fontWeight: "600" }}> 4.5 XTZ</span></div>
                    <div className="creator">Creator</div>
                    <div className="creator-details">
                        <Blockies
                seed={''}className="creator-image" alt="" />
                        <div className="creator-name"> Mio Ayana</div>
                    </div>
                    <div className="details">Details</div>
                    <span><div className="highlighted-line"></div><div className="break-line"></div></span>
                    <div className="description">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
                    </div>
                    <SolidButton title="Buy for 4.5 XTZ" onClick={() => {setCheckout(true)}}/>
                </div>
            </div>
            {checkout && <CheckOut onQuit={() => {setCheckout(false)}} onCheckOut={() => {setPayment(true); setCheckout(false)}}/>}
            {payment && <Payment onQuit={() => {setPayment(false)}}/>}
        </div>
    )
}

export default ItemPage
