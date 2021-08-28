import React, { useEffect, useState } from 'react'
import './Profile.css'
import banner from '../images/banner.png'
import profile from '../images/profile.png'
import Search from '../components/navbar/Search'
import NFTCard from '../components/card/NFTCard'
import LinedButton from '../components/button/LinedButton'
import Blockies from 'react-blockies'
import { getActiveAccount, getContractStorage } from '../adapters/tezos'
import Loader from '../components/loader/Loader'
import getIPFSData from '../adapters/ipfs'
const Profile = () => {
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true)
    const [spheres, setSpheres] = useState([])
    const [length,setLength] = useState(0)
    const init = async () => {
        let activeAccount = await getActiveAccount();
        setWallet(activeAccount);
    };
    async function getData() {
        var data = (await getContractStorage()).spheres.valueMap;
        var spheres = [];
        var parseData = (Array.from(data).map((k, v) => k[1]))
        for (let i = 0; i < parseData.length; i++) {
            const sphere = parseData[i];
            if (!sphere.isNew && (i > 4) && sphere.owner === wallet?.address) {


                console.log(sphere.tokenUrl)
                let ex = await getIPFSData(sphere.tokenUrl.split('ipfs://')[1])
                let ipfsData = JSON.parse(ex);
                spheres.push({ ...sphere, ...ipfsData, });
            }
        }
        setSpheres(spheres)
        setLength(spheres.length)
        setLoading(false)
    }
    useEffect(() => {
        init()
        getData()
    }, [wallet])
    return (
        <div>
            <div className="banner-section">
                <img src={banner} alt="logo" />
                <div className="profile-section">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Blockies
                            seed={wallet ? wallet.address : ''}
                            scale={26} className="profile-image" />
                        <h1 style={{ textAlign: "center" }}>{wallet ? wallet.address : ''}</h1>
                    </div>
                </div>
            </div>
            <div className="search-section">
                <Search />
            </div>
            {loading ? <Loader /> : <div className="nft-section">
                <div className="nft-grid">
                    {
                        spheres.map((e,i) => i < length  && <NFTCard sphere={e} key={e.token_id} />)
                    }
                </div>
                {spheres.length > length && <LinedButton title="Load More" onClick={() => { setLength(val => val + 8) }} style={{ marginBottom: "60px", width: "300px" }} />}
            </div>}
        </div>
    )
}

export default Profile
