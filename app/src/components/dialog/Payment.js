import React from 'react'
import { FaInstagram, FaTelegramPlane, FaTwitter } from 'react-icons/fa'
import './dialog.css'
import './Payment.css'
const Payment = ({onQuit, sphere}) => {
    const [ipfsCid, ipfsName] = sphere.image.split('ipfs://')[1].split('/')
    return (
        <div className="popup-box" onClick={onQuit} >
            <div className="box_payment">
                <div className="title-section">
                    <h2>Payment Successful</h2>
                </div>
                <div className="body-section_payment">
                    <img src={`https://${ipfsCid}.ipfs.dweb.link/${ipfsName}`} alt="" className="item-payment-image" />
                    <span className="body-text">You successfully purchased <span style={{ fontWeight: "600" }}>{sphere.name}</span> from <span style={{ fontWeight: "600" }}>{sphere.creator}</span></span>
                </div>
                <div className="action-section_share">
                    <h3>Share</h3>
                    <div className="share-section">
                        <FaInstagram className="action-icon" />
                        <FaTwitter className="action-icon" />
                        <FaTelegramPlane className="action-icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
