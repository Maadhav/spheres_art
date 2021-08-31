import React, { useEffect, useRef, useState } from 'react'
import './ItemPage.css'
import profile from '../images/profile.png'
import SolidButton from '../components/button/SolidButton'
import CheckOut from '../components/dialog/CheckOut'
import Payment from '../components/dialog/Payment'
import Blockies from 'react-blockies'
import { APP } from '../adapters/three.js/index'
import * as THREE from 'three'
import { useLocation, useParams } from 'react-router-dom'
import Loader from '../components/loader/Loader'
import BigNumber from 'big-number'
import { getContractStorage } from '../adapters/tezos'
import getIPFSData from '../adapters/ipfs'
const ItemPage = (props) => {
    const location = useLocation()
    const [checkout, setCheckout] = useState(false)
    const [payment, setPayment] = useState(false)
    const [state, setstate] = useState(props.location.state)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const ref = useRef();
    async function init() {
        var nft;
        var sphere;
        var ipfs = {}
        if (!state) {
            var data = (await getContractStorage()).spheres.valueMap
            var parseData = Array.from(data)
                .map((k, v) => k[1]);
            console.log(parseData)
            nft = parseData.find((e) =>
                e.token_id.c[0] === parseInt(id)
            )
            let ex = await getIPFSData(nft.tokenUrl.split("ipfs://")[1]);
            let ipfsData = JSON.parse(ex);
            sphere = { ...nft, ...ipfsData }
            console.log(sphere)
            setstate(sphere)
            ipfs = {
                cid: sphere.properties.file.split('ipfs://')[1].split('/')[0],
                name: sphere.properties.file.split('ipfs://')[1].split('/')[1]
            }
        }
        else {

            ipfs = {
                cid: state.properties.file.split('ipfs://')[1].split('/')[0],
                name: state.properties.file.split('ipfs://')[1].split('/')[1]
            }
        }
        var loader = new THREE.FileLoader()
        loader.load(`https://ipfs.io/ipfs/${ipfs.cid}/${ipfs.name}`, function (json) {
            var player = new APP.Player();
            player.load(JSON.parse(json));
            player.setSize(542, 542);
            player.play();

            setLoading(false)
            ref.current.appendChild(player.dom);

            window.addEventListener('resize', function () {

                player.setSize(542, 542);

            });
        })
    }

    useEffect(() => {
        init()
    }, [])
    if (loading)
        return <Loader />
    return (
        <div className="section-separator">
            <div className="image-section" ref={ref}>
                {loading && <Loader />}
            </div>
            <div className="details-section">
                <div style={{ margin: "45px 43px" }}>
                    <h1>{state.name}</h1>
                    <div className="price-text">From<span style={{ fontWeight: "600" }}> {(state.price.c / 1000000).toFixed(2)} XTZ</span></div>
                    <div className="creator">Creator</div>
                    <div className="creator-details">
                        <Blockies
                            seed={state.creator} className="creator-image" alt="" />
                        <div className="creator-name"> {state?.creator}</div>
                    </div>
                    {!state.isNew && <><div className="creator">Owner</div>
                        <div className="creator-details">
                            <Blockies
                                seed={state.owner} className="creator-image" alt="" />
                            <div className="creator-name"> {state?.owner}</div>
                        </div></>}
                    <div className="details">Details</div>
                    <span><div className="highlighted-line"></div><div className="break-line"></div></span>
                    <div className="description">
                        {state.description}
                    </div>
                    {!state.isNew && <SolidButton title={'Download'} onClick={() => { }} />}
                    {!location.pathname.includes('profile') && <SolidButton title={"Buy for " + (state.price.c / 1000000).toFixed(2) + " XTZ"} onClick={() => { setCheckout(true) }} />}
                </div>
            </div>
            {checkout && <CheckOut sphere={state} onQuit={() => { setCheckout(false) }} onCheckOut={() => { setPayment(true); setCheckout(false) }} />}
            {payment && <Payment sphere={state} onQuit={() => { setPayment(false) }} />}
        </div>
    )
}

export default ItemPage
