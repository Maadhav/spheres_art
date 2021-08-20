import React from 'react'
import './Profile.css'
import banner from '../images/banner.png'
import profile from '../images/profile.png'
import Search from '../components/navbar/Search'
import NFTCard from '../components/card/NFTCard'
import LinedButton from '../components/button/LinedButton'

const Profile = () => {
    return (
        <div>
            <div className="banner-section">
                <img src={banner} alt="logo" />
                <div className="profile-section">
                    <div>
                        <img src={profile} alt="profile" className="profile-image" />
                        <h1 style={{ textAlign: "center" }}>Mia Ayana</h1>
                    </div>
                </div>
            </div>
            <div className="search-section">
                <Search />
            </div>
            <div className="nft-section">
                <div className="nft-grid">
                    {
                        Array(8).fill().map((e) => <NFTCard />)
                    }
                </div>
                <LinedButton title="Load More" onClick={() => { }} style={{ marginBottom: "60px", width: "300px" }} />
            </div>
        </div>
    )
}

export default Profile
