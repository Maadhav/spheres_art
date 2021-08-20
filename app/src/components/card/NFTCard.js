import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './NFTCard.css'


const NFTCard = () => {

    const location = useLocation()
    const history = useHistory()
    return (
        <div className="container" onClick={() => {history.push((location.pathname == "/" ? "" : location.pathname) + '/item/0')}}>
            <div className="image-container"></div>
            <div className="title-style">NFT Name</div>
            <div className="price-style"><span style={{fontWeight: "600"}}>0.00</span> XTZ</div>
        </div>
    )
}

export default NFTCard
