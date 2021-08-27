import React from 'react'
import './dialog.css'
import './CheckOut.css'
import SolidButton from '../button/SolidButton'
import LinedButton from '../button/LinedButton'
const CheckOut = ({ onQuit, onCheckOut, sphere }) => {
    return (
        <div className="popup-box">
            <div className="box">
                <div className="title-section">
                    <h2>Check Out</h2>
                </div>
                <div className="body-section">
                    <div className="header">
                        <div style={{ flex: 1 }} className="header-text">Item</div>
                        <div className="header-text">Subtotal</div>
                    </div>
                    <div className="item-section">
                        <div className="item-details">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTFMYCWAtp0Hb83KVHXxqvUQA6d1dlRYxJfQ&usqp=CAU" className="item-image" />
                            <div>
                                <div className="item-creator">{sphere.creator}</div>
                                <div className="item-title">{sphere.name}</div>
                            </div>
                        </div>
                        <span className="price">{(sphere.price.c / 1000000).toFixed(2)} <span style={{ fontWeight: "600" }}>XTZ</span></span>
                    </div>
                    <div className="checkout-section">
                        <div className="header-text" style={{ flex: 1 }}>Total</div>
                        <span className="price">{(sphere.price.c / 1000000).toFixed(2)} <span style={{ fontWeight: "600" }}>XTZ</span></span>
                    </div>
                </div>
                <div className="action-section">
                    <SolidButton title="Checkout" onClick={onCheckOut} />
                    <LinedButton title="Cancel" onClick={onQuit} />
                </div>
            </div>
        </div>
    )
}

export default CheckOut
