import React, { useEffect, useState } from 'react'
import getIPFSData from '../adapters/ipfs'
import { getContractStorage } from '../adapters/tezos'
import LinedButton from '../components/button/LinedButton'
import NFTCard from '../components/card/NFTCard'
import Loader from '../components/loader/Loader'
import './HomePage.css'

const HomePage = () => {

    const [loading, setLoading] = useState(true)
    const [spheres, setSpheres] = useState([])
    async function getData() {
        var data = (await getContractStorage()).spheres.valueMap;
        var spheres = [];
        var parseData = (Array.from(data).map((k, v) => k[1]))
        for (let i = 0; i < parseData.length; i++) {
            const sphere = parseData[i];
            if (sphere.isNew && (i > 4)) {
                console.log(sphere.tokenUrl)
                let ex = await getIPFSData(sphere.tokenUrl.split('ipfs://')[1])
                let ipfsData = JSON.parse(ex);
                spheres.push({ ...sphere, ...ipfsData, });
            }
        }
        setSpheres(spheres)
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="home-body">
            <div className="discover-card">
                <div className="circle-1"></div>
                <div className="circle-2"></div>
                <span>Discover, collect, and sell extraordinary Sphere NFTs</span>
            </div>
            <div className="explore-section">
                <h1>Explore</h1>
                {loading ? <Loader/>:
                <div className="nft-grid">
                    {
                        spheres.map((e) => <NFTCard sphere={e} key={e.token_id} />)
                    }
                </div>}
            </div>
            {spheres.length > 8  && <LinedButton title="Load More" onClick={() => { }} style={{ marginBottom: "60px", width: "300px" }} />}
        </div>
    )
}

export default HomePage
