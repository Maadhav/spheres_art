import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './NFTCard.css'

const NFTCard = ({ sphere }) => {
    const location = useLocation()
    const history = useHistory()
    const [ipfsCid, ipfsName] = sphere.image.split('ipfs://')[1].split('/')
    return (
        <div className="container" onClick={() => { history.push({ pathname: (location.pathname === "/" ? "" : location.pathname) + `/item/${sphere.token_id}`, state: sphere }) }}>

            <img src={`https://${ipfsCid}.ipfs.dweb.link/${ipfsName}`} className="image-container" alt="" />
            <div className="title-style">{sphere.name}</div>
            <div className="price-style"><span style={{ fontWeight: "600" }}>{(sphere.price / 1000000).toFixed(2)}</span> XTZ</div>
        </div>
    )
}

export default NFTCard
