import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './NFTCard.css'
import BigNumber from 'bignumber.js'

const NFTCard = ({sphere}) => {
    const location = useLocation()
    const history = useHistory()
    console.log(sphere.price.c)
    return (
        <div className="container" onClick={() => {history.push((location.pathname == "/" ? "" : location.pathname) + `/item/${sphere.token_id}`)}}>
            <div className="image-container"></div>
            <div className="title-style">NFT Name</div>
            <div className="price-style"><span style={{fontWeight: "600"}}>{}</span> XTZ</div>
        </div>
    )
}

export default NFTCard
