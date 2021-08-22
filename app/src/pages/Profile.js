import React, { useEffect, useState } from 'react'
import './Profile.css'
import banner from '../images/banner.png'
import profile from '../images/profile.png'
import Search from '../components/navbar/Search'
import NFTCard from '../components/card/NFTCard'
import LinedButton from '../components/button/LinedButton'
import Blockies from 'react-blockies'
import { getActiveAccount } from '../adapters/tezos'
const Profile = () => {
    const [wallet, setWallet] = useState(null);
    const init = async () => {
        let activeAccount = await getActiveAccount();
        setWallet(activeAccount);
      };
    
      useEffect(() => {
        init();
      }, []);
    return (
        <div>
            <div className="banner-section">
                <img src={banner} alt="logo" />
                <div className="profile-section">
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Blockies
                seed={wallet ? wallet.address: ''}
                scale={26} className="profile-image" />
                        <h1 style={{ textAlign: "center" }}>{wallet ? wallet.address: ''}</h1>
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
