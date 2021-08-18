import React from 'react'
import LinedButton from '../components/button/LinedButton'
import NFTCard from '../components/card/NFTCard'
import './HomePage.css'
const HomePage = () => {
    return (
        <div className="home-body">
            <div className="discover-card">
                <div className="circle-1"></div>
                <div className="circle-2"></div>
                <span>Discover, collect, and sell extraordinary Sphere NFTs</span>
            </div>
            <div className="explore-section">
                <h1>Explore</h1>
                <div className="nft-grid">
                    {
                        Array(8).fill().map((e) => <NFTCard />)
                    }
                </div>
            </div>
            <LinedButton title="Load More" onClick={() => { }} style={{ width: "300px" }} />
        </div>
    )
}

export default HomePage
