import React, { useEffect, useRef, useState } from 'react'
import './ItemPage.css'
import profile from '../images/profile.png'
import SolidButton from '../components/button/SolidButton'
import CheckOut from '../components/dialog/CheckOut'
import Payment from '../components/dialog/Payment'
import Blockies from 'react-blockies'
import { APP } from '../adapters/three.js/index'
import * as THREE from 'three'
import { useLocation } from 'react-router-dom'
import Loader from '../components/loader/Loader'
const ItemPage = (props) => {
    const location = useLocation()
    const [checkout, setCheckout] = useState(false)
    const [payment, setPayment] = useState(false)
    const [state, setstate] = useState(props.location.state)
    const [loading , setLoading] = useState(true)
    const [ipfsCid, ipfsName] = state.properties.file.split('ipfs://')[1].split('/')
    const ref = useRef();
    function init() {
        var loader = new THREE.FileLoader()
        loader.load(`https://ipfs.io/ipfs/${ipfsCid}/${ipfsName}`, function (json) {
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
    return (
        <div className="section-separator">
            <div className="image-section" ref={ref}>
                {loading && <Loader/>}
            </div>
            <div className="details-section">
                <div style={{ margin: "45px 43px" }}>
                    <h1>{state.name}</h1>
                    <div className="price-text">From<span style={{ fontWeight: "600" }}> {(state.price.c / 1000000).toFixed(2)} XTZ</span></div>
                    <div className="creator">Creator</div>
                    <div className="creator-details">
                        <Blockies
                            seed={state.creator} className="creator-image" alt="" />
                        <div className="creator-name"> {state.creator}</div>
                    </div>
                    <div className="details">Details</div>
                    <span><div className="highlighted-line"></div><div className="break-line"></div></span>
                    <div className="description">
                        {state.description}
                    </div>
                    {!location.pathname.includes('profile') && <SolidButton title={"Buy for " + (state.price.c / 1000000).toFixed(2) + " XTZ"} onClick={() => { setCheckout(true) }} />}
                </div>
            </div>
            {checkout && <CheckOut sphere={state} onQuit={() => { setCheckout(false) }} onCheckOut={() => { setPayment(true); setCheckout(false) }} />}
            {payment && <Payment sphere={state} onQuit={() => { setPayment(false) }} />}
        </div>
    )
}

export default ItemPage
