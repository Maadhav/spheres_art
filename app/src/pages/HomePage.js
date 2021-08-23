import React, { useEffect, useState } from 'react'
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
        data.forEach((sphere) => {
            if (sphere.isNew)
                spheres.push(sphere);
        })
        setSpheres(spheres)
        setLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])
    if (loading)
        return <Loader />
    else
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
                            spheres.map((e) => <NFTCard sphere={e} key={e.token_id}/>)
                        }
                    </div>
                </div>
                <LinedButton title="Load More" onClick={() => { }} style={{ marginBottom: "60px", width: "300px" }} />
            </div>
        )
}

export default HomePage
