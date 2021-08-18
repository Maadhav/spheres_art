import React from 'react'
import './NFTCard.css'


const NFTCard = () => {
    return (
        <div className="container">
            <div className="image-container"></div>
            <div className="title-style">NFT Name</div>
            <div className="price-style"><span style={{fontWeight: "600"}}>0.00</span> XTZ</div>
        </div>
    )
}

export default NFTCard
